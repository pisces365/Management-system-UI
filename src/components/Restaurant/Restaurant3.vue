<template>
  <div>
    <md-table v-model="searched" :table-header-color="tableHeaderColor" md-sort="delivery_id" md-sort-order="asc" md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">详细信息如下(餐桌号/点单明细/金额）</h1>

        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="查询餐桌号" v-model="search" @input="searchOnTable" />
        </md-field>

      </md-table-toolbar>
      <md-table-empty-state
          md-label="无结果"
          :md-description="`搜素 '${search}' 的结果为空. 请尝试重新输入或联系系统管理员`">
        <md-button class="md-primary md-raised" @click="contactAdmin">联系系统管理员</md-button>
      </md-table-empty-state>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="用户号" md-sort-by="delivery_id">{{ item.delivery_id }}</md-table-cell>
        <md-table-cell md-label="菜品" md-sort-by="delivery_kind">{{ item.delivery_kind }}</md-table-cell>
        <md-table-cell md-label="金额" md-sort-by="delivery_money">{{ item.delivery_money }}</md-table-cell>
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
  name: "Restaurant3",
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
          delivery_id: "一号桌",
          delivery_kind:"扬州炒饭两份",
          delivery_money: "50",

        },
        {
          delivery_id: "二号桌",
          delivery_kind:"扬州炒饭两份",
          delivery_money: "50",
        },
        {
          delivery_id: "三号桌",
          delivery_kind:"扬州炒饭100份",
          delivery_money: "50",
        },
        {
          delivery_id: "四号桌",
          delivery_kind:"扬州炒饭50份",
          delivery_money: "50",
        },
        {
          delivery_id: "五号桌",
          delivery_kind:"扬州炒饭90份",
          delivery_money: "50",
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