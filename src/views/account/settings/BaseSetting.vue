<template>
  <div class="page-header-index-wide">
    <a-card
      :bordered="false"
      title="机构信息"
      :bodyStyle="{ padding: '16px 0', height: '100%' }"
      :style="{ height: '100%' }"
    >
      <a-col :span="14" :offset="3">
        <a-form :form="form">
          <a-form-item label="会员全称" :labelCol="{span: 8}" :wrapperCol="{span: 16}">
            <a-input v-decorator="['fullName']" />
          </a-form-item>
          <a-form-item label="会员简称" :labelCol="{span: 8}" :wrapperCol="{span: 16}">
            <a-input v-decorator="['abbreviateName']" />
          </a-form-item>

          <a-form-item label="会员类型" :labelCol="{span: 8}" :wrapperCol="{span: 16}">
            <j-dict-select-tag
              v-decorator="['memberType']"
              :type="'list'"
              :triggerChange="true"
              dictCode="member_type"
            />
          </a-form-item>

          <a-form-item
          prop="businessScope"
           :labelCol="{span: 8}" :wrapperCol="{span: 16}"
          label="经营区域"
          :hidden="false"
          hasFeedback
        >
          <el-cascader
            v-model="businessScope"
            :options="selectOption.city"
            :props="{ expandTrigger: 'hover',label:'title' }"
            style="width: 100%"
            placeholder="请选择经营地区"
            :show-all-levels="false"
            clearable
            filterable
          ></el-cascader>
        </a-form-item>
          <!-- <a-form-item label="经营区域" :labelCol="{span: 8}" :wrapperCol="{span: 16}">
            <a-input v-decorator="['businessScope']" />
          </a-form-item> -->
          <a-form-item label="注册地址" :labelCol="{span: 8}" :wrapperCol="{span: 16}">
            <a-input v-decorator="['regAddress']" />
          </a-form-item>
          <a-form-item label="办公地址" :labelCol="{span: 8}" :wrapperCol="{span: 16}">
            <a-input v-decorator="['businessAddress', valid.businessAddress]" />
          </a-form-item>
          <a-form-item label="法定代表人" :labelCol="{span: 8}" :wrapperCol="{span: 16}">
            <a-input v-decorator="['corporate']" />
          </a-form-item>
          <!-- <a-form-item label="联系人手机号码" :labelCol="{span: 8}" :wrapperCol="{span: 16}">
            <a-input v-decorator="['telephone']"  />
          </a-form-item>-->
          <a-form-item label="部门负责人姓名" :labelCol="{span: 8}" :wrapperCol="{span: 16}">
            <a-input v-decorator="['departLeader']" />
          </a-form-item>

          <a-form-item label="部门负责人联系方式" :labelCol="{span: 8}" :wrapperCol="{span: 16}">
            <a-input v-decorator="['linePhone', valid.linePhone]" />
          </a-form-item>

          <a-form-item label="会员承办部门" :labelCol="{span: 8}" :wrapperCol="{span: 16}">
            <a-input v-decorator="['depart']" />
          </a-form-item>

          <a-form-item label="办公电话" :labelCol="{span: 8}" :wrapperCol="{span: 16}">
            <a-input v-decorator="['businessPhone']" />
          </a-form-item>

          <a-form-item label="注册资本" :labelCol="{span: 8}" :wrapperCol="{span: 16}">
            <a-input v-decorator="['regCapital']" />
          </a-form-item>

          <a-form-item label="机构代码" :labelCol="{span: 8}" :wrapperCol="{span: 16}">
            <a-input v-decorator="['organCode']" disabled/>
          </a-form-item>

          <a-form-item label="存款规模" :labelCol="{span: 8}" :wrapperCol="{span: 16}">
            <a-input v-decorator="['depositScale']" />
          </a-form-item>
          <a-form-item label="贷款规模" :labelCol="{span: 8}" :wrapperCol="{span: 16}">
            <a-input v-decorator="['volumeScale']" />
          </a-form-item>
          <a-form-item label="自营理财规模" :labelCol="{span: 8}" :wrapperCol="{span: 16}">
            <a-input v-decorator="['selfScale']" />
          </a-form-item>
          <a-form-item label="代销理财规模" :labelCol="{span: 8}" :wrapperCol="{span: 16}">
            <a-input v-decorator="['consignmentScale']" />
          </a-form-item>
          <a-form-item label="网点数" :labelCol="{span: 8}" :wrapperCol="{span: 16}">
            <a-input v-decorator="['networkCount']" />
          </a-form-item>
          <a-form-item :labelCol="{span: 8}" :wrapperCol="{span: 16}" label="是否有独立的理财系统">
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
          <!-- <a-form-item :labelCol="{span: 8}" :wrapperCol="{span: 16}" label="签约文件"> -->
            <!-- <el-upload
              class="upload-demo"
              :multiple="true"
              :action="fileUpload"
              :headers="tokenHeaders"
              :on-change="handleChange"
              :file-list="fileList"
              :on-success="uploadSuccess"
              :on-preview="clickImage"
              :on-remove="removeImage"
            >
              <el-button size="small" type="primary">签约文件</el-button>
            </el-upload> -->
            <!-- <div v-for="(item, index) in fileList" :key="index">
              <a href="javascript:;" @click="clickImage(item)">{{item.name}}</a>
            </div> -->
            <!-- <a-upload
              :headers="tokenHeaders"
              :action="fileUpload"
              :multiple="true"
              :file-list="fileList"
              @change="handleChange"
              @preview="clickImage"
            >
              <a-button> <a-icon type="upload" /> 导入 </a-button>
            </a-upload> -->
            <!-- <a-upload :multiple="true" :headers="tokenHeaders" :file-list="fileList" :action="fileUpload" @change="handleChange"
              @preview="clickImage">
              <a-button type="primary" icon="import">导入</a-button>
            </a-upload> -->
          <!-- </a-form-item> -->
          <a-form-item :labelCol="{span: 8}" :wrapperCol="{span: 16}" class="text-right">
            <a-button type="primary" @click="handleSubmit">提交</a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-card>
  </div>
