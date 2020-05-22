<template>
  <div class="page-header-index-wide">
    <a-card
      :bordered="false"
      title="个人信息"
      :bodyStyle="{ padding: '16px 0', height: '100%' }"
      :style="{ height: '100%' }"
    >
      <a-col :md="24" :lg="16">
        <a-form style="max-width: 500px; margin: 40px auto 0;" :form="form">
          <a-form-item label="姓名" :labelCol="{span: 5}" :wrapperCol="{span: 19}">
            <a-input v-decorator="[ 'username',  validatorRules.username]" disabled />
          </a-form-item>

          <a-form-item label="机构" :labelCol="{span: 5}" :wrapperCol="{span: 19}">
            <a-input placeholder="请输入您的机构" v-decorator="[ 'organName' ]" disabled></a-input>
          </a-form-item>

          <a-form-item label="部门" :labelCol="{span: 5}" :wrapperCol="{span: 19}">
            <a-input placeholder="请输入您的部门" v-decorator="[ 'depart' ]"></a-input>
          </a-form-item>

          <a-form-item label="职务" :labelCol="{span: 5}" :wrapperCol="{span: 19}">
            <a-input placeholder="请输入您的职务" v-decorator="[ 'post' ]"></a-input>
          </a-form-item>

          <a-form-item label="手机号码" :labelCol="{span: 5}" :wrapperCol="{span: 19}">
            <a-input placeholder="11 位手机号" v-decorator="[ 'telephone', validatorRules.telephone ]"></a-input>
          </a-form-item>
          <!-- <a-form-item
            label="座机号码" :labelCol="{span: 5}"
             :wrapperCol="{span: 19}">
            <a-input v-decorator="[ 'linePhone', ]"/>
          </a-form-item>-->

          <a-form-item
            label="电子邮箱"
            :required="false"
            :labelCol="{span: 5}"
            :wrapperCol="{span: 19}"
          >
            <a-input v-decorator="[ 'email', validatorRules.email ]" />
          </a-form-item>

          <!-- <a-form-item label="密码" :labelCol="{span: 5}" :wrapperCol="{span: 19}">
            <a-input
              type="password"
              v-decorator="[ 'password', validatorRules.password ]"
              placeholder="至少8位密码，区分大小写"
            />
          </a-form-item>
          <a-form-item label="确认密码" :labelCol="{span: 5}" :wrapperCol="{span: 19}">
            <a-input
              size="large"
              type="password"
              v-decorator="[ 'password', validatorRules.repassword ]"
              autocomplete="false"
              placeholder="确认密码"
            />
          </a-form-item>-->
          <a-form-item>
            <a-button
              size="large"
              type="primary"
              htmlType="submit"
              class="register-button"
              :loading="registerBtn"
              @click="handleSubmit"
            >保存</a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-card>
  </div>
</template>

<script>
import { getAction, httpAction } from '@/api/manage'
import { checkOnlyUser } from '@/api/api'
import { mixinDevice } from '@/utils/mixin.js'
import pick from 'lodash.pick'
import { duplicateCheck } from "@/api/api";

