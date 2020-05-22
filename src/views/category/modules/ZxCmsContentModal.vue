<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item label="文章标题" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'contentTitle', validatorRules.contentTitle]" placeholder="请输入文章标题"></a-input>
        </a-form-item>

        <a-form-item label="关键字" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'contentKeyword', validatorRules.contentKeyword]" placeholder="请输入关键字"></a-input>
        </a-form-item>

        <a-form-item label="是否发布" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['isPublish', validatorRules.isPublish]" :trigger-change="true" dictCode="ispublish" placeholder="请选择是否发布"/>
        </a-form-item>


        <a-form-item label="栏目来源" :labelCol="labelCol" :wrapperCol="wrapperCol" >
          <j-tree-select
            ref="treeSelect"
            placeholder="请选择栏目来源"
            v-decorator="['categoryId', validatorRules.categoryId]"
            dict="zx_cms_category,category_title,id"
            pidField="pid"
             pidValue="0"
            hasChildField="has_child">
          </j-tree-select>
        </a-form-item>
        <a-form-item label="文章来源" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'contentSource', validatorRules.contentSource]" placeholder="请输入文章来源"></a-input>
        </a-form-item>
        
        <!--<a-form-item label="文章类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-on:change="handleListTypeChanged"  placeholder="请选择文章类型"/>
          <a-select-option  value="0">文章内容</a-select-option>
        </a-form-item>-->

        <a-form-item label="文章类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select placeholder="请选择文章类型"  type="list" v-on:change = "handleListTypeChanged" v-decorator="['contentType', validatorRules.contentType]" :trigger-change="true" >
                <a-select-option  value="1">文章</a-select-option>
                <a-select-option  value="2">文件</a-select-option>
                <a-select-option  value="3">链接</a-select-option>
              </a-select>
            </a-form-item>

        <a-form-item label="文章内容" style="min-height: 300px" :labelCol="labelCol" :wrapperCol="wrapperCol" v-if="isShow">
              <!-- <j-editor v-model="jeditor.value"/> -->
              <j-editor v-decorator="[ 'contentDetails', validatorRules.contentDetails]" triggerChange/>
        </a-form-item>

        

        <!--<a-form-item label="文章内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'contentDetails', validatorRules.contentDetails]" placeholder="请输入文章内容"></a-input>
        </a-form-item>-->
        
        <a-form-item label="描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'contentDescription', validatorRules.contentDescription]" placeholder="请输入描述"></a-input>
        </a-form-item>
        <!--<a-form-item label="文章缩略图" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'contentImg', validatorRules.contentImg]" placeholder="请输入文章缩略图"></a-input>
        </a-form-item>-->
        <!--<a-form-item label="自定义顺序" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'contentSort', validatorRules.contentSort]" placeholder="请输入自定义顺序" style="width: 100%"/>
        </a-form-item>
        
       
        <a-form-item label="点击次数" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'contentHit', validatorRules.contentHit]" placeholder="请输入点击次数" style="width: 100%"/>
        </a-form-item>-->

        <a-form-item  label="文章跳转链接地址" :labelCol="labelCol" :wrapperCol="wrapperCol"  v-if="contentImgShow">
          <a-input v-decorator="[ 'contentImg']" placeholder="请输入文章跳转链接地址"></a-input>
        </a-form-item>

        <!-- <a-form-item label="文章缩略图" :labelCol="labelCol" :wrapperCol="wrapperCol"> -->
         <!-- <j-image-upload class="avatar-uploader" text="上传" v-model="fileList" ></j-image-upload>-->
            <!-- <a-upload
            listType="picture-card"
            class="avatar-uploader"
            :showUploadList="false"
            :action="uploadAction"
            :data="{'isup':1}"
            :headers="headers"
            :beforeUpload="beforeUpload"
            @change="handleChange"
          >
            <img v-if="picUrl" :src="getAvatarView()" alt="文章缩略图" style="height:104px;max-width:300px"/>
            <div v-else>
              <a-icon :type="uploadLoading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
        </a-form-item> -->
        

      <a-form-item label="文件" :labelCol="labelCol" :wrapperCol="wrapperCol"  v-if="fileShow" >
      <a-upload 
          name="file"
          :multiple="true"
          :action="url.fileUpload"
          :headers="headers"
          :fileList="fileList"
          @change="handleChangeFile">
          
        <a-button>
          <a-icon type="upload"/>
          文件上传
        </a-button>
     </a-upload>
      </a-form-item>   
         
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JDictSelectTag from "@/components/dict/JDictSelectTag"
  import JImageUpload from '../../../components/jeecg/JImageUpload'
  import JEditor from '@/components/jeecg/JEditor'
  import { ACCESS_TOKEN } from "@/store/mutation-types"
  import Vue from 'vue'
  import JUpload from '@/components/jeecg/JUpload'
  import {queryzxCmsCategory,queryzxCmsCategoryChildList } from '@/api/api'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'

 const getFileName=(path)=>{
    var index = path.lastIndexOf("/")
    path = path.substring(index+1,path.length);
    return path;
  }
 const uidGenerator=()=>{
      return '-'+parseInt(Math.random()*10000+1,10);
    }
  export default {
    name: "ZxCmsContentModal",
    components: { 
      JDictSelectTag,
      JImageUpload,
      JEditor,
      JTreeSelect
    },
    data () {

      
      return {
        form: this.$form.createForm(this),
        title:"操作",
        fileList:[],
        width:1200,
        isShow: false,
        fileShow: false,
        contentImgShow: false,
        visible: false,
        modelData: {
          article_type: null,
          isshow: false,
          fileShow: false,
          contentImgShow: false,
        },

        model: {
        },

        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        confirmLoading: false,
        // jeditor: {
        //   value: ''
        // },
        contendDetails:'',
        validatorRules: {
          contentTitle: {rules: [
          ]},
          contentUrl: {rules: [
          ]},
          contentDetails: {rules: [
          ]},
          contentKeyword: {rules: [
          ]},
          contentDescription: {rules: [
          ]},
          contentImg: {rules: [
          ]},
          contentSort: {rules: [
          ]},
          contentSource: {rules: [
          ]},
          isPublish: {rules: [
          ]},
          contentType: {rules: [
          ]},
          delFlag: {rules: [
          ]},
          contentHit: {rules: [
          ]},
        },
        url: {
          add: "/content/zxCmsContent/add",
          edit: "/content/zxCmsContent/edit",
          imgerver: this.proxyUrl+"/sys/common/view",
          fileUpload: this.proxyUrl+"/sys/common/upload",
          articleUpload: this.proxyUrl+"/sys/common/upload/",
          articleDownload:this.proxyUrl + "/sys/common/download/",
        },
        expandedRowKeys:[],
        pidField:"pid",
        picUrl: "",
        uploadLoading:false,
        headers:{},
        contentImg: "",
        contentUrl: "",
      }
    },
    created () {
      const token = Vue.ls.get(ACCESS_TOKEN);
      this.headers = {"X-Access-Token":token}
    },

    computed:{
      uploadAction:function () {
        return this.url.articleUpload;
      }
    },
    methods: {

      add () {
        this.picUrl = "";
        this.isShow = false;
        this.fileShow = false;
        this.contentImgShow = false; 
        this.edit({});
        this.fileList=[];
        
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        // this.picUrl = this.model.contentImg;
        this.visible = true;

        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'contentTitle','contentUrl','contentDetails','contentKeyword','contentDescription','contentImg','contentSort','contentSource','isPublish','contentType','delFlag','contentHit','categoryId'))
           //this.form.setFieldsValue({contentType:'1'})
        })
        if(this.model.contentType == 1){
          this.isShow = true;
        }else{
          this.isShow = false;
        }

        if(this.model.contentType == 2){
          this.fileShow = true;
        }else{
          this.fileShow = false;
        }

        if(this.model.contentType == 3){
          this.contentImgShow = true;
        }else{
          this.contentImgShow = false;
        }

        if(record.contentUrl == ""){
          this.fileList = []
          return
        }
      // 返回filelist
        this.fileList = [
        {
          uid: uidGenerator(),
          name: getFileName(record.contentUrl),
          status: 'done',
          //url: this.url.articleDownload+record.contentUrl?this.url.articleDownload+record.contentUrl:"",
          url: record.contentUrl == "" ? "" : this.url.articleDownload + record.contentUrl,
        },
        
      ]
        
      },
      
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          let formData = Object.assign(this.model, values, {contentUrl: that.fileList[0]?that.fileList[0].response.message:''});
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
      popupCallback(row){
        this.form.setFieldsValue(pick(row,'contentTitle','contentUrl','contentDetails','contentKeyword','contentDescription','contentImg','contentSort','contentSource','isPublish','contentType','delFlag','contentHit'))
      },
      submitSuccess(formData,flag){
        if(!formData.id){
          // let treeData = this.$refs.treeSelect.getCurrTreeData()
          this.expandedRowKeys=[]
          // this.getExpandKeysByPid(formData[this.pidField],treeData,treeData)
          this.$emit('ok',formData,this.expandedRowKeys.reverse());
        }else{
          this.$emit('ok',formData,flag);
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
        return this.url.imgerver +"/"+ this.model.contentImg;
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
            this.model.contentImg = response.message;
            this.picUrl = "Has no pic url yet";
          }else{
            this.$message.warning(response.message);
          }
        }
      },
      handleChangeFile(info){
        // console.log("--文件列表改变--")
        let fileList = info.fileList
        fileList = fileList.slice(-1);
        if(info.file.status==='done'){
          if(info.file.response.success){
            fileList = fileList.map((file) => {
              if (file.response) {
                this.model.contentUrl = file.response.message;
                file.url = this.url.articleDownload + file.response.message;
              }
              return file;
            });
          }
          this.$message.success(`${info.file.name} 上传成功!`);
        }else if (info.file.status === 'error') {
          this.$message.error(`${info.file.name} 上传失败.`);
        }else if(info.file.status === 'removed'){
          this.handleDelete(info.file)
        }
        this.fileList = fileList
        if(info.file.status==='done' || info.file.status === 'removed'){
          this.handlePathChange()
        }
      },
      handleDelete(file){
        //如有需要新增 删除逻辑
        console.log(file)
        
      },
      handlePathChange(){
        let uploadFiles = this.fileList
        let path = ''
        if(!uploadFiles || uploadFiles.length==0){
          path = ''
        }
        let arr = [];

        for(var a=0;a<uploadFiles.length;a++){
          arr.push(uploadFiles[a].response.message)
        }
        if(arr.length>0){
          path = arr.join(",")
        }
        this.$emit('change', path);
      },
      initFileList(paths){
        if(!paths || paths.length==0){
          this.fileList = [];
          return;
        }
        let fileList = [];
        let arr = paths.split(",")
        for(var a=0;a<arr.length;a++){
          fileList.push({
            uid:uidGenerator(),
            name:getFileName(arr[a]),
            status: 'done',
            url: this.urlDownload+arr[a],
            response:{
              status:"history",
              message:arr[a]
            }
          })
        }
        this.fileList = fileList
      },
     handleListTypeChanged(attr){
       /**
        * 文章类型：
        * 1：文章内容
        * 2：上传文件
       */
         if (attr == 1){
         this.isShow = true;
       }else{
         this.isShow = false;
       }

         if (attr == 2){
           this.fileShow = true;
         }else{
           this.fileShow = false;
         }
         if(attr == 3){
          this.contentImgShow = true;
        }else{
          this.contentImgShow = false;
        }

     }
      
    },
    
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
