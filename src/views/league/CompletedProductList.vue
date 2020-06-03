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
              <a-input placeholder="请输入产品编号" v-model="queryParam.productNum"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="发布时间">
              <a-range-picker v-model="queryParam.releaseTime"/>
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
      <!-- <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button> -->
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
      <!-- <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div> -->

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        
      >
        <span slot="action" slot-scope="text, record">
          <a @click="handleDetail(record)">详情</a>

          <a-divider type="vertical" />
          <a-dropdown v-has="'userRole'">
            <a class="ant-dropdown-link">
              更多
              <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="handleEdit(record)">编辑</a>
              </a-menu-item>
              <a-menu-item v-if="record.productStatus=='B'">
                <a @click="handleEdit2(record)">转为募集期</a>
              </a-menu-item>
              <a-menu-item v-if="record.productStatus=='C'">
                <a @click="handleEdit3(record)">转为存续期</a>
              </a-menu-item>
              <a-menu-item>
                <a-popconfirm title="确定撤销吗?" @confirm="() => submitAndPass(record)">
                  撤销
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
      </a-table>
    </div>

    <completed-product-modal ref="modalForm" @ok="modalFormOk"></completed-product-modal>
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import CompletedProductModal from './modules/CompletedProductModal'
import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'
import { submitProduct } from "@/api/user";
import axios from 'axios'
import { postAction } from "@/api/manage";
export default {
  name: 'CompletedProductList',
  mixins: [JeecgListMixin],
  components: {
    JDictSelectTag,
    CompletedProductModal
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
          title: '会员名称',
          align: 'center',
          dataIndex: 'organName'
        },
        {
          title: '产品编号',
          align: 'center',
          dataIndex: 'productNum'
        },
        {
          title: '产品状态',
          align: 'center',
          dataIndex: 'productStatus_dictText'
        },
        {
          title: '产品总规模',
          align: 'center',
          dataIndex: 'productSize'
        },
        {
          title: '已售额度',
          align: 'center',
          dataIndex: 'soldLimit'
        },
        {
          title: '发布时间',
          align: 'center',
          dataIndex: 'releaseTime'
        },
        {
          title: '关键节点',
          align: 'center',
          dataIndex: 'keyNode'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/prodectNew/zxProductDeclare/releaseList',
        delete: '/prodectNew/zxProductDeclare/delete',
        deleteBatch: '/prodectNew/zxProductDeclare/revokeProduct',
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
    handleDetail(record) {
      this.$refs.modalForm.title = '详情'
      switch(record.productStatus) {
        case 'B':
          axios.get('/modalStart.json').then(res => {
            this.$refs.modalForm.edit(record, res.data);
          })
          break;
        case "C":
          axios.get('/modalRaise.json').then(res => {
            this.$refs.modalForm.edit(record, res.data);
          })
          break;
        case "M":
          axios.get('/modalEnd.json').then(res => {
            this.$refs.modalForm.edit(record, res.data);
          })
          break;
        case "F":
          break;
        default:
          break;
      }
      this.$refs.modalForm.disabled = true;
    },
    handleEdit(record) {
      this.$refs.modalForm.title = '编辑'
      switch(record.productStatus) {
        case 'B':
          axios.get('/modalStart.json').then(res => {
            this.$refs.modalForm.edit(record, res.data);
          })
          break;
        case "C":
          axios.get('/modalRaise.json').then(res => {
            this.$refs.modalForm.edit(record, res.data);
          })
          break;
        case "M":
          axios.get('/modalEnd.json').then(res => {
            this.$refs.modalForm.edit(record, res.data);
          })
          break;
        case "F":
          break;
        default:
          break;
      }
      this.$refs.modalForm.disabled = false;
    },
    handleEdit2(record) {
      this.$refs.modalForm.title = '转为募集期'
      axios.get('/modalRaise.json').then(res => {
        this.$refs.modalForm.edit(record, res.data);
      })
      this.$refs.modalForm.disabled = false;
    },
    handleEdit3(record) {
      this.$refs.modalForm.title = '转为存续期'
      axios.get('/modalEnd.json').then(res => {
        this.$refs.modalForm.edit(record, res.data);
      })
      this.$refs.modalForm.disabled = false;
    },
    submitAndPass(params) {
      postAction('/prodectNew/zxProductDeclare/revokeProduct', params).then(res => {
        if (res.success) {
          this.$message.success(res.message);
          this.loadData(1);
        } else {
          this.$message.error(res.message);
        }
      })
    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>