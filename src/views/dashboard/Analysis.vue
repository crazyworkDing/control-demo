<template>
  <div style="margin:auto;width:100%; ">
    <div style="width: 57%; height: 1150px; float: left;margin:10px;">
      <div class="rg_top_btn" style="left:30%;margin-left: 0;">全国交易预警情况分布</div>
      <div style="margin-top: 20px;text-align: center;">
        <!-- <ve-map :data="mapData" height="500px" width="500px"></ve-map> -->
        <div id="main" style="width:100%;height:500px;text-align: center;"></div>
      </div>
      <div class="container-fluid" style="margin-top: 20px; margin-bottom: 0px; ">
        <a-table :columns="tableColumns" :dataSource="tableData" bordered>
          <template slot="name" slot-scope="text">
            <a href="javascript:;">{{text}}</a>
          </template>
        </a-table>
      </div>
    </div>
    <div style="width: 41%;float: left;margin-top:-5px;">
      <div>
        <div style="width: 20%;float:right;margin-right: 5px;" id="right_div1">
          <!-- <div class="tool_tit">
            <span style="position: relative;" id="chanel_time"></span>
            <span style="float: right;font-size: 14px; color: black" id="chanel_type">手机银行</span>
          </div>-->
          <!-- <div class="tool_text">
            <span class="text_span">交易量及占比</span>
          </div>
          <div class="tool_text">
            <span class="left_span" id="chanel_tradeSum">0</span>
            <span class="right_span" id="chanel_tradeAtio">0</span>
          </div>
          <div class="tool_text">
            <span class="text_span" id="chanel_chanel_tradeAmt_tradeAmtAtio">交易金额及占比</span>
          </div>
          <div class="tool_text">
            <span class="left_span" id="chanel_tradeAmt">0</span>
            <span class="right_span" id="chanel_tradeAmtAtio">0</span>
          </div>
          <div class="tool_text">
            <span class="text_span">全渠道交易总量</span>
          </div>
          <div class="tool_text">
            <span class="left_span" style="color: #CC7100" id="all_tradeSum">0</span>
          </div>
          <div class="tool_text">
            <span class="text_span" id="all_channel_tradeAmt">全渠道交易总金额</span>
          </div>
          <div class="tool_text">
            <span class="left_span" style="color: #CC7100" id="all_tradeAmt">0</span>
          </div>-->
        </div>
        <div style="width: 78%;margin-top:15px;">
          <div class="rg_top_btn" style="position: relative;left: 26%;">24小时实时监控交易量曲线</div>
          <div style="width: 100%;">
            <ve-line :data="trade24HData" height="230px" width="100%" :extend="extend"></ve-line>
          </div>
        </div>
      </div>
      <div>
        <!-- <div style="width: 20%;float: right;margin-right: 5px;" id="right_div2">
          <div class="tool_tit">
            <span style="position: relative;" id="exp_time"></span>
            <span style="float: right;font-size: 14px; color: black" id="exp_type">个人网银</span>
          </div>
          <div class="tool_text">
            <span class="text_span alls" id="all_channel_warnnum"></span>
          </div>
          <br />
          <div class="tool_text">
            <span class="left_span" id="warnSum">0</span>
            <span class="right_span" id="warnSumAtio"></span>
          </div>
          <div class="tool_text ">
            <span class="text_span percent">交易阻断及占比</span>
          </div>
          <div class="tool_text">
            <span class="left_span" id="interdictSum">{{ interdictSum }}</span>
            <span class="right_span" id="interdictSumAtio">{{ interdictSumAtio }}</span>
          </div>
          <div class="tool_text">
            <span class="text_span">电话核实及占比</span>
          </div>
          <div class="tool_text">
            <span class="left_span" id="personAgentSum">{{ personAgentSum }}</span>
            <span class="right_span" id="personAgentSumAtio">{{ personAgentSumAtio }}</span>
          </div>
          <div class="tool_text">
            <span class="text_span">加验短信及占比</span>
          </div>
          <div class="tool_text">
            <span class="left_span" id="authenticationSum">{{ authenticationSum }}</span>
            <span class="right_span" id="authenticationSumAtio">{{ authenticationSumAtio }}</span>
          </div>
        </div>-->
        <div style="width: 78%;margin-top:15px;">
          <div class="rg_top_btn" style="position: relative; left: 26%;">实时监控异常预警</div>
          <div style="width: 100%;">
            <ve-line
              :data="realTimeAbnormalData"
              height="200px"
              width="100%"
              :settings="chartSettings"
            ></ve-line>
          </div>
        </div>
      </div>
      <div style="width: 100%;margin-top:15px;">
        <div class="rg_top_btn" style="position: relative; left: 20%;">各业务功能实时预警情况</div>
        <div style="width: 100%;" class="actionChart">
          <ve-line :data="eachBusinessData" height="250px"></ve-line>
        </div>
      </div>
    </div>
    <div style="width: 41%;height: 350px;float: left;margin-top: 20px;" id="info" class="asideInfo">
      <div class="rg_top_btn" style="position: relative; left: 20%;">电核交易处置情况</div>
      <div style="width: 100%;">
        <ve-pie :data="phoneVerfyData" left="-60px"></ve-pie>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getMapinfo,
  getphoneVerifyinfo,
  get24hTradeinfo,
  geteachBusinessinfo,
  getrealTimeAbnormalinfo
} from '@/api/api'
import echarts from 'echarts'
import '../../../node_modules/echarts/map/js/china.js' //引入中国地图
import Vue from 'vue'
import format from '@/utils/format.js'
import VeLine from 'v-charts/lib/line.common'
import VePie from 'v-charts/lib/pie.common'
import VeMap from 'v-charts/lib/map.common'
Vue.component(VeMap.name, VeMap)
Vue.component(VePie.name, VePie)
Vue.component(VeLine.name, VeLine)

