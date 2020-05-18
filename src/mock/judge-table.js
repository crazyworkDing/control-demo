export function getJudgeColumns() {
  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      scopedSlots: { customRender: 'name' },
    },
    {
      title: 'age',
      dataIndex: 'age',
      width: '15%',
      scopedSlots: { customRender: 'age' },
    },
    {
      title: 'address',
      dataIndex: 'address',
      width: '40%',
      scopedSlots: { customRender: 'address' },
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      scopedSlots: { customRender: 'operation' },
    },
  ];
  return columns;
}


export function getJudgeData() {
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i.toString(),
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
      condition: {
        "indicator": {
          "name": "指标1",
          "number": "1111",
          "business": {
            "key": "business_2",
            "name": "业务线_2"
          },
          "remark": "备注_1"
        },
        "template": {
          "major": {
            "key": "merchant_id",
            "name": "商户号"
          },
          "restrict": {
            "key": "current",
            "name": "当前"
          },
          "object": {
            "key": "transaction_count",
            "name": "交易次数"
          },
          "calculator": {
            "key": 2,
            "name": "大于等于"
          },
          "value": {
            "key": "enum",
            "name": "枚举值",
            "value": "44444"
          },
          "unit": {
            "key": "times",
            "name": "次"
          }
        }
      }
    });
  }
  return data;
}