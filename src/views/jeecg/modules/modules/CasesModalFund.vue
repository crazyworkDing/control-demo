<template>
  <div class="casesModalFund">
    <a-form layout="inline">
      <a-row :gutter="24">
        <a-col :col="12" :md="12">
          <a-form-item label="涉案资金">
            <a-input v-model="upLoadParams.involvedFund" :disabled="disable">元</a-input>
          </a-form-item>
        </a-col>
        <a-col :col="12" :md="12">
          <a-form-item label="冻结资金">
            <a-input v-model="upLoadParams.frozenFund" :disabled="disable">元</a-input>
          </a-form-item>
        </a-col>
        <a-col :col="12" :md="12">
          <a-form-item label="调账资金">
            <a-input v-model="upLoadParams.adjustingFund" :disabled="disable">元</a-input>
          </a-form-item>
        </a-col>
        <a-col :col="12" :md="12">
          <a-form-item label="损失资金">
            <a-input v-model="upLoadParams.lossFund" :disabled="disable">元</a-input>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
export default {
  name: 'CasesModalFund',
  props: {
    selectList: {
      type: Object,
      dafault: () => {}
    },
    disable: {
      type: Boolean,
      default: false
    },
    upLoadParams: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style lang="less" scoped>

</style>