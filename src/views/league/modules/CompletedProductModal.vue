<template>
  <div class="completed-product-modal">
    <a-modal :title="title" :visible="visible" :closable="false" :width="width" style="max-height: 600px;overflow: auto;padding-bottom: 0;">
      <div slot="footer">
        <a-button type="default" @click="handleCancel">关闭</a-button>
        <!-- <a-button type="primary" v-if="changeTime == '1' && title == '编辑'" @click="changeTime2(1)">转为募集期</a-button> -->
        <!-- <a-button type="primary" v-if="changeTime == '2' && title == '编辑'" @click="changeTime2(2)">转为存续期</a-button> -->
        <a-button type="primary" @click="submit" v-if="title !== '详情'">提交</a-button>
      </div>
      <a-form :form="form">
        <a-card title="基本信息">
          <a-row :gutter="24">
            <a-col :xxl="8" :xl="12" v-for="(item, index) in (modalList.slice(0,30))" :key="index">
              <a-form-item :labelCol="{span: 10}" :wrapperCol="{span: 12}" :label="item.name">
                <a-input :disabled="disabled || item.value == 'releaseTime'" :placeholder='item.name? "请输入"+item.name: ""' v-decorator="[item.value, item.valid]" v-if="item.type!='select'&& item.type!='file'"></a-input>
                <j-dict-select-tag
                  :disabled="disabled || item.value == 'productStatus' || item.value == 'reviewStatus'"
                  v-decorator="[item.value, item.valid]"
                  :type="'list'"
                  :triggerChange="true"
                  :dictCode="item.value"
                  v-if="item.type=='select'"
                />
                <div v-for="(item2, index) in fileList" :key="index">
                  <div v-if="item.type=='file'" @click="download(item2)">
                    <a href="javascript:;">{{item2.fileName}}</a>
                  </div>
                </div>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
        <a-card title="其他信息" class="mt20">
          <a-row :gutter="24">
            <a-col :xxl="8" :xl="12" v-for="(item, index) in (modalList.slice(30))" :key="index">
              <a-form-item :labelCol="{span: 10}" :wrapperCol="{span: 12}" :label="item.name">
                <a-input :disabled="disabled || item.value == 'releaseTime'" :placeholder='item.name? "请输入"+item.name: ""' v-decorator="[item.value, item.valid]" v-if="item.type!='select'&& item.type!='file'"></a-input>
                <j-dict-select-tag
                  :disabled="disabled || item.value == 'productStatus' || item.value == 'reviewStatus'"
                  v-decorator="[item.value, item.valid]"
                  :type="'list'"
                  :triggerChange="true"
                  :dictCode="item.value"
                  v-if="item.type=='select'"
                />
                <div v-for="(item2, index) in fileList" :key="index">
                  <div v-if="item.type=='file'" @click="download(item2)">
                    <a href="javascript:;">{{item2.fileName}}</a>
                  </div>
                </div>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import axios from 'axios'
import { postAction, putAction, downFile } from "@/api/manage";
import { queryFile } from "@/api/api";
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
      fileItem: '',
      fileList: [],
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
    edit(record, data) {
      this.visible = true;
      this.modalList = [...data];
      //record的参数必须和data的数量相同，不然多出来的参数在setFieldsValue的时候会报错
      let params = Object.assign({}, record);
      let arr = Object.keys(params);
      let arr2 = [];
      let object = {};
      for (let i of data) {
        if(arr.indexOf(i.value)) {
          arr2.push(i.value)
        }
      }
      for (let j in params) {
        if (arr2.indexOf(j)!==-1) {
          object[j] = params[j];
        }
      }
      queryFile({productId: record.id, type: 2}).then(res => {
        this.fileList = res.result
      })
      this.$nextTick(() =>{
        this.form.setFieldsValue(object)
        switch(this.title) {
          case '转为募集期':
            this.form.setFieldsValue({
              productStatus: "C"
            })
            break;
          case '转为存续期':
            this.form.setFieldsValue({
              productStatus: "M"
            })
            break;
          default:
            break;
        }
      })
    },
    changeTime2(value) {
      console.log(value)
    },
    download(file) {
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
    },
    submit() {
      this.form.validateFields((error,values) => {
        if (error) {
          return;
        } else {
          switch (this.title) {
            case '详情':
              break;
            case '编辑':
              putAction('/prodectNew/zxProductDeclare/reviewProductForPublish', values).then(res => {
                if (res.success) {
                  this.$message.success(res.message)
                  this.$emit('ok');
                  this.visible = false;
                }
              })
              break;
            case '转为募集期':
              postAction('/prodectNew/zxProductDeclare/changeProductRelease', values).then(res => {
                if (res.success) {
                  this.$message.success(res.message)
                  this.$emit('ok');
                  this.visible = false;
                }
              })
              break;
            case '转为存续期':
              postAction('/prodectNew/zxProductDeclare/changeProductAppeals', values).then(res => {
                if (res.success) {
                  this.$message.success(res.message)
                  this.$emit('ok');
                  this.visible = false;
                }
              })
              break;
            default:
              break;
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.ant-row.ant-form-item {
  width: 100%;
}
</style>