export default {
  components: {},
  data() {
    return {
      form: this.$form.createForm(this),
      sysuser: '',

      model: {},
      validatorRules: {
        telephone: {
          rules: [
            { required: true, pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
            { validator: this.validatePhone }
          ]
        },
        linePhone: {},
        email: {
          rules: [{ required: false, type: 'email', message: '请输入正确的邮箱地址' }]
        },
        password: { rules: [{ required: false, message: '至少8位密码，区分大小写' }] },
        repassword: { rules: [{ required: false, message: '至少8位密码，区分大小写' }] }
      },
      registerBtn: false
    }
  },
  created() {
    this.resetScreenSize() // 调用此方法,根据屏幕宽度自适应调整抽屉的宽度
  },
  mounted() {
    this.initObj()
  },
  methods: {
    validatePhone(rule, value, callback) {
      if (!value) {
        callback()
      } else {
        //update-begin--Author:kangxiaolin  Date:20190826 for：[05] 手机号不支持199号码段--------------------
        if (new RegExp(/^1[3|4|5|7|8|9][0-9]\d{8}$/).test(value)) {
          //update-end--Author:kangxiaolin  Date:20190826 for：[05] 手机号不支持199号码段--------------------

          var params = {
            tableName: 'sys_user',
            fieldName: 'telephone',
            fieldVal: value,
            dataId: this.sysuser.id
          }
          duplicateCheck(params).then(res => {
            if (res.success) {
              callback()
            } else {
              callback('手机号已存在!')
            }
          })
        } else {
          callback('请输入正确格式的手机号码!')
        }
      }
    },
    initObj() {
      let that = this
      getAction('/sys/user/queryObj').then(res => {
        if (res.success) {
          that.sysuser = res.result
          that.$nextTick(() => {
            // that.form.setFieldsValue({username: that.sysuser.username,telephone: that.sysuser.telephone,
            //  email: that.sysuser.email})
            that.form.setFieldsValue(
              pick(that.sysuser, 'username', 'telephone', 'email', 'post', 'depart', 'organName')
            )
          })
        } else {
          console.log(res.message)
        }
      })
    },
    handleEmailCheck(rule, value, callback) {
      var params = {
        email: value
      }
      checkOnlyUser(params).then(res => {
        if (res.success) {
          callback()
        } else {
          callback('邮箱已存在!')
        }
      })
    },
    handlePasswordLevel(rule, value, callback) {
      let level = 0
      let reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,./]).{8,}$/
      if (!reg.test(value)) {
        callback(new Error('密码由8位数字、大小写字母和特殊符号组成!'))
      }
      // 判断这个字符串中有没有数字
      if (/[0-9]/.test(value)) {
        level++
      }
      // 判断字符串中有没有字母
      if (/[a-zA-Z]/.test(value)) {
        level++
      }
      // 判断字符串中有没有特殊符号
      if (/[^0-9a-zA-Z_]/.test(value)) {
        level++
      }
      this.state.passwordLevel = level
      this.state.percent = level * 30
      if (level >= 2) {
        if (level >= 3) {
          this.state.percent = 100
        }
        callback()
      } else {
        if (level === 0) {
          this.state.percent = 10
        }
        callback(new Error('密码强度不够'))
      }
    },

    handlePasswordCheck(rule, value, callback) {
      let password = this.form.getFieldValue('password')
      //console.log('value', value)
      if (value === undefined) {
        callback(new Error('请输入密码'))
      }
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error('两次密码不一致'))
      }
      callback()
    },

    handlePhoneCheck(rule, value, callback) {
      var params = {
        phone: value
      }
      checkOnlyUser(params).then(res => {
        if (res.success) {
          callback()
        } else {
          callback('手机号已存在!')
        }
      })
    },

    handleSubmit() {
      let that = this
      this.form.validateFields((err, values) => {
        if (!err) {
          let formData = Object.assign(that.model, values)
          formData.id = that.sysuser.id
          httpAction('/sys/user/editForMe', formData, 'put')
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                that.submitSuccess(formData, old_pid == new_pid)
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.close()
            })
        }
      })
    },
    close() {
      this.$emit('close')
    },
    // 根据屏幕变化,设置抽屉尺寸
    resetScreenSize() {
      let screenWidth = document.body.clientWidth
      if (screenWidth < 500) {
        this.drawerWidth = screenWidth
      } else {
        this.drawerWidth = 700
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-upload-wrapper {
  height: 200px;
  width: 100%;
}

.ant-upload-preview {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;

  .upload-icon {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 1.4rem;
    padding: 0.5rem;
    background: rgba(222, 221, 221, 0.7);
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: opacity 0.4s;

    &:hover {
      opacity: 1;
    }

    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }

  img,
  .mask {
    width: 100%;
    max-width: 180px;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>