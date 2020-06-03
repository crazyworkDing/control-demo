<template>
  <div class="completed-product-modal">
    <a-modal
      :title="title"
      :visible="visible"
      :closable="false"
      :width="width"
      style="max-height: 600px;overflow: auto;padding-bottom: 0;"
    >
      <div slot="footer">
        <a-upload
          name="file"
          :multiple="false"
          :showUploadList="false"
          @change="changeFile"
          :customRequest="customRequest"
        >
          <a-button icon="import">导入</a-button>
        </a-upload>

        <a-button  icon="download" @click="downloadExcel(1)">附件1</a-button>
        <a-button  icon="download" @click="downloadExcel(2)">附件2</a-button>
        <a-button  icon="download" @click="downloadExcel(3)" v-if="this.productStatus == 'M'">附件3</a-button>
        <a-button  icon="download" @click="downloadExcel(4)" v-if="this.productStatus == 'M'">>附件4</a-button>
        <a-button type="default" @click="handleCancel">关闭</a-button>
        <!-- <a-button type="primary" v-if="changeTime == '1' && title == '编辑'" @click="changeTime2(1)">转为募集期</a-button> -->
        <!-- <a-button type="primary" v-if="changeTime == '2' && title == '编辑'" @click="changeTime2(2)">转为存续期</a-button> -->
        <a-button type="primary" @click="save">保存</a-button>
      </div>
      <a-form :form="form">
        <a-card title="基本信息">
         <a-row :gutter="24">
            <a-col :xxl="8" :xl="12" v-for="(item, index) in (modalList.slice(0,30))" :key="index">
              <a-form-item :labelCol="{span: 10}" :wrapperCol="{span: 12}" :label="item.name"  v-if="item.value != 'files'" >
                <a-input :disabled="disabled || item.value == 'releaseTime'" :placeholder='item.name? "请输入"+item.name: ""' v-decorator="[item.value, item.valid]" v-if="item.type!='select'&& item.type!='file'"></a-input>
                <j-dict-select-tag
                  :disabled="disabled "
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

             <a-col size="small" :xxl="8" :xl="12">
            <a-form-item :labelCol="{span: 10}" :wrapperCol="{span: 12}" label="产品附件">
              <a-upload
                :multiple="true"
                :file-list="fileList"
                :action="fileUpload"
                :data="{type: 2}"
                @change="handleChange"
                @preview="clickImage"
                :remove="removeImage"
              >
                <a-button>
                  <a-icon type="upload" />上传
                </a-button>
              </a-upload>
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
        <!-- <a-row :gutter="24"> -->
          <!-- <a-col :xxl="8" :xl="12" v-for="(item, index) in modalList" :key="index">
            <a-form-item
              :labelCol="{span: 10}"
              :wrapperCol="{span: 12}"
              :label="item.name"
              v-if="item.value != 'files'"
            >
              <a-input
                :disabled="disabled"
                :placeholder="item.name? '请输入'+item.name: ''"
                v-decorator="[item.value, item.valid]"
                v-if="item.type!='select' "
              ></a-input>
              <j-dict-select-tag
                :disabled="disabled || item.value == 'productStatus'"
                v-decorator="[item.value, item.valid]"
                :type="'list'"
                :triggerChange="true"
                :dictCode="item.value"
                v-if="item.type=='select'"
              />
            </a-form-item>
          </a-col> -->

         
        <!-- </a-row> -->
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import axios from 'axios'
import { addProduct, updateProduct } from '@/api/user'
import { queryFile } from '@/api/api'
import { downFile } from '@/api/manage'
import { postAction } from '@/api/manage'

