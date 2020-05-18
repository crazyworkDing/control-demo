<template>
  <a-drawer
    :title="title"
    :maskClosable="true"
    :width="800"
    placement="right"
    :closable="true"
    @close="handleCancel"
    :visible="visible"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构全称"
          :hidden="false"
          hasFeedback
        >
          <a-input
            id="fullName"
            placeholder="请输入机构全称"
            disabled v-decorator="['fullName', validatorRules.fullName ]"
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构简称"
          :hidden="false"
          hasFeedback
        >
          <a-input
            id="abbreviateName"
            placeholder="请输入机构简称"
            disabled v-decorator="['abbreviateName', validatorRules.abbreviateName ]"
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构类型"
          :hidden="false"
          hasFeedback
        >
          <j-dict-select-tag
            disabled v-decorator="['memberType']"
            :type="'list'"
            :triggerChange="true"
            dict-code="member_type"
            placeholder="请选择机构类型"
          />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构编码"
          :hidden="false"
          hasFeedback
        >
          <a-input
            id="organCode"
            placeholder="请输入机构编码"
            disabled v-decorator="['organCode', validatorRules.organCode ]"
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="经营区域"
          :hidden="false"
          hasFeedback
        >
          <a-input
            id="businessScope"
            placeholder="请输入经营区域"
            disabled v-decorator="['businessScope', validatorRules.businessScope ]"
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="注册地址"
          :hidden="false"
          hasFeedback
        >
          <a-input
            id="regAddress"
            placeholder="请输入注册地址"
            disabled v-decorator="['regAddress', validatorRules.regAddress ]"
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="办公地址"
          :hidden="false"
          hasFeedback
        >
          <a-input
            id="businessAddress"
            placeholder="请输入办公地址"
            disabled v-decorator="['businessAddress', validatorRules.businessAddress ]"
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法定代表人"
          :hidden="false"
          hasFeedback
        >
          <a-input
            id="corporate"
            placeholder="请输入法定代表人"
            disabled v-decorator="['corporate', validatorRules.corporate ]"
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="办公电话"
          :hidden="false"
          hasFeedback
        >
          <a-input
            id="businessPhone"
            placeholder="请输入办公电话"
            disabled v-decorator="['businessPhone', validatorRules.businessPhone ]"
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="承办部门"
          :hidden="false"
          hasFeedback
        >
          <a-input
            id="depart"
            placeholder="请输入承办部门"
            disabled v-decorator="['depart', validatorRules.depart ]"
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="部门负责人"
          :hidden="false"
          hasFeedback
        >
          <a-input
            id="departLeader"
            placeholder="请输入部门负责人"
            disabled v-decorator="['departLeader', validatorRules.departLeader ]"
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="负责人联系方式"
          :hidden="false"
          hasFeedback
        >
          <a-input
            id="linePhone"
            placeholder="请输入部门负责人联系方式"
            disabled v-decorator="['linePhone', validatorRules.linePhone ]"
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="注册资本"
          :hidden="false"
          hasFeedback
        >
          <a-input
            id="regCapital"
            placeholder="请输入注册资本"
            disabled v-decorator="['regCapital', validatorRules.regCapital ]"
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存款规模"
          :hidden="false"
          hasFeedback
        >
          <a-input
            id="depositScale"
            placeholder="请输入存款规模"
            disabled v-decorator="['depositScale', validatorRules.depositScale ]"
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款规模"
          :hidden="false"
          hasFeedback
        >
          <a-input
            id="volumeScale"
            placeholder="请输入贷款规模"
            disabled v-decorator="['volumeScale', validatorRules.volumeScale ]"
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="自营理财规模"
          :hidden="false"
          hasFeedback
        >
          <a-input
            id="selfScale"
            placeholder="请输入自营理财规模"
            disabled v-decorator="['selfScale', validatorRules.selfScale ]"
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="代销理财规模"
          :hidden="false"
          hasFeedback
        >
          <a-input
            id="consignmentScale"
            placeholder="请输入代销理财规模"
            disabled v-decorator="['consignmentScale', validatorRules.consignmentScale ]"
          />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="网点数">
          <a-input placeholder="请输入网点数" disabled v-decorator="['networkCount',validatorRules.networkCount]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否有独立的理财系统">
          <a-select
            placeholder="请选择"
            type="list"
            v-decorator="['eleChannel']"
            :trigger-change="true"
            disabled
          >
            <a-select-option value="0">是</a-select-option>
            <a-select-option value="1">否</a-select-option>
          </a-select>
        </a-form-item>
        <!-- <a-form-item label="审核意见" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'review', validatorRules.review]" placeholder="请输入审核意见" :disabled="flag"></a-input>
        </a-form-item>
        <a-form-item class="text-center" v-if="!flag">
          <a-button type="primary"  @click="confirm">审核通过</a-button>
          <a-button type="primary"  @click="refuse" class="ml20">审核拒绝</a-button>
        </a-form-item> -->
      </a-form>
    </a-spin>
  </a-drawer>
  <!-- <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    
  </a-modal>-->
