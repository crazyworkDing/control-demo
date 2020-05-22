<template>
  <a-drawer
    :title="title"
    :maskClosable="true"
    :width="drawerWidth"
    placement="right"
    :closable="true"
    @close="handleCancel"
    :visible="visible"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">

    <template slot="title">
      <div style="width: 100%;">
        <span>{{ title }}</span>
        <span style="display:inline-block;width:calc(100% - 51px);padding-right:10px;text-align: right">
          <a-button @click="toggleScreen" icon="appstore" style="height:20px;width:20px;border:0px"></a-button>
        </span>
      </div>
    </template>

    <a-spin :spinning="confirmLoading">
      <a-form :form="form" >
          <a-form-item label="姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="[ 'username', validatorRules.username]" placeholder="请输入姓名"></a-input>
          </a-form-item>
          <a-form-item label="手机号码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="[ 'telephone', validatorRules.telephone]" placeholder="请输入手机号码"></a-input>
          </a-form-item>
          <!-- <a-form-item label="机构代码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-select
               style="width: 100%"
               placeholder="请选择机构"
               v-model="organCode"
               @click="initOrgConfig"
               optionFilterProp = "children">
               <a-select-option v-for="(table,key) in orgList" :key="key" :value="table.orgCode">
                 {{ table.departName }}
               </a-select-option>
            </a-select>
          </a-form-item> -->
          <!-- <template v-if="!model.id">
            <a-form-item label="登陆密码" :labelCol="labelCol" :wrapperCol="wrapperCol" >
              <a-input type="password" placeholder="请输入登陆密码" autoComplete="off" v-decorator="[ 'password', validatorRules.password]"/>
            </a-form-item>

            <a-form-item label="确认密码" :labelCol="labelCol" :wrapperCol="wrapperCol" >
              <a-input type="password" @blur="handleConfirmBlur" placeholder="请重新输入登陆密码" v-decorator="[ 'confirmpassword', validatorRules.confirmpassword]"/>
            </a-form-item>
          </template> -->
          <a-form-item label="部门" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="[ 'depart', validatorRules.depart]" placeholder="请输入部门"></a-input>
          </a-form-item>
          <a-form-item label="职务" :labelCol="labelCol" :wrapperCol="wrapperCol">
             <a-input v-decorator="[ 'post', validatorRules.post]" placeholder="请输入职务"></a-input>
          </a-form-item>
          <a-form-item label="邮箱" :labelCol="labelCol" :wrapperCol="wrapperCol">
             <a-input v-decorator="[ 'email', validatorRules.email]" placeholder="请输入邮箱"></a-input>
          </a-form-item>
         <a-form-item label="角色分配" :labelCol="labelCol" :wrapperCol="wrapperCol" v-show="!roleDisabled"  >
          <a-select
            mode=""
            style="width: 100%"
            placeholder="请选择用户角色"
            optionFilterProp = "children"
            v-decorator="[ 'selectedRole', validatorRules.selectedRole]">
            <a-select-option v-for="(role,roleindex) in roleList" :key="roleindex.toString()" :value="role.id">
              {{ role.roleName }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <!-- <a-form-item label="签约文件" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-upload
              name="file"
              :multiple="true"
              :action="uploadAction"
              :headers="headers"
              :data="{'isup':1,'bizPath':bizPath}"
               v-model="signFile"
              :fileList="fileList"
              :beforeUpload="beforeUpload"
              @change="handleChange"
              :disabled="disabled"
              @preview="clickImage">
              <a-button>
                <a-icon type="upload" />文件上传
              </a-button>
            </a-upload>
        </a-form-item> -->
      </a-form>
    </a-spin>
    <depart-window ref="departWindow" @ok="modalFormOk"></depart-window>

    <div class="drawer-bootom-button" v-show="!disableSubmit">
      <a-popconfirm title="确定放弃编辑？" @confirm="handleCancel" okText="确定" cancelText="取消">
        <a-button style="margin-right: .8rem">取消</a-button>
      </a-popconfirm>
      <a-button @click="handleSubmit" type="primary" :loading="confirmLoading">提交</a-button>
    </div>
  </a-drawer>
</template>

<script>
  import pick from 'lodash.pick'
  import moment from 'moment'
  import Vue from 'vue'
  // 引入搜索部门弹出框的组件
  import departWindow from './DepartWindow'
  import JSelectPosition from '@/components/jeecgbiz/JSelectPosition'
  import { ACCESS_TOKEN } from "@/store/mutation-types"
  import { getAction } from '@/api/manage'
  import {addUser,editUser,queryUserRole,queryall,queryFile } from '@/api/api'
  import { downFile } from "@/api/manage";
  import { disabledAuthFilter } from "@/utils/authFilter"
  import {duplicateCheck } from '@/api/api'
  import JUpload from '@/components/jeecg/JUpload'
  import { mapState } from "vuex";

  const getFileName=(path)=>{
    if(path.lastIndexOf("\\")>=0){
      let reg=new RegExp("\\\\","g");
      path = path.replace(reg,"/");
    }
    return path.substring(path.lastIndexOf("/")+1);
  }

    const uidGenerator=()=>{
      return '-'+parseInt(Math.random()*10000+1,10);
    }

  export default {
    name: "UserModal",
    components: {
      departWindow,
      JSelectPosition,
      JUpload
    },
    data () {
      return {
        departDisabled: false, //是否是我的部门调用该页面
        roleDisabled: false, //是否是角色维护调用该页面
        modalWidth:800,
        drawerWidth:700,
        modaltoggleFlag:true,
        confirmDirty: false,
        selectedDepartKeys:[], //保存用户选择部门id
        checkedDepartKeys:[],
        checkedDepartNames:[], // 保存部门的名称 =>title
        checkedDepartNameString:"", // 保存部门的名称 =>title
        userId:"", //保存用户id
        disableSubmit:false,
        userDepartModel:{userId:'',departIdList:[]}, // 保存SysUserDepart的用户部门中间表数据需要的对象
        dateFormat:"YYYY-MM-DD",
        fileList: [],
        signFile:'',
        validatorRules:{
          selectedRole:{
            rules:[{
              required: true, message: '请选择用户角色!'
            }]
          },

          username:{
            rules: [{
              required: true, message: '请输入用户姓名!'
            },{
              validator: this.validateUsername,
            }]
          },
          password:{
            rules: [{
              required: false,
              pattern:/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,./]).{8,}$/,
              message: '密码由8位数字、大小写字母和特殊符号组成!'
            }, {
              validator: this.validateToNextPassword,
            }],
          },
          confirmpassword:{
            rules: [{
              required: false, message: '请重新输入登陆密码!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          },
          telephone:{rules: [{ required: true, message: '请输入手机号码!'},{validator: this.validatePhone}]},
          checkedDepartNameString:{
              rules: [{
                  required: true, message: '请选择部门!' }]
           },
          email:{
            rules: [{
              validator: this.validateEmail
            }],
          },
          roles:{},
          //  sex:{initialValue:((!this.model.sex)?"": (this.model.sex+""))}
        },
        title:"操作",
        visible: false,
        model: {},
        roleList:[],
        selectedRole:"",
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        uploadLoading:false,
        confirmLoading: false,
        headers:{},
        form:this.$form.createForm(this),
        picUrl: "",
        orgList:[],
        organCode:"",
        url: {
          fileUpload: this.proxyUrl+"/zx/common/upload",
          imgerver: this.proxyUrl+"/sys/common/view",
          userWithDepart: "/sys/user/userDepartList", // 引入为指定用户查看部门信息需要的url
          userId:"/sys/user/generateUserId", // 引入生成添加用户情况下的url
        },
      }
    },

    created () {
      const token = Vue.ls.get(ACCESS_TOKEN);
      this.headers = {"X-Access-Token":token};

    },
    computed:{
      uploadAction:function () {
        return this.url.fileUpload;
      }
    },

     props:{
          fileType:{
            type:String,
            required:false,
            default:"all"
          },
          /*这个属性用于控制文件上传的业务路径*/
          bizPath:{
            type:String,
            required:false,
            default:"temp"
          },
          value:{
            type:String,
            required:false
          },
          // update-begin- --- author:wangshuai ------ date:20190929 ---- for:Jupload组件增加是否能够点击
          disabled:{
            type:Boolean,
            required:false,
            default: false
          },
        },
    methods: {
      ...mapState({
        info: state => state.user.info
      }),
      clickImage(file) {
      // let txt = document.createElement('a');
      // txt.href = file.response? this.proxyUrl+'/sys/common/view/'+file.response.message:file.url;
      // txt.target = '_blank';
      // txt.download = file.response? file.response.message:file.url;
      // txt.click();
      let fileName = file.name;
      let urlEnd = file.response?file.response.message:file.url;
      downFile('/sys/common/download/'+urlEnd,null).then((data)=>{
        this.loading = false;
        if (!data) {
          this.$message.warning("文件下载失败")
          return
        }
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
          window.navigator.msSaveBlob(new Blob([data]), fileName+'.xls')
        }else{
          let url = window.URL.createObjectURL(new Blob([data]))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', fileName)
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link); //下载完成移除元素
          window.URL.revokeObjectURL(url); //释放掉blob对象
        }
      })
      // window.open(file.response? this.proxyUrl+'/sys/common/view/'+file.response.message:file.url)
    },
      initOrgConfig(){
         getAction('/sys/sysDepart/queryTreeList').then((res) => {
            if(res.success){
              this.orgList = res.result;
            }else{
              console.log(res.message);
            }
          })
      },
      isDisabledAuth(code){
        return disabledAuthFilter(code);
      },
      //窗口最大化切换
      toggleScreen(){
        if(this.modaltoggleFlag){
          this.modalWidth = window.innerWidth;
        }else{
          this.modalWidth = 800;
        }
        this.modaltoggleFlag = !this.modaltoggleFlag;
      },
      initialRoleList(){
        queryall().then((res)=>{
          if(res.success){
            this.roleList = res.result;
          }else{
            console.log(res.message);
          }
        });
      },
      async loadUserRoles(userid){
        await queryUserRole({userid:userid}).then((res)=>{
          if(res.success){
            this.selectedRole = res.result[0];
          }else{
            console.log(res.message);
          }
        });
      },
      refresh () {
          this.selectedDepartKeys=[];
          this.checkedDepartKeys=[];
          this.checkedDepartNames=[];
          this.checkedDepartNameString = "";
          this.userId=""
      },
      add () {
        this.picUrl = "";
        this.refresh();
        this.initOrgConfig();

        this.edit({});
      },
      async edit (record) {
        console.log(this.info())
        this.resetScreenSize(); // 调用此方法,根据屏幕宽度自适应调整抽屉的宽度
        let that = this;
        that.initialRoleList();
        that.checkedDepartNameString = "";
        that.form.resetFields();

        if(record.hasOwnProperty("id")){
          await that.loadUserRoles(record.id);
          //that.initFileList(record.signFile);
          that.initFileList(record.id);
        }
        that.userId = record.id;
        that.visible = true;
        
        that.model = Object.assign({}, record, {selectedRole: that.selectedRole});
       
        that.$nextTick(() => {
          that.form.setFieldsValue(pick(this.model,'username','depart','post','telephone','email','selectedRole'))

        });
      },
      close () {
        this.$emit('close');
        this.visible = false;
        this.disableSubmit = false;
        this.selectedRole = '';
        this.checkedDepartNames = [];
        this.checkedDepartNameString='';
        this.checkedDepartKeys = [];
        this.selectedDepartKeys = [];
      },
      moment,
      handleSubmit () {
        let that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let formData = Object.assign(this.model, values, {selectedRole: that.selectedRole});
            values.selectedroles= values.selectedRole
            if(that.fileList.length>0)
            {
               let arrId = [];
                for(var a=0;a<that.fileList.length;a++){
                   arrId.push(that.fileList[a].response.result.id);
                   
                 }
              if(arrId.length>0){
                     values.files =  arrId.join(",");
              }
            }
            //formData.selectedroles = this.selectedRole;
           
            let obj;
            if(!this.model.id){
              values.id = this.userId;
              obj=addUser(values);
            }else{
              values.id =this.userId;
              obj=editUser(values);
            }
            obj.then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
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
      validateToNextPassword  (rule, value, callback) {
        const form = this.form;
        const confirmpassword=form.getFieldValue('confirmpassword');

        if (value && confirmpassword && value !== confirmpassword) {
          callback('两次输入的密码不一样！');
        }
        if (value && this.confirmDirty) {
          form.validateFields(['confirm'], { force: true })
        }
        if (!value){
          callback("密码不能为空!")
        }
        callback();
      },
      compareToFirstPassword  (rule, value, callback) {
        const form = this.form;
        if (value !== form.getFieldValue('password')) {
          callback('两次输入的密码不一样！');
        } else {
          callback()
        }
      },
      validatePhone(rule, value, callback){
        if(!value){
          callback()
        }else{
          //update-begin--Author:kangxiaolin  Date:20190826 for：[05] 手机号不支持199号码段--------------------
          if(new RegExp(/^1[3|4|5|7|8|9][0-9]\d{8}$/).test(value)){
            //update-end--Author:kangxiaolin  Date:20190826 for：[05] 手机号不支持199号码段--------------------

            var params = {
              tableName: 'sys_user',
              fieldName: 'telephone',
              fieldVal: value,
              dataId: this.userId
            };
            duplicateCheck(params).then((res) => {
              if (res.success) {
                callback()
              } else {
                callback("手机号已存在!")
              }
            })
          }else{
            callback("请输入正确格式的手机号码!");
          }
        }
      },
    
      validateEmail(rule, value, callback){
        if(!value){
          callback()
        }else{
          if(new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value)){
            var params = {
              tableName: 'sys_user',
              fieldName: 'email',
              fieldVal: value,
              dataId: this.userId
            };
            duplicateCheck(params).then((res) => {
              console.log(res)
              if (res.success) {
                callback()
              } else {
                callback("邮箱已存在!")
              }
            })
          }else{
            callback("请输入正确格式的邮箱!")
          }
        }
      },
      // validateUsername(rule, value, callback){
      //   var params = {
      //     tableName: 'sys_user',
      //     fieldName: 'username',
      //     fieldVal: value,
      //     dataId: this.userId
      //   };
      //   duplicateCheck(params).then((res) => {
      //     if (res.success) {
      //     callback()
      //   } else {
      //     callback("用户名已存在!")
      //   }
      // })
      // },
      handleConfirmBlur  (e) {
        const value = e.target.value;
        this.confirmDirty = this.confirmDirty || !!value
      },

      normFile  (e) {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e
        }
        return e && e.fileList
      },
      initFileList(userid){
        let files;
        queryFile({userid:userid}).then((res)=>{
          if(res.success){
            this.files = res.result;
          }else{
            console.log(res.message);
          }
        });

        if(!this.files || this.files.length==0){
          this.fileList = [];
          return;
        }
        let fileList = [];

        for(var a=0;a<this.files.length;a++){
          fileList.push({
            uid:this.files[a].id,
            name:this.files[a].fileName,
            status: 'done',
            url: this.urlDownload+this.files[a].url,
            response:{
              status:"history",
              message:'',
              result:this.files[a],
            }
          })
        }
        this.fileList = fileList
      },
      handlePathChange(){
        let uploadFiles = this.fileList
        let path = ''
        if(!uploadFiles || uploadFiles.length==0){
          path = ''
        }
        let arr = [];

        for(var a=0;a<uploadFiles.length;a++){
          arr.push(uploadFiles[a].response.result.url)
        }
        if(arr.length>0){
          path = arr.join(",")
        }
        this.$emit('change', path);
      },
      beforeUpload(file){
        var fileType = file.type;
        if(fileType==='image'){
          if(fileType.indexOf('image')<0){
            this.$message.warning('请上传图片');
            return false;
          }
        }else if(fileType==='file'){
          if(fileType.indexOf('image')>=0){
            this.$message.warning('请上传文件');
            return false;
          }
        }
        //TODO 扩展功能验证文件大小
        return true
      },
      handleChange(info) {
        console.log("--文件列表改变--")
        let fileList = info.fileList
        //fileList = fileList.slice(-1);
        if(info.file.status==='done'){
          if(info.file.response.success){
            fileList = fileList.map((file) => {
              if (file.response) {
                file.url = this.proxyUrl + '/sys/common/download/'+file.url;
              }
              return file;
            });
          }
          this.$message.success(`${info.file.response.result.fileName} 上传成功!`);
        }else if (info.file.status === 'error') {
          this.$message.error(`${info.file.response.result.fileName} 上传失败.`);
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

      // 搜索用户对应的部门API
      onSearch(){
        this.$refs.departWindow.add(this.checkedDepartKeys,this.userId);
      },

      // 获取用户对应部门弹出框提交给返回的数据
      modalFormOk (formData) {
        this.checkedDepartNames = [];
        this.selectedDepartKeys = [];
        this.checkedDepartNameString = '';
        this.userId = formData.userId;
        this.userDepartModel.userId = formData.userId;
        for (let i = 0; i < formData.departIdList.length; i++) {
          this.selectedDepartKeys.push(formData.departIdList[i].key);
          this.checkedDepartNames.push(formData.departIdList[i].title);
          this.checkedDepartNameString = this.checkedDepartNames.join(",");
        }
        this.userDepartModel.departIdList = this.selectedDepartKeys;
        this.checkedDepartKeys = this.selectedDepartKeys  //更新当前的选择keys
       },
      // 根据屏幕变化,设置抽屉尺寸
      resetScreenSize(){
        let screenWidth = document.body.clientWidth;
        if(screenWidth < 500){
          this.drawerWidth = screenWidth;
        }else{
          this.drawerWidth = 700;
        }
      },
    }
  }
</script>

<style scoped>


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