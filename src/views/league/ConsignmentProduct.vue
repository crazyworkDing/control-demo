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
            <a-form-item label="产品编号">
              <a-input placeholder="请输入产品编号" v-model="queryParam.issuerCode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="发布时间">
              <a-range-picker />
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

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete" />删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>

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
      </a-table>
    </div>

    <zxProduct-modal ref="modalForm" @ok="modalFormOk"></zxProduct-modal>
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import ZxProductModal from './modules/ZxProductModal'
import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'
import { submitProduct } from "@/api/user";
export default {
  name: 'ConsignmentProduct',
  mixins: [JeecgListMixin],
  components: {
    JDictSelectTag,
    ZxProductModal
  },
  data() {
    return {
      description: '产品表管理页面',
      // 表头
      columns: [
        {
          title: '产品名称',
          align: 'center',
          dataIndex: 'productName'
        },
        {
          title: '发行机构代码',
          align: 'center',
          dataIndex: 'issuerCode'
        },
        {
          title: '产品审批人姓名',
          align: 'center',
          dataIndex: 'approverName'
        },
        {
          title: '资金投向地区',
          align: 'center',
          dataIndex: 'investmentinArea'
        },
        {
          title: '产品运作模式',
          align: 'center',
          dataIndex: 'operationMode'
        }
      ],
      url: {
        list: '/prodectNew/zxProductDeclare/list',
        delete: '/prodectNew/zxProductDeclare/delete',
        deleteBatch: '/prodectNew/zxProductDeclare/deleteBatch',
        exportXlsUrl: '/product/zxProduct/exportXls',
        importExcelUrl: 'product/zxProduct/importExcel'
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
    submitAndPass(params) {
      console.log(this.selectedRowKeys);
      submitProduct(params).then(res => {
        if (res.success) {
          this.$message.success(res.message);
          this.loadData(1)
        } else {
          this,$message.error(res.message);
        }
      })
    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>