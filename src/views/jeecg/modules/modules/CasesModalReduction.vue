<template>
  <div class="casesModalReduction">
    <a-form layout="inline">
      <a-row :gutter="24">
        <a-col :col="8" :md="8" class="over">
          <a-form-item label="作案时间">
            <a-date-picker
              placeholder="作案时间"
              format="YYYY-MM-DD HH:mm:ss"
              v-model="upLoadParams.createTime" :disabled="disable"
            />
          </a-form-item>
        </a-col>
        <a-col :col="8" :md="8" class="over">
          <a-form-item label="业务类型">
            <a-select defaultValue="0" style="width: 120px" v-model="upLoadParams.trnType" :disabled="disable">
              <a-select-option v-for="(item, index) in selectList.trnTypes" :key="index" :value="item.itemValue">{{item.itemText}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :col="8" :md="8" class="over">
          <a-form-item label="泄露渠道">
            <a-select defaultValue="0" style="width: 120px" v-model="upLoadParams.leakageChannel" :disabled="disable">
              <a-select-option v-for="(item, index) in selectList.leakageChannels" :key="index" :value="item.itemValue">{{item.itemText}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :col="8" :md="8" class="over">
          <a-form-item label="泄露方式">
            <a-select defaultValue="0" style="width: 120px" v-model="upLoadParams.leakageMode" :disabled="disable">
              <a-select-option v-for="(item, index) in selectList.leakageModes" :key="index" :value="item.itemValue">{{item.itemText}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :col="8" :md="8" class="over">
          <a-form-item label="风险原因">
            <a-select defaultValue="0" style="width: 120px" v-model="upLoadParams.riskReason" :disabled="disable">
              <a-select-option v-for="(item, index) in selectList.riskReasons" :key="index" :value="item.itemValue">{{item.itemText}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :col="8" :md="8" class="over">
          <a-form-item label="手机换绑方式">
            <a-select defaultValue="0" style="width: 120px" v-model="upLoadParams.phoneChangeMethod" :disabled="disable">
              <a-select-option v-for="(item, index) in selectList.phoneChangeMethod" :key="index" :value="item.itemValue">{{item.itemText}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :col="8" :md="8" class="over">
          <a-form-item label="支付方式">
            <a-select defaultValue="0" style="width: 120px" v-model="upLoadParams.paymentMethod" :disabled="disable">
              <a-select-option v-for="(item, index) in selectList.paymentMethods" :key="index" :value="item.itemValue">{{item.itemText}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :col="8" :md="8" class="over">
          <a-form-item label="支付渠道">
            <a-select defaultValue="0" style="width: 120px" v-model="upLoadParams.payChannel" :disabled="disable">
              <a-select-option v-for="(item, index) in selectList.channels" :key="index" :value="item.itemValue">{{item.itemText}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :col="8" :md="8" class="over">
          <a-form-item label="销账渠道">
            <a-select defaultValue="0" style="width: 120px" v-model="upLoadParams.debitChannel" :disabled="disable">
              <a-select-option v-for="(item, index) in selectList.debitChannels" :key="index" :value="item.itemValue">{{item.itemText}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <div v-for="(item, index) in formList" :key="index">
          <a-row :gutter="24">
            <a-col :col="6" :md="6" style="padding-left: 24px;">
              <a-form-item label="资金来源">
                <a-select style="width: 120px" v-model="item.fundSourceType" :disabled="disable">
                  <a-select-option v-for="(item, index) in selectList.fundSourceTypes" :key="index" :value="item.itemValue">{{item.itemText}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :col="6" :md="6">
              <a-form-item label>
                <a-input v-model="item.bank" :disabled="disable"></a-input>
              </a-form-item>
              <a-form-item>
                <span>银行</span>
              </a-form-item>
            </a-col>
            <a-col :col="6" :md="6">
              <a-form-item label>
                <a-input v-model="item.money" :disabled="disable"></a-input>
              </a-form-item>
              <a-form-item>
                <span>元</span>
              </a-form-item>
            </a-col>
            <a-col :col="1" :md="1" v-if="index == 0 && !disable">
              <a-form-item>
                <a-icon type="file-add" @click="addForm"></a-icon>
              </a-form-item>
            </a-col>
            <a-col :col="1" :md="1" v-if="index > 0 && !disable">
              <a-form-item>
                <a-icon type="delete" @click="deleteForm(index)"></a-icon>
              </a-form-item>
            </a-col>
            <a-col :col="1" :md="1" v-if="!disable">
              <a-form-item>
                <a-icon type="reload" @click="resetForm(index)"></a-icon>
              </a-form-item>
            </a-col>
          </a-row>
        </div>
      </a-row>
    </a-form>
  </div>
</template>
<script>
export default {
  name: 'CasesModalReduction',
  props: {
    selectList: {
      type: Object,
      dafault: () => {}
    },
    disable: {
      type: Boolean,
      default: false
    },
    formList: {
      type: Array,
      default: () => [
         {
          fundSourceType: '0',
          bank: '',
          money: 0
        }
      ]
    },
    upLoadParams: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    addForm() {
      let params = {
        source: '0',
        bank: '',
        count: 0
      }
      this.formList.push(params)
    },
    deleteForm(index) {
      this.formList.splice(index, 1);
    },
    resetForm(param) {
      this.formList.forEach((res, index) => {
        if (param == index) {
          this.$set(res, 'fundSourceType', '0');
          this.$set(res, 'bank', '');
          this.$set(res, 'money', 0);
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.over {
  z-index: 1000;
}
</style>