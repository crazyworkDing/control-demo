<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
      
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核查单类型:(1-电子渠道 2-收单渠道)">
          <a-input placeholder="请输入核查单类型:(1-电子渠道 2-收单渠道)" v-decorator="['type', validatorRules.type ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核查单状态:0-待处理 1-处理中 2-已处理">
          <a-input placeholder="请输入核查单状态:0-待处理 1-处理中 2-已处理" v-decorator="['status', validatorRules.status ]" />
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
          label="规则编码(组合)，规则之间用逗号分隔，同rrms_result.strategy_id_hit">
          <a-input placeholder="请输入规则编码(组合)，规则之间用逗号分隔，同rrms_result.strategy_id_hit" v-decorator="['ruleCodeing', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易流水号，同rrms_result.red_id">
          <a-input placeholder="请输入交易流水号，同rrms_result.red_id" v-decorator="['trnId', validatorRules.trnId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易状态，同rrmf_result.is_hit">
          <a-input placeholder="请输入交易状态，同rrmf_result.is_hit" v-decorator="['trnStatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务类型">
          <a-input placeholder="请输入业务类型" v-decorator="['trnType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="运营机构，同rrms_result.organ">
          <a-input placeholder="请输入运营机构，同rrms_result.organ" v-decorator="['operOrganId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="处理机构">
          <a-input placeholder="请输入处理机构" v-decorator="['dealOrganId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易金额">
          <a-input-number v-decorator="[ 'trnAmt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="规则分值，同rrms_result.operate_code">
          <a-input placeholder="请输入规则分值，同rrms_result.operate_code" v-decorator="['ruleScore', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易渠道">
          <a-input placeholder="请输入交易渠道" v-decorator="['channel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="风险等级">
          <a-input placeholder="请输入风险等级" v-decorator="['riskLevel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="风险标签">
          <a-input placeholder="请输入风险标签" v-decorator="['riskLabel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="管控策略，同rrms_result.operate_code">
          <a-input placeholder="请输入管控策略，同rrms_result.operate_code" v-decorator="['strategyControl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="通知策略">
          <a-input placeholder="请输入通知策略" v-decorator="['strategyAction', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="处理结果:(0：未确认 1-确认有风险 2-确认无风险)">
          <a-input placeholder="请输入处理结果:(0：未确认 1-确认有风险 2-确认无风险)" v-decorator="['result', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支付方用户号">
          <a-input placeholder="请输入支付方用户号" v-decorator="['cstNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支付方证件类型">
          <a-input placeholder="请输入支付方证件类型" v-decorator="['ctfType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支付方证件号：1-身份证">
          <a-input placeholder="请输入支付方证件号：1-身份证" v-decorator="['ctfNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支付方用户姓名">
          <a-input placeholder="请输入支付方用户姓名" v-decorator="['cstName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支付方银行卡号">
          <a-input placeholder="请输入支付方银行卡号" v-decorator="['payerAcc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支付方银行卡bin">
          <a-input placeholder="请输入支付方银行卡bin" v-decorator="['payerBin', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支付方安全认证方式，同rrms_result.opt_auth_mode">
          <a-input placeholder="请输入支付方安全认证方式，同rrms_result.opt_auth_mode" v-decorator="['safeCertWay', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支付方注册时间">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'openAccTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支付方手机号码">
          <a-input placeholder="请输入支付方手机号码" v-decorator="['payerPhoneNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支付方所属行，暂无">
          <a-input placeholder="请输入支付方所属行，暂无" v-decorator="['payerBank', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支付方证件号归属地">
          <a-input placeholder="请输入支付方证件号归属地" v-decorator="['payerCtfPlace', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支付方手机归属地">
          <a-input placeholder="请输入支付方手机归属地" v-decorator="['payerPhonePlace', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支付卡号归属地">
          <a-input placeholder="请输入支付卡号归属地" v-decorator="['payerAccPlace', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支付方开户网点">
          <a-input placeholder="请输入支付方开户网点" v-decorator="['payerBranch', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用户管控状态">
          <a-input placeholder="请输入用户管控状态" v-decorator="['payerAccStatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款用户姓名">
          <a-input placeholder="请输入收款用户姓名" v-decorator="['rcvName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款卡号">
          <a-input placeholder="请输入收款卡号" v-decorator="['rcvAccNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款方手机号">
          <a-input placeholder="请输入收款方手机号" v-decorator="['rcvPhoneNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款方银行卡bin">
          <a-input placeholder="请输入收款方银行卡bin" v-decorator="['rcvBin', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款方账号开户网点">
          <a-input placeholder="请输入收款方账号开户网点" v-decorator="['rcvBranch', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款卡号归属地">
          <a-input placeholder="请输入收款卡号归属地" v-decorator="['rcvAccPlace', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款方手机归属地">
          <a-input placeholder="请输入收款方手机归属地" v-decorator="['rcvPhonePlace', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="收款方所属行">
          <a-input placeholder="请输入收款方所属行" v-decorator="['rcvBank', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="设备IP地址">
          <a-input placeholder="请输入设备IP地址" v-decorator="['ip', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="所在省份">
          <a-input placeholder="请输入所在省份" v-decorator="['province', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="设备指纹">
          <a-input placeholder="请输入设备指纹" v-decorator="['terminalId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易时间">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'tradeTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注">
          <a-input placeholder="请输入备注" v-decorator="['note', {}]" />
        </a-form-item>
		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "CheckListModal",
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
        type:{rules: [{ required: true, message: '请输入核查单类型:(1-电子渠道 2-收单渠道)!' }]},
        status:{rules: [{ required: true, message: '请输入核查单状态:0-待处理 1-处理中 2-已处理!' }]},
        trnId:{rules: [{ required: true, message: '请输入交易流水号，同rrms_result.red_id!' }]},
        },
        url: {
          add: "/checklist/checkList/add",
          edit: "/checklist/checkList/edit",
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
          this.form.setFieldsValue(pick(this.model,'type','status','receiver','ruleCodeing','trnId','trnStatus','trnType','operOrganId','dealOrganId','trnAmt','ruleScore','channel','riskLevel','riskLabel','strategyControl','strategyAction','result','cstNo','ctfType','ctfNo','cstName','payerAcc','payerBin','safeCertWay','payerPhoneNo','payerBank','payerCtfPlace','payerPhonePlace','payerAccPlace','payerBranch','payerAccStatus','rcvName','rcvAccNo','rcvPhoneNo','rcvBin','rcvBranch','rcvAccPlace','rcvPhonePlace','rcvBank','ip','province','terminalId','note'))
		  //时间格式化
          this.form.setFieldsValue({openAccTime:this.model.openAccTime?moment(this.model.openAccTime):null})
          this.form.setFieldsValue({tradeTime:this.model.tradeTime?moment(this.model.tradeTime):null})
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
            formData.openAccTime = formData.openAccTime?formData.openAccTime.format('YYYY-MM-DD HH:mm:ss'):null;
            formData.tradeTime = formData.tradeTime?formData.tradeTime.format('YYYY-MM-DD HH:mm:ss'):null;
            
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

</style>