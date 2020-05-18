<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    @ok="handleSubmit"
    @cancel="handleCancel"
    cancelText="取消"
  >
    <a-row :gutter="16">
      <a-col :span="24">
        <a-form :form="form">
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="备注"
          >
            <a-input v-decorator="['note']"/>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { updateRemark } from '@/api/api'
export default {
  name: 'Remark',
  data() {
    return {
      model: {},
      form: this.$form.createForm(this),
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      title: '备注'
    }
  },
  methods: {
    edit(record) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'ids',
            'note'
          )
        )
      })
    },
    handleSubmit() {
      let obj = {}
      this.form.validateFields((err,value) => {
        if (!err) {
          obj = value;
        }
      })
      let params = Object.assign(this.model,obj);
      updateRemark(params).then(res => {
        if (res.success) {
          this.$message.success(res.message);
          this.$emit('ok');
          this.visible = false;
        }else {
          this.$message.error(res.message);
        }
      })
    },
    handleCancel() {
      this.visible = false;
    }
  }
}
</script>

<style lang="less" scoped>
</style>