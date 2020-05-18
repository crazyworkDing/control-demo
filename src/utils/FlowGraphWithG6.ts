/**
 * 流程图编辑器，基于antv G6
 * 用于风控系统中规则的配置和编排
 * create at 2019.11.11
 * create by LiYuan
 * last edit at 2019.11.23 by LiYuan
 * version 1.0
 */
import {Graph, registerBehavior, registerEdge, registerNode} from '@antv/g6';
import { EdgeData, RuleData } from './RuleParser'
// @ts-ignore
let {layout, graphlib} = dagre;
// import {} from "@/utils/RuleParser";

/**
 * 切割字符串，通用性扩展
 * @param maxBytePreRow 每行最大字符数（字节单位）
 * @returns {Array}
 */
// @ts-ignore
String.prototype.splitByMaxBytePreRow = function(maxBytePreRow: number): string[] {
    let rt = [];
    let countPerCount = 0;
    let strPreRow = "";
    for (let i=0; i<this.length; i++) {
        let len = (this.charCodeAt(i) > 127 || this.charCodeAt(i)===94) ? 2 : 1;
        if(countPerCount + len > maxBytePreRow) {
            rt.push(strPreRow);
            strPreRow = "";
            countPerCount = 0;
        }
        strPreRow += this[i];
        countPerCount += len;
    }
    if(strPreRow) {
        rt.push(strPreRow);
    }
    return rt;
};
/**
 * 定义只读变量，可字符串获取字节长度
 */
Object.defineProperties(String.prototype, {
    byteLen: {
        get:function get() {
            let len = 0;
            for (let i=0; i<this.length; i++) {
                len += (this.charCodeAt(i) > 127 || this.charCodeAt(i)===94) ? 2 : 1;
            }
            return len;
        }
    }
});

class FlowGraphWithG6 {
  private graph: Graph;
  private idCounter: number = 0;
  private readonly lines: number
  private readonly nodeWidth: number
  private readonly nodeHeight: number
  private container: HTMLElement

