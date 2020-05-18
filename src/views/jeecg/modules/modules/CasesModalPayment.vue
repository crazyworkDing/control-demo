<template>
  <div class="casesModalPayment">
    <a-form layout="inline">
      <a-row :gutter="24">
        <a-col :col="8" :md="8">
          <a-form-item label="赔付状态">
            <a-select defaultValue="0" style="width: 120px" v-model="upLoadParams.stateOfPayment" :disabled="disable">
              <a-select-option
                v-for="(item, index) in selectList.stateOfPayments"
                :key="index"
                :value="item.itemValue"
              >{{item.itemText}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :col="8" :md="8">
          <a-form-item label="赔付主体">
            <a-input v-model="upLoadParams.paymain" :disabled="disable"></a-input>
          </a-form-item>
        </a-col>
        <a-col :col="8" :md="8">
          <a-form-item label="赔付金额">
            <a-input v-model="upLoadParams.payprice" :disabled="disable"></a-input>
          </a-form-item>
        </a-col>
        <a-col :col="8" :md="8">
          <a-form-item label="追回状态">
            <a-select defaultValue="0" style="width: 120px" v-model="upLoadParams.retrieve" :disabled="disable">
              <a-select-option
                v-for="(item, index) in selectList.retrieves"
                :key="index"
                :value="item.itemValue"
              >{{item.itemText}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :col="8" :md="8">
          <a-form-item label="追回金额">
            <a-input v-model="upLoadParams.retrievePrice" :disabled="disable"></a-input>
          </a-form-item>
        </a-col>
        <a-col :col="8" :md="8">
          <a-form-item label="赔付方案">
            <a-select
              defaultValue="0"
              style="width: 120px"
              v-model="upLoadParams.compensationScheme"
            :disabled="disable">
              <a-select-option
                v-for="(item, index) in selectList.compensationschemes"
                :key="index"
                :value="item.itemValue"
              >{{item.itemText}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :col="8" :md="8">
          <a-form-item label="报送单位">
            <a-input v-model="upLoadParams.reportUnit" :disabled="disable"></a-input>
          </a-form-item>
        </a-col>
        <a-col :col="8" :md="8">
          <a-form-item label="报送单位联系人">
            <a-input v-model="upLoadParams.reportUnitContact" :disabled="disable"></a-input>
          </a-form-item>
        </a-col>
        <a-col :col="8" :md="8">
          <a-form-item label="报送单位联系电话">
            <a-input
              v-model="upLoadParams.reportUnitPhone" type="number" :disabled="disable"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :col="8" :md="8">
          <a-form-item label="不赔付原因">
            <a-textarea placeholder autosize v-model="upLoadParams.sake" :disabled="disable"/>
          </a-form-item>
        </a-col>
        <a-col :col="8" :md="8">
          <a-form-item label="已采取措施">
            <a-textarea placeholder autosize v-model="upLoadParams.actions" :disabled="disable"/>
          </a-form-item>
        </a-col>
        <a-col :col="8" :md="8">
          <a-form-item label="案件备注">
            <a-textarea placeholder autosize v-model="upLoadParams.comments" :disabled="disable"/>
          </a-form-item>
        </a-col>
        <!-- <a-col :col="8" :md="8" style="margin-top: 20px;">
          <a-upload
            :action="uploadUrl"
            :multiple="true"
            :fileList="fileList"
            @change="handleChange"
          >
            <a-button>
              <a-icon type="upload" />上传案件附件
            </a-button>
          </a-upload>
        </a-col>-->
      </a-row>
    </a-form>
  </div>
</template>
<script>
export default {
  name: 'CasesModalPayment',
  props: {
    selectList: {
      type: Object,
      dafault: () => {}
    },
    disable: {
      type: Boolean,
      default: false
    },
    upLoadParams: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      uploadUrl: '',
      fileList: [
        {
          uid: '-1',
          name: 'xxx.png',
          status: 'done',
          url: 'http://www.baidu.com'
        }
      ]
    }
  },
  methods: {
    handleChange(info) {
      let fileList = [...info.fileList]
      fileList = fileList.slice(-2)
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.url
        }
        return file
      })
      this.fileList = fileList
    }
  }
}
</script>
<style lang="less" scoped>
</style>