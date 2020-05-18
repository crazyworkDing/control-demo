/**
 * 流程图规则解析器
 * create at 2019.11.18
 * create by LiYuan
 * last edit at 2019.11.23 by LiYuan
 * version 1.0
 */

export type RuleData = {
  mode: "score" | "hit" | "nest";   // 评分、命中、嵌套
  nodes: NodeData[];
  edges: EdgeData[];
}
export type NodeData = {
  id: string;
  label?: string;
  type: "start" | "end" | "normal" | "score";
  shape?: string;
  size?: number;
  props?: any;
}
export type EdgeData = {
  source: string;
  target: string;
  props?: {condition?: boolean};
}
class RuleParserError {
  message: string;
  level: number;
  detail?: any;
  constructor(message: string, level: number, detail?: any) {
    this.message = message;
    this.level = level;
    this.detail = detail;
  }
}

// 逻辑解析模式，对应规则配置
export class RuleParser {
  protected data?: RuleData;
  protected nodes: NodeData[] = [];
  protected edges: EdgeData[] = [];
  protected startNode?: NodeData;
  protected endNode?: NodeData;
  protected normalNodes: NodeData[] = [];
  protected scoreNodes: NodeData[] = [];
  protected normalNodesMap: {[key: string]: boolean} = {};
  protected scoreNodesMap: {[key: string]: boolean} = {};

  /**
   * 构造方法
   * @param data
   */
  loadData(data: RuleData): RuleParserError | true {
    this.data = data;
    this.nodes = this.data.nodes;
    this.edges = this.data.edges;
    this.nodes.forEach(node=>{
      if(node.type === "start") {
        if(this.startNode) {
          return new RuleParserError("节点放置错误，每个图中只允许一个开始节点", 0)
        } else {
          this.startNode = node;
        }
      } else if(node.type === "end") {
        if(this.endNode) {
          return new RuleParserError("节点放置错误，每个图中只允许一个结束/动作节点", 0)
        } else {
          this.endNode = node;
        }
      } else if(node.type === "normal") {
        this.normalNodes.push(node);
      } else if(node.type === "score") {
        // 此处代码原则上应该放在ScoreRuleParser中，为了减少一次循环，暂时放在这里
        this.scoreNodes.push(node);
      }
    });
    if(!this.startNode) {
      return new RuleParserError("节点放置错误，每个图中必须存在一个开始节点", 0)
    }
    if(!this.endNode) {
      return new RuleParserError("节点放置错误，每个图中必须存在一个结束节点", 0)
    }
    for(let node of this.normalNodes) {
      this.normalNodesMap[node.id] = true;
    }
    for(let node of this.scoreNodes) {
      this.scoreNodesMap[node.id] = true;
    }
    return true;
  }
  static createDefaultData(): RuleData {
    return {
      mode: "hit",
      nodes: [
        {id: "1", type: "start", label: "开始", shape: 'circle', size: 50,},
        {id: "2", type: "end", label: "动作", shape: 'circle', size: 50,},
        // {id: "3", type: "score", props: {score: 10}},
        // {id: "4", props: {type: "rule",}},
      ],
      edges: [
        {source: "1", target: "2"}
      ],
    }
  }
  /**
   * 数据校验
   * @return boolean true 通过  level为错误等级，0表示前置配置约束没有卡住，或者数据被篡改；1表示用户配置错误或配置不完整
   */
  check(): true | RuleParserError {
    // start不能直接连接end
    // start不能有前置节点
    // end不能有后置节点
    let errEdges = this.edges.filter(edge=>
      (edge.source === this.startNode!.id && edge.target === this.endNode!.id)
      || edge.target === this.startNode!.id
      || edge.source === this.endNode!.id
    );
    if(errEdges.length) {
      return new RuleParserError("节点连接错误，1：开始节点不能直接连接结束节点；2：开始节点不能有前置节点；3：结束节点不能有后置节点", 0)
    }
    if(this.edges.findIndex(edge=>edge.source === this.startNode!.id) < 0) {
      return new RuleParserError("节点连接错误，开始节点至少有一个后置节点", 1)
    }
    if(this.edges.findIndex(edge=>edge.target === this.endNode!.id) < 0) {
      return new RuleParserError("节点连接错误，结束节点至少有一个前置节点", 1)
    }
    let errNodes = this.normalNodes.filter(node=>this.edges.findIndex(edge=>edge.source === node.id)<0 || this.edges.findIndex(edge=>edge.target === node.id)<0);
    if(errNodes.length) {
      return new RuleParserError("每个普通节点都必须有前置和后置节点", 1, errNodes);
    }
    return true;
  }

