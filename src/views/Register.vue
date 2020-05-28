<template>
  <div class="register">
    <el-container>
      <el-header height="100px">
        <el-row>
          <el-col :span="5" class="title-style">
            <div class="mt8" @click="goToTitle">
              <!-- <svg-icon icon-class="bank"></svg-icon>
              <span class="title">理财代销平台</span>-->
              <img src="@/assets/01.png" class="logo" alt="logo" />
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main class="text-center">
        <el-row>
          <el-col :span="8" :offset="8">
            <el-card>
              <div slot="header" class="clearfix text-left">
                <span style="color: #66B1FF">用户注册</span>
              </div>
              <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="会员注册" name="first">
                  <!-- <el-steps :active="active" finish-status="success" :align-center="true">
                    <el-step title="基本信息"></el-step>
                    <el-step title="部门信息"></el-step>
                    <el-step title="其他信息"></el-step>
                  </el-steps>-->
                  <el-form
                    :model="phoneForm"
                    :rules="phoneRules"
                    ref="phoneFormOne"
                    label-width="54px"
                    class="mt20"
                  >
                    <template v-if="active==0">
                      <el-form-item prop="organId">
                        <span slot="label">
                          <a-icon type="sketch" style="font-size: 20px" />
                        </span>
                        <el-select
                          filterable
                          placeholder="请选择机构全称"
                          v-model="phoneForm.organId"
                          class="text-left width-100percent"
                          v-on:change="fullNameChanged"
                        >
                          <el-option
                            v-for="(item, index) in selectOption.fullName"
                            :key="index"
                            :label="item.fullName"
                            :value="item.id"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <!-- <el-form-item prop="abbreviateName">
                        <span slot="label">
                          <i class="el-icon-user-solid" style="font-size: 20px"></i>
                        </span>
                        <el-input placeholder="请输入会员简称" v-model="phoneForm.abbreviateName"></el-input>
                      </el-form-item>-->

                      <el-form-item prop="username">
                        <span slot="label">
                          <i class="el-icon-user" style="font-size: 20px"></i>
                        </span>
                        <el-input placeholder="请输入联系人姓名" v-model="phoneForm.username"></el-input>
                      </el-form-item>

                      <el-form-item prop="telephone">
                        <span slot="label">
                          <i class="el-icon-mobile-phone" style="font-size: 20px"></i>
                        </span>
                        <el-input placeholder="请输入联系人手机号码" v-model="phoneForm.telephone"></el-input>
                      </el-form-item>

                      <el-form-item prop="password">
                        <span slot="label">
                          <i class="el-icon-goods" style="font-size: 20px"></i>
                        </span>
                        <el-input placeholder="请输入密码" v-model="phoneForm.password" show-password></el-input>
                      </el-form-item>
                      <el-form-item prop="repeatPwd">
                        <span slot="label">
                          <i class="el-icon-goods" style="font-size: 20px"></i>
                        </span>
                        <el-input placeholder="请再次输入密码" v-model="phoneForm.repeatPwd" show-password></el-input>
                      </el-form-item>
                      <el-form-item prop="organCode">
                        <span slot="label">
                          <i class="el-icon-wallet" style="font-size: 20px"></i>
                        </span>
                        <el-input
                          v-model="phoneForm.organCode"
                          placeholder="机构代码"
                          clearable
                          class="text-left width-100percent"
                          disabled
                        >
                          <!-- <el-option v-for="(item, index) in selectOption.organCode" :key="index" :label="item.organCode" :value="item.orgCode"></el-option> -->
                        </el-input>
                      </el-form-item>

                      <el-form-item prop="corporate">
                        <span slot="label">
                          <i class="el-icon-user" style="font-size: 20px"></i>
                        </span>
                        <el-input placeholder="法定代表人" v-model="phoneForm.corporate" disabled></el-input>
                      </el-form-item>

                      <!-- <el-form-item prop="menberType">
                        <span slot="label">
                          <i class="el-icon-notebook-2" style="font-size: 20px"></i>
                        </span>
                        <el-select v-model="phoneForm.menberType" placeholder="请选择会员类型" clearable class="text-left width-100percent">
                          <el-option v-for="(item, index) in selectOption.type" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>-->
                      <!-- <el-form-item prop="businessScope">
                        <span slot="label">
                          <i class="el-icon-notebook-2" style="font-size: 20px"></i>
                      </span>-->
                      <!-- <el-select v-model="phoneForm.businessScope" placeholder="请选择经营地区" clearable filterable class="text-left width-100percent">
                          <el-option v-for="(item, index) in selectOption.city" :key="index" :label="item.citysName" :value="item.citysName"></el-option>
                      </el-select>-->
                      <!-- <el-cascader
                          v-model="phoneForm.businessScope"
                          :options="selectOption.city"
                          :props="{ expandTrigger: 'hover',label:'title' }"
                          style="width: 100%"
                          placeholder="请选择经营地区"
                          :show-all-levels="false"
                          clearable
                          filterable
                          >
                        </el-cascader>
                      </el-form-item>-->
                      <!-- <el-form-item prop="regAddress">
                        <span slot="label">
                          <i class="el-icon-s-home" style="font-size: 20px"></i>
                        </span>
                        <el-input placeholder="请输入注册地址" v-model="phoneForm.regAddress"></el-input>
                      </el-form-item>
                      <el-form-item prop="businessAddress">
                        <span slot="label">
                          <i class="el-icon-position" style="font-size: 20px"></i>
                        </span>
                        <el-input placeholder="请输入办公地址" v-model="phoneForm.businessAddress"></el-input>
                      </el-form-item>
                      <el-form-item prop="corporate">
                        <span slot="label">
                          <i class="el-icon-user" style="font-size: 20px"></i>
                        </span>
                        <el-input placeholder="请输入法定代表人" v-model="phoneForm.corporate"></el-input>
                      </el-form-item>-->
                      <el-form-item class="text-left" prop="signFile">
                        <span slot="label">
                          <i class="el-icon-files" style="font-size: 20px"></i>
                        </span>
                        <el-upload
                          class="upload-demo"
                          :multiple="true"
                          :action="fileUpload"
                          :headers="tokenHeaders"
                          :data="{type: 1}"
                          :on-change="handleChange"
                          :file-list="fileList"
                          :on-success="uploadSuccess"
                          :on-preview="clickImage"
                          :on-remove="removeImage"
                        >
                          <el-button size="small" type="primary">签约文件</el-button>
                          <span style="color: #990033; margin-left: 25px">(注:平台主协议及其补充协议)</span>
                        </el-upload>
                      </el-form-item>
                    </template>
                  </el-form>

                  <!-- <el-form :model="phoneForm" :rules="phoneRules" ref="phoneFormTwo" label-width="54px">
                    <template v-if="active==1">

                      <el-form-item prop="depart">
                        <span slot="label">
                          <i class="el-icon-s-check" style="font-size: 20px"></i>
                        </span>
                        <el-input placeholder="请输入会员承办部门" v-model="phoneForm.depart"></el-input>
                      </el-form-item>
                      
                      <el-form-item prop="businessPhone">
                        <span slot="label">
                          <i class="el-icon-phone-outline" style="font-size: 20px"></i>
                        </span>
                        <el-input placeholder="请输入办公电话" v-model="phoneForm.businessPhone"></el-input>
                      </el-form-item>
                      
                      <el-form-item prop="departLeader">
                        <span slot="label">
                          <i class="el-icon-user" style="font-size: 20px"></i>
                        </span>
                        <el-input placeholder="请输入部门负责人姓名" v-model="phoneForm.departLeader"></el-input>
                      </el-form-item>
                      
                      <el-form-item prop="linePhone">
                        <span slot="label">
                          <i class="el-icon-phone-outline" style="font-size: 20px"></i>
                        </span>
                        <el-input placeholder="请输入部门负责人联系方式" v-model="phoneForm.linePhone"></el-input>
                      </el-form-item>
                    </template>
                  </el-form>-->

                  <!-- <el-form :model="phoneForm" :rules="phoneRules" ref="phoneFormThree" label-width="54px">
                    <template v-if="active==2">
                      <el-form-item prop="regCapital">
                        <span slot="label">
                          <i class="el-icon-money" style="font-size: 20px"></i>
                        </span>
                        <el-input placeholder="请输入注册资本(亿元)" v-model="phoneForm.regCapital"></el-input>
                      </el-form-item>
                      <el-form-item prop="organCode">
                        <span slot="label">
                          <i class="el-icon-wallet" style="font-size: 20px"></i>
                        </span>
                        <el-select v-model="phoneForm.organCode" placeholder="请选择机构" clearable class="text-left width-100percent">
                          <el-option v-for="(item, index) in selectOption.organCode" :key="index" :label="item.title" :value="item.orgCode"></el-option>
                        </el-select>
                        
                      </el-form-item>
                      <el-form-item prop="depositScale">
                        <span slot="label">
                          <i class="el-icon-money" style="font-size: 20px"></i>
                        </span>
                        <el-input placeholder="请输入上一年度存款规模(亿元)" v-model="phoneForm.depositScale"></el-input>
                      </el-form-item>
                      <el-form-item prop="volumeScale">
                        <span slot="label">
                          <i class="el-icon-money" style="font-size: 20px"></i>
                        </span>
                        <el-input placeholder="请输入上一年度贷款规模(亿元)" v-model="phoneForm.volumeScale"></el-input>
                      </el-form-item>
                      <el-form-item prop="selfScale">
                        <span slot="label">
                          <i class="el-icon-money" style="font-size: 20px"></i>
                        </span>
                        <el-input placeholder="请输入上一年度自营理财规模(亿元)" v-model="phoneForm.selfScale"></el-input>
                      </el-form-item>
                      <el-form-item prop="consignmentScale">
                        <span slot="label">
                          <i class="el-icon-money" style="font-size: 20px"></i>
                        </span>
                        <el-input placeholder="请输入上一年度代销理财规模(亿元)" v-model="phoneForm.consignmentScale"></el-input>
                      </el-form-item>
                      <el-form-item prop="networkCount">
                        <span slot="label">
                          <i class="el-icon-menu" style="font-size: 20px"></i>
                        </span>
                        <el-input placeholder="请输入网点数" v-model="phoneForm.networkCount"></el-input>
                      </el-form-item>
                      <el-form-item prop="eleChannel">
                        <span slot="label">
                          <i class="el-icon-notebook-1" style="font-size: 20px"></i>
                        </span>
                        <el-select v-model="phoneForm.eleChannel" placeholder="是否有独立的理财系统" clearable class="text-left width-100percent">
                          <el-option v-for="(item, index) in selectOption.channel" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                  </el-form-item>-->
                  <!-- <el-form-item prop="code">
                        <span slot="label">
                          <i class="el-icon-s-comment" style="font-size: 20px"></i>
                        </span>
                        <el-input placeholder="请输入验证码" v-model="phoneForm.code" style="width: 70%"></el-input>
                        <el-button type="primary" @click="getCode" style="width: 30%">获取验证码</el-button>
                  </el-form-item>-->
                  <!-- <el-form-item>
                        <el-button type="primary" class="width-100percent" @click="phoneRegister">注册</el-button>
                  </el-form-item>-->
                  <!-- <el-form-item>
                        <el-button type="primary" class="width-100percent" @click="$router.push('/login')">返回登录界面</el-button>
                  </el-form-item>-->
                  <!-- </template>
                  </el-form>-->
                  <el-form label-width="54px">
                    <el-form-item v-if="active < 3">
                      <el-button type="primary" @click="$router.push('/user/login')">返回登录界面</el-button>
                      <!-- <el-button type="primary"  @click="last" v-if="active==2 || active==1">上一步</el-button> -->
                      <el-button
                        type="primary"
                        @click="saveToDraft"
                        v-if="active==2 || active==1 || active==0"
                        class="media-small"
                      >保存为草稿</el-button>
                      <!-- <el-button type="primary"  @click="next" class="media-small">下一步</el-button> -->
                      <el-button type="primary" @click="complete">提交</el-button>
                    </el-form-item>
                    <el-form-item v-if="active >= 3" class="mt20">
                      <el-button type="primary" @click="$router.push('/user/login')">返回登录界面</el-button>
                      <el-button type="primary" @click="last" v-if="active==3">上一步</el-button>
                      <el-button type="primary" @click="complete">提交</el-button>
                    </el-form-item>
                    <el-row>
                      <el-col :span="22" :offest="1">
                        <div style="color: #990033">（注:对机构代码和法定代表人有疑问请联系平台管理员</div>
                        <div style="color: #990033">平台管理员联系方式:13913877570）</div>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="找回草稿" name="second">
                  <el-form
                    :model="phoneForm"
                    :rules="phoneRules"
                    ref="phoneFormFour"
                    label-width="54px"
                    class="mt20"
                  >
                    <el-form-item prop="telephone">
                      <span slot="label">
                        <i class="el-icon-mobile-phone" style="font-size: 20px"></i>
                      </span>
                      <el-input
                        placeholder="请输入手机号码"
                        v-model="phoneForm.telephone"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                    <el-form-item prop="password2">
                      <span slot="label">
                        <i class="el-icon-goods" style="font-size: 20px"></i>
                      </span>
                      <el-input
                        placeholder="请输入密码"
                        v-model="phoneForm.password2"
                        show-password
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                    <el-form-item class="mt20">
                      <el-button type="primary" @click="back">提交</el-button>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
                <!-- <el-tab-pane label="邮箱注册" name="second">
                  <el-form :model="emailForm" :rules="emailRules" ref="emailForm" label-width="54px">
                    <el-form-item prop="mail">
                      <span slot="label">
                        <i class="el-icon-position" style="font-size: 20px"></i>
                      </span>
                      <el-input placeholder="请输入邮箱" v-model="emailForm.mail"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                      <span slot="label">
                        <i class="el-icon-goods" style="font-size: 20px"></i>
                      </span>
                      <el-input placeholder="请输入密码" v-model="emailForm.password"></el-input>
                    </el-form-item>
                    <el-form-item prop="repeatPwd">
                      <span slot="label">
                        <i class="el-icon-goods" style="font-size: 20px"></i>
                      </span>
                      <el-input placeholder="请再次输入密码" v-model="emailForm.repeatPwd"></el-input>
                    </el-form-item>
                    <el-form-item prop="code">
                      <span slot="label">
                        <i class="el-icon-s-comment" style="font-size: 20px"></i>
                      </span>
                      <el-input placeholder="请输入验证码" v-model="emailForm.code" style="width: 70%"></el-input>
                      <el-button type="primary" @click="getEmailCode" style="width: 30%">获取验证码</el-button>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" class="width-100percent" @click="emailRegister">注册</el-button>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" class="width-100percent" @click="$router.push('/login')">返回登录界面</el-button>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>-->
              </el-tabs>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import axios from 'axios'
