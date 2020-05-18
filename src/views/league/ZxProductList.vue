<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="产品名称">
              <a-input placeholder="请输入产品名称" v-model="queryParam.productName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="发行者">
              <a-input placeholder="请输入发行者" v-model="queryParam.publisher"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="登记代码">
                <a-input placeholder="请输入登记代码" v-model="queryParam.code"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="运作模式">
                <a-input placeholder="请输入运作模式" v-model="queryParam.mode"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="募集方式">
                <a-input placeholder="请输入募集方式" v-model="queryParam.recruType"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="期限类型">
                <a-input placeholder="请输入期限类型" v-model="queryParam.timeType"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="募集币种">
                <a-input placeholder="请输入募集币种" v-model="queryParam.currency"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="产品状态">
                <a-input placeholder="请输入产品状态" v-model="queryParam.status"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="风险等级">
                <a-input placeholder="请输入风险等级" v-model="queryParam.riskLevel"></a-input>
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

    <zxProduct-modal ref="modalForm" @ok="modalFormOk"></zxProduct-modal>
  </a-card>
</template>

<script>

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ZxProductModal from './modules/ZxProductModal'
  import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'

  export default {
    name: "ZxProductList",
    mixins:[JeecgListMixin],
    components: {
      JDictSelectTag,
      ZxProductModal
    },
    data () {
      return {
        description: '产品表管理页面',
        // 表头
        columns: [
          {
            title:'产品名称',
            align:"center",
            dataIndex: 'productName'
          },
          {
            title:'发行者',
            align:"center",
            dataIndex: 'publisher'
          },
          {
            title:'登记代码',
            align:"center",
            dataIndex: 'code'
          },
          {
            title:'平台编号',
            align:"center",
            dataIndex: 'number'
          },
          {
            title:'运作模式',
            align:"center",
            dataIndex: 'mode_dictText'
          },
          {
            title:'募集方式',
            align:"center",
            dataIndex: 'recruType_dictText'
          },
         /* {
            title:'期限类型',
            align:"center",
            dataIndex: 'timeType_dictText'
          },*/
          {
            title:'产品状态',
            align:"center",
            dataIndex: 'status_dictText'
          },
          {
            title:'风险等级',
            align:"center",
            dataIndex: 'riskLevel_dictText'
          },
          /*{
            title:'实际天数',
            align:"center",
            dataIndex: 'days'
          },

          {
            title:'收益类型',
            align:"center",
            dataIndex: 'revenueType'
          },
          {
            title:'投资资产类型',
            align:"center",
            dataIndex: 'assetType_dictText'
          },*/
          {
            title:'产品总额',
            align:"center",
            dataIndex: 'productPrice'
          },
          /*
          {
            title:'代销分配额',
            align:"center",
            dataIndex: 'distributionQuota'
          },*/
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: "/product/zxProduct/list",
          delete: "/product/zxProduct/delete",
          deleteBatch: "/product/zxProduct/deleteBatch",
          exportXlsUrl: "/product/zxProduct/exportXls",
          importExcelUrl: "product/zxProduct/importExcel",
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