  /**
   * 校验是否可以新加连接线
   * @param willAddEdge
   */
  checkAddEdge(willAddEdge: EdgeData): true | RuleParserError {
    if(this.startNode!.id == willAddEdge.target) {
      return new RuleParserError("开始节点不允许有前置节点", 1);
    }
    if(this.endNode!.id == willAddEdge.source) {
      return new RuleParserError("终止节点不允许有后置节点", 1);
    }
    if(this.endNode!.id == willAddEdge.target && this.startNode!.id == willAddEdge.source) {
      return new RuleParserError("开始节点与终止节点不允许直接连接", 1);
    }
    // 获取所有链路，包括不连接的各个链路
    let chains: string[][] = [];
    for(let node of this.nodes) {
      chains = chains.concat(this.getAllChainsWithFnNodes(node.id));
    }
    // 校验链路中是否存在要添加的连接或反向连接
    for(let chain of chains) {
      let sIndex = chain.indexOf(willAddEdge.source);
      let tIndex = chain.indexOf(willAddEdge.target);
      if(sIndex >= 0 && tIndex >= 0) {
        if(sIndex + 1 === tIndex) {
          return new RuleParserError("规则不允许创建重复连接", 1);
        } else if(sIndex > tIndex) {
          return new RuleParserError("规则不允许形成环形连接", 1);
        }
      }
    }
    return true;
  }

  /**
   * 对齐各条链路上的节点，暂时没用
   * @param lastChains
   * @param lastChainsString
   */
  protected alignmentChain(lastChains: string[][], lastChainsString?:string): string[][] {
    let chains = lastChains;
    for(let node of this.nodes) {
      let idIndexArray: number[] = (chains).map((chain) => {
        return chain.findIndex(id=>id === node.id);
      });
      let existIdIndexArray = idIndexArray.filter(index=>index>=0);
      let maxIdIndex = Math.max(...existIdIndexArray);
      if(existIdIndexArray.length > 1) {
        idIndexArray.forEach((idIndex, index) => {
          if(idIndex>=0 && maxIdIndex != idIndex) {
            // 存在且不是最远端的位置，需要对齐
            chains[index].splice(idIndex, 0, ...(new Array(maxIdIndex - idIndex).fill("")))
          }
        })
      } else {
        // 找不到或只存在于一条链路，不处理
      }
    }
    let currentChainsString = JSON.stringify(chains);
    if(currentChainsString != lastChainsString) {
      return this.alignmentChain(chains, currentChainsString);
    } else {
      // 清理对齐后的全空列
      for(let j = chains[0].length - 1; j >= 0 ; j--) {
        let allBlank = true;
        for(let i = 0; i<chains.length;i++) {
          if(chains[i][j] !== "") {
            allBlank = false;
            break;
          }
        }
        if(!allBlank) {continue;}
        for(let i = 0; i<chains.length;i++) {
          chains[i].splice(j, 1);
        }
      }
      return chains;
    }
  }

  /**
   * 获取图形中的指定终点的所有链路
   * @param currentId 不传递则返回全链路
   * @param chain
   * @private
   */
  protected _getAllChainsByEndId(currentId: string, chain?: string[]): string[] | string[][] {
    if(!chain) {
      chain = [];
    }
    chain.unshift(currentId);
    let preLevelNodes = this.getPreLevelNodes(currentId);
    if(preLevelNodes.length === 0) {
      return chain;
    } else if(preLevelNodes.length === 1) {
      return this._getAllChainsByEndId(preLevelNodes[0], chain);
    } else {
      let rt: string[][] = [];
      for(let node of preLevelNodes) {
        let tempChain = chain.concat([]);
        tempChain = this._getAllChainsByEndId(node, tempChain) as string[];
        if(tempChain.filter(item=>Array.isArray(item)).length) {
          rt = rt.concat(tempChain);
        } else {
          rt.push(tempChain);
        }
      }
      return rt;
    }
  }