import { registerUser } from '@/api/api'
import { saveToDraft, findDraft, getOrgan, getCity } from '@/api/user'
import { addUser, editUser, queryUserRole, queryall, queryFile } from '@/api/api'
import { downFile } from '@/api/manage'

export default {
  name: 'Register',
  data() {
    return {
      activeName: 'first',
      active: 0,
      fileList: [],
      fileUpload: this.proxyUrl + '/zx/common/upload',
      phoneForm: {
        telephone: '',
        password: '',
        code: '',
        repeatPwd: '',
        fullName: '',
        abbreviateName: '',
        menberType: '',
        businessScope: '',
        regAddress: '',
        businessAddress: '',
        corporate: '',
        businessPhone: '',
        depart: '',
        departLeader: '',
        linePhone: '',
        regCapital: '',
        organCode: '',
        depositScale: '',
        volumeScale: '',
        selfScale: '',
        consignmentScale: '',
        networkCount: '',
        eleChannel: '',
        username: '',
        password2: '',
        signFile: ''
      },
      emailForm: {
        mail: '',
        password: '',
        code: '',
        repeatPwd: ''
      },
      selectOption: {
        fullName: [],
        type: [
          {
            label: '农商银行',
            value: 'A'
          },
          {
            label: '城商银行',
            value: 'B'
          },
          {
            label: '村镇银行',
            value: 'C'
          },
          {
            label: '国有银行',
            value: 'D'
          },
          {
            label: '股份制银行',
            value: 'E'
          },
          {
            label: '政策性银行',
            value: 'F'
          },
          // {
          //   label: '信托公司',
          //   value: 'D'
          //  },
          // {
          //   label: '基金公司',
          //   value: 'E'
          // },
          // {
          //   label: '保险公司',
          //   value: 'F'
          // },
          // {
          //   label: '证券公司',
          //   value: 'J'
          // },
          {
            label: '其他',
            value: 'J'
          }
        ],
        city: [],
        organCode: [],
        channel: [
          {
            label: '是',
            value: '0'
          },
          {
            label: '否',
            value: '1'
          }
        ]
      },
      // phoneRules: {},
      phoneRules: {
        telephone: [
          {
            validator: (rule, value, callback) => {
              if (value == '') {
                callback(new Error('请输入手机号'))
              }
              if (/^1[34578]\d{9}$/.test(value) == false) {
                callback(new Error('请输入正确的手机号'))
              } else {
                callback()
              }
            },
            required: true,
            trigger: 'blur'
          }
        ],
        fullName: [{ required: true, message: '请输入机构全称', trigger: 'blur' }],
        username: [{ required: true, message: '请输入姓名', trigger: 'blur'
            }],

        abbreviateName: [{ required: false, message: '请输入会员简称', trigger: 'blur' }],
        menberType: [{ required: true, message: '请选择会员类型', trigger: 'blur' }],
        regAddress: [{ required: true, message: '请输入注册地址', trigger: 'blur' }],
        businessAddress: [{ required: true, message: '请输入办公地址', trigger: 'blur' }],
        corporate: [{ required: false, message: '请输入法定代表人', trigger: 'blur' }],
        businessPhone: [{ required: true, message: '请输入办公电话', trigger: 'blur' }],
        depart: [{ required: true, message: '请输入会员承办部门', trigger: 'blur' }],
        departLeader: [{ required: true, message: '请输入部门负责人姓名', trigger: 'blur' }],
        linePhone: [{ required: true, message: '请输入部门负责人联系方式', trigger: 'blur' }],
        regCapital: [{ required: false, message: '请输入注册资本', trigger: 'blur' }],
        organCode: [{ required: false, message: '请输入机构代码', trigger: 'blur' }],
        businessScope: [{ required: false, message: '请选择经营地区', trigger: 'blur' }],
        depositScale: [{ required: false, message: '请输入存款规模', trigger: 'blur' }],
        volumeScale: [{ required: false, message: '请输入贷款规模', trigger: 'blur' }],
        selfScale: [{ required: false, message: '请输入自营理财规模', trigger: 'blur' }],
        consignmentScale: [{ required: false, message: '请输入代销理财规模', trigger: 'blur' }],
        networkCount: [{ required: false, message: '请输入网点数', trigger: 'blur' }],
        eleChannel: [{ required: false, message: '请选择是否具有独立的理财系统', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 7, max: 15, message: '长度在 7 到 15 个字符', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 7, max: 15, message: '长度在 7 到 15 个字符', trigger: 'blur' }
        ],
        repeatPwd: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value == '') {
                callback(new Error('请再次输入密码'))
              }
              if (this.phoneForm.password != value) {
                callback(new Error('两次输入密码不一致!'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      },
      // phoneRulesOne: {},
      // phoneRulesTwo: {},
      // phoneRulesThree: {},
      emailRules: {
        mail: [
          {
            validator: (rule, value, callback) => {
              if (value == '') {
                callback(new Error('请输入邮箱'))
              }
              if (value !== '') {
                var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                if (!reg.test(value)) {
                  callback(new Error('请输入有效的邮箱'))
                }
                callback()
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 7, max: 15, message: '长度在 7 到 15 个字符', trigger: 'blur' }
        ],
        repeatPwd: [
          {
            validator: (rule, value, callback) => {
              if (value == '') {
                callback(new Error('请再次输入密码'))
              }
              if (this.emailForm.password != value) {
                callback(new Error('两次输入密码不一致!'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    //根据选择机构名称
    fullNameChanged(result) {
      this.selectOption.fullName.forEach(res => {
        if (res.id == result) {
          this.phoneForm.organCode = res.organCode
          this.phoneForm.corporate = res.corporate
        }
      })
    },
    removeImage(file, fileList) {
      let arr = this.phoneForm.signFile.split(',');
      arr.forEach((res, index, array) => {
        if (res == file.response.result.id) {
          array.splice(index, 1);
        }
      })
      this.phoneForm.signFile = arr.join(',');
      console.log(this.phoneForm.signFile) 
    },
    clickImage(file) {
      // let txt = document.createElement('a');
      // txt.href = file.response? this.proxyUrl+'/sys/common/view/'+file.response.message:file.url;
      // txt.target = '_blank';
      // txt.download = file.response? file.response.message:file.url;
      // txt.click();
      let fileName = file.name
      let urlEnd = file.response ? file.response.message : file.url
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
      // window.open(file.response? this.proxyUrl+'/sys/common/view/'+file.response.message:file.url)
    },
    handleChange(file, fileList) {
       console.log(fileList);
    },
    uploadSuccess(response, file, fileList) {
      if (!this.phoneForm.signFile) {
        this.phoneForm.signFile = response.result.id
      } else {
        this.phoneForm.signFile = this.phoneForm.signFile + ',' + response.result.id
      }
    },
    saveToDraft() {
      let params = Object.assign({}, this.phoneForm, {files: this.phoneForm.signFile, id: null})
      // params.businessScope = params.businessScope[params.businessScope.length - 1]
      saveToDraft(params).then(res => {
        // if (params.linePhone == ""){
        //   this.$message.error("请输入手机号");

        // }esle

        if (res.success) {
          this.$message.success('保存成功');
          this.$router.push('/register');
        } else {
          this.$message.error(res.message);
        }
        // if (this.fileList.length > 0) {
        //   let arrId = []
        //   for (let a = 0; a < that.fileList.length; a++) {
        //     arrId.push(that.fileList[a].response.result.id)
        //   }
        //   if (arrId.length > 0) {
        //     parent.files = arrId.join(',')
        //   }
        // }

        // params.telephone == '' || params.password == ''
        //   ? this.$message.error(res.message)
        //   : this.$router.push('/register') && this.$message.success('保存成功')
      })
    },
    back() {
      let params = {
        username: '',
        password2: ''
      }
      params.username = this.phoneForm.telephone
      params.password = this.phoneForm.password2
      let flag = 0
      this.$refs['phoneFormFour'].validate(valid => {
        if (valid) {
        } else {
          flag++
          return false
        }
      })
      if (flag != 0) {
        return
      }
      findDraft(params).then(res => {
        if (res.success) {
          queryFile({ userid: res.result.userInfo.id }).then(res2 => {
            if (res2.success) {
              console.log(res2)
              this.activeName = 'first'
              this.active = 0
              this.restPhoneForm()
              this.phoneForm = Object.assign({}, res.result.userInfo)
              this.fullNameChanged(this.phoneForm.organId)
              this.phoneForm.password = ''
              this.fileList = []
              res2.result.forEach(res3 => {
                this.fileList.push({
                  name: res3.fileName,
                  url: res3.url,
                  id: res3.id
                })
              })
              // this.fileList = [
              //   {
              //     name: res2.result.userInfo.signFile.split('/')[2],
              //     url: '/sys/common/download/' + res.result.userInfo.signFile
              //   }
              // ]
              this.$message.success(res.message)
            } else {
              console.log(res2.message)
            }
          })
          
        } else {
          this.$message.error(res.message)
        }
      })
    },
    restPhoneForm() {
      this.phoneForm = {
        telephone: '',
        password: '',
        code: '',
        repeatPwd: '',
        fullName: '',
        abbreviateName: '',
        menberType: '',
        businessScope: '',
        regAddress: '',
        businessAddress: '',
        corporate: '',
        businessPhone: '',
        depart: '',
        departLeader: '',
        linePhone: '',
        regCapital: '',
        organCode: '',
        depositScale: '',
        volumeScale: '',
        selfScale: '',
        consignmentScale: '',
        networkCount: '',
        eleChannel: '',
        username: '',
        password2: ''
      }
    },
    complete() {
      this.$refs['phoneFormOne'].validate(valid => {
        if (valid) {
          console.log(this.fileList)
          let str = '';
          for(let i in this.fileList) {
            if (i == this.fileList.length-1) {
              str += this.fileList[i].id
            } else {
              str += this.fileList[i].id + ','
            }
          }
          console.log(this.phoneForm.signFile)
          let params = Object.assign({}, this.phoneForm, {files: this.phoneForm.signFile?this.phoneForm.signFile: str})
          // params.businessScope = params.businessScope[params.businessScope.length - 1]
          // params.organId = params.fullName
          // if (this.fileList.length > 0) {
          //   let arrId = []
          //   for (let a = 0; a < that.fileList.length; a++) {
          //     arrId.push(that.fileList[a].response.result.id)
          //   }
          //   if (arrId.length > 0) {
          //     parent.files = arrId.join(',')
          //   }
          // }

          registerUser(params)
            .then(res => {
              if (res.success) {
                this.$message.success(res.message)
                setTimeout(() => {
                  this.$router.push('/user/login')
                }, 1000)
              } else {
                this.$message.error('注册失败，' + res.message)
              }
            })
            .catch(err => {
              this.$message.error('注册失败，' + res.message)
            })
        } else {
          return false
        }
      })
    },
    handleClick(tab, event) {},
    goToTitle() {
      let title = document.createElement('a')
      title.href = 'http://10.204.145.102:8081/layout/dashboard'
      title.click()
      // document.removeChild(title)
    },
    next() {
      let that = this
      switch (this.active) {
        case 0:
          this.$refs['phoneFormOne'].validate(valid => {
            if (valid) {
              that.active++
            } else {
              that.active = 0
              return false
            }
          })
          break
        case 1:
          this.$refs['phoneFormTwo'].validate(valid => {
            if (valid) {
              that.active++
            } else {
              that.active = 1
              return false
            }
          })
          break
        case 2:
          this.$refs['phoneFormThree'].validate(valid => {
            if (valid) {
              that.active++
            } else {
              that.active = 2
              return false
            }
          })
          break
        default:
          break
      }
      // if (this.active++ > 2) this.active = 0;
    },
    last() {
      this.active--
    },
    getCode() {},
    getEmailCode() {},
    phoneRegister() {
      this.$refs['phoneForm'].validate(valid => {
        if (valid) {
          this.$message.success('注册成功')
        } else {
          return false
        }
      })
    },
    emailRegister() {
      this.$refs['emailForm'].validate(valid => {
        if (valid) {
          this.$message.success('注册成功')
        } else {
          return false
        }
      })
    },
    getBg() {
      document.querySelector('body').style.backgroundImage = "url('/bg.jpg') "
      document.querySelector('body').style.backgroundRepeat = 'no-repeat'
      this.tokenHeaders = { 'X-Access-Token': this.$ls.get('Access-Token') }
      getOrgan(null).then(res => {
        this.selectOption.organCode = res.result
        this.selectOption.fullName = res.result
      })
    }
  },
  mounted() {
    // getCity(null).then(res => {
    //   this.selectOption.city = res.result;
    // })
    axios.get('/city.json').then(res => {
      this.selectOption.city = res.data.result
    })
  },
  created() {
    this.getBg()
  }
}
</script>
<style scoped>
.title-style {
  background-color: transparent;
  cursor: pointer;
}
.title {
  display: inline-block;
  position: relative;
  font-size: 1.7em;
  bottom: 14px;
  color: #fff;
}
@media screen and (max-width: 1601px) {
  .media-small {
    margin-top: 20px;
  }
}
</style>