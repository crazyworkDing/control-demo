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
        <a-row class="form-row" :gutter="16">
        <a-col :lg="8">
        <a-form-item label="产品名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'productName', validatorRules.productName]" placeholder="请输入产品名称"></a-input>
        </a-form-item>
        </a-col>

        <a-col :lg="8">
        <a-form-item label="发行者" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'publisher', validatorRules.publisher]" placeholder="请输入发行者"></a-input>
        </a-form-item>
        </a-col>

        <a-col :lg="8">
        <a-form-item label="登记代码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'code', validatorRules.code]" placeholder="请输入登记代码"></a-input>
        </a-form-item>
        </a-col>
        </a-row>

        <a-row class="form-row" :gutter="16">
        <a-col :lg="8">
        <a-form-item label="平台编号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'number', validatorRules.number]" placeholder="请输入平台编号"></a-input>
        </a-form-item>
        </a-col>

        <a-col :lg="8">
        <a-form-item label="运作模式" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['mode', validatorRules.mode]" :trigger-change="true" dictCode="mode" placeholder="请选择运作模式"/>
        </a-form-item>
        </a-col>

        <a-col :lg="8">
        <a-form-item label="募集方式" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['recruType', validatorRules.recruType]" :trigger-change="true" dictCode="recru_type" placeholder="请选择募集方式"/>
        </a-form-item>
        </a-col>
        </a-row>



        <a-row class="form-row" :gutter="16">
        <a-col :lg="8">
        <a-form-item label="期限类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['timeType', validatorRules.timeType]" :trigger-change="true" dictCode="time_type" placeholder="请选择期限类型"/>
        </a-form-item>
        </a-col>

        <a-col :lg="8">
        <a-form-item label="募集币种" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['currency', validatorRules.currency]" :trigger-change="true" dictCode="currency" placeholder="请选择募集币种"/>
        </a-form-item>
        </a-col>

        <a-col :lg="8">
        <a-form-item label="产品状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['status', validatorRules.status]" :trigger-change="true" dictCode="status" placeholder="请选择产品状态"/>
        </a-form-item>
        </a-col>
        </a-row>

        <a-row class="form-row" :gutter="16">
        <a-col :lg="8">
        <a-form-item label="风险等级" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['riskLevel', validatorRules.riskLevel]" :trigger-change="true" dictCode="risk_level" placeholder="请选择风险等级"/>
        </a-form-item>
        </a-col>

        <a-col :lg="8">
        <a-form-item label="募集金额" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'money', validatorRules.money]" placeholder="请输入募集金额"></a-input>
        </a-form-item>
        </a-col>

        <a-col :lg="8">
        <a-form-item label="初始净值" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'initialValue', validatorRules.initialValue]" placeholder="请输入初始净值"></a-input>
        </a-form-item>
        </a-col>
         </a-row>
        
        <a-row class="form-row" :gutter="16">
        <a-col :lg="8">
        <a-form-item label="产品净值" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'productValue', validatorRules.productValue]" placeholder="请输入产品净值"></a-input>
        </a-form-item>
        </a-col>
        
        <a-col :lg="8">
        <a-form-item label="产品总额" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'productPrice', validatorRules.productPrice]" placeholder="请输入产品总额"></a-input>
        </a-form-item>
        </a-col>
        
         <a-col :lg="8">
        <a-form-item label="收益类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'revenueType', validatorRules.revenueType]" placeholder="请输入收益类型"></a-input>
        </a-form-item>
        </a-col>
        </a-row>

         <a-row class="form-row" :gutter="16">
        
    
         <a-col :lg="8">
        <a-form-item label="代销分配额" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'distributionQuota', validatorRules.distributionQuota]" placeholder="请销输入代分配额"></a-input>
        </a-form-item>
        </a-col>

        <a-col :lg="8">
        <a-form-item label="实际天数" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'days', validatorRules.days]" placeholder="请输入实际天数" style="width: 100%"/>
        </a-form-item>
        </a-col>
        </a-row>

        <a-divider />

        <a-row class="form-row" :gutter="16">
        <a-col :lg="12" >
        <a-form-item label="募集起始时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择募集起始时间" v-decorator="[ 'recruStart', validatorRules.recruStart]" :trigger-change="true" :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" style="width: 100%"/>
        </a-form-item>
        </a-col>
    
        <a-col :lg="12">  
        <a-form-item label="募集终止时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择募集终止时间" v-decorator="[ 'recruEnd', validatorRules.recruEnd]" :trigger-change="true" :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" style="width: 100%"/>
        </a-form-item>
        </a-col>

        
        </a-row>

        <a-row class="form-row" :gutter="16">
        <a-col :lg="12">
        <a-form-item label="产品起始时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择产品起始时间" v-decorator="[ 'productStart', validatorRules.productStart]" :trigger-change="true" :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" style="width: 100%"/>
        </a-form-item>
        </a-col>

        <a-col :lg="12">
        <a-form-item label="产品终止时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择产品终止时间" v-decorator="[ 'productEnd', validatorRules.productEnd]" :trigger-change="true" :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" style="width: 100%"/>
        </a-form-item>
        </a-col>
        </a-row>

        
        
        <a-row class="form-row" :gutter="16">
        <a-col :lg="12">
        <a-form-item label="业务起始时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择业务起始时间" v-decorator="[ 'serviceStart', validatorRules.serviceStart]" :trigger-change="true" :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" style="width: 100%"/>
        </a-form-item>
        </a-col>
        
        <a-col :lg="12">
        <a-form-item label="业务终止时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择业务终止时间" v-decorator="[ 'serviceEnd', validatorRules.serviceEnd]" :trigger-change="true" :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" style="width: 100%"/>
        </a-form-item>
        </a-col>
        </a-row>

        <a-row class="form-row" :gutter="16">
        <a-col :lg="12">
        <a-form-item label="业绩比较基准" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'datum', validatorRules.datum]" placeholder="请输入业绩比较基准"></a-input>
        </a-form-item>
        </a-col>

        <a-col :lg="12">
        <a-form-item label="产品累计净值" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'totalValue', validatorRules.totalValue]" placeholder="请输入产品累计净值"></a-input>
        </a-form-item>
        </a-col>   
        </a-row>


        <a-row class="form-row" :gutter="16">

        <a-col :lg="12">
        <a-form-item label="注册联系人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'regContact', validatorRules.regContact]" placeholder="请输入注册联系人"></a-input>
        </a-form-item>
        </a-col>
       
         <a-col :lg="12">
        <a-form-item label="注册联系方式" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'regPhone', validatorRules.regPhone]" placeholder="请输入注册联系方式"></a-input>
        </a-form-item>
        </a-col>
        </a-row>

        <a-row class="form-row" :gutter="16">
        <a-col :lg="12">
        <a-form-item label="兑付收益率" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'lastYield', validatorRules.lastYield]" placeholder="请输入最近一次的兑付收益率"></a-input>
        </a-form-item>
         </a-col>

        <a-col :lg="12">
        <a-form-item label="投资资产类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['assetType', validatorRules.assetType]" :trigger-change="true" dictCode="asset_type" placeholder="请选择投资资产类型"/>
        </a-form-item>
        </a-col>
        </a-row>
        
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JDate from '@/components/jeecg/JDate'  
  import JDictSelectTag from "@/components/dict/JDictSelectTag"

  export default {
    name: "ZxProductModal",
    components: { 
      JDate,
      JDictSelectTag,
    },
    data () {
      return {
        form: this.$form.createForm(this),
        title:"操作",
        width:1300,
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
          productName: {rules: [
          ]},
          publisher: {rules: [
          ]},
          code: {rules: [
          ]},
          number: {rules: [
          ]},
          mode: {rules: [
          ]},
          recruType: {rules: [
          ]},
          timeType: {rules: [
          ]},
          currency: {rules: [
          ]},
          status: {rules: [
          ]},
          riskLevel: {rules: [
          ]},
          money: {rules: [
          ]},
          recruStart: {rules: [
          ]},
          recruEnd: {rules: [
          ]},
          productStart: {rules: [
          ]},
          productEnd: {rules: [
          ]},
          serviceStart: {rules: [
          ]},
          serviceEnd: {rules: [
          ]},
          days: {rules: [
          ]},
          datum: {rules: [
          ]},
          initialValue: {rules: [
          ]},
          productValue: {rules: [
          ]},
          totalValue: {rules: [
          ]},
          lastYield: {rules: [
          ]},
          revenueType: {rules: [
          ]},
          assetType: {rules: [
          ]},
          productPrice: {rules: [
          ]},
          distributionQuota: {rules: [
          ]},
          regContact: {rules: [
          ]},
          regPhone: {rules: [
          ]},
        },
        url: {
          add: "/product/zxProduct/add",
          edit: "/product/zxProduct/edit",
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
          this.form.setFieldsValue(pick(this.model,'productName','publisher','code','number','mode','recruType','timeType','currency','status','riskLevel','money','recruStart','recruEnd','productStart','productEnd','serviceStart','serviceEnd','days','datum','initialValue','productValue','totalValue','lastYield','revenueType','assetType','productPrice','distributionQuota','regContact','regPhone'))
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
        this.form.setFieldsValue(pick(row,'productName','publisher','code','number','mode','recruType','timeType','currency','status','riskLevel','money','recruStart','recruEnd','productStart','productEnd','serviceStart','serviceEnd','days','datum','initialValue','productValue','totalValue','lastYield','revenueType','assetType','productPrice','distributionQuota','regContact','regPhone'))
      },

      
    }
  }
</script>