  public beforeDeleteNode?: <T>(model: any)=>Promise<T>;  // 传入data，返回Promise,resolve(result) result说明: false不允许删除，true允许删除
  public propsForNewNode?: <T>()=>Promise<T>; // 返回Promise，resolve(title, props, type)，props会存储到节点的props中
  public beforeLinkNodes?: <T>(data: RuleData, edge: EdgeData)=>Promise<T>; // 传入data，返回false不允许创建连接线，true允许创建
  public onEditNode?: (props: any, model: any, changeLabel: (label: string|string[])=>void)=>void;     // 参数传入props，无返回
  public onLinkChanged?: (model: any)=>void;     // 连接变更事件，包括新建和删除
  public onEditEdge?: (props: any, model: any, changeState: (state: number)=>void)=>void;    // 参数传入props，返回Promise，resolve(result) result说明: -1:false分支，1:true分支，0:无变化
  public onEditCanvas?: ()=>void;  // 无参数，无返回值
  // @ts-ignore
  private readonly g: graphlib.Graph;
  private modeTipsElement: HTMLDivElement;
  /**
   * FlowGraphWithG6构造方法
   * 运行时会对G6的行为和节点配置产生全局性影响，影响范围如下：
   * 将被注册的行为：
   * ["edit-node-props","edit-edge-props","edit-canvas-props","edge-control","node-control","ctrl-enable-link","click-add-edge"]
   * 将被注册的节点:flow-node
   * 将被注册的边：flow-edge
   * @param {HTMLElement} containerElement 画布的容器元素
   * @param width
   * @param height
   * @param {object | undefined} flowConfig   流程图中的颜色配置
   * @param lines 文本区行数
   * @constructor
   */
  constructor(containerElement: HTMLElement, width: number, height: number, flowConfig: any = undefined, lines: number = 1) {
    let self = this;
    this.lines = lines || 1;
    this.nodeWidth = 160;
    this.nodeHeight = Math.max(30, 14 * this.lines);
    let nodeWidth = this.nodeWidth;
    let nodeHeight = this.nodeHeight;
    this.container = containerElement;
    this.modeTipsElement = document.createElement("div");
    this.modeTipsElement.style.position = "absolute";
    this.modeTipsElement.style.color = "#ec560b";
    this.modeTipsElement.style.fontSize = "12px"
    this.modeTipsElement.style.top = "4px";
    this.modeTipsElement.style.right = "4px";
    this.modeTipsElement.innerText = "";
    this.container.appendChild(this.modeTipsElement);
    this.g = new graphlib.Graph();
    flowConfig = flowConfig || {
      node: {
        default: {
          background: "#fff",
          border: "#179abc",
        },
        active: {
          background: "#daf3f8",
          border: "#179abc",
        },
        selected: {
          background: "#fff6ce",
          border: "#ebcf87",
        }
      },
      edge: {
        default: {
          line: "#77d2f4",
        },
        ifTrue: {
          line: "#ff2d00",
        },
        ifFalse: {
          line: "#00ff46",
        },
        active: {
          line: "#179abc",
        },
        selected: {
          line: "#f3cd80",
        }
      }
    };

    const g6Config = {
      container: self.container,
      width: width,
      height: height,
      pixelRatio: 2,
      fitView: true,
      fitViewPadding: 20,
      maxZoom: 2,
      modes: {
        default: [
          'drag-canvas',
          'zoom-canvas',
          'drag-node',
          "edit-node-props",
          "edit-edge-props",
          "edit-canvas-props",
          "edge-control",
          "node-control",
          "ctrl-enable-link",
        ],
        link: [
          'drag-canvas',
          'zoom-canvas',
          "click-add-edge",
          "ctrl-enable-link",
        ]
      },
      defaultNode: {
        shape: 'flow-node',
        style: {
          fill: flowConfig.node.default.background,
          stroke: flowConfig.node.default.border,
          radius: 4,
          width: nodeWidth,
          height: nodeHeight,
        },
        labelCfg: {
          style: {
            fill: '#666',
            fontSize: 12,
            // fontWeight: 'bold',
          },
        },
      },
      defaultEdge: {
        // shape: 'line-with-arrow',
        shape: 'flow-edge',
        style: {
          endArrow: true,
          lineWidth: 2,
          stroke: flowConfig.edge.default.line,
          // radius: 5,
          offset: 30,
          lineAppendWidth: 20,
        }
      },
      groupType: 'rect',
    };

    // 自定义本流程图中的专用边
    registerEdge('flow-edge', {
      // 设置状态
      setState(name: string, value: boolean, item: any) {
        const group = item.getContainer();
        const shapes = group.get('children');
        const shape = shapes[0]; // 顺序根据 draw 时确定
        if(item.hasState("active") || item.hasState("selected")) {
          shape.attr('lineWidth', 4);
        } else {
          shape.attr('lineWidth', 2);
        }

        if(!item.hasState("if-true") && !item.hasState("if-false") && shapes.length > 1) {
          for(let i = 1; i < shapes.length; i++) {
            group.removeChild(shapes[i], true);
          }
        }
        if(item.hasState("if-true")) {
          shape.attr('stroke', flowConfig.edge.ifTrue.line);
          if(name === 'if-true') {
            for(let i = 1; i < shapes.length; i++) {
              group.removeChild(shapes[i], true);
            }
            group.addShape("text", this.createTextShapeCfg(item.getModel(), true))
          }
        } else if(item.hasState("if-false")) {
          shape.attr('stroke', flowConfig.edge.ifFalse.line);
          if(name === 'if-false') {
            for(let i = 1; i < shapes.length; i++) {
              group.removeChild(shapes[i], true);
            }
            group.addShape("text", this.createTextShapeCfg(item.getModel(), false))
          }
        } else if(item.hasState("selected")) {
          shape.attr('stroke', flowConfig.edge.selected.line);
        } else if(item.hasState("active")) {
          shape.attr('stroke', flowConfig.edge.active.line);
        } else {
          shape.attr('stroke', flowConfig.edge.default.line);
        }
      },
      createTextShapeCfg(edge: any, condition: boolean) {
        let text = condition ? "是" : "否"
        let textPoint = {x: 0, y: 0};
        if(edge.controlPoints && edge.controlPoints.length) {
          textPoint.x = edge.controlPoints[0].x
          textPoint.y = edge.controlPoints[0].y - 12
        } else {
          textPoint.x = edge.endPoint.x - 20;
          textPoint.y = edge.endPoint.y - 12
        }
        return {
          attrs: {
            x: textPoint.x,
            y: textPoint.y,
            textAlign: 'center',
            textBaseline: 'middle',
            text: text,
            fill: '#666',
            fontSize: 12,
          }
        }
        // return group.addShape('text', {
        //   attrs: {
        //     x: textPoint.x,
        //     y: textPoint.y,
        //     textAlign: 'center',
        //     textBaseline: 'middle',
        //     text: text,
        //     fill: '#666',
        //     fontSize: 12,
        //   }
        // });
      },
    }, 'polyline');
    registerNode("flow-node", {
      draw(cfg: any, group: any) {
        // 如果 cfg 中定义了 style 需要同这里的属性进行融合
        let style = cfg.style || {};
        let size = cfg.size || [];
        let width = size[0] || style.width || 100;
        let height = size[1] || style.height || 30;
        const shape = group.addShape('rect', {
          attrs: {
            // path: this.getPath(cfg), // 根据配置获取路径
            x: -width/2, // 居中
            y: -height / 2,
            stroke: cfg.color || flowConfig.node.default.border, // 颜色应用到边上，如果应用到填充，则使用 fill: cfg.color
            fill: cfg.color || flowConfig.node.default.background, // 颜色应用到边上，如果应用到填充，则使用 fill: cfg.color
            width: width,
            height: height,
            radius: 4,
          }
        });
        if(cfg.label) { // 如果有文本
          let labelWidth = width - 16;
          let labelHeight = height - 16;
          let maxByteNumberPreRow = parseInt(String(labelWidth / 12)) * 2;
          let maxRow = Math.max(2, parseInt(String(labelHeight / 12)) - 1);
          let labelArray = cfg.label;
          let labelText = "";
          if(!Array.isArray(labelArray)) {
            labelArray = cfg.label.split("\n")
          }
          if(labelArray.length === 1) {
            // 单行文本处理自动折行，满行溢出后隐藏
            let label = labelArray[0];
            let tempLabelArray = label.splitByMaxBytePreRow(maxByteNumberPreRow);
            if(tempLabelArray.length > maxRow) {
              tempLabelArray = tempLabelArray.slice(0, maxRow);
              tempLabelArray[maxRow - 1] = tempLabelArray[maxRow - 1].substr(0, parseInt(String(maxByteNumberPreRow / 2 - 1))) + "...";
            }
            labelText = tempLabelArray.join("\n");
          } else if(labelArray.length > 1) {
            // 多行文本处理自动隐藏
            labelText = labelArray.map((label: string)=>{
              // @ts-ignore
              if(label.byteLen > maxByteNumberPreRow) {
                return label.substr(0, parseInt(String(maxByteNumberPreRow / 2 - 1))) + "...";
              }
              return label;
            }).join("\n");
          }
          if(labelArray.length > 0) {
            group.addShape('text', {
              // attrs: style
              attrs: {
                x: -width/2 + 8, // 居中
                y: 0,
                textAlign: 'left',
                textBaseline: 'middle',
                text: labelText,
                fill: '#666',
                fontSize: 12,
              }
            });
          }
        }
        return shape;
      },
      // 设置状态
      setState(name: string, value: any, item: any) {
        const group = item.getContainer();
        const shape = group.get('children')[0]; // 顺序根据 draw 时确定
        if(name === 'active') {
          if(value) {
            shape.attr('fill', flowConfig.node.active.background);
            shape.attr('stroke', flowConfig.node.active.border);
          } else {
            shape.attr('fill', flowConfig.node.default.background);
            shape.attr('stroke', flowConfig.node.default.border);
          }
        }
        if (name === 'selected') {
          if(value) {
            shape.attr('fill', flowConfig.node.selected.background);
            shape.attr('stroke', flowConfig.node.selected.border);
            shape.attr('lineWidth', 3);
          } else {
            shape.attr('fill', flowConfig.node.default.background);
            shape.attr('stroke', flowConfig.node.default.border);
            shape.attr('lineWidth', 1);
          }
        }
      },
      getAnchorPoints: function getAnchorPoints() {
        return [[0, 0.5], [1, 0.5]];  //, [0.5, 0], [0.5, 1]];
      },
    }/*, "rect"*/);
// 定义边的交互状态切换行为,点击选中,hover效果
    registerBehavior("edge-control", {
      getEvents() {
        return {
          "edge:click": "onClick",
          "node:click": "cancelSelect",
          "canvas:click": "cancelSelect",
          "edge:mouseenter": "onMouseEnter",
          "edge:mouseleave": "onMouseLeave",
          "keydown": "onKeydown",
        }
      },
      onClick(ev: any) {
        const curEdge = ev.item;
        this.cancelSelect();
        self.graph.setItemState(curEdge, 'selected', true); // 切换选中
      },
      cancelSelect() {
        let allEdges = self.graph.findAll('edge', ()=>true);
        for(let edge of allEdges) {
          self.graph.setItemState(edge, 'selected', false); // 切换选中
          self.graph.setItemState(edge, 'active', false); // 切换选中
        }
      },
      onMouseEnter(ev: any) {
        const edge = ev.item;
        if(!edge.hasState('selected')) {
          self.graph.setItemState(edge, 'active', true);
        }
      },
      onMouseLeave(ev: any) {
        const edge = ev.item;
        if(!edge.hasState('selected')) {
          self.graph.setItemState(edge, 'active', false);
        }
      },
      onKeydown(ev: any) {
        if(ev.code === "Delete"){
          const edges = self.graph.findAllByState('edge', 'selected');
          if(edges.length <= 0) {return;}
          let selectedEdge = edges[0];
          let model = {...selectedEdge.getModel()}
          self.graph.remove(selectedEdge);
          self.onLinkChanged && self.onLinkChanged(model);
        }
      },
    });
// 定义节点的交互状态切换行为,点击选中,hover效果
    (function() {
      let enableDelete = true;
      registerBehavior("node-control", {
        getEvents() {
          return {
            "edge:click": "cancelSelect",
            "node:click": "onClick",
            "canvas:click": "cancelSelect",
            "node:mouseenter": "onMouseEnter",
            "node:mouseleave": "onMouseLeave",
            "canvas:mouseenter": "enableDelete",
            "canvas:mouseleave": "disableDelete",
            "mousemove": "enableDelete",
            "keydown": "onKeydown",
            "canvas:dblclick": "createNode",
            "node:dragend": "onNodeDragEnd",
          }
        },
        onNodeDragEnd(ev: any) {
          // TODO: 处理节点拖动后边的控制点，可用获取到的每条边的起始点和终止点的坐标处理
          // let model = ev.item.getModel();
          // let id = model.id;
          // let edges = self.graph.getEdges()
          //     .filter(item=>item.getModel().source === id || item.getModel().target === id)
          //     .forEach(edge=>{
          //         let model = edge.getModel();
          //         delete model.controlPoints;
          //         console.log(model);
          //         self.graph.updateItem(edge, model);
          //     });
          // self.graph.refresh();
          // console.log(self.graph.getEdges());
        },
        onClick(ev: any) {
          const node = ev.item;
          this.cancelSelect();
          self.graph.setItemState(node, 'selected', true); // 切换选中
        },
        cancelSelect() {
          self.graph.getNodes().forEach(node=>{
            self.graph.setItemState(node, 'selected', false); // 切换选中
            self.graph.setItemState(node, 'active', false); // 切换选中
          })
        },
        onMouseEnter(ev: any) {
          const node = ev.item;
          if(!node.hasState('selected')) {
            self.graph.setItemState(node, 'active', true);
          }
        },
        onMouseLeave(ev: any) {
          const node = ev.item;
          if(!node.hasState('selected')) {
            self.graph.setItemState(node, 'active', false);
          }
        },
        enableDelete(ev: any) {
          enableDelete = true;
        },
        disableDelete(ev: any) {
          enableDelete = false;
        },
        onKeydown(ev: any) {
          if(ev.code === "Delete" && enableDelete){
            const nodes = self.graph.findAllByState('node', 'selected');
            if(nodes.length <= 0) {return;}
            if(typeof self.beforeDeleteNode === 'function') {
              let selectedNode = nodes[0];
              let model = selectedNode.getModel();
              let p = self.beforeDeleteNode(model)
              if(p instanceof Promise) {
                p.then(confirm=>{
                  if(confirm) {
                    self.graph.remove(selectedNode);
                  }
                }, ()=>{})
              } else {
                console.error("[FlowGraphWithG6:beforeDeleteNode]必须返回Promise，resolve(confirm)")
              }
            } else {
              console.error("[FlowGraphWithG6:beforeDeleteNode]必须正确配置beforeDeleteNode属性。")
            }
          }
        },
        createNode(ev: any) {
          if(self.propsForNewNode && typeof self.propsForNewNode === "function") {
            let p = self.propsForNewNode();
            if (p instanceof Promise) {
              p.then(({title, props, shape, type, size}: {title: string, shape?: string, type: "normal" | "score", props: any, size: number})=>{
                self.idCounter += 1;
                let nodeModel: any = {
                  id: String(self.idCounter),
                  label: title,
                  x: ev.x,
                  y: ev.y,
                  type: type,
                  props: props,
                };
                if(shape) {
                  nodeModel.shape = shape;
                }
                if(size) {
                  nodeModel.size = size;
                }
                // @ts-ignore
                // self.data!.nodes.push(nodeModel);
                let node = self.graph.addItem("node", nodeModel);
                self.graph.setItemState(node, "selected", true);
                self.editNode(node);
              }, ()=>{
                // 取消创建，不处理
              })
            } else {
              console.error("[FlowGraphWithG6:propsForNewNode]必须返回Promise，resolve(title, props)")
            }
          } else {
            console.error("[FlowGraphWithG6]必须正确配置propsForNewNode属性。")
          }
        },
      });
    })();
    // 通过Ctrl按键切换连接线编辑模式
    (function () {
      let enable = false;
      registerBehavior("ctrl-enable-link", {
        enable: false,
        getEvents() {return {"keyup": "onKeyup","keydown": "onKeydown"}},
        onKeydown(ev: any) {
          if(ev.key === "Control" && !enable){
            enable = true;
            self.graph.setMode("link");
            self.modeTipsElement.innerText = "节点连接";
          }
        },
        onKeyup(ev: any) {
          if(ev.key === "Control"){
            enable = false;
            self.graph.setMode("default");
            self.modeTipsElement.innerText = "";
          }
        },
      });
    })();

// 点击两个节点添加边的交互
    registerBehavior('click-add-edge', {
      addingEdge: false,
      // 设定该自定义行为需要监听的事件及其响应函数
      getEvents() {
        return {
          'node:click': 'onClick' ,   // 监听事件 node:click，响应函数时 onClick
          'mousemove': 'onMousemove',   // 监听事件 mousemove，响应函数时 onMousemove
          'edge:click': 'onEdgeClick', // 监听事件 edge:click，响应函数时 onEdgeClick
          "keyup": "onKeyup",
        };
      },
      onKeyup(ev: any) {
        if(ev.key === "Control"){
          this.edge && self.graph.removeItem(this.edge);
          this.edge = null;
          this.addingEdge = false;
        }
      },
      onClick(ev: any) {
        const node = ev.item;
        // const graph = self.graph;
        // 鼠标当前点击的节点的位置
        const point = {x: ev.x, y: ev.y};
        const model = node.getModel();
        if (this.addingEdge && this.edge) {
          if (node === this.currentNode) {
            self.graph.removeItem(this.edge);
          } else {
            let ensureCreateLink = !self.beforeLinkNodes || self.beforeLinkNodes(self.getData()!, {source:this.edge.getModel().source, target: node.getModel().id});
            if(ensureCreateLink) {
              self.graph.updateItem(this.edge, {
                target: model.id
              });
              // self.data!.edges.push(this.edge.getModel())
              self.onLinkChanged && self.onLinkChanged(this.edge.getModel());
            } else {
              self.graph.removeItem(this.edge);
            }
          }
          this.edge = null;
          this.addingEdge = false;
        } else {
          // 在图上新增一条边，结束点是鼠标当前点击的节点的位置
          this.currentNode = node;
          this.edge = self.graph.addItem('edge', {
            source: model.id,
            target: point,
          });
          this.addingEdge = true;
        }
      },
      // getEvents 中定义的 mousemove 的响应函数
      onMousemove(ev: any) {
        // 鼠标的当前位置
        const point = {x: ev.x, y: ev.y};
        if (this.addingEdge && this.edge) {
          // 更新边的结束点位置为当前鼠标位置
          self.graph.updateItem(this.edge, {
            target: point
          });
        }
      },
      // getEvents 中定义的 'edge:click' 的响应函数
      onEdgeClick(ev: any) {
        const currentEdge = ev.item;
        // 拖拽过程中，点击会点击到新增的边上
        if (this.addingEdge && this.edge === currentEdge) {
          self.graph.removeItem(this.edge);
          this.edge = null;
          this.addingEdge = false;
        }
      }
    });

    // 编辑node属性，针对业务的属性
    registerBehavior('edit-node-props', {
      getEvents() {return {"node:click": "onClick"}},
      onClick(ev: any) {
        self.editNode(ev.item);
      }
    });

    // 编辑edge属性，仅针对判断节点后的连接线
    registerBehavior('edit-edge-props', {
      getEvents() {return {"edge:click": "onClick"}},
      onClick(ev: any) {
        const edge = ev.item;
        let model = edge.getModel();
        let props = model.props || {};
        if(typeof self.onEditEdge === "function") {
          let changeState = (state: number)=>{
            if(state === 1) {
              self.graph.setItemState(edge, "if-true", true);
              self.graph.setItemState(edge, "if-false", false);
            } else if (state === -1) {
              self.graph.setItemState(edge, "if-true", false);
              self.graph.setItemState(edge, "if-false", true);
            } else {
              self.graph.setItemState(edge, "if-true", false);
              self.graph.setItemState(edge, "if-false", false);
            }
          }
          self.onEditEdge(props, model, changeState);
        } else {
          console.error("[FlowGraphWithG6:onEditEdge]方法不存在，参数传入props，返回Promise，resolve(result) result说明: -1:false分支，1:true分支，0:无变化")
        }
      }
    });

    registerBehavior('edit-canvas-props', {
      getEvents() {return {"canvas:click": "onClick"}},
      onClick() {
        self.onEditCanvas && self.onEditCanvas();
      },
    });

    this.graph = new Graph(g6Config);
    this.idCounter = 0;
  }
  /**
   * 加载数据
   * @param data
   */
  loadData (data: RuleData) {
    // @ts-ignore
    this.idCounter = data.nodes.reduce((pre, item)=> Math.max(isNaN(pre) ? pre.id : pre, parseInt(item.id)));
    data = this._calcAutoLayout(data);
    this.graph.changeData(data);
  };