  /**
   * 获取所有相邻的前置节点
   * @param parentId
   */
  protected getPreLevelNodes(parentId: string): string[] {
    return this.edges.filter(edge=>edge.target === parentId).map(edge=>edge.source);
  }

  /**
   * 获取所有相邻的后置节点
   * @param parentId
   */
  protected getNextLevelNodes(parentId: string): string[] {
    return this.edges.filter(edge=>edge.source === parentId).map(edge=>edge.target);
  }

  /**
   * TODO: 使用优化后链路结构，并获得优化后的逻辑表达式
   */
  protected optimizationChainsExpression(expression: string): string {
    return expression;
  }

  /**
   * 获取图形中的指定终点的所有链路，纯业务部分，不含功能性节点
   * @param currentId 不传递则返回全链路
   */
  getChains(currentId?: string): string[][] {
    let chains = this.getAllChainsWithFnNodes(currentId) as string[][];
    return chains.map(chain=>chain.filter(nodeId=>nodeId!==this.startNode!.id&&nodeId!==this.endNode!.id&&this.scoreNodes.findIndex(node=>node.id===nodeId)<0))
  }

  /**
   * 获取图形中的指定终点的所有链路，包含功能性节点，如起止点
   * @param currentId 不传递则返回全链路
   */
  protected getAllChainsWithFnNodes(currentId?: string): string[][] {
    currentId = currentId || this.endNode!.id;
    let chains = this._getAllChainsByEndId(currentId);
    if(Array.isArray(chains) && chains.length) {
      if(Array.isArray(chains[0])) {
        return chains as string[][];
      } else {
        return [chains] as string[][];
      }
    } else {
      return chains as string[][];
    }
  }

  /**
   * 获取图形中指定终点的逻辑表达式
   * @param currentId
   */
  getChainsLogicExpression(currentId?: string): string {
    currentId = currentId || this.endNode!.id;
    let chains = this.getChains(currentId);
    let expression = chains.map(chain=>"("+chain.join("&&")+")").join("||");
    return this.optimizationChainsExpression(expression).replace(/(\d+)/g, "N$1");
  }
}
export class HitRuleParser extends RuleParser {
  check(): true | RuleParserError {
    // 节点数据校验
    for(let node of this.normalNodes) {
      if(!node.props || !node.props.id || !node.props.operation || (!node.props.value && node.props.value !== 0)) {
        return new RuleParserError("每个节点必须配置操作符和值", 1, node);
      }
    }
    return super.check();
  }
}

export class ScoreRuleParser extends RuleParser {
  static createDefaultData(): RuleData {
    return {
      mode: "score",
      nodes: [
        {id: "1", type: "start", label: "开始", shape: 'circle', size: 50,},
        {id: "2", type: "end", label: "动作", shape: 'circle', size: 50,},
        {id: "3", type: "score", label: "10", shape: 'circle', size: 50, props: {score: 10}},
        // {id: "4", props: {type: "rule",}},
      ],
      edges: [
        {source: "1", target: "3"},
        {source: "3", target: "2"},
      ],
    }
  }
  check(): true | RuleParserError {
    if(this.scoreNodes.length === 0) {
      return new RuleParserError("每个评分式规则都必须至少存在一个评分节点", 1)
    }
    for(let node of this.scoreNodes) {
      if(this.edges.findIndex(edge=>{
        // 目标是寻找不符合要求的连接线
        if(edge.target !== node.id && edge.source !== node.id) {return false;}
        if(edge.target === node.id && this.normalNodesMap[edge.source]) {
          // 判断评分节点的前置节点是普通节点
            return false;
        }
        if(edge.source === node.id && edge.target === this.endNode!.id) {
          // 判断评分节点的后置节点是终止节点
          return false;
        }
        return true;
      })>=0) {
        return new RuleParserError("每个评分节点都必须有前置和后置节点，并且前置节点必须是普通节点，后置节点是终止节点", 1)
      }
    }
    // 节点数据校验
    for(let node of this.normalNodes) {
      if(!node.props || !node.props.id || !node.props.operation || (!node.props.value && node.props.value !== 0)) {
        return new RuleParserError("每个节点必须配置操作符和值", 1, node);
      }
    }
    // 节点数据校验
    for(let node of this.scoreNodes) {
      if(!node.props || (!node.props.score && node.props.score !== 0)) {
        return new RuleParserError("每个评分节点必须配置评分分值", 1, node);
      }
    }
    return super.check();
  }

