export function getHistoryColumns() {
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


export function getHistoryData() {
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
            "key": "user_id",
            "name": "用户号"
          },
          "restrict": {
            "key": "current",
            "name": "当前"
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
                "value": "22222",
                "unit": {
                  "key": "times",
                  "name": "次"
                }
              },
              {
                "isor": false,
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
                "value": "33333",
                "unit": {
                  "key": "yuan",
                  "name": "元"
                }
              }
            ],
            "key": "transaction_count",
            "name": "交易次数"
          }
        }
      }
    });
  }
  return data;
}