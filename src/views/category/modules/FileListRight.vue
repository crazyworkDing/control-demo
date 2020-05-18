<template>
  <a-card class="j-address-list-right-card-box" :loading="cardLoading" :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="10">
          <a-col :md="6" :sm="12">
            <a-form-item label="文件名称" style="margin-left:8px">
              <a-input placeholder="请输入文件名称查询" v-model="queryParam.fileName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="12">
            <a-form-item label="创建人" style="margin-left:8px">
              <a-input placeholder="请输入创建人查询" v-model="queryParam.createBy"></a-input>
            </a-form-item>
          </a-col>

          <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
            <a-col :md="6" :sm="24">
              <a-button
                type="primary"
                @click="searchQuery"
                icon="search"
                style="margin-left: 18px"
              >查询</a-button>
              <a-button
                type="primary"
                @click="searchReset"
                icon="reload"
                style="margin-left: 8px"
              >重置</a-button>
            </a-col>
          </span>
        </a-row>
      </a-form>
    </div>
    <a-upload
      name="file"
      :multiple="true"
      :action="actionUrl"
      :headers="headers"
      :data='uploadParams'
      @change="handleChange"
      :beforeUpload="load"
      :showUploadList="false"
    >
      <a-button v-has="'uploadBtn'">
        <a-icon type="upload"/>上传
      </a-button>
    </a-upload>
    <a-table
      ref="table"
      size="middle"
      bordered
      rowKey="userId"
      :pagination="ipagination"
      :columns="columns"
      :dataSource="dataSource"
      :loading="loading"
      @change="handleTableChange"
      class="mt20"
    >
      <template slot="action" slot-scope="text, record">
        <a href="javascript:;" @click="clickImage(record)">下载</a>
        <a href="javascript:;" @click="remove(record)" class="ml10" v-has="'removeBtn'">删除</a>
      </template>
    </a-table>
  </a-card>
</template>

<script>
import { getAction } from '@/api/manage'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { downFile } from "@/api/manage";
import { removeFile } from "@/api/user";
// import { mapGetters } from "vuex";
export default {
  name: 'FileListRight',
  mixins: [JeecgListMixin],
  components: {},
  props: ['value'],
  data() {
    return {
      headers: {},
      uploadParams: {},
      actionUrl: this.proxyUrl + '/zx/common/uploadForFile',
      description: '用户信息',
      cardLoading: true,
      positionInfo: {},
      columns: [
        {
          title: '文件名称',
          // width: '20%',
          align: 'center',
          dataIndex: 'fileName'
        },
        {
          title: '创建人',
          // width: '15%',
          align: 'center',
          dataIndex: 'userName'
        },
        {
          title: '创建时间',
          // width: '15%',
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
        list: '/zx/common/fileListForSign',
        listByPosition: '/sys/position/list'
      },
      // load(file,fileList) {
      //   this.uploadParams = {
      //     organId: this.value
      //   }
      // },
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(organId) {
        this.dataSource = []
        this.loadData(1, organId)
      }
    }
  },
  created() {
    let token = this.$ls.get('Access-Token')
    this.headers = { 'X-Access-Token': token }
  },
  methods: {
    // ...mapGetters(
    //   ['userInfo']
    // ),
    load(file,fileList) {
      this.uploadParams = {
        organId: this.value
      }
    },
    remove(params) {
      removeFile({id: params.id}).then(res => {
        if (res.success) {
          this.$message.success(res.message);
          this.loadData(1, this.value)
        } else {
          this.$message.error(res.message);
        }
      })
    },

    clickImage(file) {
      let fileName = file.fileName
      let urlEnd = file.response ? file.response.message : file.url
      downFile('/sys/common/download/' + urlEnd, null).then(data => {
        this.loading = false
        if (!data) {
          this.$message.warning('文件下载失败')
          return
        }
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
          window.navigator.msSaveBlob(new Blob([data]), fileName + '.xls')
        } else {
          let url = window.URL.createObjectURL(new Blob([data]))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', fileName)
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link) //下载完成移除元素
          window.URL.revokeObjectURL(url) //释放掉blob对象
        }
      })
      // window.open(file.response? this.proxyUrl+'/sys/common/view/'+file.response.message:file.url)
    },
    handleChange(file) {
      this.loadData(1, this.value)
    },
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
      })
        .then(res => {
          if (res.success) {
            this.dataSource = res.result.records
            this.ipagination.total = res.result.total
          }
        })
        .finally(() => {
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
    }
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