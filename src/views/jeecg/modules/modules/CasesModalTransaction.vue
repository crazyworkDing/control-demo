<template>
  <div>
    <a-row :gutter="24">
      <a-col :col="2" :md="2">
        <a-button class="editable-add-btn mb20" type="primary" @click="handleAdd" v-if="!disable">新增</a-button>
      </a-col>
      <a-col :col="2" :md="2">
        <a-button class="editable-add-btn mb20" @click="deleteAll" type="danger" v-if="!disable">删除全部</a-button>
      </a-col>
    </a-row>
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
        <a @click="deleteRecord(record)">删除</a>
      </span>
    </a-table>
    <case-transaction-add ref="modalForm" @addTrans="addTrans" @addAll="addAll"></case-transaction-add>
  </div>
</template>
<script>
// import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import CaseTransactionAdd from './modules/CaseTransactionAdd'
export default {
  name: 'CasesModalTransaction',
  // mixins: [JeecgListMixin],
  components: {
    CaseTransactionAdd
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
          title: '用户姓名',
          align: 'center',
          dataIndex: 'cstName'
        },
        {
          title: '交易时间',
          align: 'center',
          dataIndex: 'tradeTime'
        },
        {
          title: '交易流水号',
          align: 'center',
          dataIndex: 'trnId'
        },
        {
          title: '对方账号',
          align: 'center',
          dataIndex: 'rcvAccNo'
        },
        {
          title: '对方账号归属地',
          align: 'center',
          dataIndex: 'rcvAccPlace'
        },
        {
          title: '收款方姓名',
          align: 'center',
          dataIndex: 'rcvName'
        },
        {
          title: '交易金额',
          align: 'center',
          dataIndex: 'trnAmt'
        },
        {
          title: '业务类型',
          align: 'center',
          dataIndex: 'trnType'
        },
        // {
        //   title: '退款标识',
        //   align: 'center',
        //   dataIndex: 'rebackSymbol'
        // },
        {
          title: '操作',
          align: 'center',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url:{
        list: '/caselist/caselist/caseLists'
      }
    }
  },
  methods: {
    handleAdd: function () {
      this.$refs.modalForm.add();
      this.$refs.modalForm.title = "新增";
      this.$refs.modalForm.disableSubmit = false;
    },
    handleTableChange(pagination, filters, sorter) {
      //分页、排序、筛选变化时触发
      //TODO 筛选
      if (Object.keys(sorter).length > 0) {
        this.isorter.column = sorter.field;
        this.isorter.order = "ascend" == sorter.order ? "asc" : "desc"
      }
      this.ipagination = pagination;
    },
    deleteRecord(record) {
      this.data.forEach((res, index, array) => {
        if (record.cstNo == res.cstNo) {
          this.data.splice(index, 1);
        }
      })
    },
    deleteAll() {
      this.data = [];
    },
    addTrans(value) {
      this.data.push(value);
    },
    addAll(value) {
      this.data = value;
    }
  }
}
</script>
<style lang="less" scoped>
.mb20 {
  margin-bottom: 20px;
}
</style>