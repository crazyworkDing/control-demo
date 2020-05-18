// 模板类型
// export const QuotaTemplateData = [
//   {title: '占比模板', id: '1'},
//   {title: '数量模板', id: '2'},
//   {title: '金额模板', id: '3'},
//   {title: '关联统计模板', id: '4'},
//   {title: '单一判断模板', id: '5'},
//   {title: '比较模板', id: '6'},
//   {title: '名单模板', id: '7'},
//   {title: '时间差模板', id: '8'},
//   {title: '四则运算模板', id: '9'},
//   {title: '距离差模板', id: '10'},
//   {title: '历史参数模板', id: '11'},
//   {title: '通用统计模板', id: '12'},
// ];
export type QuotaVariableForPreviewStruct = {
  subjectName?: string[],
  windowWidth?: number,
  windowUnit?: string,
  funcLabel?: string,
  funcExtLabel?: string,
  filterDesc?: string,
  objectName?: string,
  connectorLabel?: string,
  operationLabel?: string,  // 名单模板专用
  operationValue?: string,  // 名单模板专用
};
function getQuotaPreviewString(variable: QuotaVariableForPreviewStruct) {
  let rt = "";
  if(variable.connectorLabel) {
    rt += "<br/><b>" + variable.connectorLabel + "</b><br/>";
  }
  if(variable.subjectName && variable.subjectName.length) {
    rt += "同一【" + variable.subjectName.join(", ") + "】";
  }
  if(variable.windowWidth && variable.windowUnit) {
    rt += "过去" + variable.windowWidth + variable.windowUnit + "内";
  }
  if(variable.filterDesc) {
    rt += variable.filterDesc;
  }
  if(variable.funcLabel && (variable.funcLabel === "当前" || variable.funcLabel === "上一次")) {
    rt += variable.funcLabel;
    if(variable.funcExtLabel) {
      rt += "<span style='color: gray'>（" + variable.funcExtLabel + "）</span>";
    }
  }
  if(variable.objectName) {
    rt += `的<b>${variable.objectName}</b>`;
  }
  if(variable.funcLabel && !(variable.funcLabel === "计数" || variable.funcLabel === "当前" || variable.funcLabel === "上一次")) {
    rt += variable.funcLabel;
    if(variable.funcExtLabel) {
      rt += "<span style='color: gray'>（" + variable.funcExtLabel + "）</span>";
    }
  }
  if(variable.operationLabel && variable.operationValue) {
    rt += `${variable.operationLabel}${variable.operationValue}`;
  }
  return rt;
}
function defaultPreviewCreator(variables: QuotaVariableForPreviewStruct[]) {
  return variables.map(v=>getQuotaPreviewString(v)).join("")
}
export const QuotaTemplateConfig = [
  {
    templateId: 1,
    templateName: "占比模板",
    subjectMax: 3,    // 允许选择主体的最大数量
    returnType: "number",
    returnUnit: "",
    previewRule: (variables: QuotaVariableForPreviewStruct[])=>{
      return defaultPreviewCreator(variables) + "<br/>的比值";
    },
    demo: [
      "【示例1】", "同一商户过去24小时信用卡交易金额，占同一商户过去24小时交易金额总和的比例",
      "【示例2】", "同一用户过去24小时交易金额总和，占同一用户过去6个月交易金额总和的比例",
    ],
    variables: [
      {
        funcNameList: [
          { value: "current", label: "当前"   },
          { value: "history", label: "上一次" },
          { value: "sum",     label: "求和"   },
          { value: "count",   label: "计数"   },
        ],
        connectorList: [],
      },
      {
        funcNameList: [
          { value: "current", label: "当前"   },
          { value: "history", label: "上一次" },
          { value: "sum",     label: "求和"   },
          { value: "count",   label: "计数"   },
        ],
        connectorList: [
          { label: "除以", value: "divide" },
        ],
      },
    ],
  },
  {
    templateId: 2,
    templateName: "数量模板",
    subjectMax: 3,    // 允许选择主体的最大数量
    returnType: "number",
    returnUnit: "",
    previewRule: defaultPreviewCreator,
    demo: [
      "【示例1】", "同一商户过去2小时内，交易时间在1点到3点的交易次数",
      "【示例2】", "统一商户过去1小时内，交易金额大于10000元的交易次数",
    ],
    variables: [
      {
        funcNameList: [
          { value: "count",   label: "计数"   },
        ],
        connectorList: [],
      },
    ],
  },
  {
    templateId: 3,
    templateName: "金额模板",
    subjectMax: 3,    // 允许选择主体的最大数量
    returnType: "number",
    returnUnit: "元",
    previewRule: defaultPreviewCreator,
    demo: [
      "【示例1】", "同一商户过去1小时内，累计交易金额",
      "【示例2】", "同一用户过去5日内，累计购买商品价格大于100元的交易金额",
    ],
    variables: [
      {
        funcNameList: [
          { value: "sum",     label: "求和"   },
        ],
        connectorList: [],
      },
    ],
  },
  {
    templateId: 4,
    templateName: "占位",
    subjectMax: 0,    // 允许选择主体的最大数量
    previewRule: "",
    variables: [],
  },
  {
    templateId: 5,
    templateName: "单一属性模板",
    subjectMax: 3,    // 允许选择主体的最大数量
    returnType: "any",
    previewRule: defaultPreviewCreator,
    variables: [
      {
        funcNameList: [
          { value: "current", label: "当前"   },
        ],
        connectorList: [],
      },
    ],
  },
  {
    templateId: 6,
    templateName: "比较模板",
    subjectMax: 3,    // 允许选择主体的最大数量
    returnType: "bool",
    returnUnit: "",
    previewRule: defaultPreviewCreator,
    demo: [
      "【示例1】", "同一用户，当前操作IP归属地与充值手机号归属地不同",
      "【示例2】", "同一终端，当前交易所在市与上一笔交易所在市不同",
    ],
    variables: [
      {
        funcNameList: [
          { value: "current", label: "当前"   },
          { value: "history", label: "上一次" },
          { value: "sum",     label: "求和"   },
          { value: "count",   label: "计数"   },
        ],
        connectorList: [],
      },
      {
        funcNameList: [
          { value: "current", label: "当前"   },
          { value: "history", label: "上一次" },
          { value: "sum",     label: "求和"   },
          { value: "count",   label: "计数"   },
        ],
        connectorList: [
          { label: ">",  value: ">"  },
          { label: ">=", value: ">=" },
          { label: "<",  value: "<"  },
          { label: "<=", value: "<=" },
          { label: "=",  value: "==" },
          { label: "!=", value: "!=" },
          { label: "字符串等于", value: "equals" },
          { label: "字符串大于", value: "compare_gt" },
          { label: "字符串小于", value: "compare_lt" },
          { label: "字符串大于等于", value: "compare_get" },
          { label: "字符串小于等于", value: "compare_let" },
          { label: "字符串不等于", value: "not_equals" },
          { label: "包含", value: "contains" },
          { label: "不包含", value: "not_contains" },
          { label: "被包含", value: "be_included" },
          { label: "不被包含", value: "not_be_included" },
          { label: "左匹配", value: "left_match" },
          { label: "右匹配", value: "right_match" },
        ],
      },
    ],
  },
  {
    templateId: 7,
    templateName: "名单模板",
    special: "name",
    subjectMax: 3,    // 允许选择主体的最大数量
    returnType: "bool",
    previewRule: defaultPreviewCreator,
    demo: [
      "【示例1】", "当前IP在代理IP名单中",
      "【示例2】", "当前手机号在黑名单中",
    ],
    variables: [
      {
        funcNameList: [
          { value: "current", label: "当前"   },
        ],
        connectorList: [],
      },
    ],
  },
  {
    templateId: 8,
    templateName: "时间差模板",
    subjectMax: 3,    // 允许选择主体的最大数量
    returnType: "number",
    returnUnit: "秒",
    previewRule: defaultPreviewCreator,
    demo: [
      "【示例1】", "同一用户，当前交易时间距离上一次登录时间",
      "【示例2】", "同一银行卡，当前交易时间距离上一次交易时间",
    ],
    variables: [
      {
        funcNameList: [
          { value: "current", label: "当前"   },
        ],
        connectorList: [],
      },
      {
        funcNameList: [
          { value: "history", label: "上一次"   },
        ],
        connectorList: [
          { label: "减", value: "time_subtract" },
        ],
      },
    ],
  },
  {
    templateId: 9,
    templateName: "四则运算模板",
    subjectMax: 3,    // 允许选择主体的最大数量
    returnType: "number",
    returnUnit: "",
    previewRule: defaultPreviewCreator,
    demo: [
      "【示例1】", "【同一用户单日实物商品交易金额总和】,【同一用户过去30天实物交易的日均量】",
      "【示例2】", "同一申请人近三个月内通话次数top10的联系人占通讯录联系人总数的比例",
    ],
    variables: [
      {
        funcNameList: [
          { value: "current", label: "当前"   },
          { value: "history", label: "上一次" },
          { value: "sum",     label: "求和"   },
          { value: "count",   label: "计数"   },
        ],
        connectorList: [],
      },
      {
        funcNameList: [
          { value: "current", label: "当前"   },
          { value: "history", label: "上一次" },
          { value: "sum",     label: "求和"   },
          { value: "count",   label: "计数"   },
        ],
        connectorList: [
          { label: "加", value: "add" },
          { label: "减", value: "subtract" },
          { label: "乘以", value: "multiply" },
          { label: "除以", value: "divide" },
        ],
      },
    ],
  },
  {
    templateId: 10,
    templateName: "距离差模板",
    subjectMax: 3,    // 允许选择主体的最大数量
    returnType: "number",
    returnUnit: "公里",
    previewRule: defaultPreviewCreator,
    demo: [
      "【示例】", "同一用户，当前在电子银行发生交易的地点与上一次交易发生地的距离",
    ],
    variables: [
      {
        funcNameList: [
          { value: "current", label: "当前"   },
        ],
        connectorList: [],
      },
      {
        funcNameList: [
          { value: "history", label: "上一次"   },
        ],
        connectorList: [
          { label: "距离", value: "distance_subtract" },
        ],
      },
    ],
  },
  {
    templateId: 11,
    templateName: "历史参数模板",
    subjectMax: 3,    // 允许选择主体的最大数量
    returnType: "any",
    returnUnit: "",
    previewRule: defaultPreviewCreator,
    demo: [
      "【示例】", "同一商户，上一次交易的返回码",
    ],
    variables: [
      {
        funcNameList: [
          { value: "history", label: "上一次"   },
        ],
        connectorList: [],
      },
    ],
  },
  {
    templateId: 12,
    templateName: "通用统计模板",
    subjectMax: 3,    // 允许选择主体的最大数量
    returnType: "number",
    returnUnit: "",
    previewRule: defaultPreviewCreator,
    variables: [
      {
        funcNameList: [
          { value: "current", label: "当前"   },
          { value: "history", label: "上一次" },
          { value: "sum",     label: "求和"   },
          { value: "count",   label: "计数"   },
          { value: "increase_actual",label: "当前连续递增次数" },
          { value: "decrease_actual",label: "当前连续递减次数" },
          { value: "increase_history",label: "历史最大连续递增次数" },
          { value: "decrease_history",label: "历史最大连续递减次数" },
        ],
        connectorList: [],
      },
    ],
  },
  {
    templateId: 13,
    templateName: "自定义函数模板",
    special: "customFunction",
    returnType: "",
    returnUnit: "",
    subjectMax: 3,    // 允许选择主体的最大数量
    previewRule: null,
    variables: [],
  },
];

