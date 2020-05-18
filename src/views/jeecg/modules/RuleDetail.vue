<template>
  <a-card title="触发规则详情">
    <a-table
      :columns="columns"
      :rowkey="(record,index) => index"
      :dataSource="ruleData"
      :pagination="ipagination"
      :loading="loading"
      @change="handleTableChange"
    >
    </a-table>
  </a-card>
</template>

<script>
    export default {
        name: "RuleDetail",
        props: {
            ruleDetail: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                columns: [],
                ruleData: [],
                ipagination:{
                    current: 1,
                    pageSize: 10,
                    pageSizeOptions: ['10', '20', '30'],
                    showTotal: (total, range) => {
                        return range[0] + "-" + range[1] + " 共" + total + "条"
                    },
                    showQuickJumper: true,
                    showSizeChanger: true,
                    total: 0
                },
                loading: false,

            }
        },
        methods: {
            handleTableChange(pagination, filters, sorter) {
                //分页、排序、筛选变化时触发
                //TODO 筛选
                if (Object.keys(sorter).length > 0) {
                    this.isorter.column = sorter.field;
                    this.isorter.order = "ascend" == sorter.order ? "asc" : "desc"
                }
                this.ipagination = pagination;
            },
            getDetail() {
                this.columns = [
                    { title: '触发规则编码', dataIndex: 'ruleCodeing' },
                    { title: '规则名称', dataIndex: 'ruleName'},
                    { title: '规则包', dataIndex: 'rulepackage'},
                    { title: '规则分值', dataIndex: 'ruleScore' },
                    { title: '风险标签', dataIndex: 'riskLabelName'},
                    { title: '管控策略', dataIndex: 'strategyControlName'},
                    { title: '通知策略', dataIndex: 'strategyActionName'}
                ]
                this.ruleData = this.ruleDetail;
            }
        },
        mounted() {
            this.getDetail();
        }
    }
</script>

<style scoped>

</style>