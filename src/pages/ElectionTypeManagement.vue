<!--
 * @FileDescription: 管理员-选举类别管理界面
 * @Author: 刘元驰
 * @Date: 12/15/2021
 * @LastEditors: 刘元驰
 * @LastEditTime: 12/21/2021
 -->
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
            <!-- 页面加载/运算出错的提示 -->
            <section v-if="errored">
              <h4>很抱歉，出了点问题</h4>
            </section>
            <!-- 页面获取数据为空的提示 -->
            <section v-if="list_empty">
              <h4>选举类别列表为空</h4>
            </section>
            <!-- 页面正在加载的提示 -->
            <section v-if="loading">
              <el-skeleton :rows="6" animated/>
            </section>
            <md-table v-model="searched" :table-header-color="tableHeaderColor" md-sort="election_type"
                      md-sort-order="asc" md-fixed-header>
              <md-table-toolbar>
                <div class="md-toolbar-section-start">
                  <div>
                    <h1 class="md-title">类别列表</h1>
                  </div>
                </div>
                <md-field md-clearable class="md-toolbar-section-end">
                  <md-input placeholder="查询选举类别" v-model="search" @input="searchOnTable"/>
                </md-field>
              </md-table-toolbar>
              <md-table-empty-state
                  v-show="searched_empty"
                  md-label="无结果"
                  :md-description="`搜素 '${search}' 的结果为空. 请尝试重新输入或添加新类型`">
                <md-button class="md-primary md-raised" @click="addDialogVisible = true">添加新类型</md-button>
              </md-table-empty-state>
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="选举类别编号" md-sort-by="id">{{ item.id }}</md-table-cell>
                <md-table-cell md-label="选举类别" md-sort-by="name">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="可选操作">
                  <el-button type="warning" icon="el-icon-edit" @click="updateTypeName(item)"/>
                  <el-button type="danger" icon="el-icon-delete" @click="deleteCurrentType(item)"/>
                </md-table-cell>
              </md-table-row>
            </md-table>
            <div class="md-layout-item md-size-100 text-right">
              <!-- 点击此按钮打开新增课程页 -->
              <el-button type="primary" @click="addDialogVisible = true">添加类别</el-button>
            </div>
          </md-card-content>
        </md-card>
      </div>
      <div>
        <el-dialog title="修改一个选举类型" :visible.sync="updateDialogVisible">
          <el-form>
            <el-form-item label="新的选举类型名" :label-width="formLabelWidth">
              <el-input v-model="selected_type_name" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="updateDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="executeUpdate">修 改</el-button>
          </div>
        </el-dialog>
        <el-dialog title="添加一个选举类型" :visible.sync="addDialogVisible">
          <el-form>
            <el-form-item label="选举类型名" :label-width="formLabelWidth">
              <el-input v-model="add_new_name" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addNewType">添 加</el-button>
          </div>
        </el-dialog>
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
    return items.filter(item => toLower(item.id).includes(toLower(term)))
  }
  return items
}
export default {
  // 调入用于刷新界面的方法
  inject: ['reload'],
  components: {},
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      errored: false, // 数据加载是否错误
      loading: false, // 是否正在加载数据
      list_empty: false,  // 初始获取到的数据是否为空
      searched_empty: false,  // 搜素结果是否为空
      addDialogVisible: false,  // 添加类型对话框是否可见
      updateDialogVisible: false, // 更改名称对话框是否可见
      search: null, // 模糊搜索输入
      searched: [], // 模糊搜索结果
      type_list: [],  // 后台获取的全部选举类型
      selected_type_id: null,  // 选中的选举id
      selected_type_name: null,  // 选中的选举name
      add_new_name: null, // 新的选举名称
      formLabelWidth: '120px',
    };
  },
  created() {
    this.$axios
        .get('http://112.124.35.32:8081/xiangliban/vote/allVoteType')
        .then(successResponse => {
          this.type_list = successResponse.data; // 将获取的数据保存
          this.list_empty = (this.type_list.isEmpty) ? true : false; // 将获取数据是否为空保存
          this.searched = this.type_list; // 再次初始化显示的内容
        })
        .catch(error => {
          console.log(error) // 记录出错信息
          this.errored = true // 在前端提示用户出错
        })
        .finally(() => this.loading = false) // 将加载中动画设为不可见
  },

  methods: {
    searchOnTable() {
      this.searched = searchById(this.type_list, this.search)
      this.searched_empty = (this.searched.isEmpty) ? false : true
    },
    updateTypeName(item) {
      this.selected_type_id = item.id;
      this.selected_type_name = item.name;
      this.updateDialogVisible = true;
    },
    executeUpdate() {
      var params = new URLSearchParams();
      params.append("id", this.selected_type_id);
      params.append("name", this.selected_type_name);
      this.$axios
          .post('http://112.124.35.32:8081/xiangliban/vote/updateVoteType', params)
          .then(successResponse => {
            console.log(successResponse.data);
            this.$message({
              type: 'success',
              message: '选举类别名称已经修改'
            });
            this.selected_type_id = ""; // 清除刚刚选中的id
            this.selected_type_name = ""; // 清除刚刚输入的新名称
            this.reload();
          }).catch(failResponse => {
        this.$message.error('出错了, 选举类别名称更新失败!');
      })
    },
    addNewType() {
      var params = new URLSearchParams();
      params.append("name", this.add_new_name);
      this.$axios
          .post('http://112.124.35.32:8081/xiangliban/vote/addVoteType', params)
          .then(successResponse => {
            console.log(successResponse.data);
            this.$message({
              type: 'success',
              message: '选举类别已经增加'
            });
            this.add_new_name = ""; // 清除刚刚选中的id
            this.reload();
          }).catch(failResponse => {
        this.$message.error('出错了, 选举类别增加失败!');
      })
    },
    deleteCurrentType(item) {
      this.$confirm('此操作将永久删除该选举类别, 是否继续?', '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = new URLSearchParams();
        params.append("id", item.id);
        this.$axios
            .post('http://112.124.35.32:8081/xiangliban/vote/deleteVoteType', params)
            .then(successResponse => {
              console.log(successResponse.data);
              this.$message({
                type: 'success',
                message: '选举类别已经删除'
              });
              this.reload();
            }).catch(failResponse => {
          this.$message.error('出错了, 删除失败!');
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
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