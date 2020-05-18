<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="文章标题">
              <a-input placeholder="请输入文章标题" v-model="queryParam.contentTitle"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="关键字">
              <a-input placeholder="请输入关键字" v-model="queryParam.contentKeyword"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
               
               <!-- <a-form-item label="是否发布">
                <a-input placeholder="请输入是否发布" v-model="queryParam.isPublish"></a-input>
              </a-form-item> -->
              
            <a-form-item label="是否发布">
              <a-select placeholder="请选择是否发布" default-value="请选择" v-model="queryParam.isPublish">
                <a-select-option  value="0">是</a-select-option>
                <a-select-option  value="1">否</a-select-option>
              </a-select>
            </a-form-item>
          

            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="文章类型">
                <!-- <a-input placeholder="请输入文章类型" v-model="queryParam.contentType"></a-input> -->
                 <a-select placeholder="请选择文章类型" default-value="请选择" v-model="queryParam.contentType">
                <a-select-option  value="1">文章</a-select-option>
                <a-select-option  value="2">文件</a-select-option>
                <!-- <a-select-option  value="3">链接</a-select-option> -->
              </a-select>
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
      <a-button @click="handleAdd" type="primary" icon="plus" >新增</a-button>
      
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

    <zxCmsContent-modal ref="modalForm" @ok="modalFormOk"></zxCmsContent-modal>
  </a-card>
</template>

<script>

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ZxCmsContentModal from './modules/ZxCmsContentModal'
  import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'

  export default {
    name: "ZxCmsContentList",
    mixins:[JeecgListMixin],
    components: {
      JDictSelectTag,
      ZxCmsContentModal
    },
    data () {
      return {
        description: '文章表管理页面',
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
            title:'文章标题',
            align:"center",
            dataIndex: 'contentTitle'
          },
          // {
          //   title:'文章跳转链接地址',
          //   align:"center",
          //   dataIndex: 'contentUrl'
          // },
          // {
          //   title:'文章内容',
          //   align:"center",
          //   dataIndex: 'contentDetails'
          // },
          {
            title:'关键字',
            align:"center",
            dataIndex: 'contentKeyword'
          },
          // {
          //   title:'描述',
          //   align:"center",
          //   dataIndex: 'contentDescription'
          // },
          // {
          //   title:'文章缩略图',
          //   align:"center",
          //   dataIndex: 'contentImg'
          // },
          // {
          //   title:'自定义顺序',
          //   align:"center",
          //   dataIndex: 'contentSort'
          // },
          {
            title:'文章来源',
            align:"center",
            dataIndex: 'contentSource'
          },
          {
            title:'是否发布',
            align:"center",
            dataIndex: 'isPublish',
            customRender:function(index){
              if(index=='0'){
                return '是';
              }
              if(index=='1'){
                return '否';
              }
            }
          },
          {
            title:'文章类型',
            align:"center",
            dataIndex: 'contentType',
              customRender:function(index){
              if(index=='1'){
                return '文章';
              }
              if(index=='2'){
                return '文件';
              }
              //  if(index=='3'){
              //   return '链接';
              // }
            }
            
          },
         
          {
            title:'点击次数',
            align:"center",
            dataIndex: 'contentHit'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: "/content/zxCmsContent/list",
          delete: "/content/zxCmsContent/delete",
          deleteBatch: "/content/zxCmsContent/deleteBatch",
          exportXlsUrl: "/content/zxCmsContent/exportXls",
          importExcelUrl: "content/zxCmsContent/importExcel",
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