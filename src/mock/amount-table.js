export function getAmountColumns() {
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


export function getAmountData() {
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
          "time": {
            "value": 5,
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
                  "key": "transaction_time",
                  "name": "交易时间"
                },
                "calculator": {
                  "key": 2,
                  "name": "大于等于"
                },
                "value": "",
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
                  "key": "transaction_count",
                  "name": "交易次数"
                },
                "calculator": {
                  "key": 2,
                  "name": "大于等于"
                },
                "value": "2",
                "unit": {
                  "key": "times",
                  "name": "次"
                }
              }
            ]
          }
        }
      }
    });
  }
  return data;
}