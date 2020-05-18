<template>
  <div class="casesModalComment">
    <a-form layout="inline">
      <a-row :gutter="24">
        <a-col :col="24" :md="24">
          <a-form-item label="审核结果">
            <a-select defaultValue="0" style="width: 120px" v-model="upLoadParams.auditStatus">
              <a-select-option value="0">审核通过</a-select-option>
              <a-select-option value="1">审核不通过</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :col="24" :md="24">
          <a-form-item label="备注"><a-textarea placeholder autosize v-model="upLoadParams.auditComment"/> </a-form-item>
        </a-col>
        <a-col :col="24" :md="24">
          <a-button type="primary" key="save" @click="comment">提交</a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
import { commentCaseList } from "@/api/api";
export default {
  name: 'CasesModalComment',
  props: {
    selectList: {
      type: Object,
      dafault: () => {}
    },
    caseIds: {
      type: String,
      default: ''
    },
    upLoadParams: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    comment() {
      let params = {
        caseId: this.caseIds,
        auditComment: this.upLoadParams.auditComment,
        auditStatus: this.upLoadParams.auditStatus
      }
      commentCaseList(params).then(res => {
        if (res.success) {
          this.$message.success(res.message);
          this.$emit('close');
        } else {
          this.$message.error(res.message);
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>