</template>

<script>
import { httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import { validateDuplicateValue } from '@/utils/util'
import JDate from '@/components/jeecg/JDate'
import JDictSelectTag from '@/components/dict/JDictSelectTag'
import { auditData } from "@/api/user";
export default {
  name: 'MyOrganModal',
  components: {
    JDate,
    JDictSelectTag
  },
  data() {
    return {
      flag: '',
      form: this.$form.createForm(this),
      dataId: '',
      title: '操作',
      width: 800,
      visible: false,
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },

      confirmLoading: false,
      validatorRules: {
        fullName: { rules: [] },
        abbreviateName: { rules: [] },
        menberType: { rules: [] },
        businessScope: { rules: [] },
        regAddress: { rules: [] },
        businessAddress: { rules: [] },
        corporate: { rules: [] },
        businessPhone: { rules: [] },
        depart: { rules: [] },
        departLeader: { rules: [] },
        telephone: { rules: [] },
        linePhone: { rules: [] },
        regCapital: { rules: [] },
        organCode: { rules: [] },
        depositScale: { rules: [] },
        volumeScale: { rules: [] },
        selfScale: { rules: [] },
        consignmentScale: { rules: [] },
        networkCount: { rules: [] },
        eleChannel: { rules: [] },
        review: {
          rules: [
            {
              required: true, message: '审核意见不能为空'
            }
          ]
        }
      },
      url: {
        add: '/sys/organ/add',
        edit: '/sys/organ/edit'
      }
    }
  },
  created() {},
  methods: {
    confirm() {
      this.form.validateFields((err, values) => {
        if (err) {
          return
        } else {
          let params = Object.assign(values, { status: 2, id: this.dataId })
          auditData(params).then(res => {
            if (res.success) {
              this.$message.success(res.message)
              this.visible = false
              this.$emit('ok')
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    refuse() {
      this.form.validateFields((err, values) => {
        if (err) {
          return
        } else {
          let params = Object.assign(values, { status: 3, id: this.dataId })
          auditData(params).then(res => {
            if (res.success) {
              this.$message.success(res.message)
              this.visible = false
              this.$emit('ok')
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    add() {
      this.edit({})
    },
    edit(record) {
      this.form.resetFields()
      this.model = Object.assign({}, record);
      this.flag = record.review;
      this.visible = true
      this.dataId = record.dataId;
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'fullName',
            'abbreviateName',
            'memberType',
            'businessScope',
            'regAddress',
            'businessAddress',
            'corporate',
            'businessPhone',
            'depart',
            'departLeader',
            'telephone',
            'linePhone',
            'regCapital',
            'organCode',
            'depositScale',
            'volumeScale',
            'selfScale',
            'consignmentScale',
            'networkCount',
            'eleChannel',
            'review'
          )
        )
      })
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          if (!this.model.id) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
          console.log('表单提交数据', formData)
          httpAction(httpurl, formData, method)
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('ok')
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.confirmLoading = false
              that.close()
            })
        }
      })
    },
    handleCancel() {
      this.close()
    },
    popupCallback(row) {
      this.form.setFieldsValue(
        pick(
          row,
          'fullName',
          'abbreviateName',
          'menberType',
          'businessScope',
          'regAddress',
          'businessAddress',
          'corporate',
          'businessPhone',
          'depart',
          'departLeader',
          'telephone',
          'linePhone',
          'regCapital',
          'organCode',
          'depositScale',
          'volumeScale',
          'selfScale',
          'consignmentScale',
          'networkCount',
          'eleChannel'
        )
      )
    }
  }
}
</script>

<style scoped>
.avatar-uploader > .ant-upload {
  width: 104px;
  height: 104px;
}
.ant-upload-select-picture-card i {
  font-size: 49px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

.ant-table-tbody .ant-table-row td {
  padding-top: 10px;
  padding-bottom: 10px;
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