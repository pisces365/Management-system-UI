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
            <md-table v-model="searched" :table-header-color="tableHeaderColor" md-sort="election_type"
                      md-sort-order="asc" md-fixed-header>
              <md-table-toolbar>
                <div class="md-toolbar-section-start">
                  <div>
                    <h1 class="md-title">类别列表</h1>
                  </div>
                  <md-button class="md-raised md-primary" data-background-color="yellow"
                             @click="dialogFormVisible = true">添加类别
                  </md-button>
                </div>
                <md-field md-clearable class="md-toolbar-section-end">
                  <md-input placeholder="查询选举类别" v-model="search" @input="searchOnTable"/>
                </md-field>
              </md-table-toolbar>
              <md-table-empty-state
                  md-label="无结果"
                  :md-description="`搜素 '${search}' 的结果为空. 请尝试重新输入或添加新类型`">
                <md-button class="md-primary md-raised" @click="dialogFormVisible = true">添加新类型</md-button>
              </md-table-empty-state>
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="选举类别" md-sort-by="election_type">{{ item.election_type }}</md-table-cell>
                <md-table-cell md-label="操作">
                  <md-button class="md-raised md-primary" data-background-color="yellow"
                             @click="toggleModalEdit(item.id)">编辑
                  </md-button>
                  <md-button class="md-raised md-primary" data-background-color="red" @click="delcurtype">删除</md-button>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </md-card-content>
        </md-card>
      </div>
      <el-dialog title="添加一个选举类型" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="选举类型名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">添 加</el-button>
        </div>
      </el-dialog>
      <el-dialog title="修改一个选举类型" :visible.sync="dialogFormVisible2">
        <el-form :model="form">
          <el-form-item label="新的选举类型名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible2 = false">修 改</el-button>
        </div>
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
    return items.filter(item => toLower(item.election_type).includes(toLower(term)))
  }
  return items
}

export default {
  components: {
  },
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      dialogFormVisible: false,
      dialogFormVisible2: false,
      search: null,
      selected_id: null,
      searched: [],
      orders: [
        {
          id: "ET#001",
          election_type: "村长选举",
        },
        {
          id: "ET#002",
          election_type: "村支书选举",
        },
        {
          id: "ET#003",
          election_type: "村委换届",
        },
        {
          id: "ET#004",
          election_type: "村党支部换届",
        },
      ],

      //WIP
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
    };
  },
  methods: {
    delcurtype() {
      window.alert('准备删除')
    },
    searchOnTable() {
      this.searched = searchById(this.orders, this.search)
    },
    toggleModalEdit: function (id) {
      this.dialogFormVisible2 = true;
      this.selected_id = id;
      console.log(this.selected_id);
    },
  },
  created() {
    this.searched = this.orders
  },
};
</script>
<style lang="scss" scoped>
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