<template>
  <div>
    <md-table v-model="searched" :table-header-color="tableHeaderColor" md-sort="order_id" md-sort-order="asc" md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">工单列表</h1>
        </div>
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="查询工单编号" v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>
      <md-table-empty-state
          md-label="无结果"
          :md-description="`搜素 '${search}' 的结果为空. 请尝试重新输入或联系系统管理员`">
        <md-button class="md-primary md-raised" @click="contactAdmin">联系系统管理员</md-button>
      </md-table-empty-state>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="工单编号" md-sort-by="order_id">{{ item.order_id }}</md-table-cell>
        <md-table-cell md-label="工单类别" md-sort-by="order_type">{{ item.order_type }}</md-table-cell>
        <md-table-cell md-label="工单创建时间" md-sort-by="order_create_time">{{ item.order_create_time }}</md-table-cell>
        <md-table-cell md-label="申报人地点" md-sort-by="order_address">{{ item.order_address }}</md-table-cell>
        <md-table-cell md-label="申报人姓名" md-sort-by="order_requester_name">{{ item.order_requester_name }}</md-table-cell>
        <md-table-cell md-label="维修人员姓名" md-sort-by="order_fixer_name">{{ item.order_fixer_name }}</md-table-cell>
        <md-table-cell md-label="具体问题" md-sort-by="order_issue">{{ item.order_issue }}</md-table-cell>
        <md-table-cell md-label="上门时间" md-sort-by="order_eta">{{ item.order_eta }}</md-table-cell>
        <md-table-cell md-label="状态" md-sort-by="order_status">
          <el-tag :type="getLableColor(item.order_status)" effect="dark">{{ item.order_status }}</el-tag>
        </md-table-cell>
        <md-table-cell md-label="详细信息"><el-button type="primary" @click="dialogTableVisible = true">查看</el-button></md-table-cell>
      </md-table-row>
    </md-table>
    <el-dialog title="详细信息" :visible.sync="dialogTableVisible" style="z-index: 2000">
      <el-table :data="orders">
        <el-table-column property="date" label="日期" width="150"></el-table-column>
        <el-table-column property="name" label="姓名" width="200"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
const toLower = text => {
  return text.toString().toLowerCase()
}

const searchById = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.order_id).includes(toLower(term)))
  }
  return items
}

export default {
  name: "Fix1",
  props: {
    tableHeaderColor: {
      type: String,
      default: "green",
    },
  },
  data()  {
    return {
      search: null,
      searched: [],
      dialogTableVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      orders: [
        {
          order_id: "#00011",
          order_type: "水电类",
          order_create_time: "2021-10-01",
          order_address: "金华市永康市",
          order_requester_name: "施志豪",
          order_fixer_name: "打工人",
          order_phone: "18257871786",
          order_issue: "停电停水了啊，活不下去了啊，领导们！",
          order_eta:"2077-01-01",
          order_status:"已派单",
        },
        {
          order_id: "#00021",
          order_type: "门窗类",
          order_create_time: "2022-10-01",
          order_address: "美国罗德岛",
          order_requester_name: "刘元驰",
          order_fixer_name: "打工人",
          order_phone: "17236381627",
          order_issue: "邻居把我们家前门拆了，住不下去了啊，领导们！",
          order_eta:"2020-01-01",
          order_status:"已完成",
        },
        {
          order_id: "#00031",
          order_type: "机械类",
          order_create_time: "2021-09-01",
          order_address: "浙江省杭州市",
          order_requester_name: "施志豪",
          order_fixer_name: "打工人",
          order_phone: "18257871786",
          order_issue: "怎么又停天然气了啊，真的活不下去了啊，领导们！",
          order_eta:"2077-01-01",
          order_status:"已派单",
        },
        {
          order_id: "#00041",
          order_type: "土木类",
          order_create_time: "2021-06-01",
          order_address: "金华市永康市",
          order_requester_name: "施志豪",
          order_fixer_name: "打工人",
          order_phone: "18257871786",
          order_issue: "家里屋顶漏水",
          order_eta:"2077-01-01",
          order_status:"进行中",
        },
        {
          order_id: "#00051",
          order_type: "电子类",
          order_create_time: "2021-10-10",
          order_address: "浙江省杭州市",
          order_requester_name: "汤鸿涛",
          order_fixer_name: "打工人",
          order_phone: "19283736542",
          order_issue: "电脑显卡烧了，活不下去了啊，领导们！",
          order_eta:"2077-01-01",
          order_status:"未处理",
        },
        {
          order_id: "#00052",
          order_type: "电子类",
          order_create_time: "2021-10-19",
          order_address: "浙江省杭州市",
          order_requester_name: "汤鸿涛",
          order_fixer_name: "打工人",
          order_phone: "19283736542",
          order_issue: "电脑主板烧了，活不下去了啊，领导们！",
          order_eta:"2077-01-01",
          order_status:"未处理",
        },
      ],
    };
  },
  methods:{
    contactAdmin () {
      window.alert('请求已收到')
    },
    searchOnTable () {
      this.searched = searchById(this.orders, this.search)
    },
    getLableColor(item){
      if(item == "未处理"){
        return "danger";
      }
      else if(item == "已派单"){
        return "";
      }
      else if(item == "已完成"){
        return "success";
      }
      else if(item == "进行中"){
        return "warning";
      }
    },
  },
  created () {
    this.searched = this.orders
  },
}
</script>

<style scoped>

</style>