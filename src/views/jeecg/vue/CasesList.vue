<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="案件号">
              <a-input placeholder="请输入案件号" v-model="queryParam.caseId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="案件名">
              <a-input placeholder="请输入案件名" v-model="queryParam.caseName"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
        <a-col :md="6" :sm="8">
            <a-form-item label="核查单编号">
              <a-input placeholder="请输入核查单编号" v-model="queryParam.checkId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="案件用户号">
              <a-input placeholder="请输入案件用户号" v-model="queryParam.cstNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="案件来源">
              <a-input placeholder="请输入案件来源" v-model="queryParam.sourceOfCase"></a-input>
            </a-form-item>
          </a-col>
          </template>
          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('案件管理')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

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
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <cases-modal ref="modalForm" @ok="modalFormOk"></cases-modal>
  </a-card>
</template>

<script>
  import CasesModal from './modules/CasesModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "CasesList",
    mixins:[JeecgListMixin],
    components: {
      CasesModal
    },
    data () {
      return {
        description: '案件管理管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
           },
		   {
            title: '案件号',
            align:"center",
            dataIndex: 'caseId'
           },
		   {
            title: '案件名',
            align:"center",
            dataIndex: 'caseName'
           },
		   {
            title: '核查单编号',
            align:"center",
            dataIndex: 'checkId'
           },
		   {
            title: '案件用户号',
            align:"center",
            dataIndex: 'cstNo'
           },
		   {
            title: '案件来源',
            align:"center",
            dataIndex: 'sourceOfCase'
           },
		   {
            title: '案件类型',
            align:"center",
            dataIndex: 'category'
           },
		   {
            title: '案件定性',
            align:"center",
            dataIndex: 'qualitativeCase'
           },
		   {
            title: '涉案资金',
            align:"center",
            dataIndex: 'involvedFund'
           },
		   {
            title: '冻结资金',
            align:"center",
            dataIndex: 'frozenFund'
           },
		   {
            title: '调账资金',
            align:"center",
            dataIndex: 'adjustingFund'
           },
		   {
            title: '损失资金',
            align:"center",
            dataIndex: 'lossFund'
           },
		   {
            title: '赔付状态',
            align:"center",
            dataIndex: 'stateOfPayment'
           },
		   {
            title: '赔付主体',
            align:"center",
            dataIndex: 'paymain'
           },
		   {
            title: '赔付金额',
            align:"center",
            dataIndex: 'payprice'
           },
		   {
            title: '不赔付原因',
            align:"center",
            dataIndex: 'sake'
           },
		   {
            title: '追回状态',
            align:"center",
            dataIndex: 'retrieve'
           },
		   {
            title: '追回金额',
            align:"center",
            dataIndex: 'retrievePrice'
           },
		   {
            title: '已采取措施',
            align:"center",
            dataIndex: 'actions'
           },
		   {
            title: '赔付方案',
            align:"center",
            dataIndex: 'compensationScheme'
           },
		   {
            title: '报送单位',
            align:"center",
            dataIndex: 'reportUnit'
           },
		   {
            title: '单位联系人',
            align:"center",
            dataIndex: 'reportUnitContact'
           },
		   {
            title: '单位联系电话',
            align:"center",
            dataIndex: 'reportUnitPhone'
           },
		   {
            title: '案件备注',
            align:"center",
            dataIndex: 'comments'
           },
		   {
            title: '业务类型',
            align:"center",
            dataIndex: 'trnType'
           },
		   {
            title: '泄露方式',
            align:"center",
            dataIndex: 'leakageMode'
           },
		   {
            title: '泄露渠道',
            align:"center",
            dataIndex: 'leakageChannel'
           },
		   {
            title: '风险原因',
            align:"center",
            dataIndex: 'riskReason'
           },
		   {
            title: '手机换绑方式',
            align:"center",
            dataIndex: 'phoneChangeMethod'
           },
		   {
            title: '支付方式',
            align:"center",
            dataIndex: 'paymentMethod'
           },
		   {
            title: '支付渠道',
            align:"center",
            dataIndex: 'payChannel'
           },
		   {
            title: '销账渠道',
            align:"center",
            dataIndex: 'debitChannel'
           },
		   {
            title: '案件状态',
            align:"center",
            dataIndex: 'caseStatus'
           },
		   {
            title: '处理机构',
            align:"center",
            dataIndex: 'dealOrgCode'
           },
		   {
            title: '运营机构',
            align:"center",
            dataIndex: 'operOrgCode'
           },
		   {
            title: '受理人员',
            align:"center",
            dataIndex: 'receiver'
           },
		   {
            title: '创建时间',
            align:"center",
            dataIndex: 'crTime'
           },
		   {
            title: '更新时间',
            align:"center",
            dataIndex: 'upTime'
           },
		   {
            title: '手机号',
            align:"center",
            dataIndex: 'payerPhoneNo'
           },
		   {
            title: '证件号',
            align:"center",
            dataIndex: 'ctfNo'
           },
		   {
            title: '审核状态',
            align:"center",
            dataIndex: 'auditStatus'
           },
		   {
            title: '审核备注',
            align:"center",
            dataIndex: 'auditComment'
           },
		   {
            title: '提交审核的人员',
            align:"center",
            dataIndex: 'submitUser'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/cases/cases/list",
          delete: "/cases/cases/delete",
          deleteBatch: "/cases/cases/deleteBatch",
          exportXlsUrl: "cases/cases/exportXls",
          importExcelUrl: "cases/cases/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
     
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>