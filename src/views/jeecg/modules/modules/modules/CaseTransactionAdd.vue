<template>
  <a-modal
    :title="title"
    :width="1000"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :closable="false"
    cancelText="关闭"
    style="height: 800px; overflow: auto;padding-bottom: 0;"
  >
    <!-- <a-card title="已关联">
      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="handleDelete(record)">删除</a>
        </span>
      </a-table>
    </a-card> -->
    <a-card title="新增关联交易">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :sm="12" :md="12">
            <a-form-item label="开始时间">
              <a-date-picker
                placeholder="开始时间"
                format="YYYY-MM-DD HH:mm:ss"
                v-model="queryParam.startTime"
              />
            </a-form-item>
          </a-col>
          <a-col :sm="12" :md="12">
            <a-form-item label="结束时间">
              <a-date-picker
                placeholder="结束时间"
                format="YYYY-MM-DD HH:mm:ss"
                v-model="queryParam.endTime"
              />
            </a-form-item>
          </a-col>
          <a-col :sm="12" :md="12">
            <a-form-item label="">
              <a-select style="width: 120px" v-model="queryParam.id">
                <a-select-option value="0">交易流水号</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-input v-model="queryParam.trnId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :sm="4" :md="4">
            <a-form-item>
              <a-button type="prmary" @click="searchQuery">查询</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <a-button class="editable-add-btn" type="primary" style="margin-top: 20px;" @click="addAll">添加所有</a-button>
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
        style="margin-top: 20px;"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="addForm(record)">添加</a>
        </span>
      </a-table>
    </a-card>
    <template slot="footer">
      <a-button key="back" @click="handleCancel">关闭</a-button>
    </template>
  </a-modal>
</template>
<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
export default {
  name: 'CaseTransactionAdd',
  mixins: [JeecgListMixin],
  data() {
    return {
      title: '',
      visible: false,
      confirmLoading: false,
      url: {
        list: '/caselist/caselist/trade'
      },
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
          title: '操作',
          align: 'center',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  methods: {
    handleCancel() {
      this.visible = false
    },
    add() {
      this.visible = true
    },
    handleOk() {},
    addForm(record) {
      this.$emit('addTrans', record);
      this.visible = false;
    },
    addAll() {
      this.$emit('addAll', this.dataSource);
      this.visible = false;
    }
  }
}
</script>
<style lang="less" scoped>

</style>