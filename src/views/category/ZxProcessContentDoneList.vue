<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="工作类型">
              <j-dict-select-tag type="list" v-model="queryParam.type" dictCode="process_type" placeholder="请选择工作类型"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="动作">
              <j-dict-select-tag type="list" v-model="queryParam.action" dictCode="process_action" placeholder="请选择动作"/>

              <!-- <a-input placeholder="请输入动作" v-model="queryParam.action"></a-input> -->
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button
                type="primary"
                @click="searchReset"
                icon="reload"
                style="margin-left: 8px"
              >重置</a-button>
              <!-- <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
              </a> -->
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
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
        @change="handleTableChange"
      >
        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>
        <template slot="imgSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无此图片</span>
          <img
            v-else
            :src="getImgView(text)"
            height="25px"
            alt="图片不存在"
            style="max-width:80px;font-size: 12px;font-style: italic;"
          />
        </template>
        <template slot="fileSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无此文件</span>
          <a-button
            v-else
            :ghost="true"
            type="primary"
            icon="download"
            size="small"
            @click="uploadFile(text)"
          >下载</a-button>
        </template>

        <span slot="action" slot-scope="text, record">
          <a @click="detail(record)">详情</a>
        </span>
      </a-table>
    </div>

    <user-modal ref="usermodalForm" @ok="modalFormOk"></user-modal>
    <organ-modal ref="organmodalForm" @ok="modalFormOk"></organ-modal>
    <completed-product-modal ref="modalForm" @ok="modalFormOk"></completed-product-modal>
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'
import CompletedProductModal from './modules/CompletedProductModal'
import UserModal from './modules/UserModal'
import OrganModal from './modules/OrganModal'
import { queryProcess } from '@/api/api'
import axios from "axios";
export default {
  name: 'ZxProcessContentList',
  mixins: [JeecgListMixin],
  components: {
    JDictSelectTag,
    UserModal,
    OrganModal,
    CompletedProductModal
  },
  data() {
    return {
      description: '文章表管理页面',
      // 表头
      columns: [
        {
          title: '类型',
          align: 'center',
          dataIndex: 'type_dictText'
        },
        {
          title: '机构名称',
          align: 'center',
          dataIndex: 'organName'
        },
        {
          title: '动作',
          align: 'center',
          dataIndex: 'action_dictText'
        },
        {
          title: '创建时间',
          align: 'center',
          dataIndex: 'createTime'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/sys/process/donelist'
      },
      dictOptions: {}
    }
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  methods: {
    initDictConfig() {},
    detail(record) {
      switch (record.type) {
        case '2':
          queryProcess({ id: record.id }).then(res => {
            if (res.success) {
              let data = res.result.object
              data = Object.assign(data, { dataId: record.id, review: res.result.review, action: record.action_dictText })
              this.$refs.usermodalForm.edit(data)
              this.$refs.usermodalForm.title = '审核'
              this.$refs.usermodalForm.disableSubmit = false
            } else {
              console.log(res.message)
            }
          })
          break;
        case '1':
          queryProcess({ id: record.id }).then(res => {
            if (res.success) {
              let data = res.result.content
              data = Object.assign(JSON.parse(data), { dataId: record.id, review: res.result.review, action: record.action_dictText })
              this.$refs.organmodalForm.edit(data)
              this.$refs.organmodalForm.title = '审核'
              this.$refs.organmodalForm.disableSubmit = false
            } else {
              console.log(res.message)
            }
          })
          break;
        case '3':
          let params = {}
          params = JSON.parse(record.content)
          params = Object.assign(params, { dataId: record.id, action: record.action_dictText, workStatus: record.workStatus })
          switch(params.productStatus) {
            case 'B':
              axios.get('/modalStart.json').then(res2 => {
                this.$refs.modalForm.edit(params, res2.data);
              })
              break;
            case "C":
              axios.get('/modalRaise.json').then(res2 => {
                this.$refs.modalForm.edit(params, res2.data);
              })
              break;
            case "M":
              axios.get('/modalEnd.json').then(res2 => {
                this.$refs.modalForm.edit(params, res2.data);
              })
              break;
            case "F":
              break;
            default:
              break;
          }
          this.$refs.modalForm.title = '详情'
          this.$refs.modalForm.disabled = true;
          break;
        default:
          break;
      }
    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>