  /**
   * 获取数据
   * @returns {*}
   */
  getData(): RuleData {
    let data = this.graph.save();
    data.edges = data.edges.filter((edge: any) =>typeof edge.source === "string" && typeof edge.target === "string")
    return data;
  };
  /**
   * 重新自动布局
   */
  autoReLayout() {
    this.graph.setAutoPaint(false);
    this._calcAutoLayout();
    this.graph.refresh();
    this.graph.fitView(20);
    this.graph.paint();
    this.graph.setAutoPaint(true);
  };
  private editNode(node: any) {
    if(typeof this.onEditNode === "function") {
      let model = node.getModel();
      if(!model.props) {
        model.props = {};
      }
      let props = model.props;
      let changeLabel = (label: string|string[]) => {
        this.graph.update(node, {label: label});
      }
      this.onEditNode(props, model, changeLabel);
    } else {
      console.error("[FlowGraphWithG6:onEditNode]方法不存在，参数传入props, model, changeLabel，其中changeLabel是对该节点label变更后的操作函数，参数为node的label，类型string|string[]")
    }
  }
  /**
   * 重新布局，仅重标定节点和线的信息，不重绘
   * @private
   * @param data
   */
  private _calcAutoLayout(data?: any) {
    // 重置所有节点的状态
    this.graph.findAll("node", ()=>true).forEach((node: any)=>{
      this.graph.clearItemStates(node, ['active', 'selected']);
      this.graph.setItemState(node, "default", true);
    });
    data = data || this.getData();
    let g = this.g;
    g.nodes().forEach((node: any) => {g.removeNode(node)});
    g.setDefaultEdgeLabel(function() {return {};});
    g.setGraph({
      rankdir: 'LR',
      nodesep: 100,
      ranksep: Math.max(this.nodeWidth / 2, 100),
    });
    let nodeHeight = this.nodeHeight;
    data.nodes.forEach((node: any) => {
      // node.label = `${node.id}3`;
      g.setNode(node.id, {
        width: this.nodeWidth,
        height: nodeHeight,
      });
    });
    data.edges.forEach((edge: any) => {
      g.setEdge(edge.source, edge.target);
    });
    layout(g);
    let coord: {x: number, y: number, points: number[]};
    g.nodes().forEach((node: any, i: number) => {
      coord = g.node(node);
      data.nodes[i].x = coord.x;
      data.nodes[i].y = coord.y;
    });
    g.edges().forEach((edgeInG: any, i: number) => {
      coord = g.edge(edgeInG);
      data.edges[i].startPoint = coord.points[0];
      data.edges[i].endPoint = coord.points[coord.points.length - 1];
      data.edges[i].controlPoints = coord.points.slice(1, coord.points.length - 1);
      let edge = this.graph.find("edge", (edge: any)=>{
        let model = edge.getModel();
        return model.source === edgeInG.v && model.target === edgeInG.w;
      });
      if(edge) {
        this.graph.updateItem(edge, data.edges[i])
      }
    });
    return data;
  }