  /**
   * 校验是否可以新加连接线
   * @param willAddEdge
   */
  checkAddEdge(willAddEdge: EdgeData): true | RuleParserError {
    let sourceIsScoreNode = this.scoreNodes.findIndex(node=>node.id === willAddEdge.source) >= 0 ? 1 : 0;
    let targetIsEndNode = willAddEdge.target === this.endNode!.id ? 1 : 0
    if(sourceIsScoreNode + targetIsEndNode == 1) {
      return new RuleParserError("评分节点和终止节点必须是相邻节点", 1);
    }
    if(sourceIsScoreNode === 1 && willAddEdge.source === this.startNode!.id) {
      return new RuleParserError("评分节点不能与开始节点直接连接", 1);
    }
    return super.checkAddEdge(willAddEdge);
  }

  /**
   * 获取所有评分节点的表达式
   */
  getScoreChains(): string[] {
    return this.scoreNodes.map(scoreNode=>{
      return this.getChainsLogicExpression(scoreNode.id) + "->" + scoreNode.props.score;
    })
  }
}

export class NestRuleParser extends RuleParser {
  check(): true | RuleParserError {
    for(let node of this.normalNodes) {
      if(this.edges.filter(edge=>edge.source===node.id).length > 2) {
        return new RuleParserError("每个节点最多允许2个后置节点", 0)
      }
    }
    // 节点数据校验
    for(let node of this.normalNodes) {
      if(!node.props || !node.props.id) {
        return new RuleParserError("每个节点必须配置一条规则", 1, node);
      }
    }
    return super.check();
  }
  checkAddEdge(willAddEdge: EdgeData): true | RuleParserError {
    if(this.edges.filter(edge=>edge.source === this.startNode!.id).length >= 1 && willAddEdge.source === this.startNode!.id) {
      return new RuleParserError("开始节点只允许有一个后置节点", 1);
    }
    if(this.edges.filter(edge=>edge.source === willAddEdge.source).length > 2) {
      return new RuleParserError("每个节点最多允许有两个后置节点", 1);
    }
    return super.checkAddEdge(willAddEdge)
  }

  /**
   * 解析当前数据的嵌套规则
   */
  parse(currentId?: string, backId?: string): string[] {
    let chains = this.getAllChainsWithFnNodes();
    let nodes = this.nodes.map(node=>node.id);
    // 获取所有判断节点id
    let conditionNodes = nodes.filter((nodeId)=>this.edges.filter(edge=>edge.source===nodeId).length===2);
    // 对节点按照流程图流程排序后，去除开始节点、终止节点、判定节点
    let nodesWithSort = nodes.sort((a,b)=>{
      for(let chain of chains) {
        let aIndex = chain.indexOf(a);
        let bIndex = chain.indexOf(b);
        if(aIndex >= 0 && bIndex >= 0) {
          return aIndex - bIndex
        }
      }
      return 0;
    }).filter((nodeId)=>this.startNode!.id !== nodeId && this.endNode!.id !== nodeId && this.edges.filter(edge=>edge.source===nodeId).length===1);
    // 根据流程创建每个结点的表达式
    return nodesWithSort.map(node=>{
      let conditionForNodeSet = new Set();
      for(let chain of chains) {
        let nodeIndex = chain.indexOf(node);
        for(let conditionNode of conditionNodes) {
          let cIndex = chain.indexOf(conditionNode);
          if(cIndex >= 0 && cIndex < nodeIndex) {
            let edge = this.edges[this.edges.findIndex(edge=>edge.source===conditionNode&&edge.target===chain[cIndex + 1])];
            if(edge.props!.condition) {
              conditionForNodeSet.add(conditionNode)
            } else {
              conditionForNodeSet.add("!" + conditionNode);
            }
          }
        }
      }
      // 优化表达式，去除A&&!A的情况
      for(let conditionNode of conditionNodes) {
        let notC = "!" + conditionNode;
        if(conditionForNodeSet.has(conditionNode) && conditionForNodeSet.has(notC)) {
          conditionForNodeSet.delete(conditionNode);
          conditionForNodeSet.delete(notC);
        }
      }
      if(conditionForNodeSet.size) {
        return Array.from(conditionForNodeSet).join("&&") + "&&" + node;
      } else {
        return node;
      }
    });
  }
}
