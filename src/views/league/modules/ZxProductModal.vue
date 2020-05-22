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
    <div>
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
    </div>

    <!-- 产品状态页 -->
    <template v-if="current === 0" @nextStep="nextStep">
      <div>
        <a-form style="margin: 40px auto 0;">
          <a-row>
            <a-col :span="12" style="margin-left: 200px">
              <a-form-item label="产品名称" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入产品名称" v-decorator="['productName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row>
            <a-col :span="12" style="margin-left: 200px">
              <a-form-item label="产品状态" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input-group
                  :compact="true"
                  style="display: inline-block; vertical-align: middle"
                >
                  <a-select placeholder="请选择产品状态" style="width: 314px">
                    <a-select-option value="1">预发行期</a-select-option>
                    <a-select-option value="2">募集期</a-select-option>
                    <a-select-option value="3">存续期</a-select-option>
                  </a-select>
                </a-input-group>
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item :wrapperCol="{span: 19, offset: 5}">
            <a-button
              type="primary"
              @click="nextStep"
              :loading="loading"
              style="margin-left: 275px"
            >下一步</a-button>
            <a-button type="primary" style="margin-left: 8px">导入</a-button>
          </a-form-item>
        </a-form>
      </div>
    </template>

    <!-- 基本信息页 -->
    <template v-if="current === 1" @nextStep="nextStep" @prevStep="prevStep">
      <div>
        <a-form style="margin: 40px auto 0;">
          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="发行行名称" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入发行行名称" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="行内标识码" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入行内标识码" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="发行机构代码" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入发行机构代码" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="产品登记编码" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入产品登记编码" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="理财产品代码" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入理财产品代码" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="业务联络人姓名" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入业务联络人姓名" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="业务联络人手机" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入业务联络人手机" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="产品期限" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入产品期限" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="产品收益类型" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入产品收益类型" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="产品募集方式" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入产品募集方式" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="产品运作模式" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入产品运作模式" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="业绩比较基准%" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入业绩比较基准%" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="募集币种" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入募集币种" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="计划募集金额(元)" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入计划募集金额" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="代销额度" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入代销额度" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="起点销售金额" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入起点销售金额" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="产品风险等级" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入产品风险等级" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="开放模式" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入开放模式" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="预发行截止日" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入预发行截止日" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="募集起始日期" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入募集起始日期" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="募集结束日期" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入募集结束日期" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="产品附件" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入产品附件" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-form-item :wrapperCol="{span: 19, offset: 5}">
            <a-button @click="prevStep" style="margin-left: 275px">上一步</a-button>
            <a-button
              :loading="loading"
              type="primary"
              @click="nextStep"
              style="margin-left: 8px"
            >下一步</a-button>
            <a-button style="margin-left: 8px" type="primary">保存</a-button>
          </a-form-item>
        </a-form>
      </div>
    </template>
    <!-- 其他信息页 -->
    <template v-if="current === 2" @nextStep="nextStep">
      <div>
        <a-form style="margin: 40px auto 0;">
          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="产品审批人姓名" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入产品审批人姓名" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="产品审批人身份证号" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入产品审批人身份证号" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="产品设计人姓名" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入产品设计人姓名" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="产品设计人身份证号" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入产品设计人身份证号" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="投资经理姓名" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入投资经理姓名" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="投资经理身份号" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入投资经理身份号" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="业务联络人座机" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入业务联络人座机" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="业务联络人邮箱" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入业务联络人邮箱" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="资金投向地区" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入资金投向地区" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="产品投资国家或地区(境外)" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入产品投资国家或地区(境外)" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="是否金融同业专属" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入是否金融同业专属" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="理财业务服务模式" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入理财业务服务模式" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="产品资产配置方式" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入产品资产配置方式" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="产品管理模式" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入产品管理模式" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="实际管理人姓名" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入实际管理人姓名" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="产品定价方式" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入产品定价方式" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="产品投资性质" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入产品投资性质" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="是否设置最短持有期限" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入是否设置最短持有期限" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="最短持有期限(天)" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入最短持有期限(天)" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="最短持有期后是否自由赎回" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入最短持有期后是否自由赎回" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-form-item :wrapperCol="{span: 19, offset: 5}">
            <a-button @click="prevStep" style="margin-left: 275px">上一步</a-button>
            <a-button
              type="primary"
              @click="nextStep"
              style="margin-left: 8px"
              :loading="loading"
            >下一步</a-button>
            <a-button style="margin-left: 8px" type="primary">保存</a-button>
          </a-form-item>
        </a-form>
      </div>
    </template>

    <!-- 其他信息页2 -->
    <template v-if="current === 3" @nextStep="nextStep">
      <div>
        <a-form style=" margin: 40px auto 0;">
          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="是否现金管理类" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入是否现金管理类" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="产品销售区域" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入产品销售区域" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="兑付本金币种" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入兑付本金币种" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="兑付收益币种" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入兑付收益币种" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="销售手续费率%" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入销售手续费率%" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="托管费率%" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入托管费率%" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="境内托管机构名称" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入境内托管机构名称" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="境内托管机构代码" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入境内托管机构代码" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="境外托管机构国别" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入境外托管机构国别" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="境外托管机构名称" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入境外托管机构名称" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="投资者风险偏好" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入投资者风险偏好" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="发行机构提前终止权标识" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入发行机构提前终止权标识" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="客户赎回权标识" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入客户赎回权标识" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="产品品牌" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入产品品牌" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="产品期次" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入产品期次" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="投资管理费率" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入投资管理费率" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="合作模式" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入合作模式" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="合作机构名称" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入合作机构名称" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="投资本金到账日" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入投资本金到账日" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="投资收益到账日" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入投资收益到账日" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-form-item :wrapperCol="{span: 19, offset: 5}">
            <a-button @click="prevStep" style="margin-left: 275px">上一步</a-button>
            <a-button
              type="primary"
              @click="nextStep"
              style="margin-left: 8px"
              :loading="loading"
            >下一步</a-button>
            <a-button style="margin-left: 8px" type="primary">保存</a-button>
          </a-form-item>
        </a-form>
      </div>
    </template>

    <!-- 其他信息页3 -->
    <template v-if="current === 4" @nextStep="nextStep">
      <div>
        <a-form style=" margin: 40px auto 0;">
          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="产品增信标识" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入产品增信标识" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="产品增信机构类型" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入产品增信机构类型" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="产品增信形式" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入产品增信形式" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="投资资产种类及比例" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入投资资产种类及比例" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="产品起始日期" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入产品起始日期" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="产品终止日期" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入产品终止日期" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="是否为结构化(分级)产品" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入是否为结构化(分级)产品" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="层级类别" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入层级类别" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="预计客户最低年收益率%" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入预计客户最低年收益率%" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="预计客户最高年收益率%" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入预计客户最高年收益率%" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="平均预计客户年收益率%" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入平均预计客户年收益率%" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="收益率分档情况说明" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入收益率分档情况说明" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="规律开放周期" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入规律开放周期" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="其他规律开放周期 (天)" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入其他规律开放周期 (天)" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="无规律开放说明" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入无规律开放说明" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="首次开放周期起始日" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入首次开放周期起始日" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="节假日是否开放" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入节假日是否开放" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="平均开放次数(年化)" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入平均开放次数(年化)" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="开放期业务" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入开放期业务" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="开放期业务说明" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入开放期业务说明" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="margin-right: 175px">
            <a-col :span="12">
              <a-form-item label="备注" :labelCol="{span: 12}" :wrapperCol="{span: 12}">
                <a-input placeholder="请输入备注" v-decorator="['organName']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-form-item :wrapperCol="{span: 19, offset: 5}">
            <a-button @click="prevStep" style="margin-left: 275px">上一步</a-button>
            <a-button style="margin-left: 8px" type="primary">保存</a-button>
          </a-form-item>
        </a-form>
      </div>
    </template>
    <!-- <a-form-item :wrapperCol="{span: 19, offset: 5}">
          <a-button style="margin-left: 275px" type="primary" @click="nextStep" v-if="next">下一步</a-button>
            <a-button @click="prevStep" style="margin-left: 8px" type="primary" v-if="prev">上一步</a-button>
            
            <a-button style="margin-left: 8px" type="primary" v-if="imp">导入</a-button>
             <a-button style="margin-left: 8px" type="primary" v-if="savePro">保存</a-button>

    </a-form-item>-->
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import { validateDuplicateValue } from '@/utils/util'
import JDate from '@/components/jeecg/JDate'
import JDictSelectTag from '@/components/dict/JDictSelectTag'

export default {
  name: 'ZxProductModal',
  components: {
    JDate,
    JDictSelectTag
  },
  data() {
    return {
      current: 0,
      loading: false,
      steps: [
        {
          title: '产品状态',
          content: 'First-content'
        },
        {
          title: '基本信息',
          content: 'Second-content'
        },
        {
          title: '其他信息',
          content: 'third-content'
        },
        {
          title: '其他信息2',
          content: 'fourth-content'
        },
        {
          title: '其他信息3',
          content: 'fifth-content'
        }
      ],
      form: this.$form.createForm(this),
      title: '操作',
      width: 1300,
      visible: false,
      model: {},
      // labelCol: {
      //   xs: { span: 24 },
      //   sm: { span: 5 }
      // },
      // wrapperCol: {
      //   xs: { span: 24 },
      //   sm: { span: 16 }
      // },

      confirmLoading: false,
      validatorRules: {
        productName: { rules: [] },
        publisher: { rules: [] },
        code: { rules: [] },
        number: { rules: [] },
        mode: { rules: [] },
        recruType: { rules: [] },
        timeType: { rules: [] },
        currency: { rules: [] },
        status: { rules: [] },
        riskLevel: { rules: [] },
        money: { rules: [] },
        recruStart: { rules: [] },
        recruEnd: { rules: [] },
        productStart: { rules: [] },
        productEnd: { rules: [] },
        serviceStart: { rules: [] },
        serviceEnd: { rules: [] },
        days: { rules: [] },
        datum: { rules: [] },
        initialValue: { rules: [] },
        productValue: { rules: [] },
        totalValue: { rules: [] },
        lastYield: { rules: [] },
        revenueType: { rules: [] },
        assetType: { rules: [] },
        productPrice: { rules: [] },
        distributionQuota: { rules: [] },
        regContact: { rules: [] },
        regPhone: { rules: [] }
      },
      url: {
        add: '/product/zxProduct/add',
        edit: '/product/zxProduct/edit'
      }
    }
  },
  created() {},
  methods: {
    nextStep() {
      if (this.current < 4) {
        this.current += 1
      }
    },
    prevStep() {
      if (this.current > 0) {
        this.current -= 1
      }
    },
    finish() {
      this.current = 0
    },
    add() {
      this.edit({})
    },

    edit(record) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.current = 0

      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'productName',
            'publisher',
            'code',
            'number',
            'mode',
            'recruType',
            'timeType',
            'currency',
            'status',
            'riskLevel',
            'money',
            'recruStart',
            'recruEnd',
            'productStart',
            'productEnd',
            'serviceStart',
            'serviceEnd',
            'days',
            'datum',
            'initialValue',
            'productValue',
            'totalValue',
            'lastYield',
            'revenueType',
            'assetType',
            'productPrice',
            'distributionQuota',
            'regContact',
            'regPhone'
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
          'productName',
          'publisher',
          'code',
          'number',
          'mode',
          'recruType',
          'timeType',
          'currency',
          'status',
          'riskLevel',
          'money',
          'recruStart',
          'recruEnd',
          'productStart',
          'productEnd',
          'serviceStart',
          'serviceEnd',
          'days',
          'datum',
          'initialValue',
          'productValue',
          'totalValue',
          'lastYield',
          'revenueType',
          'assetType',
          'productPrice',
          'distributionQuota',
          'regContact',
          'regPhone'
        )
      )
    }
  }
}
</script>
