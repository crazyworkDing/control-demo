/* 条件类型 对象 运算符 值 单位 */
export function getFilterStr(filters) {
  var arr = [];
  for (var i = 0; i < filters.length; i++) {
    var filter = filters[i]
    var isor = (i == 0 ? '' : (filter.isor ? ' 或 ' : '且'))
    var typeDesc = filter.type.name || ' 条件类型 '
    var objDesc = filter.object.name || ' 对象 '
    var calculatorDesc = filter.calculator.name || ' 运算符 '
    var value = filter.value || ' 值 '
    var unit = filter.unit.name || ' 单位 '
    arr.push(isor + typeDesc + objDesc + calculatorDesc + value + unit)
  }
  return ' ( ' + arr.join(', ') + ' ) '
}

export function getDefaultFilter(vm) {
  return {
    isor: true,
    type: {},
    object: {},
    calculator: {},
    value: '',
    unit: {}
  }
}

export function refreshFormModel(field, list) {
  if (field.key) field.name = list.filter(item => field.key === item.key)[0].name;
}

/* for formModel */
function getDefaultRatio() {
  return {
    major: {},
    func: {},
    time: {
      value: 0,
      unit: {},
    },
    object: { filters: [] }
  }
}

export function getRatioFormModel(vm) {
  return {
    child: getDefaultRatio(vm),
    parent: getDefaultRatio(vm)
  }
}

export function getCalculatorFormModel(vm) {
  return {
    child: getDefaultRatio(vm),
    parent: getDefaultRatio(vm),
    calculator: {}
  }

}

export function getAmountFormModel(vm) {
  return {
    major: {},
    time: {
      value: 0,
      unit: {},
    },
    object: { filters: [] }
  }
}

export function getHistoryFormModel() {
  return {
    major: {},
    restrict: {},
    object: { filters: [] }
  }
}

export function getJudgeFormModel(vm) {
  return {
    major: {},
    restrict: {},
    object: {},
    calculator: {},
    value: {}, //key name value
    unit: {}
  }
}

export function getNameFormModel(vm) {
  return {
    object: {},
    calculator: {},
    name: {}
  }
}

export function getCommonFormModel(templateCode) {
  return {
    name: '',
    number: '',
    // business: {},
    remark: '',
    type: '1',
    templateCode
  }
}

/* for modal */
export function setData(vm) {
  vm.$nextTick(() => {
    vm.$refs['indicator-form'].setForm(vm.dataSet.indicator)
    vm.$refs['template-form'].setForm(vm.dataSet.template)
    vm.$refs['display-pannel'].setData(vm.dataSet.template)
  })
}

export function getData(vm) {
  var id = vm.dataSet.id || ''
  var indicator = vm.$refs['indicator-form'].getForm();
  var template = vm.$refs['template-form'].getForm();
  return Object.assign({}, { id, indicator, template })
}

/* for table */
export function getRowData(list, key) {
  return list.filter(item => key === item.key)[0];
}

export function getTableColumns() {
  var columns = [
    // {
    //   title: '指标ID',
    //   dataIndex: 'key',
    //   width: '20%',
    //   scopedSlots: { customRender: 'key' },
    // },
    {
      title: '指标名称',
      dataIndex: 'name',
      width: '40%',
      scopedSlots: { customRender: 'name' },
    },
    {
      title: '指标编号',
      dataIndex: 'number',
      width: '20%',
      scopedSlots: { customRender: 'number' },
    },
    // {
    //   title: '业务线',
    //   dataIndex: 'business',
    //   width: '20%',
    //   scopedSlots: { customRender: 'business' },
    // },
    {
      title: '备注',
      dataIndex: 'remark',
      width: '20%',
      scopedSlots: { customRender: 'remark' },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '20%',
      scopedSlots: { customRender: 'operation' },
    },
  ];
  return columns;
}

export function getTableData(data) {
  var arr = [];
  for (var i = 0; i < data.length; i++) {
    var row = data[i]
    var key = row.id
    var name = row.indicator.name
    var number = row.indicator.number
    // var business = row.indicator.business ? row.indicator.business.name : ''
    var remark = row.indicator.remark
    // var condition = { id: row.id, indicator: row.indicator, template: row.template }
    arr.push({ key, name, number, remark, condition: row })
  }
  return arr;
}