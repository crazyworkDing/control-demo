<template>
  <a-card :loading="cardLoading" :bordered="false" style="height: 100%;" class="file-list-left">
    <a-spin :spinning="loading">
      <a-input-search
        @search="handleSearch"
        style="width:100%;margin-top: 10px"
        placeholder="输入机构名称进行查询..."
      />
      <a-tree
        showLine
        checkStrictly
        :expandedKeys.sync="expandedKeys"
        :selectedKeys="selectedKeys"
        :dropdownStyle="{maxHeight:'200px',overflow:'auto'}"
        :treeData="treeDataSource"
        :replaceFields="{title: 'fullName',key: 'id'}"
        @select="handleTreeSelect"
      />
    </a-spin>
  </a-card>
</template>

<script>
import { queryOrganAll } from '@/api/api'
import { mapGetters } from "vuex";

export default {
  name: 'FileListLeft',
  props: ['value'],
  data() {
    return {
      cardLoading: true,
      loading: false,
      treeDataSource: [],
      selectedKeys: [],
      expandedKeys: []
    }
  },
  created() {
    this.queryTreeData()
  },
  methods: {
    ...mapGetters(
      ['userInfo']
    ),
    queryTreeData(keyword) {
      this.commonRequestThen(
        queryOrganAll({
          fullName: keyword ? keyword : undefined
        })
      )
    },

    handleSearch(value) {
      if (value) {
        this.commonRequestThen(queryOrganAll({ fullName: value }))
      } else {
        this.queryTreeData()
      }
    },

    handleTreeSelect(selectedKeys, event) {
      if (selectedKeys.length > 0 && this.selectedKeys[0] !== selectedKeys[0]) {
        this.selectedKeys = [selectedKeys[0]]
        let orgCode = event.node.dataRef.id
        this.emitInput(orgCode)
      }
    },

    emitInput(orgCode) {
      this.$emit('input', orgCode)
    },

    commonRequestThen(promise) {
      this.loading = true
      promise
        .then(res => {
          if (res.success) {
            console.log(this.userInfo())
            if (this.userInfo().organId == '0') {
              this.treeDataSource = res.result
            } else {
              this.treeDataSource = res.result.filter(res2 => {
                return res2.id == this.userInfo().organId
              })
            }
            

            // 默认选中第一条数据、默认展开所有第一级
            // if (res.result.length > 0) {
            //   this.expandedKeys = []
            //   res.result.forEach((item, index) => {
            //     if (index === 0) {
            //       this.selectedKeys = [item.id]
            //       this.emitInput(item.id)
            //     }
            //     this.expandedKeys.push(item.id)
            //   })
            // }
          } else {
            this.$message.warn('机构查询失败：' + res.message)
            console.error('机构查询失败:', res)
          }
        })
        .finally(() => {
          this.loading = false
          this.cardLoading = false
        })
    }
  }
}
</script>

<style scoped>
</style>