export const NameOperation = {
  "name": {
    label: "名单",
    operations: [
      {
        value: 'belong_to',
        label: '属于',
        rule: '($droolsUtil.checkNameList(obj, "value"))',
      },
      {
        value: 'not_belong_to',
        label: '不属于',
        rule: '($droolsUtil.checkNameList(obj, "value")==false)',
      },
    ]
  },
}
export const NumberOperation = {
  "number": {
    label: "数值",
    operations: [
      {
        value: '==',
        label: '=',
        rule: '(obj!=null&&Double.parseDouble(obj.toString())==value)',
      },
      {
        value: '>',
        label: '>',
        rule: '(obj!=null&&Double.parseDouble(obj.toString())>value)',
      },
      {
        value: '<',
        label: '<',
        rule: '(obj!=null&&Double.parseDouble(obj.toString())<value)',
      },
      {
        value: '<=',
        label: '<=',
        rule: '(obj!=null&&Double.parseDouble(obj.toString())<=value)',
      },
      {
        value: '>=',
        label: '>=',
        rule: '(obj!=null&&Double.parseDouble(obj.toString())>=value)',
      },
      {
        value: '!=',
        label: '!=',
        rule: '(obj!=null&&Double.parseDouble(obj.toString())!=value)',
      },
    ]
  },
}
export const StringOperation = {
  "string": {
    label: "字符串",
    operations: [
      {
        value: 'equals',
        label: '=',
        rule: '("value".equals(obj.toString()))',
      },
      {
        value: 'compare_gt',
        label: '>',
        rule: '(obj!=null&&obj.toString().compareTo("value")>0)',
      },
      {
        value: 'compare_lt',
        label: '<',
        rule: '(obj!=null&&obj.toString().compareTo("value")<0)',
      },
      {
        value: 'compare_get',
        label: '>=',
        rule: '(obj!=null&&obj.toString().compareTo("value")>=0)',
      },
      {
        value: 'compare_let',
        label: '<=',
        rule: '(obj!=null&&obj.toString().compareTo("value")<=0)',
      },
      {
        value: 'not_equals',
        label: '!=',
        rule: '(obj!=null&&obj.toString().compareTo("value")!=0)',
      },
      {
        value: 'contains',
        label: '包含',
        rule: '(obj!=null&&obj.toString().contains("value"))',
      },
      {
        value: 'not_contains',
        label: '不包含',
        rule: '(obj==null||obj.toString().contains("value")==false)',
      },
      {
        value: 'be_included',
        label: '被包含',
        rule: '("value".contains(obj.toString()))',
        descRule: 'obj 被 value 包含',
      },
      {
        value: 'not_be_included',
        label: '不被包含',
        rule: '("value".contains(obj.toString())==false)',
        descRule: 'obj 不被 value 包含',
      },
      {
        value: 'left_match',
        label: '左匹配',
        rule: '(obj!=null&&obj.toString().startsWith("value"))',
      },
      {
        value: 'right_match',
        label: '右匹配',
        rule: '(obj!=null&&obj.toString().endsWith("value"))',
      },
    ]
  },
}
export const TimeOperation = {
  "time": {
    label: "时间",
    operations: [
      {
        value: 'time_equals',
        label: '=',
        rule: '(obj!=null&&obj.toString().length()>=14&&obj.toString().substring(8,14).equals("value"))',
      },
      {
        value: 'time_gt',
        label: '>',
        rule: '(obj!=null&&obj.toString().length()>=14&&obj.toString().substring(8,14).compareTo("value")>0)',
      },
      {
        value: 'time_lt',
        label: '<',
        rule: '(obj!=null&&obj.toString().length()>=14&&obj.toString().substring(8,14).compareTo("value")<0)',
      },
      {
        value: 'time_get',
        label: '>=',
        rule: '(obj!=null&&obj.toString().length()>=14&&obj.toString().substring(8,14).compareTo("value")>=0)',
      },
      {
        value: 'time_let',
        label: '<=',
        rule: '(obj!=null&&obj.toString().length()>=14&&obj.toString().substring(8,14).compareTo("value")<=0)',
      },
    ]
  },
}
export const BoolOperation = {
  "bool": {
    label: "布尔",
    operations: [
      {
        value: 'bool_equals',
        label: '=',
        rule: '(obj!=null&&Boolean.parseBoolean(obj.toString())==value)',
      },
    ]
  },
}

