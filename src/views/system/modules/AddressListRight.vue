<template>
  <a-card class="j-address-list-right-card-box" :loading="cardLoading" :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="10">

          <a-col :md="6" :sm="12">
            <a-form-item label="姓名" style="margin-left:8px">
              <a-input placeholder="请输入姓名查询" v-model="queryParam.username"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="12">
            <a-form-item label="账号" style="margin-left:8px">
              <a-input placeholder="请输入账号查询" v-model="queryParam.usercode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="12">
            <a-form-item label="手机号" style="margin-left:8px">
              <a-input placeholder="请输入手机号查询" v-model="queryParam.telephone"></a-input>
            </a-form-item>
          </a-col>

          <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
            <a-col :md="6" :sm="24">
             <a-button type="primary" @click="searchQuery" icon="search" style="margin-left: 18px">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </a-col>
          </span>
        </a-row>
      </a-form>
    </div>

    <a-table
      ref="table"
      size="middle"
      bordered
      rowKey="userId"
      :pagination="ipagination"
      :columns="columns"
      :dataSource="dataSource"
      :loading="loading"
      @change="handleTableChange">
    </a-table>

  </a-card>
</template>

<script>
  import { getAction } from '@/api/manage'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: 'AddressListRight',
    mixins: [JeecgListMixin],
    components: {},
    props: ['value'],
    data() {
      return {
        description: '用户信息',
        cardLoading: true,
        positionInfo: {},
        columns: [
          {
            title: '机构全称',
            width: '20%',
            align: 'center',
            dataIndex: 'organName'
          },
          {
            title: '姓名',
            width: '15%',
            align: 'center',
            dataIndex: 'username'
          },
          {
            title: '账号',
            width: '15%',
            align: 'center',
            dataIndex: 'usercode'
          },
          {
            title: '部门',
            width: '15%',
            align: 'center',
            dataIndex: 'depart'
          },
          {
            title: '职务',
            width: '15%',
            align: 'center',
            dataIndex: 'post'
          },
          {
            title: '手机号',
            width: '15%',
            align: 'center',
            dataIndex: 'telephone'
          },
          {
            title: '邮箱',
            width: '15%',
            align: 'center',
            dataIndex: 'email'
          }
        ],
        url: {
          list: '/sys/user/queryUserByOrgId',
          listByPosition: '/sys/position/list'
        }
      }
    },
    watch: {
      value: {
        immediate: true,
        handler(organId) {
          this.dataSource = []
          this.loadData(1, organId)
        }
      },
    },
    created() {
    },
    methods: {

      loadData(pageNum, organId) {
        if (!organId) {
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (pageNum === 1) {
          this.ipagination.current = 1
        }
        this.loading = true
        getAction(this.url.list, {
          organId,
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

      searchQuery() {
        this.loadData(1, this.value)
      },
      searchReset() {
        this.queryParam = {}
        this.loadData(1, this.value)
      },

      handleTableChange(pagination, filters, sorter) {
        if (Object.keys(sorter).length > 0) {
          this.isorter.column = sorter.field
          this.isorter.order = 'ascend' === sorter.order ? 'asc' : 'desc'
        }
        this.ipagination = pagination
        this.loadData(null, this.value)
      },

    }
  }
</script>
<style>
  .j-address-list-right-card-box .ant-table-placeholder {
    min-height: 46px;
  }
</style>
<style scoped>
  .j-address-list-right-card-box {
    height: 100%;
    min-height: 300px;
  }
</style>