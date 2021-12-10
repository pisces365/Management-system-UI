<template>
  <div class="content">
    <div class="md-layout">
      <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="blue">
            <h4 class="title">管理本村选举类别</h4>
          </md-card-header>
          <md-card-content>
            <md-table v-model="searched" :table-header-color="tableHeaderColor" md-sort="election_type" md-sort-order="asc" @md-selected="onSelect" md-fixed-header>
              <md-table-toolbar>
                <div class="md-toolbar-section-start">
                  <div>
                    <h1 class="md-title">类别列表</h1>
                  </div>
                  <md-button class="md-raised md-primary" data-background-color="yellow" @click="toggleModalAdd">添加类别</md-button>
                </div>
                <md-field md-clearable class="md-toolbar-section-end">
                  <md-input placeholder="查询选举类别" v-model="search" @input="searchOnTable" />
                </md-field>
              </md-table-toolbar>
              <md-table-toolbar slot="md-table-alternate-header" data-background-color="blue" slot-scope="{ count }">
                <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>
                <div class="md-toolbar-section-end">
                  <md-button class="md-raised md-primary" data-background-color="red" @click="delcurtype">删除</md-button>
                </div>
              </md-table-toolbar>
              <md-table-empty-state
                  md-label="无结果"
                  :md-description="`搜素 '${search}' 的结果为空. 请尝试重新输入或添加新类型`">
                <md-button class="md-primary md-raised" @click="toggleModalAdd">添加新类型</md-button>
              </md-table-empty-state>
              <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="multiple" md-auto-select>
                <md-table-cell md-label="选举类别" md-sort-by="election_type">{{ item.election_type }}</md-table-cell>
                <md-table-cell md-label="操作">
                  <md-button class="md-raised md-primary" data-background-color="yellow" @click="toggleModalEdit">编辑</md-button>
                  <md-button class="md-raised md-primary" data-background-color="red" @click="delcurtype">删除</md-button>
                </md-table-cell>
              </md-table-row>
            </md-table>
            <add-election-type v-show="showModal1" v-on:closeme="closemeAdd" class="mypopup"></add-election-type>
            <edit-election-type v-show="showModal2" v-on:closeme="closemeEdit"></edit-election-type>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { AddElectionType,EditElectionType, } from "@/components";

const toLower = text => {
  return text.toString().toLowerCase()
}

const searchById = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.election_type).includes(toLower(term)))
  }
  return items
}

export default {
  components: {
    AddElectionType,
    EditElectionType,
  },
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
  },
  data()  {
    return {
      showModal1:false,
      showModal2:false,
      search: null,
      selected: [],
      searched: [],
      orders: [
        {
          election_type: "村长选举",
        },
        {
          election_type: "村支书选举",
        },
        {
          election_type: "村委换届",
        },
        {
          election_type: "村党支部换届",
        },
      ],
    };
  },
  methods:{
    delcurtype () {
      window.alert('准备删除')
    },
    searchOnTable () {
      this.searched = searchById(this.orders, this.search)
    },
    toggleModalAdd:function(){
      this.showModal1 = !this.showModal1;
    },
    toggleModalEdit:function(){
      this.showModal2 = !this.showModal2;
    },
    closemeAdd:function(){
      this.showModal1 = !this.showModal1;
    },
    closemeEdit:function(){
      this.showModal2 = !this.showModal2;
    },
    onSelect (items) {
      this.selected = items
    },
    getAlternateLabel (count) {
      let plural = ''

      if (count > 1) {
        plural = 's'
      }

      return `选中了${count}个类型`
    },
  },
  created () {
    this.searched = this.orders
  },
};
</script>
<style  lang="scss" scoped>
.md-tabs.md-theme-default.md-primary .md-tabs-navigation {
  background-color: #505050;
}
.md-table + .md-table {
  margin-top: 16px;
}
.mypopup {
  z-index: 1000;
}
</style>