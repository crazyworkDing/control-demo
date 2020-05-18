<template>
  <a-drawer
      :title="title"
      :width="800"
      placement="right"
      :closable="false"
      @close="close"
      :visible="visible"
  >

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
      
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="案件号">
          <a-input-number v-decorator="[ 'caseId', validatorRules.caseId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="案件名">
          <a-input placeholder="请输入案件名" v-decorator="['caseName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核查单编号">
          <a-input-number v-decorator="[ 'checkId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="案件用户号">
          <a-input placeholder="请输入案件用户号" v-decorator="['cstNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="案件来源">
          <a-input-number v-decorator="[ 'sourceOfCase', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="案件类型">
          <a-input-number v-decorator="[ 'category', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="案件定性">
          <a-input-number v-decorator="[ 'qualitativeCase', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="涉案资金">
          <a-input-number v-decorator="[ 'involvedFund', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="冻结资金">
          <a-input-number v-decorator="[ 'frozenFund', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="调账资金">
          <a-input-number v-decorator="[ 'adjustingFund', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="损失资金">
          <a-input-number v-decorator="[ 'lossFund', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="赔付状态">
          <a-input-number v-decorator="[ 'stateOfPayment', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="赔付主体">
          <a-input placeholder="请输入赔付主体" v-decorator="['paymain', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="赔付金额">
          <a-input-number v-decorator="[ 'payprice', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="不赔付原因">
          <a-input placeholder="请输入不赔付原因" v-decorator="['sake', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="追回状态">
          <a-input-number v-decorator="[ 'retrieve', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="追回金额">
          <a-input-number v-decorator="[ 'retrievePrice', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="已采取措施">
          <a-input placeholder="请输入已采取措施" v-decorator="['actions', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="赔付方案">
          <a-input-number v-decorator="[ 'compensationScheme', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="报送单位">
          <a-input placeholder="请输入报送单位" v-decorator="['reportUnit', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单位联系人">
          <a-input placeholder="请输入单位联系人" v-decorator="['reportUnitContact', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单位联系电话">
          <a-input placeholder="请输入单位联系电话" v-decorator="['reportUnitPhone', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="案件备注">
          <a-input placeholder="请输入案件备注" v-decorator="['comments', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务类型">
          <a-input-number v-decorator="[ 'trnType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="泄露方式">
          <a-input-number v-decorator="[ 'leakageMode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="泄露渠道">
          <a-input-number v-decorator="[ 'leakageChannel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="风险原因">
          <a-input-number v-decorator="[ 'riskReason', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手机换绑方式">
          <a-input-number v-decorator="[ 'phoneChangeMethod', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支付方式">
          <a-input-number v-decorator="[ 'paymentMethod', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支付渠道">
          <a-input-number v-decorator="[ 'payChannel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="销账渠道">
          <a-input-number v-decorator="[ 'debitChannel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="案件状态">
          <a-input-number v-decorator="[ 'caseStatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="处理机构">
          <a-input placeholder="请输入处理机构" v-decorator="['dealOrgCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="运营机构">
          <a-input placeholder="请输入运营机构" v-decorator="['operOrgCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="受理人员">
          <a-input placeholder="请输入受理人员" v-decorator="['receiver', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="创建时间">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'crTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="更新时间">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'upTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手机号">
          <a-input placeholder="请输入手机号" v-decorator="['payerPhoneNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件号">
          <a-input placeholder="请输入证件号" v-decorator="['ctfNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="审核状态">
          <a-input-number v-decorator="[ 'auditStatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="审核备注">
          <a-input placeholder="请输入审核备注" v-decorator="['auditComment', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="提交审核的人员">
          <a-input placeholder="请输入提交审核的人员" v-decorator="['submitUser', {}]" />
        </a-form-item>
		
      </a-form>
    </a-spin>
    <a-button type="primary" @click="handleOk">确定</a-button>
    <a-button type="primary" @click="handleCancel">取消</a-button>
  </a-drawer>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "CasesModal",
    data () {
      return {
        title:"操作",
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
        form: this.$form.createForm(this),
        validatorRules:{
        caseId:{rules: [{ required: true, message: '请输入案件号!' }]},
        },
        url: {
          add: "/cases/cases/add",
          edit: "/cases/cases/edit",
        },
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
          this.form.setFieldsValue(pick(this.model,'caseId','caseName','checkId','cstNo','sourceOfCase','category','qualitativeCase','involvedFund','frozenFund','adjustingFund','lossFund','stateOfPayment','paymain','payprice','sake','retrieve','retrievePrice','actions','compensationScheme','reportUnit','reportUnitContact','reportUnitPhone','comments','trnType','leakageMode','leakageChannel','riskReason','phoneChangeMethod','paymentMethod','payChannel','debitChannel','caseStatus','dealOrgCode','operOrgCode','receiver','payerPhoneNo','ctfNo','auditStatus','auditComment','submitUser'))
		  //时间格式化
          this.form.setFieldsValue({crTime:this.model.crTime?moment(this.model.crTime):null})
          this.form.setFieldsValue({upTime:this.model.upTime?moment(this.model.upTime):null})
        });

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
            //时间格式化
            formData.crTime = formData.crTime?formData.crTime.format('YYYY-MM-DD HH:mm:ss'):null;
            formData.upTime = formData.upTime?formData.upTime.format('YYYY-MM-DD HH:mm:ss'):null;
            
            console.log(formData)
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


    }
  }
</script>

<style lang="less" scoped>
/** Button按钮间距 */
  .ant-btn {
    margin-left: 30px;
    margin-bottom: 30px;
    float: right;
  }
</style>