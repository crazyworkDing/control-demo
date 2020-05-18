<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <!-- 搜索区域
      <a-form layout="inline">
        <a-row :gutter="10">
          <a-col :md="6" :sm="12">
            <a-form-item label="用户账号" style="margin-left:8px">
              <a-input placeholder="请输入用户账号查询" v-model="queryParam.username"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="12">
            <a-form-item label="手机号码" style="margin-left:8px">
              <a-input placeholder="请输入手机号码查询" v-model="queryParam.telephone"></a-input>
            </a-form-item>
          </a-col>

          <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
            <a-col :md="6" :sm="24">
             <a-button type="primary" @click="searchQuery" icon="search" style="margin-left: 18px">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </a-col>
          </span>
        </a-row>
      </a-form>-->
    </div>

    <!-- table区域-begin -->
    <div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"

        @change="handleTableChange">
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <user-modal ref="modalForm" @ok="modalFormOk"></user-modal>
    <Select-User-Modal ref="selectUserModal" @selectFinished="selectOK"></Select-User-Modal>
  </a-card>
</template>

<script>
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import {getAction, postAction, deleteAction} from '@/api/manage'
  import SelectUserModal from './SelectUserModal'
  import UserModal from './UserModal'

  export default {
    name: "DeptUserInfo",
    mixins: [JeecgListMixin],
    components: {
      SelectUserModal,
      UserModal
    },
    data() {
      return {
        description: '用户信息',
        currentDeptId: '',
        orgCode:'',
        // 表头
        columns: [
        {
          title: '会员全称',
          align: "center",
          dataIndex: 'fullName',
          scopedSlots: { customRender: 'fullName' }
          },
        {
          title: '会员简称',
          align: "center",
          dataIndex: 'abbreviateName',
          scopedSlots: { customRender: 'abbreviateName' }
          },
          {
          title: '用户账号',
          align: "center",
          dataIndex: 'username',
          scopedSlots: { customRender: 'username' }
          },
          {
            title: '用户名称',
            align: "center",
            dataIndex: 'realname',
             scopedSlots: { customRender: 'realname' }
          },
          {
            title: '手机号码',
            align: 'center',
            dataIndex: 'telephone',
            scopedSlots: { customRender: 'telephone' }
          },
          {
            title: '姓名',
            align: 'center',
            dataIndex: 'departLeader',
            scopedSlots: { customRender: 'departLeader' }
          },
          {
            title: '邮箱',
            align: 'center',
            dataIndex: 'email',
            scopedSlots: { customRender: 'email' }
          }],
        url: {
          edit: "/sys/user/editSysDepartWithUser",
          delete: "/sys/user/deleteUserInDepart",
          deleteBatch: "/sys/user/deleteUserInDepartBatch",
          list: '/sys/user/queryByOrgCodeForAddressList',
          listByPosition: '/sys/position/list'
        }
      }
    },
    created() {
     this.queryPositionInfo()
    },

    methods: {

      loadData(arg) {
        if (!this.url.list) {
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        var orgCode=this.orgCode;
        if (this.currentDeptId === '') return;

                getAction(this.url.list, {
                  orgCode,
                  ...this.getQueryParams()
                }).then((res) => {
                  if (res.success) {
                    this.dataSource = res.result.records
                    this.ipagination.total = res.result.total
                  }
                }).finally(() => {
                  this.loading = false
                  this.cardLoading = false
                })
      },
      open(record) {
        //console.log(record);
        this.currentDeptId = record.id;
        this.orgCode=record.orgCode;
        this.loadData(1);
      },
      clearList() {
        this.currentDeptId = '';
        this.dataSource = [];
      },



      selectOK(data) {
        let params = {};
        params.depId = this.currentDeptId;
        params.userIdList = [];
        for (var a = 0; a < data.length; a++) {
          params.userIdList.push(data[a]);
        }
        console.log(params);
        postAction(this.url.edit, params).then((res) => {
          if (res.success) {
            this.$message.success(res.message);
            this.loadData();
          } else {
            this.$message.warning(res.message);
          }
        })
      },
      // 查询职务信息
      queryPositionInfo() {
        getAction(this.url.listByPosition, { pageSize: 99999 }).then(res => {
          if (res.success) {
            let positionInfo = {}
            res.result.records.forEach(record => {
              positionInfo[record['code']] = record['name']
            })
            this.positionInfo = positionInfo
          }
        })
      }
    }
  }
</script>
<style scoped>
  /** Button按钮间距 */
  .ant-btn {
    margin-left: 3px
  }

  .ant-card {
    margin-left: -30px;
    margin-right: -30px;
  }

  .table-page-search-wrapper {
    margin-top: -16px;
    margin-bottom: 16px;
  }
</style>