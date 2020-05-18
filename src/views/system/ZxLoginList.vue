<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="会员全称">
              <a-input placeholder="请输入会员全称" v-model="queryParam.fullName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="会员简称">
              <a-input placeholder="请输入会员简称" v-model="queryParam.abbreviateName"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="会员类型">
                <a-input placeholder="请输入会员类型" v-model="queryParam.menberType"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="部门负责人姓名">
                <a-input placeholder="请输入部门负责人姓名" v-model="queryParam.departLeader"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="机构代码">
                <a-input placeholder="请输入机构代码" v-model="queryParam.organCode"></a-input>
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
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
    <!-- 查询区域-END -->
    
    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('用户表')">导出</a-button>
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
        :rowSelection="{fixed:true,selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        
        @change="handleTableChange">

        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>
        <template slot="imgSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无此图片</span>
          <img v-else :src="getImgView(text)" height="25px" alt="图片不存在" style="max-width:80px;font-size: 12px;font-style: italic;"/>
        </template>
        <template slot="fileSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无此文件</span>
          <a-button
            v-else
            :ghost="true"
            type="primary"
            icon="download"
            size="small"
            @click="uploadFile(text)">
            下载
          </a-button>
        </template>

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

    <zxLogin-modal ref="modalForm" @ok="modalFormOk"></zxLogin-modal>
  </a-card>
</template>

<script>

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ZxLoginModal from './modules/ZxLoginModal'
  import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'

  export default {
    name: "ZxLoginList",
    mixins:[JeecgListMixin],
    components: {
      JDictSelectTag,
      ZxLoginModal
    },
    data () {
      return {
        description: '用户表管理页面',
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
            title:'会员全称',
            align:"center",
            dataIndex: 'fullName'
          },
          {
            title:'会员简称',
            align:"center",
            dataIndex: 'abbreviateName'
          },
          {
            title:'会员类型',
            align:"center",
            dataIndex: 'menberType_dictText'
          },
          {
            title:'会员承办部门',
            align:"center",
            dataIndex: 'depart'
          },
          {
            title:'部门负责人姓名',
            align:"center",
            dataIndex: 'departLeader'
          },
          {
            title:'部门负责人手机号码',
            align:"center",
            dataIndex: 'telephone'
          },
          {
            title:'部门负责人座机号码',
            align:"center",
            dataIndex: 'linePhone'
          },
          {
            title:'注册资本',
            align:"center",
            dataIndex: 'regCapital'
          },
          {
            title:'机构代码',
            align:"center",
            dataIndex: 'organCode'
          },
          {
            title:'存款规模',
            align:"center",
            dataIndex: 'depositScale'
          },
          {
            title:'贷款规模',
            align:"center",
            dataIndex: 'volumeScale'
          },
          {
            title:'自营理财规模',
            align:"center",
            dataIndex: 'selfScale'
          },
          {
            title:'代销理财规模',
            align:"center",
            dataIndex: 'consignmentScale'
          },
          {
            title:'网点数',
            align:"center",
            dataIndex: 'networkCount'
          },
          {
            title:'电子渠道',
            align:"center",
            dataIndex: 'eleChannel_dictText'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: "/test/zxLogin/list",
          delete: "/test/zxLogin/delete",
          deleteBatch: "/test/zxLogin/deleteBatch",
          exportXlsUrl: "/test/zxLogin/exportXls",
          importExcelUrl: "test/zxLogin/importExcel",
        },
        dictOptions:{},
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      initDictConfig(){
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less';
</style>