class OperationController {
  public readonly list: {[key: string]: any} = {}
  getOperationGroup(value: string): string | undefined {
    for(let key of Object.keys(this.list)) {
      let rule: any = this.list[key].operations.find((item: any)=>item.value===value);
      if(rule) {
        return key;
      }
    }
  }
  getOperationUnit(value: string): any | undefined {
    for(let key of Object.keys(this.list)) {
      let rule: any = this.list[key].operations.find((item: any)=>item.value===value);
      if(rule) {
        return rule;
      }
    }
  }
  getRuleByValue(value: string): string | undefined {
    let unit = this.getOperationUnit(value);
    if(unit) {
      return unit.rule;
    }
  }
  getLabelByValue(value: string): string | undefined {
    let unit = this.getOperationUnit(value);
    if(unit) {
      return unit.label;
    }
  }
  getFilterExp(operation: string, objId: string, value: string): string | undefined {
    let rule = this.getRuleByValue(operation);
    if(rule) {
      rule = rule.replace(/obj/g, "${" + objId + "}").replace(/value/g, value);
    }
    return rule;
  }
  getFilterDesc(operation: string, objName: string, value: string): string {
    let unit = this.getOperationUnit(operation);
    if(unit && unit.descRule) {
      return unit.descRule.replace(/obj/g, objName).replace(/value/g, value);
    } else {
      return `${objName} ${unit.label} ${value}`
    }
  }
}

