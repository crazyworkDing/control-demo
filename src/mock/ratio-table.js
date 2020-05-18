export function getRatioColumns() {
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


export function getRatioData() {
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
            "key": "business_1",
            "name": "业务线_1"
          },
          "remark": "备注_1"
        },
        "template": {
          "child": {
            "major": {
              "key": "payee_id",
              "name": "收款方卡号"
            },
            "func": {
              "key": "sum",
              "name": "求和"
            },
            "time": {
              "value": 2,
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
                  "value": "3333",
                  "unit": {
                    "key": "times",
                    "name": "次"
                  }
                },
                {
                  "isor": true,
                  "type": {
                    "key": "compare",
                    "name": "比较型"
                  },
                  "object": {
                    "key": "transaction_time",
                    "name": "交易时间"
                  },
                  "calculator": {
                    "key": 2,
                    "name": "大于等于"
                  },
                  "value": "5555",
                  "unit": {
                    "key": "no_unit",
                    "name": "无单位"
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
              "key": "min"
            },
            "time": {
              "value": 6,
              "unit": {
                "key": "day"
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
                  "value": "66666666",
                  "unit": {
                    "key": "times",
                    "name": "次"
                  }
                }
              ],
              "key": "phone_number",
              "name": "银行预留手机号"
            }
          }
        }
      }
    });
  }
  return data;
}