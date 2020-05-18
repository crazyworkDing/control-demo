<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
             <a-form-item label="机构全称">
               <a-input placeholder="请输入机构全称" v-model="queryParam.organName"></a-input>
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
                  <j-dict-select-tag type="list" v-model="queryParam.menberType" :trigger-change="true" dictCode="queryParam.menberType" placeholder="请选择会员类型"/>
               </a-form-item>
             </a-col>
             <a-col :xl="6" :lg="7" :md="8" :sm="24">
               <a-form-item label="姓名">
                 <a-input placeholder="请输入姓名" v-model="queryParam.departLeader"></a-input>
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

    <!-- 操作按钮区域 -->
    <!-- <div class="table-operator" style="border-top: 5px">
      <a-dropdown>
          <a-menu slot="overlay" @click="handleMenuClick">
            <a-menu-item key="1">
                <a-icon type="lock" @click="batchFrozen('2')"/>
                审核通过
              </a-menu-item>
              <a-menu-item key="2">
                <a-icon type="unlock" @click="batchFrozen('3')"/>
                审核拒绝
              </a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            批量操作
            <a-icon type="down"/>
          </a-button>
        </a-dropdown>
    </div> -->

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i>已选择&nbsp;<a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项&nbsp;&nbsp;
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        bordered
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange">

        <template slot="avatarslot" slot-scope="text, record, index">
          <div class="anty-img-wrap">
            <a-avatar shape="square" :src="getAvatarView(record.avatar)" icon="user"/>
          </div>
        </template>

        <span slot="action" slot-scope="text, record">
          <!-- <a @click="handleDetail(record)">审核</a> -->
          <!-- <a @click="handleDetail(record)" v-if="record.status==1 || record.status==3">审核</a> -->
          <a @click="handleDetail(record)" v-if="record.status==2 || record.status==5">复核</a>
          <a-divider type="vertical"/>
        </span>


      </a-table>
    </div>
    <!-- table区域-end -->

    <review-modal ref="modalForm" @ok="modalFormOk"></review-modal>
  </a-card>
</template>

<script>
  import ReviewModal from './modules/ReviewModal'
  import {putAction} from '@/api/manage';
  import {frozenBatch} from '@/api/api'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JInput from '@/components/jeecg/JInput'

  export default {
    name: "Review",
    mixins: [JeecgListMixin],
    components: {
      ReviewModal,
      JInput
    },
    data() {
      return {
        description: '这是用户管理页面',
        queryParam: {},
        columns: [
          {
            title:'机构全称',
            align:"center",
            dataIndex: 'organName'
          },
          // {
          //   title:'会员简称',
          //   align:"center",
          //   dataIndex: 'abbreviateName'
          // },
          // {
          //   title:'会员类型',
          //   align:"center",
          //   dataIndex: 'menberType_dictText'
          // },
          {
            title:'姓名',
            align:"center",
            dataIndex: 'username'
          },
          {
            title:'账号',
            align:"center",
            dataIndex: 'usercode'
          },
          {
            title:'手机号码',
            align:"center",
            dataIndex: 'telephone'
          },
          // {
          //   title:'座机号码',
          //   align:"center",
          //   dataIndex: 'linePhone'
          // },
          {
            title: '状态',
            align: 'center',
            dataIndex: 'status_dictText'
          },
          // {
          //   title:'机构代码',
          //   align:"center",
          //   dataIndex: 'organCode'
          // },
          // {
          //   title:'电子渠道',
          //   align:"center",
          //   dataIndex: 'eleChannel_dictText'
          // },
          {
            title: '操作',
            dataIndex: 'action',
            scopedSlots: {customRender: 'action'},
            align: "center",
            width: 170
          }

        ],
        url: {
          imgerver: window._CONFIG['domianURL'] + "/sys/common/view",
          syncUser: "/process/extActProcess/doSyncUser",
          list: "/sys/user/reviewlist",
          delete: "/sys/user/delete",
          deleteBatch: "/sys/user/deleteBatch",
          exportXlsUrl: "/sys/user/exportXls",
          importExcelUrl: "sys/user/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      getAvatarView: function (avatar) {
        return this.url.imgerver + "/" + avatar;
      },
      batchFrozen: function (status) {
        if (this.selectedRowKeys.length <= 0) {
          this.$message.warning('请选择一条记录！');
          return false;
        } else {
          let ids = "";
          let that = this;
          let isAdmin = false;
          that.selectionRows.forEach(function (row) {
            if (row.username == 'admin') {
              isAdmin = true;
            }
          });
          if (isAdmin) {
            that.$message.warning('管理员账号不允许此操作,请重新选择！');
            return;
          }
          that.selectedRowKeys.forEach(function (val) {
            ids += val + ",";
          });
          that.$confirm({
            title: "确认操作",
            content: "是否" + (status == 2 ? "审核通过" : "审核拒绝") + "选中账号?",
            onOk: function () {
              frozenBatch({ids: ids, status: status}).then((res) => {
                if (res.success) {
                  that.$message.success(res.message);
                  that.loadData();
                  that.onClearSelected();
                } else {
                  that.$message.warning(res.message);
                }
              });
            }
          });
        }
      },
      handleMenuClick(e) {
         if (e.key == 1) {
          this.batchFrozen(2);
        } else if (e.key == 2) {
          this.batchFrozen(3);
        }
      }


    }

  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>