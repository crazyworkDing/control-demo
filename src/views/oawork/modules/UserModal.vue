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
          <a-form-item label="机构全称" :labelCol="labelCol" :wrapperCol="wrapperCol" >
            <a-input v-decorator="[ 'organName', validatorRules.organName]" placeholder="请输入会员全称" disabled ></a-input>
          </a-form-item>
          <!-- <a-form-item label="会员简称" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="[ 'abbreviateName', validatorRules.abbreviateName]" placeholder="请输入会员简称" disabled></a-input>
          </a-form-item> -->
          <a-form-item label="机构类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <j-dict-select-tag type="list" v-decorator="['menberType', validatorRules.menberType]" :trigger-change="true" dictCode="menberType" placeholder="请选择会员类型" disabled/>
          </a-form-item>
          <a-form-item label="经营区域" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="[ 'businessScope', validatorRules.businessScope]" placeholder="请输入经营区域" disabled></a-input>
          </a-form-item>
          <a-form-item label="注册地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="[ 'regAddress', validatorRules.regAddress]" placeholder="请输入注册地址" disabled></a-input>
          </a-form-item>
          <a-form-item label="办公地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="[ 'businessAddress', validatorRules.businessAddress]" placeholder="请输入办公地址" disabled></a-input>
          </a-form-item>
          <a-form-item label="法定代表人" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="[ 'corporate', validatorRules.corporate]" placeholder="请输入法定代表人" disabled></a-input>
          </a-form-item>
          <a-form-item label="办公电话" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="[ 'businessPhone', validatorRules.businessPhone]" placeholder="请输入办公电话" disabled></a-input>
          </a-form-item>
          <a-form-item label="会员承办部门" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="[ 'depart', validatorRules.depart]" placeholder="请输入会员承办部门" disabled ></a-input>
          </a-form-item>
          <a-form-item label="姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="[ 'departLeader', validatorRules.departLeader]" placeholder="请输入姓名" disabled></a-input>
          </a-form-item>
          <a-form-item label="手机号码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="[ 'telephone', validatorRules.telephone]" placeholder="请输入手机号码" disabled></a-input>
          </a-form-item>
          <a-form-item label="部门负责人座机号码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="[ 'linePhone', validatorRules.linePhone]" placeholder="请输入部门负责人座机号码" disabled></a-input>
          </a-form-item>
          <a-form-item label="注册资本" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="[ 'regCapital', validatorRules.regCapital]" placeholder="请输入注册资本" disabled></a-input>
          </a-form-item>
          <a-form-item label="机构代码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="[ 'organCode', validatorRules.organCode]" placeholder="请输入机构代码" disabled></a-input>
          </a-form-item>
          <a-form-item label="存款规模" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="[ 'depositScale', validatorRules.depositScale]" placeholder="请输入存款规模" disabled></a-input>
          </a-form-item>
          <a-form-item label="贷款规模" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="[ 'volumeScale', validatorRules.volumeScale]" placeholder="请输入贷款规模" disabled></a-input>
          </a-form-item>
          <a-form-item label="自营理财规模" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="[ 'selfScale', validatorRules.selfScale]" placeholder="请输入自营理财规模" disabled></a-input>
          </a-form-item>
          <a-form-item label="代销理财规模" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="[ 'consignmentScale', validatorRules.consignmentScale]" placeholder="请输入代销理财规模" disabled></a-input>
          </a-form-item>
          <a-form-item label="网点数" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="[ 'networkCount', validatorRules.networkCount]" placeholder="请输入网点数" disabled></a-input>
          </a-form-item>
          <a-form-item label="电子渠道" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <j-dict-select-tag type="list" v-decorator="['eleChannel', validatorRules.eleChannel]" :trigger-change="true" dictCode="eleChannel" placeholder="请选择电子渠道" disabled/>
          </a-form-item>



          <a-form-item label="机构代码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="[ 'organCode', validatorRules.organCode]" placeholder="请输入机构代码" disabled></a-input>
          </a-form-item>
          <a-form-item label="职务" :labelCol="labelCol" :wrapperCol="wrapperCol">
             <a-input v-decorator="[ 'post', validatorRules.post]" placeholder="请输入职务" disabled></a-input>
          </a-form-item>
          <a-form-item label="邮箱" :labelCol="labelCol" :wrapperCol="wrapperCol">
             <a-input v-decorator="[ 'email', validatorRules.email]" placeholder="请输入邮箱" disabled></a-input>
          </a-form-item>
         <a-form-item label="角色分配" :labelCol="labelCol" :wrapperCol="wrapperCol" v-show="!roleDisabled"  >
          <a-select
            mode="multiple" disabled
            style="width: 100%"
            placeholder="请选择用户角色"
            optionFilterProp = "children"
            v-model="selectedRole">
            <a-select-option v-for="(role,roleindex) in roleList" :key="roleindex.toString()" :value="role.id">
              {{ role.roleName }}
            </a-select-option>
          </a-select>
        </a-form-item>




        <!-- <a-form-item label="头像" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-upload
            disabled
            listType="picture-card"
            class="avatar-uploader"
            :showUploadList="false"
            :action="uploadAction"
            :data="{'isup':1}"
            :headers="headers"
            :beforeUpload="beforeUpload"
          >
            <img v-if="picUrl" :src="getAvatarView()" alt="头像" style="height:104px;max-width:300px"/>
          </a-upload>
        </a-form-item> -->

       
         <a-form-item label="签约文件" :labelCol="labelCol" :wrapperCol="wrapperCol"  >
          <a href="javascipt:;" @click="downloadFile">{{filePath | fileterFile}}</a>
        </a-form-item>  

        <a-form-item label="审核意见" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="[ 'reviewComment', validatorRules.reviewComment]" placeholder="请输入审核意见"></a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" style="margin-left: 100px" @click="confirm">审核通过</a-button>
          <a-button type="primary" style="margin-left: 20px" @click="refuse">审核拒绝</a-button>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-drawer>
