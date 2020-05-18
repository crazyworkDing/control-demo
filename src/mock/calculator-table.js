export function getCalculatorColumns() {
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


export function getCalculatorData() {
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
          "child": {
            "major": {
              "key": "user_id",
              "name": "用户号"
            },
            "func": {
              "key": "sum",
              "name": "求和"
            },
            "time": {
              "value": 6,
              "unit": {
                "key": "month",
                "name": "月"
              }
            },
            "object": {
              "filters": [
                {
                  "isor": true,
                  "type": {
                    "key": "compare",
                    "name": "比较型"
                  },
                  "object": {
                    "key": "transaction_amount",
                    "name": "交易金额"
                  },
                  "calculator": {
                    "key": 2,
                    "name": "大于等于"
                  },
                  "value": "777",
                  "unit": {
                    "key": "yuan",
                    "name": "元"
                  }
                }
              ],
              "key": "transaction_count",
              "name": "交易次数"
            }
          },
          "parent": {
            "major": {
              "key": "merchant_id",
              "name": "商户号"
            },
            "func": {
              "key": "distinct",
              "name": "去重"
            },
            "time": {
              "value": 7,
              "unit": {
                "key": "month",
                "name": "月"
              }
            },
            "object": {
              "filters": [
                {
                  "isor": true,
                  "type": {
                    "key": "judge",
                    "name": "判断型"
                  },
                  "object": {
                    "key": "transaction_count",
                    "name": "交易次数"
                  },
                  "calculator": {
                    "key": 2,
                    "name": "大于等于"
                  },
                  "value": "7777",
                  "unit": {
                    "key": "times",
                    "name": "次"
                  }
                }
              ],
              "key": "transaction_count",
              "name": "交易次数"
            }
          },
          "calculator": {
            "key": 2,
            "name": "大于等于"
          }
        }
      }
    });
  }
  return data;
}