export default {
  name: 'chart',
  data() {
    this.extend = {
      series: {
        label: {
          normal: {
            show: true
          }
        }
      }
    }
    this.chartSettings = {
      xAxisType: 'value'
    }
    return {
      warnSum: '',
      warnSumAtio: '',
      interdictSum: '',
      interdictSumAtio: '',
      personAgentSum: '',
      personAgentSumAtio: '',
      authenticationSum: '',
      authenticationSumAtio: '',
      mapData: {
        columns: ['地区', '交易量', '预警量'],
        rows: [{ 地区: '江苏', 交易量: 92134, 预警量: 123 }]
      },
      trade24HData: {
        columns: ['日期', '个人网银', '手机银行'],
        rows: []
      },
      realTimeAbnormalData: {
        columns: ['日期', '全渠道', '个人网银', '手机银行'],
        rows: []
      },
      phoneVerfyData: {
        columns: ['分类', '数据值'],
        rows: []
      },
      eachBusinessData: {
        columns: ['操作', '交易阻断', '电话核实', '加验短信'],
        rows: []
      },
      tableData: [
        {
          key: '1',
          province: '江苏',
          tradeSum: '2000',
          warnSum: '211',
          interdictSum: '21',
          personAgentSum: '1',
          authenticationSum: '1'
        }
      ],
      tableColumns: [
        {
          title: '地区',
          dataIndex: 'province',
          scopedSlots: { customRender: 'province' }
        },
        {
          title: '交易量',
          className: 'tradeSum',
          dataIndex: 'tradeSum'
        },
        {
          title: '预警量',
          dataIndex: 'warnSum'
        },
        {
          title: '交易阻断笔数',
          dataIndex: 'interdictSum'
        },
        {
          title: '电话核实笔数',
          dataIndex: 'personAgentSum'
        },
        {
          title: '加验短信笔数',
          dataIndex: 'authenticationSum'
        }
      ]
    }
  },
  created() {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
    this.mapDataInfo()
    this.phoneVerfyInfo()
    this.trade24HInfo()
    this.eachBusinessInfo()
    this.realTimeAbnormalInfo()
  },
  methods: {
    getOption(data) {
      let array = { rows: [], lines: [] }
      array.rows = data.map((res, index, arr) => {
        return {
          name: res.province,
          value: res.tradeSum
        }
      })
      array.lines = data.map((res, index, arr) => {
        return {
          name: res.province,
          value: res.warnSum
        }
      })
      let option = {
        backgroundColor: 'transparent',
        tooltip: {
          formatter: (values) => {
            return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                + values.name + '：'
                + '</div>'
                + '交易量：' + values.data.value + '<br>'
                + '预警量：' + (values.value - values.data.value)  + '<br>';
          }
        }, // 鼠标移到图里面的浮动提示框
        dataRange: {
          show: false,
          min: 0,
          max: 200,
          text: ['High', 'Low'],
          realtime: true,
          calculable: true,
          color: ['orangered', 'yellow', 'lightskyblue']
        },
        geo: {
          // 这个是重点配置区
          map: 'china', // 表示中国地图
          roam: true,
          label: {
            normal: {
              show: true, // 是否显示对应地名
              textStyle: {
                color: 'rgba(0,0,0,0.4)',
                fontSize: '10px'
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 0, 0, 0.2)'
            },
            emphasis: {
              areaColor: null,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        series: [
          {
            type: 'scatter',
            coordinateSystem: 'geo' // 对应上方配置
          },
          {
            name: '交易量',
            type: 'map',
            geoIndex: 0,
            data: array.rows
          },
          {
            name: '预警量',
            type: 'map',
            geoIndex: 0,
            data: array.lines
          }
        ]
      }
      return option
    },
    drawChn(data) {
      let option = this.getOption(data)
      var myChart = echarts.init(document.getElementById('main'))
      myChart.setOption(option)
    },
    /* 地图数据,全国交易预警情况分布 */
    mapDataInfo() {
      getMapinfo(null).then(res => {
        this.drawChn(res.mapChart)
        // if(res.mapChart) {
        //   var data = [];
        //   for(var i = 0; i < res.mapChart.length; i ++){
        //     var bean = res.mapChart[i];
        //     data.push({
        //         '地区' : bean.province,
        //         '交易量' : bean.tradeSum,
        //         '预警量' : bean.warnSum
        //       }
        //     );
        //   }
        //   this.mapData.rows = data;
        // }
        if (res.table) {
          this.tableData = res.table.records
        }
      })
    },
    /* 电核交易处置情况 */
    phoneVerfyInfo() {
      let that = this
      getphoneVerifyinfo(null).then(res => {
        if (res.RrmsResultReact) {
            that.phoneVerfyData.rows=[{ 分类: '已核实量', 数据值: parseInt(res.RrmsResultReact.allReactYesNum) },{ 分类: '待核实量', 数据值: parseInt(res.RrmsResultReact.allReactNoNum)}];
        }else{
         that.phoneVerfyData.rows=[{ 分类: '已核实量', 数据值: 0 },{ 分类: '待核实量', 数据值: 0 }];
        }
      })
    },

    /* 24小时实时监控交易量曲线 */
    trade24HInfo() {
      let that = this
      that.trade24HData.rows=[];
      get24hTradeinfo(null).then(res => {
        if (res.channel.length) {
          for(var i=0;i<res.channel.length;i++)
          {
              var bean=res.channel[i];
              that.trade24HData.rows.push({ 日期: bean.TIME, 个人网银: bean.pobs_tradeSum, 手机银行: bean.pwap_tradeSum })
          }
        }else{
          that.trade24HData.rows = [{ 日期: format(new Date(), 'YYYY-MM-DD HH:mm:ss'), 个人网银: 0, 手机银行: 0 }]
        }



        console.log('24小时实时监控交易量曲线')
        console.log(res.channel)
      })
    },

    /* 各业务功能实时预警情况 */
    eachBusinessInfo() {
      geteachBusinessinfo(null).then(res => {
        console.log('各业务功能实时预警情况')
        console.log(res.trade)
        var data = []
        for (var i = 0; i < res.trade.length; i++) {
          var bean = res.trade[i]
          data.push({
            操作: bean.scene_name,
            交易阻断: bean.all_tradeSum_interdict,
            电话核实: bean.all_tradeSum_authentication,
            加验短信: bean.all_tradeSum_personAgent
          })
          this.eachBusinessData.rows = data
        }
      })
    },

    /* 实时监控异常预警 */
    realTimeAbnormalInfo() {
      getrealTimeAbnormalinfo(null).then(res => {
        console.log('实时监控异常预警')
        console.log(res)
        let that = this
        that.realTimeAbnormalData.rows=[];
        if (res.release.length) {
            for(var i=0;i<res.release.length;i++)
            {
                var bean=res.release[i];
                that.realTimeAbnormalData.rows.push({ 日期: bean.TIME, 个人网银: bean.pobs_tradeSum, 手机银行: bean.pwap_tradeSum })
            }
        }else{
           that.realTimeAbnormalData.rows = [
                    { 日期: format(new Date(), 'YYYY-MM-DD HH:mm:ss'), 个人网银: 0, 手机银行: 0 }
                  ]
        }
      })
    },

    /*
      每分钟刷新数据
       */
    timer: function() {
      this.mapDataInfo()
      this.phoneVerfyInfo()
      this.trade24HInfo()
      this.eachBusinessInfo()
      this.realTimeAbnormalInfo()
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      setInterval(this.timer, 60000)
    })
  }
}
</script>
<style scoped>
th.ui-th-column div {
  height: 10px;
}
.rg_top_btn {
  width: 240px;
  height: 35px;
  text-align: center;
  line-height: 35px;

  background: url(<%=request.getContextPath()%>/asset/images/title_bg.png);
  background-size: 240px 35px;
  font-size: 16px;
}
.tool_tit span {
  height: 33px;
  line-height: 33px;
  color: white;
  font-size: 12px;
}
.tool_tit {
  border: 1px solid #555c61;
  border-width: 0 0 1px 0;
  padding-top: 4px;
}
.tool_text {
  float: left;
  padding-top: 2px;
  padding-right: 10px;
  white-space: nowrap;
  font-size: 8px;
}

.text_span {
  display: block;
  float: right;
  font-size: 12px;
  padding: 0px;
}
.alls {
  display: block;
  padding: 2px 15px 0 0;
}
.percent {
  display: block;
  float: left;
  padding: 0 25px 0 0;
}
.left_span {
  display: block;
  float: left;
  font-size: 10px;
  padding-left: 0px;
  padding-right: 10px;
  font-weight: bold;
  color: #3eb3bf;
}
.right_span {
  float: right;
  font-size: 10px;
  padding-left: 5px;
  font-weight: bold;
  color: #3eb3bf;
}
</style>