  /**
   * 获取所有边model对象，取到的对象为视图中使用的真实对象的引用
   */
  getEdges(): any {
    return this.graph.findAll("edge", ()=>true).map((edge: any)=>edge.getModel());
  }

  /**
   * 设置边状态
   * @param edgeModel
   * @param states
   * @param enable  true表示设置状态，false表示取消状态
   * @param otherModelProps   准备附加在model上的其他属性
   */
  setEdgeState(edgeModel: EdgeData, states: string[], enable: boolean = true, otherModelProps: any = {}) {
    let edge: any;
    let edges = this.graph.findAll('edge', (edge: any)=>{
      let model = edge.getModel();
      return !!(model.source === edgeModel.source && model.target === edgeModel.target);
    })
    if(edges.length) {
      edge = edges[0];
    } else {
      edge = null;
    }
    if(edge) {
      let model = edge._cfg.model;
      if(!model.props) {
        model.props = {};
      }
      let props = model.props;
      for(let key in otherModelProps) {
        props[key] = otherModelProps[key];
      }
      for(let state of states) {
        this.graph.setItemState(edge, state, enable);
      }
    }
  }
  destroy() {
    this.graph.destroy();
  }
  setMode(mode: number) {
    if(mode === 1) {
      this.graph.setMode("default");
    } else {
      this.graph.setMode("link");
    }
  }
}



export default FlowGraphWithG6;