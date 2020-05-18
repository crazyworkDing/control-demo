<template>
  <a-modal
    :title="title"
    :width="500"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
      <a-form layout="inline">
        <a-form-item label="案件身份">
          <a-select defaultValue="0" style="width: 120px" v-model="caseList.user">
            <a-select-option value="0">第三方</a-select-option>
            <a-select-option value="1">被盗者</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
  </a-modal>
</template>
<script>
export default {
  name: 'CaseIdentity',
  data() {
    return {
      title: '',
      visible: false,
      confirmLoading: false,
      caseList: {
        user: '0'
      }
    }
  },
  methods: {
    edit(record) {
      this.visible = true;
    },
    handleOk() {
      this.visible = false;
      let dic = '';
      if (this.caseList.user == '0') {
        dic = '第三方';
      } else {
        dic = '被盗者';
      }
      this.$emit('addUser', {caseUserStatusValue:dic,caseUserStatus:this.caseList.user})
    },
    handleCancel() {
      this.visible = false
    }
  }
}
</script>
<style lang="less" scoped>

</style>