<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="核查单类型:(1-电子渠道 2-收单渠道)">
              <a-input placeholder="请输入核查单类型:(1-电子渠道 2-收单渠道)" v-model="queryParam.type"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="核查单状态:0-待处理 1-处理中 2-已处理">
              <a-input placeholder="请输入核查单状态:0-待处理 1-处理中 2-已处理" v-model="queryParam.status"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
        <a-col :md="6" :sm="8">
            <a-form-item label="受理人员">
              <a-input placeholder="请输入受理人员" v-model="queryParam.receiver"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="规则编码(组合)，规则之间用逗号分隔，同rrms_result.strategy_id_hit">
              <a-input placeholder="请输入规则编码(组合)，规则之间用逗号分隔，同rrms_result.strategy_id_hit" v-model="queryParam.ruleCodeing"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="交易流水号，同rrms_result.red_id">
              <a-input placeholder="请输入交易流水号，同rrms_result.red_id" v-model="queryParam.trnId"></a-input>
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
      <a-button type="primary" icon="download" @click="handleExportXls('CheckList测试')">导出</a-button>
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
    <checkList-modal ref="modalForm" @ok="modalFormOk"></checkList-modal>
  </a-card>
</template>

<script>
  import CheckListModal from './modules/CheckListModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "CheckListList",
    mixins:[JeecgListMixin],
    components: {
      CheckListModal
    },
    data () {
      return {
        description: 'CheckList测试管理页面',
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
            title: '核查单类型:(1-电子渠道 2-收单渠道)',
            align:"center",
            dataIndex: 'type'
           },
		   {
            title: '核查单状态:0-待处理 1-处理中 2-已处理',
            align:"center",
            dataIndex: 'status'
           },
		   {
            title: '受理人员',
            align:"center",
            dataIndex: 'receiver'
           },
		   {
            title: '规则编码(组合)，规则之间用逗号分隔，同rrms_result.strategy_id_hit',
            align:"center",
            dataIndex: 'ruleCodeing'
           },
		   {
            title: '交易流水号，同rrms_result.red_id',
            align:"center",
            dataIndex: 'trnId'
           },
		   {
            title: '交易状态，同rrmf_result.is_hit',
            align:"center",
            dataIndex: 'trnStatus'
           },
		   {
            title: '业务类型',
            align:"center",
            dataIndex: 'trnType'
           },
		   {
            title: '运营机构，同rrms_result.organ',
            align:"center",
            dataIndex: 'operOrganId'
           },
		   {
            title: '处理机构',
            align:"center",
            dataIndex: 'dealOrganId'
           },
		   {
            title: '交易金额',
            align:"center",
            dataIndex: 'trnAmt'
           },
		   {
            title: '规则分值，同rrms_result.operate_code',
            align:"center",
            dataIndex: 'ruleScore'
           },
		   {
            title: '交易渠道',
            align:"center",
            dataIndex: 'channel'
           },
		   {
            title: '风险等级',
            align:"center",
            dataIndex: 'riskLevel'
           },
		   {
            title: '风险标签',
            align:"center",
            dataIndex: 'riskLabel'
           },
		   {
            title: '管控策略，同rrms_result.operate_code',
            align:"center",
            dataIndex: 'strategyControl'
           },
		   {
            title: '通知策略',
            align:"center",
            dataIndex: 'strategyAction'
           },
		   {
            title: '处理结果:(0：未确认 1-确认有风险 2-确认无风险)',
            align:"center",
            dataIndex: 'result'
           },
		   {
            title: '支付方用户号',
            align:"center",
            dataIndex: 'cstNo'
           },
		   {
            title: '支付方证件类型',
            align:"center",
            dataIndex: 'ctfType'
           },
		   {
            title: '支付方证件号：1-身份证',
            align:"center",
            dataIndex: 'ctfNo'
           },
		   {
            title: '支付方用户姓名',
            align:"center",
            dataIndex: 'cstName'
           },
		   {
            title: '支付方银行卡号',
            align:"center",
            dataIndex: 'payerAcc'
           },
		   {
            title: '支付方银行卡bin',
            align:"center",
            dataIndex: 'payerBin'
           },
		   {
            title: '支付方安全认证方式，同rrms_result.opt_auth_mode',
            align:"center",
            dataIndex: 'safeCertWay'
           },
		   {
            title: '支付方注册时间',
            align:"center",
            dataIndex: 'openAccTime'
           },
		   {
            title: '支付方手机号码',
            align:"center",
            dataIndex: 'payerPhoneNo'
           },
		   {
            title: '支付方所属行，暂无',
            align:"center",
            dataIndex: 'payerBank'
           },
		   {
            title: '支付方证件号归属地',
            align:"center",
            dataIndex: 'payerCtfPlace'
           },
		   {
            title: '支付方手机归属地',
            align:"center",
            dataIndex: 'payerPhonePlace'
           },
		   {
            title: '支付卡号归属地',
            align:"center",
            dataIndex: 'payerAccPlace'
           },
		   {
            title: '支付方开户网点',
            align:"center",
            dataIndex: 'payerBranch'
           },
		   {
            title: '用户管控状态',
            align:"center",
            dataIndex: 'payerAccStatus'
           },
		   {
            title: '收款用户姓名',
            align:"center",
            dataIndex: 'rcvName'
           },
		   {
            title: '收款卡号',
            align:"center",
            dataIndex: 'rcvAccNo'
           },
		   {
            title: '收款方手机号',
            align:"center",
            dataIndex: 'rcvPhoneNo'
           },
		   {
            title: '收款方银行卡bin',
            align:"center",
            dataIndex: 'rcvBin'
           },
		   {
            title: '收款方账号开户网点',
            align:"center",
            dataIndex: 'rcvBranch'
           },
		   {
            title: '收款卡号归属地',
            align:"center",
            dataIndex: 'rcvAccPlace'
           },
		   {
            title: '收款方手机归属地',
            align:"center",
            dataIndex: 'rcvPhonePlace'
           },
		   {
            title: '收款方所属行',
            align:"center",
            dataIndex: 'rcvBank'
           },
		   {
            title: '设备IP地址',
            align:"center",
            dataIndex: 'ip'
           },
		   {
            title: '所在省份',
            align:"center",
            dataIndex: 'province'
           },
		   {
            title: '设备指纹',
            align:"center",
            dataIndex: 'terminalId'
           },
		   {
            title: '交易时间',
            align:"center",
            dataIndex: 'tradeTime'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'note'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/checklist/checkList/list",
          delete: "/checklist/checkList/delete",
          deleteBatch: "/checklist/checkList/deleteBatch",
          exportXlsUrl: "checklist/checkList/exportXls",
          importExcelUrl: "checklist/checkList/importExcel",
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