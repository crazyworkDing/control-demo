<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
    style="height: 800px; overflow: auto;padding-bottom: 0;"
  >
    <a-card title="已关联">
      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="caseId"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="deleteRecord(record)">删除</a>
        </span>
      </a-table>
    </a-card>
    <a-card>
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :sm="4" :md="4">
            <a-form-item label>
              <a-select defaultValue="0" style="width: 120px" v-model="queryParam.user">
                <a-select-option value="0">用户</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :sm="4" :md="4">
            <a-form-item label>
              <a-input v-model="queryParam.cstNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :sm="6" :md="12">
            <a-form-item label="身份证号">
              <a-input v-model="queryParam.ctfNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :sm="4" :md="4">
            <a-form-item>
              <a-button type="prmary" @click="search">查询</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="caseId"
        :columns="columns2"
        :dataSource="dataSource2"
        :pagination="ipagination2"
        :loading="loading2"
        :rowSelection="{selectedRowKeys: selectedRowKeys2, onChange: onSelectChange2}"
        @change="handleTableChange2"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="addForm(record)">添加</a>
        </span>
      </a-table>
    </a-card>
    <case-identity ref="caseIdentity" @addUser="addUser"></case-identity>
  </a-modal>
</template>
<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { getAction } from '@/api/manage'
import CaseIdentity from './CaseIdentity'
export default {
  name: 'IdentityAdd',
  mixins: [JeecgListMixin],
  components: {
    CaseIdentity
  },
  data() {
    return {
      title: '',
      dataSource2: [],
      selectedRowKeys2: [],
      record: {},
      /* table选中records*/
      selectionRows2: [],
      visible: false,
      loading2: false,
      confirmLoading: false,
      url: {
        list: '/caselist/caselist/user'
      },
      ipagination2:{
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
      queryParam: {
        user: '0',
        ctfNo: '',
        cstNo: ''
      },
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
          align: 'center',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      columns2: [
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
          align: 'center',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  methods: {
    addUser(value) {
      let params = Object.assign(this.record, value);
      let dataSource = this.dataSource;
      if (dataSource.length == 0) {
        this.dataSource.push({...params});
        return;
      }
      let flag = 0;
      dataSource.forEach(res => {
        if (res.cstNo == params.cstNo) {
          this.$message.error('关联用户号已存在，不能添加');
          return;
        } else {
          flag ++;
        }
      })
      if (flag == dataSource.length) {
        this.dataSource.push({...params});
      }
    },
    onSelectChange2(selectedRowKeys, selectionRows) {
      this.selectedRowKeys2 = selectedRowKeys;
      this.selectionRows2 = selectionRows;
    },
    handleTableChange2(pagination, filters, sorter) {
      //分页、排序、筛选变化时触发
      //TODO 筛选
      if (Object.keys(sorter).length > 0) {
        this.isorter.column = sorter.field;
        this.isorter.order = "ascend" == sorter.order ? "asc" : "desc"
      }
      this.ipagination2 = pagination;
      this.search();
    },
    handleCancel() {
      this.visible = false
    },
    add() {
      this.visible = true
    },
    deleteRecord(record) {
      this.dataSource.forEach((res, index, array) => {
        if (res.cstNo == record.cstNo) {
          this.dataSource.splice(index, 1);
        }
      })
    },
    handleOk() {
      this.$emit('addData', this.dataSource);
      this.visible = false;
    },
    addForm(record) {
      this.record = record;
      console.log(this.record)
      this.$refs.caseIdentity.edit(record);
    },
    search(arg) {
      if(!this.url.list){
        this.$message.error("请设置url.list属性!")
        return
      }
      //加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.ipagination2.current = 1;
      }
      var params = this.getQueryParams();//查询条件
      this.loading2 = true;
      getAction(this.url.list, params).then((res) => {
        if (res.success) {
          this.dataSource2 = res.result.records;
          this.dataSource2.forEach(res => {
            if (res.caseUserStatus == '0') {
              res.caseUserStatusValue = '第三方';
            } else {
              res.caseUserStatusValue = '被盗者';
            }
          })
          this.ipagination2.total = res.result.total;
        }
        if(res.code===510){
          this.$message.warning(res.message)
        }
        this.loading2= false;
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>