</template>

<script>
  import pick from 'lodash.pick'
  import moment from 'moment'
  import Vue from 'vue'
  // 引入搜索部门弹出框的组件
  import JSelectPosition from '@/components/jeecgbiz/JSelectPosition'
  import { ACCESS_TOKEN } from "@/store/mutation-types"
  import { getAction } from '@/api/manage'
  import {addUser,editUser,queryUserRole,queryall } from '@/api/api'
  import { disabledAuthFilter } from "@/utils/authFilter"
  import {duplicateCheck } from '@/api/api'
  import { changeUser } from "@/api/user";
  import { mapState } from 'vuex'
  import { downFile} from '@/api/manage'

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
      JSelectPosition
    },
    data () {
      return {
        filePath: "",
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
        validatorRules:{
          username:{
            rules: [{
              required: true, message: '请输入用户账号!'
            },{
              validator: this.validateUsername,
            }]
          },
          password:{
            rules: [{
              required: true,
              pattern:/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,./]).{8,}$/,
              message: '密码由8位数字、大小写字母和特殊符号组成!'
            }, {
              validator: this.validateToNextPassword,
            }],
          },
          confirmpassword:{
            rules: [{
              required: true, message: '请重新输入登陆密码!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          },
          realname:{rules: [{ required: true, message: '请输入用户名称!' }]},
          reviewComment: {
            rules: [
              {
                required: true, message: '请输入用户意见！'
              }
            ]
          },
          phone:{rules: [{validator: this.validatePhone}]},
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
          workNo: {
            rules: [
              { required: true, message: '请输入工号' },
              { validator: this.validateWorkNo }
            ]
          },
          telephone: {
            rules: [
              // { pattern: /^0\d{2,3}-[1-9]\d{6,7}$/, message: '请输入正确的座机号码' },
              {pattern: /^1[34578]\d{9}$/, message:'请输入正确的手机号码'}
            ]
          }
        },
        title:"操作",
        visible: false,
        model: {},
        roleList:[],
        selectedRole:[],
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
        url: {
          fileUpload: window._CONFIG['domianURL']+"/sys/common/upload",
          fileDownload: this.proxyUrl + "/sys/common/download",
          imgerver: window._CONFIG['domianURL']+"/sys/common/view",
          userWithDepart: "/sys/user/userDepartList", // 引入为指定用户查看部门信息需要的url
          userId:"/sys/user/generateUserId", // 引入生成添加用户情况下的url
        },
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

    filters:{
      fileterFile(value){
        return value.split('/')[2]
      }
    },
    methods: {
      downloadFile(){
        downFile('/sys/common/download/'+ this.filePath,null).then((data)=>{
          this.loading = false;
          if (!data) {
            this.$message.warning("文件下载失败")
            return
          }
          if (typeof window.navigator.msSaveBlob !== 'undefined') {
            window.navigator.msSaveBlob(new Blob([data]), this.filePath.split('/')[2])
          }else{
            let url = window.URL.createObjectURL(new Blob([data]))
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', this.filePath.split('/')[2])
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link); //下载完成移除元素
            window.URL.revokeObjectURL(url); //释放掉blob对象
          }
        })
      },

      ...mapState({
        userInfo: state => state.user.info
      }),
      confirm() {
        this.form.validateFields((err, values) => {
          if (err) {
            return;
          } else {
            console.log(this.userInfo())
            let params = Object.assign(values, {status: 2, id: this.userId})
            changeUser(params).then(res => {
              if (res.success) {
                this.$message.success(res.message);
                this.visible = false;
                this.$emit('ok');
              } else {
                this.$message.error(res.message);
              }
            })
          }
        })
      },
      refuse() {
        this.form.validateFields((err, values) => {
          if (err) {
            return;
          } else {
            let params = Object.assign(values, {status: 3, id: this.userId})
            changeUser(params).then(res => {
              if (res.success) {
                this.$message.success(res.message);
                this.visible = false;
              } else {
                this.$message.error(res.message);
              }
            })
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
      loadUserRoles(userid){
        queryUserRole({userid:userid}).then((res)=>{
          if(res.success){
            this.selectedRole = res.result;
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
        this.edit({});
      },
      edit (record) {
        this.resetScreenSize(); // 调用此方法,根据屏幕宽度自适应调整抽屉的宽度
        let that = this;
        that.initialRoleList();
        that.checkedDepartNameString = "";
        that.form.resetFields();
        if(record.hasOwnProperty("id")){
          that.loadUserRoles(record.id);
          this.picUrl = "Has no pic url yet";
        }
        that.userId = record.id;
        that.visible = true;
        that.model = Object.assign({}, record);
        that.$nextTick(() => {
          that.form.setFieldsValue(pick(this.model,'organName','abbreviateName','menberType','businessScope','regAddress','businessAddress','corporate','businessPhone','depart','departLeader','telephone','linePhone','regCapital','organCode','depositScale','volumeScale','selfScale','consignmentScale','networkCount','eleChannel'))

        });
        // 调用查询用户对应的部门信息的方法
        that.checkedDepartKeys = [];
        that.loadCheckedDeparts();
        this.filePath = record.signFile?record.signFile: '';

       
      },
      //
      loadCheckedDeparts(){
        let that = this;
        if(!that.userId){return}
        getAction(that.url.userWithDepart,{userId:that.userId}).then((res)=>{
          that.checkedDepartNames = [];
          if(res.success){
            for (let i = 0; i < res.result.length; i++) {
              that.checkedDepartNames.push(res.result[i].title);
              this.checkedDepartNameString = this.checkedDepartNames.join(",");
              that.checkedDepartKeys.push(res.result[i].key);
            }
            that.userDepartModel.departIdList = that.checkedDepartKeys
          }else{
            console.log(res.message);
          }
        })
      },
      close () {
        this.$emit('close');
        this.visible = false;
        this.disableSubmit = false;
        this.selectedRole = [];
        this.userDepartModel = {userId:'',departIdList:[]};
        this.checkedDepartNames = [];
        this.checkedDepartNameString='';
        this.checkedDepartKeys = [];
        this.selectedDepartKeys = [];
      },
      moment,
      handleSubmit () {

        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if(this.userDepartModel.departIdList.length==0)
          {
              that.$message.warning("请选择部门,部门分配字段不可为空");
          }
          if (this.userDepartModel.departIdList.length>0 && !err) {
            that.confirmLoading = true;
            let avatar = that.model.avatar;
            if(!values.birthday){
              values.birthday = '';
            }else{
              values.birthday = values.birthday.format(this.dateFormat);
            }
            let formData = Object.assign(this.model, values);
            formData.avatar = avatar;
            formData.selectedroles = this.selectedRole.length>0?this.selectedRole.join(","):'';

            formData.selecteddeparts = this.userDepartModel.departIdList.length>0?this.userDepartModel.departIdList.join(","):'';
            // that.addDepartsToUser(that,formData); // 调用根据当前用户添加部门信息的方法
            let obj;
            if(!this.model.id){
              formData.id = this.userId;
              obj=addUser(formData);
            }else{
              obj=editUser(formData);
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
              that.checkedDepartNames = [];
              that.userDepartModel.departIdList = {userId:'',departIdList:[]};

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
        callback();
      },
      compareToFirstPassword  (rule, value, callback) {
        const form = this.form;
        if (value && value !== form.getFieldValue('password')) {
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
              fieldName: 'phone',
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
      validateUsername(rule, value, callback){
        var params = {
          tableName: 'sys_user',
          fieldName: 'username',
          fieldVal: value,
          dataId: this.userId
        };
        duplicateCheck(params).then((res) => {
          if (res.success) {
          callback()
        } else {
          callback("用户名已存在!")
        }
      })
      },
      validateWorkNo(rule, value, callback){
        var params = {
          tableName: 'sys_user',
          fieldName: 'work_no',
          fieldVal: value,
          dataId: this.userId
        };
        duplicateCheck(params).then((res) => {
          if (res.success) {
            callback()
          } else {
            callback("工号已存在!")
          }
        })
      },
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
      beforeUpload: function(file){
        var fileType = file.type;
        if(fileType.indexOf('image')<0){
          this.$message.warning('请上传图片');
          return false;
        }
        //TODO 验证文件大小
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
            this.model.avatar = response.message;
            this.picUrl = "Has no pic url yet";
          }else{
            this.$message.warning(response.message);
          }
        }
      },
      getAvatarView(){
        return this.url.imgerver +"/"+ this.model.avatar;
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

      clickImage(file) {
      // let txt = document.createElement('a');
      // txt.href = file.response? this.proxyUrl+'/sys/common/view/'+file.response.message:file.url;
      // txt.target = '_blank';
      // txt.download = file.response? file.response.message:file.url;
      // txt.click();
      let fileName = file.name;
      let urlEnd = file.response?file.response.message:file.signFile;
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