export default {
  name: 'CompletedProductModal',
  data() {
    return {
      title: '详情',
      visible: false,
      changeTime: '1',
      disabled: false,
      width: window.innerWidth > 1600 ? 1500 : 1200,
      form: this.$form.createForm(this),
      valid: {},
      model: {},
      modalList: [],
      fileList: [],
      excelList: [],
      fileUpload: this.proxyUrl + '/zx/common/upload',
      id: '',
      fileName: "",
      productStatus: ""
    }
  },

  methods: {

    downloadExcel(filetype){
      this.fileName = "附件"+ filetype
      let param = Object.assign({})
      console.log("导出参数",param);
      this.loading = true;
      postAction('prodectNew/zxProductDeclare/exportXls/'+filetype, param).then((data)=>{
        this.loading = false;
        if (!data) {
          this.$message.warning("文件下载失败")
          return
        }
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
          window.navigator.msSaveBlob(new Blob([data]), this.fileName+'.xls')
        }else{
          let url = window.URL.createObjectURL(new Blob([data]))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', this.fileName+'.xls')
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link); //下载完成移除元素
          window.URL.revokeObjectURL(url); //释放掉blob对象
        }
      })
    },
    changeFile(info) {
      // 上传文件
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.excelList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} 上传成功`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} 上传失败.`)
      }
    },
    customRequest(data) {
      // 上传提交
      const formData = new FormData()
      formData.append('file', data.file)
      this.saveFile(formData)
    },
    saveFile(formData) {
      this.axios({
        method: 'post',
        url: 'prodectNew/zxProductDeclare/importExcel',
        headers: {},
        params: {},
        data: formData
      })
        .then(response => {
          console.log(response.result)
        
         
          this.$nextTick(() => {
          this.form.setFieldsValue()
          

      })
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    initObj() {
      let that = this
      let fileList = []
      queryFile({ productId: this.id, type: 2 }).then(res2 => {
        res2.result.forEach(res3 => {
          let object = new Object()
          object.name = res3.fileName
          object.url = res3.url
          object.id = res3.id
          object.uid = res3.id
          fileList.push(object)
        })
        that.fileList = [...fileList]
      })
    },
    removeImage(file, fileList) {
      // let arr = this.form.signFile.split(',')
      // arr.forEach((res, index, array) => {
      //   if (res == file.response.result.id) {
      //     array.splice(index, 1)
      //   }
      // })
      // this.form.signFile = arr.join(',')
      this.fileList = this.fileList.filter(res => res.id !== file.id)
    },
    clickImage(file) {
      let fileName = file.name
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
    uploadSuccess(response, file, fileList) {
      if (!this.form.files) {
        this.form.files = response.result.id
      } else {
        this.form.files = this.form.files + ',' + response.result.id
      }
    },
    handleChange(info) {
      let fileList = [...info.fileList]
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.url
        }
        return file
      })
      this.fileList = fileList
    },
    close() {
      this.$emit('ok')
      this.visible = false
    },
    save() {
      switch (this.title) {
        case '新增':
          this.increaseProduct()
          break
        case '编辑':
          this.editProduct()
      }
    },
    increaseProduct() {
      this.form.validateFields((error, values) => {
        if (error) {
          return
        } else {
          let params = Object.assign({}, values)
          let filesArr = this.fileList.map(res => res.response.result.id)
          params.files = filesArr.join(',')
          addProduct(params).then(res => {
            if (res.success) {
              this.$message.success(res.message)
              this.$emit('ok')
              this.visible = false
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    editProduct() {
      this.form.validateFields((error, value) => {
        if (error) {
          return
        } else {
          value.id = this.id
          let params = Object.assign(this.model, value)
          let filesArr = this.fileList.map(res => res.response.result.id)
          params.files = filesArr.join(',')
          updateProduct(params).then(res => {
            if (res.success) {
              this.$message.success(res.message)
              this.close()
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    handleCancel() {
      this.visible = false
    },
    edit(record, data) {
      this.visible = true
      this.modalList = [...data]
      //record的参数必须和data的数量相同，不然多出来的参数在setFieldsValue的时候会报错
      let params = Object.assign({}, record)
      let arr = Object.keys(params)
      let arr2 = []
      let object = {}
      this.id = record.id
      this.initObj()
      for (let i of data) {
        if (arr.indexOf(i.value)) {
          arr2.push(i.value)
        }
      }
      for (let j in params) {
        if (arr2.indexOf(j) !== -1) {
          object[j] = params[j]
        }
      }
      this.$nextTick(() => {
        this.form.setFieldsValue(object)
      })
    },
    add(record, data) {
      this.fileList = []
      this.visible = true
      this.modalList = [...data]
      this.form.resetFields()
      this.productStatus = record
      this.$nextTick(() => {
        this.form.setFieldsValue({
          productStatus: record
        })
      })
    },
    changeTime2(value) {
      console.log(value)
    }
  }
}
</script>
<style lang="scss" scoped>
.ant-row.ant-form-item {
  width: 100%;
}
</style>