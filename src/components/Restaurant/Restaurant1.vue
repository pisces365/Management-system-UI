<template>
  <div>
    <md-table v-model="searched" :table-header-color="tableHeaderColor" md-sort="delivery_id" md-sort-order="asc" md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">用户号/姓名/电话号码/日期/时间段/人数</h1>
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
        <md-table-cell md-label="用户号" md-sort-by="delivery_id">{{ item.delivery_id }}</md-table-cell>
        <md-table-cell md-label="姓名" md-sort-by="delivery_name">{{ item.delivery_name }}</md-table-cell>
        <md-table-cell md-label="电话号码" md-sort-by="delivery_tele">{{ item.delivery_tele }}</md-table-cell>
        <md-table-cell md-label="日期" md-sort-by="delivery_day1">{{ item.delivery_day1 }}</md-table-cell>
        <md-table-cell md-label="时间段" md-sort-by="delivery_day2">{{ item.delivery_day2 }}</md-table-cell>
        <md-table-cell md-label="人数" md-sort-by="delivery_num">{{ item.delivery_num }}</md-table-cell>
        <md-button class="md-raised md-primary" data-background-color="blue" @click="getDetails1">查看</md-button>
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
  name: "Restaurant1",
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
          delivery_name:"sas",
          delivery_tele: "110",
          delivery_day1: "2021-12-05",
          delivery_day2: "中午",
          delivery_num:"10"
        },
        {
          delivery_id: "#00002",
          delivery_name:"abd",
          delivery_tele: "110",
          delivery_day1: "2021-12-05",
          delivery_day2: "夜宵",
          delivery_num:"500"
        },
        {
          delivery_id: "#00003",
          delivery_name:"szh",
          delivery_tele: "110",
          delivery_day1: "2021-12-05",
          delivery_day2: "晚饭",
          delivery_num:"2"
        },
        {
          delivery_id: "#00004",
          delivery_name:"zzz",
          delivery_tele: "110",
          delivery_day1: "2021-12-05",
          delivery_day2: "早饭",
          delivery_num:"2"
        },
        {
          delivery_id: "#00005",
          delivery_name:"ggg",
          delivery_tele: "110",
          delivery_day1: "2021-12-05",
          delivery_day2: "夜宵",
          delivery_num:"25"
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