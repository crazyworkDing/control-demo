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

        <a-form-item label="会员全称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'fullName', validatorRules.fullName]" placeholder="请输入会员全称"></a-input>
        </a-form-item>
        <a-form-item label="会员简称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'abbreviateName', validatorRules.abbreviateName]" placeholder="请输入会员简称"></a-input>
        </a-form-item>
        <a-form-item label="会员类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['menberType', validatorRules.menberType]" :trigger-change="true" dictCode="" placeholder="请选择会员类型"/>
        </a-form-item>
        <a-form-item label="经营区域" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'businessScope', validatorRules.businessScope]" placeholder="请输入经营区域"></a-input>
        </a-form-item>
        <a-form-item label="注册地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'regAddress', validatorRules.regAddress]" placeholder="请输入注册地址"></a-input>
        </a-form-item>
        <a-form-item label="办公地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'businessAddress', validatorRules.businessAddress]" placeholder="请输入办公地址"></a-input>
        </a-form-item>
        <a-form-item label="法定代表人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'corporate', validatorRules.corporate]" placeholder="请输入法定代表人"></a-input>
        </a-form-item>
        <a-form-item label="办公电话" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'businessPhone', validatorRules.businessPhone]" placeholder="请输入办公电话"></a-input>
        </a-form-item>
        <a-form-item label="会员承办部门" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'depart', validatorRules.depart]" placeholder="请输入会员承办部门"></a-input>
        </a-form-item>
        <a-form-item label="部门负责人姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'departLeader', validatorRules.departLeader]" placeholder="请输入部门负责人姓名"></a-input>
        </a-form-item>
        <a-form-item label="部门负责人手机号码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'telephone', validatorRules.telephone]" placeholder="请输入部门负责人手机号码"></a-input>
        </a-form-item>
        <a-form-item label="部门负责人座机号码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'linePhone', validatorRules.linePhone]" placeholder="请输入部门负责人座机号码"></a-input>
        </a-form-item>
        <a-form-item label="注册资本" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'regCapital', validatorRules.regCapital]" placeholder="请输入注册资本"></a-input>
        </a-form-item>
        <a-form-item label="机构代码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'organCode', validatorRules.organCode]" placeholder="请输入机构代码"></a-input>
        </a-form-item>
        <a-form-item label="存款规模" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'depositScale', validatorRules.depositScale]" placeholder="请输入存款规模"></a-input>
        </a-form-item>
        <a-form-item label="贷款规模" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'volumeScale', validatorRules.volumeScale]" placeholder="请输入贷款规模"></a-input>
        </a-form-item>
        <a-form-item label="自营理财规模" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'selfScale', validatorRules.selfScale]" placeholder="请输入自营理财规模"></a-input>
        </a-form-item>
        <a-form-item label="代销理财规模" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'consignmentScale', validatorRules.consignmentScale]" placeholder="请输入代销理财规模"></a-input>
        </a-form-item>
        <a-form-item label="网点数" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'networkCount', validatorRules.networkCount]" placeholder="请输入网点数"></a-input>
        </a-form-item>
        <a-form-item label="电子渠道" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['eleChannel', validatorRules.eleChannel]" :trigger-change="true" dictCode="" placeholder="请选择电子渠道"/>
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

  export default {
    name: "ZxLoginModal",
    components: { 
      JDictSelectTag,
    },
    data () {
      return {
        form: this.$form.createForm(this),
        title:"操作",
        width:800,
        visible: false,
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
          fullName: {rules: [
          ]},
          abbreviateName: {rules: [
          ]},
          menberType: {rules: [
          ]},
          businessScope: {rules: [
          ]},
          regAddress: {rules: [
          ]},
          businessAddress: {rules: [
          ]},
          corporate: {rules: [
          ]},
          businessPhone: {rules: [
          ]},
          depart: {rules: [
          ]},
          departLeader: {rules: [
          ]},
          telephone: {rules: [
            {pattern:/^1[3456789]\d{9}$/, message: '请输入正确的手机号码!'},
          ]},
          linePhone: {rules: [
          ]},
          regCapital: {rules: [
           {pattern:/^(([1-9][0-9]*)|([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2}))$/, message: '请输入正确的金额!'},
          ]},
          organCode: {rules: [
          ]},
          depositScale: {rules: [
           {pattern:/^(([1-9][0-9]*)|([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2}))$/, message: '请输入正确的金额!'},
          ]},
          volumeScale: {rules: [
           {pattern:/^(([1-9][0-9]*)|([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2}))$/, message: '请输入正确的金额!'},
          ]},
          selfScale: {rules: [
           {pattern:/^(([1-9][0-9]*)|([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2}))$/, message: '请输入正确的金额!'},
          ]},
          consignmentScale: {rules: [
           {pattern:/^(([1-9][0-9]*)|([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2}))$/, message: '请输入正确的金额!'},
          ]},
          networkCount: {rules: [
            {pattern:/^-?\d+$/, message: '请输入整数!'},
          ]},
          eleChannel: {rules: [
          ]},
        },
        url: {
          add: "/test/zxLogin/add",
          edit: "/test/zxLogin/edit",
        }
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'fullName','abbreviateName','menberType','businessScope','regAddress','businessAddress','corporate','businessPhone','depart','departLeader','telephone','linePhone','regCapital','organCode','depositScale','volumeScale','selfScale','consignmentScale','networkCount','eleChannel'))
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
            let formData = Object.assign(this.model, values);
            console.log("表单提交数据",formData)
            httpAction(httpurl,formData,method).then((res)=>{
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
      popupCallback(row){
        this.form.setFieldsValue(pick(row,'fullName','abbreviateName','menberType','businessScope','regAddress','businessAddress','corporate','businessPhone','depart','departLeader','telephone','linePhone','regCapital','organCode','depositScale','volumeScale','selfScale','consignmentScale','networkCount','eleChannel'))
      },

      
    }
  }
</script>