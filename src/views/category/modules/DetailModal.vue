<template>
  <div>
    <a-modal :width="1000" :visible="visible" title="审批详情" :closable="false">
      <template slot="footer">
        <a-button @click="handleCancel">关闭</a-button>
      </template>
      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
      ></a-table>
      <div id="container">
        <img src="/1.png" alt="">
      </div>
    </a-modal>
  </div>
</template>
<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { ajaxGetDictItems } from '@/api/api'
import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'
import G6 from '@antv/g6'
let listArr = []
ajaxGetDictItems('workStatus', null).then(res => {
  listArr = res.result
})
export default {
  name: 'DetailModal',
  mixins: [JeecgListMixin],
  components: {
    JDictSelectTag
  },
  data() {
    return {
      dataSource: [],
      visible: false,
      columns: [
        {
          title: '创建人',
          align: 'center',
          dataIndex: 'createBy'
        },
        {
          title: '用户角色',
          align: 'center',
          dataIndex: 'roleName'
        },
        {
          title: '修改时间',
          align: 'center',
          dataIndex: 'createTime'
        },
        {
          title: '状态',
          align: 'center',
          dataIndex: 'workStatus',
          customRender: (text, record, index) => {
            let value = ''
            listArr.forEach(res => {
              if (res.value == text) {
                value = res.text
              }
            })
            return value
          }
        },
        {
          title: '审核意见',
          align: 'center',
          dataIndex: 'review'
        }
      ],
      url: {
        list: '/sys/process/queryProcesss'
      }
    }
  },
  methods: {
    handleCancel() {
      this.close()
    },
    close() {
      this.visible = false
    },
    edit(data) {
      this.visible = true
      this.dataSource = [...data]
      let chartsData = {
        nodes: [],
        edges: []
      }
      chartsData.nodes = this.dataSource.map((res, index, array) => {
        return {
          id: res.id,
          label: res.roleName
        }
      })
      chartsData.edges = this.dataSource.map((res, index, array) => {
        return {
          source: res.id,
          target: res.id,
          label: res.action
        }
      })
      // setTimeout(() => {
      //   this.drawCharts(chartsData)
      // }, 100);
    },
    drawCharts(data) {
      const graph = new G6.Graph({
        container: document.getElementById('container'),
        width: 600,
        height: 300,
        controlPoints: false,
        modes: {
          default: ['drag-canvas', 'drag-node']
        },
        layout: {
          type: 'dagre',
          nodeSize: [40, 20],
          nodesep: 1,
          ranksep: 1
        },
        animate: true,
        defaultNode: {
          size: [40, 20],
          type: 'rect',
          style: {
            lineWidth: 2,
            stroke: '#5B8FF9',
            fill: '#C6E5FF'
          }
        },
        defaultEdge: {
          type: 'quadratic',
          size: 1,
          color: '#e2e2e2',
          style: {
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              fill: '#e2e2e2'
            }
          }
        }
      })
      graph.data(data)
      graph.render()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>