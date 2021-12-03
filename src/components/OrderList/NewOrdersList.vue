<template>
  <div>
    <md-table v-model="searched" :table-header-color="tableHeaderColor" md-sort="delivery_id" md-sort-order="asc" md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">订单列表</h1>
        </div>
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="查询订单编号" v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>
      <md-table-empty-state
          md-label="无结果"
          :md-description="`搜素 '${search}' 的结果为空. 请尝试重新输入或联系系统管理员`">
        <md-button class="md-primary md-raised" @click="contactAdmin">联系系统管理员</md-button>
      </md-table-empty-state>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="订单编号" md-sort-by="delivery_id">{{ item.delivery_id }}</md-table-cell>
        <!--        <md-table-cell md-label="包裹内容">{{ item.package_details }}</md-table-cell>-->
        <md-table-cell md-label="收件人姓名" md-sort-by="delivery_recipient_name">{{ item.delivery_recipient_name }}</md-table-cell>
        <md-table-cell md-label="期望送达时间" md-sort-by="delivery_eta">{{ item.delivery_eta }}</md-table-cell>
        <md-table-cell md-label="配送附带服务" md-sort-by="delivery_additional_services">{{ item.delivery_additional_services }}</md-table-cell>
        <md-table-cell md-label="详细信息"><md-button class="md-raised md-primary" data-background-color="blue" @click="getDetails1">查看</md-button></md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
const toLower = text => {
  return text.toString().toLowerCase()
}

const searchById = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.delivery_id).includes(toLower(term)))
  }
  return items
}
export default {
  name: "new-orders-list",
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
  },
  data()  {
    return {
      search: null,
      selected: [],
      searched: [],
      orders: [
        {
          delivery_id: "#00001",
          // package_details: "物品1",
          delivery_recipient_name: "cutomer1",
          delivery_eta: "2021-12-05",
          delivery_additional_services: "无",
        },
        {
          delivery_id: "#00002",
          // package_details: "物品2",
          delivery_recipient_name: "cutomer1",
          delivery_eta: "2021-12-06",
          delivery_additional_services: "保价100RMB",
        },
        {
          delivery_id: "#00003",
          // package_details: "物品3",
          delivery_recipient_name: "cutomer3",
          delivery_eta: "2021-12-04",
          delivery_additional_services: "号码隐藏",
        },
        {
          delivery_id: "#00007",
          // package_details: "物品7",
          delivery_recipient_name: "cutomer7",
          delivery_eta: "2021-12-05",
          delivery_additional_services: "无",
        },
        {
          delivery_id: "#00008",
          // package_details: "物品8",
          delivery_recipient_name: "cutomer7",
          delivery_eta: "2021-12-07",
          delivery_additional_services: "无",
        },
        {
          delivery_id: "#00009",
          // package_details: "物品9",
          delivery_recipient_name: "cutomer8",
          delivery_eta: "2021-12-09",
          delivery_additional_services: "配送费不要了",
        },
      ],
    };
  },
  methods:{
    getDetails1(){
      this.$router.push('order-preview')
    },
    contactAdmin () {
      window.alert('请求已收到')
    },
    searchOnTable () {
      this.searched = searchById(this.orders, this.search)
    },
  },
  created () {
    this.searched = this.orders
  },
};
</script>
