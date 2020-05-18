<template>
  <a-row type="flex" :gutter="16">
    <a-col :md="5" :sm="24">
      <file-list-left v-model="currentOrgCode"/>
    </a-col>
    <a-col :md="24-5" :sm="24">
      <file-list-right v-model="currentOrgCode"/>
    </a-col>
  </a-row>
</template>

<script>
  import FileListLeft from './modules/FileListLeft'
  import FileListRight from './modules/FileListRight'

  export default {
    name: 'FileList',
    components: { FileListLeft, FileListRight },
    data() {
      return {
        description: '通讯录页面',
        currentOrgCode: ''
      }
    },

    methods: {}
  }
</script>
<style scoped>
  @import '~@assets/less/common.less';
</style>