class FilterOperationController extends OperationController {
  public readonly list = {
    ...NumberOperation,
    ...StringOperation,
    ...TimeOperation,
  }
}
export const filterOperationController = new FilterOperationController();

class RuleOperationController extends OperationController {
  public readonly list = {
    ...NumberOperation,
    ...StringOperation,
    ...TimeOperation,
    ...BoolOperation,
  }
}
export const ruleOperationController = new RuleOperationController();

// 窗口宽度单位
export const WindowWidthUnit = [
  {
    label: '年',
    value: "YEAR",
    target: "d",
    ratio: 365,
  },
  {
    label: '月',
    value: "MONTH",
    target: "d",
    ratio: 30,
  },
  {
    label: '日',
    value: "DAY",
    target: "d",
    ratio: 86400,
  },
  {
    label: '时',
    value: "HOUR",
    target: "h",
    ratio: 3600,
  },
  {
    label: '分',
    value: "MINUTE",
    target: "m",
    ratio: 60,
  },
  {
    label: '秒',
    value: "SECOND",
    target: "s",
    ratio: 1,
  },
];

// 过滤条件使用的单位
export const FilterUnit = [
  {
    label: '无单位',
    value: "none",
    ratio: 1,
  },
  {
    label: '次',
    value: "times",
    ratio: 1,
  },
  {
    label: '个',
    value: "ge",
    ratio: 1,
  },
  {
    label: '张',
    value: "piece",
    ratio: 1,
  },
  {
    label: '万元',
    value: "wan_yuan",
    ratio: 1000000,
  },
  {
    label: '元',
    value: "yuan",
    ratio: 100,
  },
]
