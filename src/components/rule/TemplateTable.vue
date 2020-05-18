<template>
  <a-table :columns="columns"
           :dataSource="data"
           :pagination="pagination">
    <template slot="operation"
              slot-scope="text, record, index">
      <div class="editable-row-operations">
        <a @click="edit(record.key)">编辑</a>
        <a-popconfirm title="确定删除吗?" @confirm="() => remove(record.key)">
          <a>删除</a>
        </a-popconfirm>
      </div>
    </template>
    <a-pagination v-model="pagination.currentPage"
                  :total="data.length" />
  </a-table>
</template>
<script>
import { getTableData, getTableColumns, getRowData } from '@/utils/form'

export default {
  data() {
    return {
      pagination: { pageSize: 10, currentPage: 0 },
      columns: getTableColumns(),
      data: []
    }
  },
  methods: {
    edit(key) {
      var rowData = getRowData(this.data, key)
      this.$emit('edit', rowData.condition)
    },
    remove(key) {
      var rowData = getRowData(this.data, key)
      this.$emit('remove', rowData.condition)
    },
    setTable(data) {
      this.data = getTableData(data)
    }
  }
};
</script>
<style lang="scss" scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
