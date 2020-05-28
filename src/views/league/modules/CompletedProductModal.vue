<template>
  <div class="completed-product-modal">
    <a-modal :title="title" :visible="visible" :closable="false" :width="width" style="max-height: 600px;overflow: auto;padding-bottom: 0;">
      <div slot="footer">
        <a-button type="default" @click="handleCancel">关闭</a-button>
        <!-- <a-button type="primary" v-if="changeTime == '1' && title == '编辑'" @click="changeTime2(1)">转为募集期</a-button> -->
        <!-- <a-button type="primary" v-if="changeTime == '2' && title == '编辑'" @click="changeTime2(2)">转为存续期</a-button> -->
        <a-button type="primary" @click="submit" v-if="title !== '详情'">提交</a-button>
      </div>
      <a-form :form="form" layout="inline">
        <a-row :gutter="24">
          <a-col :xxl="8" :xl="12" v-for="(item, index) in modalList" :key="index">
            <a-form-item :labelCol="{span: 10}" :wrapperCol="{span: 12}" :label="item.name">
              <a-input :disabled="disabled" :placeholder='item.name? "请输入"+item.name: ""' v-decorator="[item.value, valid[item.value]]" v-if="item.type!='select'"></a-input>
              <j-dict-select-tag
                :disabled="disabled"
                v-decorator="[item.value, valid[item.value]]"
                :type="'list'"
                :triggerChange="true"
                :dictCode="item.value"
                v-if="item.type=='select'"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'CompletedProductModal',
  data() {
    return{
      title: '详情',
      visible: false,
      changeTime: '1',
      disabled: false,
      width: window.innerWidth> 1600? 1500: 1200,
      form: this.$form.createForm(this),
      valid: {

      },
      modalList: [

      ]
    }
  },
  methods: {
    handleCancel() {
      this.visible = false;
    },
    edit(record) {
      this.visible = true;
      this.disabled = false;
    },
    changeTime2(value) {
      console.log(value)
    },
    submit() {

    }
  },
  created() {
    axios.get('/modalStart.json').then(res => {
      this.modalList = res.data;
    })
  }
}
</script>
<style lang="scss" scoped>
.ant-row.ant-form-item {
  width: 100%;
}
</style>