</template>

<script>
import axios from 'axios'
import { getAction, downFile } from '@/api/manage'
import { editOrgan } from '@/api/user'
import { mapGetters } from "vuex";
import { queryFile } from '@/api/api'
import pick from 'lodash.pick'
export default {
  components: {},
  data() {
    return {
      // cropper
      fileUpload: this.proxyUrl + '/zx/common/upload',
      form: this.$form.createForm(this),
      preview: {},
      businessScope: [],
      id: '',
      // sysuser: '',
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
       selectOption: {
        city: []
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      fileList: [
        {
          uid: '-1',
          name: 'xxx.png',
          status: 'done',
          url: 'http://www.baidu.com/xxx.png',
        },
      ],
      option: {
        img: '/avatar2.jpg',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1]
      },
      valid: {
        linePhone: {
          rules: [
            { required: true, message: '部门负责人联系方式号码不能为空!' },
            { pattern: /^1[34578]\d{9}$/, message: '请输入正确的部门负责人联系方式' }
          ]
        },
        businessAddress: {
          rules: [{ required: true, message: '办公地址不能为空!' }]
        }
      }
    }
  },
  created() {
    this.getSelectionData();
  },
  methods: {
    ...mapGetters(["nickname", "avatar","userInfo"]),
    // removeImage(file, fileList) {
    //   let arr = this.phoneForm.signFile.split(',');
    //   arr.forEach((res, index, array) => {
    //     if (res == file.response.result.id) {
    //       array.splice(index, 1);
    //     }
    //   })
    //   this.phoneForm.signFile = arr.join(',');
    //   console.log(this.phoneForm.signFile) 
    // },
    clickImage(file) {
      let fileName = file.name
      let urlEnd = file.response ? file.response.result.url : file.url
      downFile('/sys/common/download/' + urlEnd, null).then(data => {
        this.loading = false
        if (!data) {
          this.$message.warning('文件下载失败')
          return
        }
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
          window.navigator.msSaveBlob(new Blob([data]), fileName + '.xls')
        } else {
          let url = window.URL.createObjectURL(new Blob([data]))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', fileName)
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link) //下载完成移除元素
          window.URL.revokeObjectURL(url) //释放掉blob对象
        }
      })
    },
    // uploadSuccess(response, file, fileList) {
    //   if (!this.phoneForm.signFile) {
    //     this.phoneForm.signFile = response.result.id
    //   } else {
    //     this.phoneForm.signFile = this.phoneForm.signFile + ',' + response.result.id
    //   }
    // },
    handleChange(file) {
      this.fileList = [...file.fileList];
    },
    handleSubmit() {
      let that = this;
      this.form.validateFields((err, values) => {
        if (err) {
          return
        } else {
          let params = {}
          let filesId = '';
          for(let i in this.fileList) {
            if (i == this.fileList.length-1) {
              filesId += this.fileList[i].id
            } else {
              filesId += this.fileList[i].id + ','
            }
          }
          params = Object.assign({}, values, {files: filesId, id: that.id, businessScope: that.businessScope[1]})
          editOrgan(params).then(res => {
            if (res.success) {
              this.$message.success(res.message)
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    initObj() {
      console.log(this.userInfo())
      let that = this;
      let fileList = []
      queryFile({ userid: that.userInfo().id }).then(res2 => {
        res2.result.forEach(res3 => {
          let object = new Object();
          object.name = res3.fileName;
          object.url = res3.url;
          object.id = res3.id;
          object.uid = res3.id;
          fileList.push(object);
        })
        that.fileList = [...fileList]
      })
      that.tokenHeaders = { 'X-Access-Token': this.$ls.get('Access-Token') }
      getAction('/sys/user/userOrgan').then(res => {
        if (res.success) {
          // this.sysuser = res.result;
          that.id = res.result.id;
          let flagId = res.result.businessScope
          that.form.setFieldsValue(
            pick(
              res.result,
              'fullName',
              'abbreviateName',
              'memberType',
              'businessScope',
              'regAddress',
              'businessAddress',
              'corporate',
              'telephone',
              'departLeader',
              'linePhone',
              'depart',
              'businessPhone',
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
        that.selectOption.city.forEach(res => {
          if (!res.children) {
            return
          }
          res.children.forEach(res2 => {
            if (res2.id == flagId) {
              businessScope = [res.id, res2.id]
            }
          })
        })
        that.businessScope = businessScope
        } else {
          console.log(res.message)
        }
      })
    },
    getSelectionData() {
      axios.get('/city.json').then(res => {
        this.selectOption.city = res.data.result
        this.initObj()
      })
    }
  },
  mounted() {
    // axios.get('/city.json').then(res => {
    //   this.selectOption.city = res.data.result
    // })
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