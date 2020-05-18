<template>
  <div>
    <a-button class="editable-add-btn mb20" @click="add" type="primary" v-if="!disable">新增</a-button>
    <a-table
    ref="table"
    size="middle"
    bordered
    rowKey="caseId"
    :columns="columns"
    :dataSource="data"
    :pagination="ipagination"
    :loading="loading"
    @change="handleTableChange">
      <span slot="action" slot-scope="text, record" v-if="!disable">
        <a @click="handleDelete(record)">删除</a>
      </span>
    </a-table>
    <identity-add ref="modalForm" @addData="addData"></identity-add> 
  </div>
</template>
<script>
// import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import IdentityAdd from './modules/IdentitiyAdd'
export default {
  name: 'CasesModalIdentity',
  // mixins: [JeecgListMixin],
  components: {
    IdentityAdd
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    disable: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      ipagination:{
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        showTotal: (total, range) => {
          return range[0] + "-" + range[1] + " 共" + total + "条"
        },
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0
      },
      /* 排序参数 */
      isorter:{
        column: 'createTime',
        order: 'desc',
      },
      loading: false,
      columns: [
        {
          title: '用户号',
          align: 'center',
          dataIndex: 'cstNo'
        },
        {
          title: '姓名',
          align: 'center',
          dataIndex: 'cstName'
        },
        {
          title: '管控状态',
          align: 'center',
          dataIndex: 'payerAccStatus'
        },
        {
          title: '案件身份',
          align: 'center',
          dataIndex: 'caseUserStatusValue'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/caselist/caselist/caseLists'
      }
    }
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      //分页、排序、筛选变化时触发
      //TODO 筛选
      if (Object.keys(sorter).length > 0) {
        this.isorter.column = sorter.field;
        this.isorter.order = "ascend" == sorter.order ? "asc" : "desc"
      }
      this.ipagination = pagination;
    },
    add() {
      this.$refs.modalForm.add();
      this.$refs.modalForm.dataSource = this.data;
      this.$refs.modalForm.title = "新增";
      this.$refs.modalForm.disableSubmit = false;
    },
    addData(value) {
      this.data = value;
    },
    handleDelete(record) {
      this.data.forEach((res, index, array) => {
        if (record.cstNo == res.cstNo) {
          this.data.splice(index, 1);
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.mb20 {
  margin-bottom: 20px;
}
</style>