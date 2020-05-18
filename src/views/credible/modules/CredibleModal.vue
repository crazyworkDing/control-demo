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

        <a-form-item label="用户号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'userId',{rules: [{ required: true, message: '请输入用户号' }]},validatorRules.userId]" placeholder="请输入用户号"></a-input>
        </a-form-item>
        <a-form-item label="可信维度" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['credibleDimension',{rules: [{ required: true, message: '请选择可信维度' }]}]" :trigger-change="true" dictCode="credible_dimension" placeholder="请选择可信维度"/>
        </a-form-item>
        <a-form-item label="可信值" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'credibleValue',{rules: [{ required: true, message: '请输入可信值' }]}, validatorRules.credibleValue]" placeholder="请输入可信值"></a-input>
        </a-form-item>
<!--        <a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="radio" v-decorator="['status']" :trigger-change="true" dictCode="credible_status" placeholder="请选择状态"/>
        </a-form-item>-->
        <a-form-item label="到期日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择到期日期" v-decorator="[ 'expireDate',{rules: [{ required: true, message: '请选择到期日期' }]}, validatorRules.expireDate]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'remark', validatorRules.remark]" placeholder="请输入备注"></a-input>
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import JDate from '@/components/jeecg/JDate'  
  import JDictSelectTag from "@/components/dict/JDictSelectTag"

  export default {
    name: "CredibleModal",
    components: { 
      JDate,
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
        validatorRules:{
        credibleDimension:{},
        userId:{},
        credibleValue:{},
        status:{},
        expireDate:{},
        remark:{},
        },
        url: {
          add: "/basedata/credible/add",
          edit: "/basedata/credible/edit",
        }
     
      }
    },
    created () {
    },
    methods: {
      add () {
          this.form.status='0';
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'createBy','createTime','credibleDimension','userId','credibleValue','status','expireDate','remark'))
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
        this.form.setFieldsValue(pick(row,'createBy','createTime','credibleDimension','userId','credibleValue','status','expireDate','remark'))
      },

      
    }
  }
</script>