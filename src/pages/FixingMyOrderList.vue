<template>
  <div class="content">
    <md-card>
      <md-card-header data-background-color="green">
        <h4 class="title">报修信息管理（我接单的）</h4>
        <p class="category">在这可以看到我的报修工单的详细信息</p>
      </md-card-header>
      <md-card-content>
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
<!--            <md-table-cell md-label="申报人姓名" md-sort-by="order_requester_name">{{ item.order_requester_name }}</md-table-cell>-->
<!--            <md-table-cell md-label="维修人员姓名" md-sort-by="order_fixer_name">{{ item.order_fixer_name }}</md-table-cell>-->
            <md-table-cell md-label="具体问题" md-sort-by="order_issue">{{ item.order_issue }}</md-table-cell>
<!--            <md-table-cell md-label="上门时间" md-sort-by="order_eta">{{ item.order_eta }}</md-table-cell>-->
            <md-table-cell md-label="状态" md-sort-by="order_status">
              <el-tag :type="getLableColor(item.order_status)" effect="dark">{{ item.order_status }}</el-tag>
            </md-table-cell>
            <md-table-cell md-label="详细信息"><el-button type="primary" @click="getSelectedDetails(item)">查看</el-button></md-table-cell>
          </md-table-row>
        </md-table>
      </md-card-content>
    </md-card>
    <div>
      <el-dialog title="工单详情" :visible.sync="dialogTableVisible">
        <el-tabs :tab-position="tabPosition">
          <el-tab-pane label="详细信息">
            <el-table :data="selected" border style="width: 100%">
              <el-table-column property="order_id" label="工单编号" ></el-table-column>
              <el-table-column property="order_type" label="工单类别"></el-table-column>
              <el-table-column property="order_create_time" label="工单创建时间"></el-table-column>
              <el-table-column property="order_address" label="申报人地点"></el-table-column>
              <el-table-column property="order_requester_name" label="申报人姓名"></el-table-column>
              <el-table-column property="order_phone" label="申报人联系方式"></el-table-column>
              <el-table-column property="order_fixer_name" label="维修人员姓名"></el-table-column>
              <el-table-column property="order_issue" label="具体问题"></el-table-column>
              <el-table-column property="order_eta" label="上门时间"></el-table-column>
              <el-table-column property="order_status" label="状态">
                <template slot-scope="scope">
                  <el-tag :type="getLableColor(scope.row.order_status)" effect="dark">{{ scope.row.order_status }}</el-tag>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="进度追踪">
            <div>
              <el-timeline>
                <el-timeline-item
                    v-for="(activity, index) in activities"
                    :key="index"
                    :type="activity.type"
                    color="#0bbd87"
                    :timestamp="activity.timestamp">
                  {{activity.fix_event}}
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
    </div>
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
      selected: [],
      activities: [{
        fix_event: '已完成',
        timestamp: '2018-04-12 20:46',
        type: 'primary',
      }, {
        fix_event: '维修完成',
        timestamp: '2018-04-03 20:46',
      }, {
        fix_event: '进行中',
        timestamp: '2018-04-03 20:46',
        size: 'large'
      }, {
        fix_event: '已派单',
        timestamp: '2018-04-03 20:46'
      }],
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
          order_type: "电子类",
          order_create_time: "2021-10-10",
          order_address: "浙江省杭州市",
          order_requester_name: "汤鸿涛",
          order_fixer_name: "打工人",
          order_phone: "19283736542",
          order_issue: "电脑显卡烧了，活不下去了啊，领导们！",
          order_eta:"2077-01-01",
          order_status:"进行中",
        },
        {
          order_id: "#00041",
          order_type: "电子类",
          order_create_time: "2021-10-19",
          order_address: "浙江省杭州市",
          order_requester_name: "汤鸿涛",
          order_fixer_name: "打工人",
          order_phone: "19283736542",
          order_issue: "电脑主板烧了，活不下去了啊，领导们！",
          order_eta:"2077-01-01",
          order_status:"已完成",
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
    getSelectedDetails(item){
      this.selected.pop();
      this.selected.push(item);
      this.dialogTableVisible = true;
    },
  },
  created () {
    this.searched = this.orders;
  },
}

</script>
<style>
.md-tabs.md-theme-default.md-info .md-tabs-navigation {
  background-color: #4fc3f7;
}
</style>