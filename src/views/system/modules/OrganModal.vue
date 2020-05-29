<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="会员全称"
          :hidden="false"
          hasFeedback
        >
          <a-input
            id="fullName"
            placeholder="请输入会员全称"
            v-decorator="['fullName', validatorRules.fullName ]"
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="会员简称"
          :hidden="false"
          hasFeedback
        >
          <a-input
            id="abbreviateName"
            placeholder="请输入会员简称"
            v-decorator="['abbreviateName', validatorRules.abbreviateName ]"
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
            v-decorator="['memberType',validatorRules.memberType ]"
            dict-code="	member_type"
            placeholder="请选择机构类型"
            :trigger-change="true"
          />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构代码"
          :hidden="false"
          hasFeedback
        >
          <a-input
            id="organCode"
            placeholder="请输入机构代码"
            v-decorator="['organCode', validatorRules.organCode ]"
          />
        </a-form-item>

        <a-form-item
          prop="businessScope"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="经营区域"
          :hidden="false"
          hasFeedback
        >
          <el-cascader
            v-decorator="['businessScope', validatorRules.businessScope ]"
            :options="selectOption.city"
            :props="{ expandTrigger: 'hover',label:'title' }"
            style="width: 100%"
            placeholder="请选择经营地区"
            :show-all-levels="false"
            clearable
            filterable
          ></el-cascader>
        </a-form-item>

        <!-- <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="经营区域"
          :hidden="false"
          hasFeedback >
          <a-input id="businessScope" placeholder="请输入经营区域" v-decorator="['businessScope', validatorRules.businessScope ]"/>
        </a-form-item>-->
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
            v-decorator="['regAddress', validatorRules.regAddress ]"
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
            v-decorator="['businessAddress', validatorRules.businessAddress ]"
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
            v-decorator="['corporate', validatorRules.corporate ]"
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
            v-decorator="['businessPhone', validatorRules.businessPhone ]"
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
            v-decorator="['depart', validatorRules.depart ]"
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
            v-decorator="['departLeader', validatorRules.departLeader ]"
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
            id="telephone"
            placeholder="请输入部门负责人联系方式"
            v-decorator="['telephone', validatorRules.telephone ]"
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
            v-decorator="['regCapital', validatorRules.regCapital ]"
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
            placeholder="请输入上一年度存款规模"
            v-decorator="['depositScale', validatorRules.depositScale ]"
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
            placeholder="请输入上一年度贷款规模"
            v-decorator="['volumeScale', validatorRules.volumeScale ]"
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
            placeholder="请输入上一年度自营理财规模"
            v-decorator="['selfScale', validatorRules.selfScale ]"
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
            placeholder="请输入上一年度代销理财规模"
            v-decorator="['consignmentScale', validatorRules.consignmentScale ]"
          />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="网点数" hasFeedback>
          <a-input placeholder="请输入网点数" v-decorator="['networkCount',validatorRules.networkCount]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否有独立的理财系统" hasFeedback>
          <a-select
            placeholder="请选择"
            type="list"
            v-decorator="['eleChannel']"
            :trigger-change="true"
          >
            <a-select-option value="0">是</a-select-option>
            <a-select-option value="1">否</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import axios from 'axios'
import { httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import { validateDuplicateValue } from '@/utils/util'
import JDate from '@/components/jeecg/JDate'
import JDictSelectTag from '@/components/dict/JDictSelectTag'
import { saveToDraft, findDraft, getDepart, getCity } from '@/api/user'
import { duplicateCheck } from '@/api/api'
export default {
  name: 'OrganModal',
  components: {
    JDate,
    JDictSelectTag
  },
  data() {
    return {
      form: this.$form.createForm(this),
      title: '操作',
      width: 800,
      visible: false,
      model: {},
      businessScope: [],
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      selectOption: {
        city: []
      },
      confirmLoading: false,
      validatorRules: {
        fullName: { rules: [{ required: true, message: '会员全称不可为空' }, { validator: this.validateFullname }] },
        abbreviateName: { rules: [] },
        memberType: { rules: [{ required: true, message: '请选择机构类型' }] },
        businessScope: { rules: [{ required: true, message: '请选择经营区域' }] },
        regAddress: { rules: [] },
        businessAddress: { rules: [] },
        corporate: { rules: [{ required: true, message: '法定代表人不可为空' }] },
        businessPhone: { rules: [] },
        depart: { rules: [] },
        departLeader: { rules: [] },
        telephone: { rules: [] },
        linePhone: { rules: [] },
        regCapital: { rules: [] },
        organCode: { rules: [{ required: true, message: '机构代码不可为空' }, { validator: this.validateOrganCode }] },
        depositScale: { rules: [] },
        volumeScale: { rules: [] },
        selfScale: { rules: [] },
        consignmentScale: { rules: [] },
        networkCount: { rules: [] },
        eleChannel: { rules: [] }
      },
      url: {
        add: '/sys/organ/add',
        edit: '/sys/organ/edit'
      }
    }
  },
  created() {},
  methods: {
    validateOrganCode(rule, value, callback) {
      if (!value) {
        callback()
      } else {
        var params = {
          tableName: 'sys_organ',
          fieldName: 'organ_code',
          fieldVal: value
        }
        duplicateCheck(params).then(res => {
          if (res.success) {
            callback()
          } else {
            callback('机构代码已注册')
          }
        })
      }
    },
    validateFullname(rule, value, callback) {
      if (!value) {
        callback()
      } else {
        var params = {
          tableName: 'sys_organ',
          fieldName: 'full_name',
          fieldVal: value
        }
        duplicateCheck(params).then(res => {
          if (res.success) {
            callback()
          } else {
            callback('会员全称已注册')
          }
        })
      }
    },
    add() {
      this.edit({})
    },
    edit(record) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
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
            'eleChannel'
          )
        )
        let businessScope = []
        this.selectOption.city.forEach(res => {
          if (!res.children) {
            return
          }
          res.children.forEach(res2 => {
            if (res2.id == this.model.businessScope) {
              businessScope = [res.id, res2.id]
            }
          })
        })
        this.businessScope = businessScope
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
          let formData = Object.assign(this.model, values, {
            businessScope: that.businessScope[that.businessScope.length - 1]
          })
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
          'eleChannel'
        )
      )
    }
  },
  mounted() {
    axios.get('/city.json').then(res => {
      this.selectOption.city = res.data.result
    })
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
.title {
  display: inline-block;
  position: relative;
  font-size: 1.7em;
  bottom: 14px;
  color: #fff;
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