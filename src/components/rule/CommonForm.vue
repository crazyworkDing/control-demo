<template>
  <a-form ref="innerCommonForm"
          class="template-form"
          :form="form">

    <a-form-item label="指标名称"
                 :label-col="labelCol"
                 :wrapper-col="wrapperCol"
                 class="mt0">
      <a-input v-model="formModel.name" />
    </a-form-item>

    <!--    <a-form-item label="指标编号"-->
    <!--                 :label-col="labelCol"-->
    <!--                 :wrapper-col="wrapperCol"-->
    <!--                 class="mt0">-->
    <!--      <a-input v-model="formModel.number" />-->
    <!--    </a-form-item>-->

    <!-- <a-form-item label="业务线"
                 :label-col="labelCol"
                 :wrapper-col="wrapperCol"
                 class="mt0">
      <a-select v-model="formModel.business.key"
                @change="attributeChange(formModel.business, businessList)"
                placeholder="请选择">
        <a-select-option v-for="item in businessList"
                         :key="item.key">{{item.name}}
        </a-select-option>
      </a-select>
    </a-form-item> -->

    <a-form-item label="备注"
                 :label-col="labelCol"
                 :wrapper-col="wrapperCol"
                 class="mt0">
      <a-input v-model="formModel.remark" />
    </a-form-item>

  </a-form>
</template>

<script>
/* eslint-disable */
// import businessList from '@/mock/list/business-list.json'
import { getCommonFormModel, refreshFormModel } from '@/utils/form.js'

export default {
  props: {
    templateCode: String
  },
  data() {
    return {
      /* 下拉框数据集 */
      // businessList,
      /* 样式相关 */
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 18
      },
      inlineCol: {
        span: 4
      },
      /* form表单 */
      form: this.$form.createForm(this),
      formModel: null
    }
  },
  created() {
    this.initFormModel()
  },
  methods: {
    initFormModel() {
      this.formModel = getCommonFormModel(this.templateCode)
    },
    setForm(data) {
      var common = getCommonFormModel(this.templateCode)
      var model = Object.assign({}, common, data)
      this.formModel = JSON.parse(JSON.stringify(model))
    },
    getForm() {
      return {
        name: this.formModel.name,
        number: this.formModel.number,
        // business: this.formModel.business,
        remark: this.formModel.remark,
        type: '1',
        templateCode: this.templateCode
      }
    },
    attributeChange(field, list) {
      refreshFormModel(field, list);
    },
  }
};
</script>

<style lang="scss">
</style>

