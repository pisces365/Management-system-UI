<template>
  <div>
    <div>
      <div>
        <md-table v-model="searched" :table-header-color="tableHeaderColor" md-sort="election_type" md-sort-order="asc" md-fixed-header>
          <md-table-toolbar>
            <div class="md-toolbar-section-start">
              <h1 class="md-title">选举列表</h1>
              <div class="md-layout-item">
                <md-field>
                  <label>筛选选举类别</label>
                  <md-select v-model="filter1">
                    <md-option key="null">全部</md-option>
                    <md-option v-for="item in mytypes" :key="item.name" :lable="item.name" :value="item.name">
                      {{ item.name }}
                    </md-option>
                  </md-select>
                </md-field>
              </div>
            </div>
            <md-button class="md-icon-button md-dense md-raised md-primary" style="margin-right: 25px;margin-left: 5px" @click="searchOnTable2">
              <md-icon>cached</md-icon>
            </md-button>
            <md-field md-clearable class="md-toolbar-section-end">
              <md-input placeholder="查询选举时间" v-model="search" @input="searchOnTable" />
            </md-field>
          </md-table-toolbar>
          <md-table-empty-state
              md-label="无结果"
              :md-description="`搜素结果为空. 请尝试重新输入或联系系统管理员`">
            <md-button class="md-primary md-raised" @click="contactAdmin">联系系统管理员</md-button>
          </md-table-empty-state>
          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="选举类别" md-sort-by="election_type">{{ item.election_type }}</md-table-cell>
            <md-table-cell md-label="选举主题">{{ item.election_theme }}</md-table-cell>
            <md-table-cell md-label="发布单位">{{ item.election_units }}</md-table-cell>
            <md-table-cell md-label="规则/简介/要求">{{ item.election_rules }}</md-table-cell>
            <md-table-cell md-label="选举时间" md-sort-by="election_time">{{ item.election_time }}</md-table-cell>
            <md-table-cell md-label="操作">
              <md-button  class="md-primary" @click="gotoDetails">详情</md-button>
              <md-button  class="md-danger">删除</md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </div>
    </div>
  </div>
</template>

<script>
const toLower = text => {
  return text.toString().toLowerCase()
}

const searchById = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.election_time).includes(toLower(term)))
  }
  return items
}
const searchById2 = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.election_type).includes(toLower(term)))
  }
  return items
}
export default {
  name: "Election2",
  props: {
    tableHeaderColor: {
      type: String,
      default: "blue",
    },
  },
  data(){
    return {
      search: null,
      filter1: null,
      selected: [],
      searched: [],
      filterType: "",
      mytypes: [
        {
          id: 'election1',
          name: '村长选举',
        },
        {
          id: 'election2',
          name: '村支书选举',
        },
        {
          id: 'election3',
          name: '村委换届',
        },
        {
          id: 'election4',
          name: '村党支部换届',
        },
      ],
      elections: [
        {
          election_type: "村支部选举",
          election_theme: "红色基因",
          election_units: "第一党支部",
          election_rules: "竞选",
          election_time: "11.18下午",
        },
        {
          election_type: "村长选举",
          election_theme: "根正苗红",
          election_units: "第二党支部",
          election_rules: "无记名",
          election_time: "10.01下午",
        },
      ],
    };
  },
  methods:{
    gotoDetails(){
      this.$router.push('election-details-page')
    },
    searchOnTable () {
      this.searched = searchById(this.elections, this.search)
    },
    searchOnTable2 () {
      this.searched = searchById2(this.elections, this.filter1)
    },
    contactAdmin () {
      window.alert('请求已收到')
    },
  },
  created () {
    this.searched = this.elections
  },
}
</script>

<style scoped>

</style>