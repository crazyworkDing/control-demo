<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    @ok="handleSubmit"
    @cancel="handleCancel"
    cancelText="取消"
  >
    <a-row :gutter="16">
      <a-col :span="24">
        <a-form :form="form">
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="分配给"
          >
            <a-select style="width: 120px" v-model="resultList.checkUser">
              <a-select-option
                  v-for="(item,index) in checkUser"
                  :key="index"
                  :value="item.userId"
                >{{item.username}}</a-select-option>
              </a-select>
            </a-select>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
import { giveTask, patchUser } from '@/api/api'
export default {
  name: 'Distribution',
  data() {
    return {
      title: '分配任务',
      visible: false,
      flag: 1, //判断是核查单的分配还是案件的分配
      checkUser: [],
      form: this.$form.createForm(this),
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      resultList: {
        checkUser: ''
      }
    }
  },
  methods: {
    edit(record) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.resultList.checkUser = this.model.userid
    },
    getValue(params) {
      let str = ''
      this.checkUser.forEach((res, index, array) => {
        if (res.userId == params.targetUser) {
          str = res.username;
          return;
        }
      }); 
      return str;
    },
    handleSubmit() {
      this.model.targetUser = this.resultList.checkUser;
      let obj = {
        targetUser: this.getValue(this.model),
        userid: this.resultList.checkUser
      };
      
      let params = Object.assign(this.model, obj);
      if (this.flag == 1) {
        giveTask(params).then(res => {
          if (res.success) {
            this.$message.success(res.message);
            this.$emit('ok');
            this.visible = false;
          } else {
            this.$message.error(res.message);
          }
        })
      } else {
        patchUser(params).then(res => {
          if (res.success) {
            this.$message.success(res.message);
            this.$emit('ok');
            this.visible = false;
          } else {
            this.$message.error(res.message);
          }
        })
      }
      
    },
    handleCancel() {
      this.visible = false;
    }
  }
}
</script>
<style scoped>
</style>