<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构名称">
              <a-input placeholder="请输入机构名称" v-model="queryParam.organName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="工作类型">
              <a-input placeholder="请输入工作类型" v-model="queryParam.type"></a-input>
            </a-form-item>
          </a-col>
          <!-- <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="动作">
              <a-input placeholder="请输入动作" v-model="queryParam.action"></a-input>
            </a-form-item>
          </a-col> -->

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
          <a @click="handlePass(record)">详情</a>
        </span>
      </a-table>
    </div>

    <my-create-modal ref="usermodalForm" @ok="modalFormOk"></my-create-modal>
    <my-organ-modal ref="organmodalForm" @ok="modalFormOk"></my-organ-modal>
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'
import MyCreateModal from './modules/MyCreateModal'
import MyOrganModal from './modules/MyOrganModal'
import { queryProcess } from '@/api/api'
import { getTasks } from "@/api/user";

export default {
  name: 'ZxProcessContentList',
  mixins: [JeecgListMixin],
  components: {
    JDictSelectTag,
    MyCreateModal,
    MyOrganModal
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
        // {
        //   title:'状态',
        //   align:"center",
        //   dataIndex: 'status'
        // },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/sys/process/processlistForMe'
      },
      dictOptions: {}
    }
  },
  computed: {},
  methods: {
    initDictConfig() {},
    handlePass(params) {
      if (params.type == '2') {
        this.$refs.usermodalForm.edit(JSON.parse(params.content));
        this.$refs.usermodalForm.title = '我的发起'
        this.$refs.usermodalForm.disableSubmit = false
      } else {
        this.$refs.organmodalForm.edit(JSON.parse(params.content));
        this.$refs.organmodalForm.title = '我的发起'
        this.$refs.organmodalForm.disableSubmit = false
      }
    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>