<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    :destroyOnClose="true"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item label="栏目名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'categoryTitle', validatorRules.categoryTitle]" placeholder="请输入栏目名称"></a-input>
        </a-form-item>
        <a-form-item label="栏目英文名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'enName', validatorRules.enName]" placeholder="请输入栏目英文名称"></a-input>
        </a-form-item>
        
        <a-form-item label="栏目类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select v-decorator="[ 'categoryType', {}]" placeholder="请选择栏目类型" @change="selectList">
            <a-select-option :value="1">列表</a-select-option>
            <a-select-option :value="2">链接</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="栏目管理描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'categoryDescrip', validatorRules.categoryDescrip]" placeholder="请输入栏目管理描述"></a-input>
        </a-form-item>
        <a-form-item label="上级栏目" :labelCol="labelCol" :wrapperCol="wrapperCol" v-if="isList">
          <j-tree-select
            ref="treeSelect"
            placeholder="请选择上级栏目"
            v-decorator="['pid', validatorRules.pid]"
            dict="zx_cms_category,category_title,id"
            pidField="pid"
            pidValue="0"
            hasChildField="has_child">
          </j-tree-select>
        </a-form-item>
        <a-form-item label="链接路径" :labelCol="labelCol" :wrapperCol="wrapperCol" v-if="!isList">
          <a-input v-decorator="[ 'categoryPath', validatorRules.categoryPath]" placeholder="请输入链接路径"></a-input>
        </a-form-item>
        <a-form-item label="栏目图片" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-upload
            listType="picture-card"
            class="avatar-uploader"
            :showUploadList="false"
            :action="uploadAction"
            :data="{'isup':1}"
            :headers="headers"
            :beforeUpload="beforeUpload"
            @change="handleChange"
          >
            <img v-if="picUrl" :src="getAvatarView()" alt="栏目图片" style="height:104px;max-width:300px"/>
            <div v-else>
              <a-icon :type="uploadLoading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label="栏目顺序" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'categoryOrder', validatorRules.categoryOrder]" placeholder="请输入栏目顺序" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="是否显示" :labelCol="labelCol" :wrapperCol="wrapperCol">
          
          <a-select placeholder="请选择是否显示"  type="list"  v-decorator="['isShow', validatorRules.isShow]" :trigger-change="true" >
                <a-select-option  value="0">是</a-select-option>
                <a-select-option  value="1">否</a-select-option>
              </a-select>
        </a-form-item>
        
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JImageUpload from '../../../components/jeecg/JImageUpload'
  import { ACCESS_TOKEN } from "@/store/mutation-types"
    import Vue from 'vue'

  export default {
    name: "ZxCmsCategoryModal",
    components: {
      JImageUpload,
      JTreeSelect
    },
    data () {
      return {
        form: this.$form.createForm(this),
        title:"操作",
        width:800,
        visible: false,
        isList: true,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },

        confirmLoading: false,
        validatorRules: {
          categoryTitle: {rules: [
          ]},
          enName: {rules: [
                    ]},
          pid: {rules: [
          ]},
          categoryType: {rules: [
          ]},
          categoryDescrip: {rules: [
          ]},
          categoryPath: {rules: [
          ]},
          categoryOrder: {rules: [
          ]},
          isShow: {rules: [
          ]},
        },
        url: {
          fileUpload: this.proxyUrl+"/sys/common/upload",
          add: "/category/zxCmsCategory/add",
          edit: "/category/zxCmsCategory/edit",
          imgerver: this.proxyUrl+"/sys/common/view",
        },
        expandedRowKeys:[],
        pidField:"pid",
        picUrl: "",
        uploadLoading:false,
        headers:{},
        categoryIcon: "",
      }
    },
    created () {
      const token = Vue.ls.get(ACCESS_TOKEN);
      this.headers = {"X-Access-Token":token}
    },
    computed:{
      uploadAction:function () {
        return this.url.fileUpload;
      }
    },
    methods: {
      add () {
        this.picUrl = "";
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.picUrl = this.model.categoryIcon;
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'categoryTitle','enName','pid','categoryType','categoryDescrip','categoryPath','categoryOrder','isShow'))
        })
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let old_pid = this.model[this.pidField]
            let formData = Object.assign(this.model, values);
            let new_pid = this.model[this.pidField]
            console.log("表单提交数据",formData)
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.submitSuccess(formData,old_pid==new_pid)
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              that.close();
            })
          }
         
        })
      },
      handleCancel () {
        this.close()
      },
      handleChange (info) {
        this.picUrl = "";
        if (info.file.status === 'uploading') {
          this.uploadLoading = true;
          return
        }
        if (info.file.status === 'done') {
          var response = info.file.response;
          this.uploadLoading = false;
          console.log(response);
          if(response.success){
            this.model.categoryIcon = response.message;
            this.picUrl = "Has no pic url yet";
          }else{
            this.$message.warning(response.message);
          }
        }
      },
      popupCallback(row){
        this.form.setFieldsValue(pick(row,'categoryTitle','enName','pid','categoryType','categoryDescrip','categoryPath','categoryOrder','isShow'))
      },
      submitSuccess(formData,flag){
        if(!formData.id){
          let treeData = this.$refs.treeSelect.getCurrTreeData()
          this.expandedRowKeys=[]
          this.getExpandKeysByPid(formData[this.pidField],treeData,treeData)
          this.$emit('ok',formData,this.expandedRowKeys.reverse());
        }else{
          this.$emit('ok',formData,flag);
        }
      },
      getExpandKeysByPid(pid,arr,all){
        if(pid && arr && arr.length>0){
          for(let i=0;i<arr.length;i++){
            if(arr[i].key==pid){
              this.expandedRowKeys.push(arr[i].key)
              this.getExpandKeysByPid(arr[i]['parentId'],all,all)
            }else{
              this.getExpandKeysByPid(pid,arr[i].children,all)
            }
          }
        }
      },
      normFile  (e) {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e
        }
        return e && e.fileList
      },
      beforeUpload: function(file){
        var fileType = file.type;
        if(fileType.indexOf('image')<0){
          this.$message.warning('请上传图片');
          return false;
        }
        //TODO 验证文件大小
      },
      getAvatarView(){
        return this.url.imgerver +"/"+ this.model.categoryIcon;
      },
      
    }
  }
</script>

<style scoped>
  .avatar-uploader > .ant-upload {
    width:104px;
    height:104px;
  }
  .ant-upload-select-picture-card i {
    font-size: 49px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }

  .ant-table-tbody .ant-table-row td{
    padding-top:10px;
    padding-bottom:10px;
  }

  .drawer-bootom-button {
    position: absolute;
    bottom: -8px;
    width: 100%;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    left: 0;
    background: #fff;
    border-radius: 0 0 2px 2px;
  }
</style>