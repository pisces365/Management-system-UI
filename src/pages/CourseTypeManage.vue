<!--
 * @FileDescription: 管理员-课程类别管理页面
 * @Author: 刘元驰
 * @Date: 2021
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
          <md-card-header data-background-color="green">
            <h4 class="title">课程类别</h4>
            <p class="category">系统内的所有课程类别</p>
          </md-card-header>
          <md-card-content>
            <!-- 页面加载/运算出错的提示 -->
            <section v-if="errored">
              <h4>很抱歉，出了点问题</h4>
            </section>
            <!-- 页面获取数据为空的提示 -->
            <section v-if="list_empty">
              <h4>课程类别列表为空</h4>
            </section>
            <!-- 页面正在加载的提示 -->
            <section v-if="loading">
              <el-skeleton :rows="6" animated/>
            </section>
            <md-table v-model="searched" md-sort="courseCategory_id" md-sort-order="asc" md-fixed-header
                      v-if="errored === false && loading === false && list_empty === false">
              <md-table-toolbar>
                <div class="md-toolbar-section-start">
                  <h1 class="md-title">课程类别列表</h1>
                </div>
                <md-field md-clearable class="md-toolbar-section-end">
                  <md-input placeholder="查询课程类别编号" v-model="search" @input="searchOnTable"/>
                </md-field>
              </md-table-toolbar>
              <md-table-empty-state
                  v-show="searched_empty"
                  md-label="无结果"
                  :md-description="`搜素 '${search}' 的结果为空. 请尝试重新输入或添加新课程类别`">
                <md-button class="md-primary md-raised" @click="addCourseCategory()">添加课程类别</md-button>
              </md-table-empty-state>
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="课程类别编号" md-sort-by="courseCategoryId">{{
                    item.courseCategoryId
                  }}
                </md-table-cell>
                <md-table-cell md-label="课程类别名称" md-sort-by="courseCategoryName">{{
                    item.courseCategoryName
                  }}
                </md-table-cell>
                <md-table-cell md-label="可选操作">
                  <el-button type="warning" @click="alterSelectedDetails(item)" icon="el-icon-edit"/>
                  <el-button type="danger" @click="open(item)" icon="el-icon-delete"/>
                </md-table-cell>
              </md-table-row>
            </md-table>
            <br>
            <div class="md-layout-item md-size-100 text-right" v-if="errored === false && loading === false && list_empty === false">
              <el-button type="success" @click="addCourseCategory()">新增课程类别</el-button>
            </div>
          </md-card-content>
        </md-card>
        <div>
          <el-dialog title="修改当前课程类别名称" :visible.sync="alterCourseTypeVisible">
            <el-form>
              <el-form-item label="课程类别名称" :label-width="formLabelWidth">
                <!-- 仅更改所用的变量 -->
                <el-input v-model="afterAlterName" autocomplete="off"/>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <!-- 点击按钮执行更新方法 -->
              <el-button type="primary" @click="executeUpdate('update')">确认修改</el-button>
            </div>
          </el-dialog>
          <el-dialog title="新增一个课程类别" :visible.sync="addCourseCategoryVisible">
            <el-form>
              <el-form-item label="课程类别名称" :label-width="formLabelWidth">
                <el-input v-model="addNewName" autocomplete="off"/>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="executeUpdate('new')">确认新增</el-button>
            </div>
          </el-dialog>
        </div>
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
    return items.filter(item => toLower(item.courseCategoryId).includes(toLower(term)))
  }
  return items
}
export default {
  // 调入用于刷新界面的方法
  inject: ['reload'],
  data() {
    return {
      errored: false, // 是否加载出错
      loading: false, // 是否正在加载
      list_empty: false,  // 初始拿到的表单是否为空
      searched_empty: false,  // 查找结果集是否为空
      alterCourseTypeVisible: false,  // 更改类别对话框是否可见
      addCourseCategoryVisible: false,  // 新增类别对话框是否可见
      formLabelWidth: '120px',
      search: null, // 搜索输入的值
      searched: [], // 查找结果集
      alterCourseTypeData: [],  // 修改或删除时取到的当前选择
      afterAlterName: null, // 仅用来记录更改后的类别名称
      addNewName: null, // 仅用来记录新增的类别名称
      course_list: [],  // 用来获取全部课程
    };
  },
  // 初始拿到数据
  created() {
    this.$axios
        .get('http://112.124.35.32:8083/xiangliban/education/selectAllCourses')
        .then(successResponse => {
          this.course_list = successResponse.data; // 将获取的数据保存
          this.list_empty = (this.course_list.length === 0);
        })
        .catch(error => {
          console.log(error) // 记录出错信息
          this.errored = true // 在前端提示用户出错
        })
    this.$axios
        .get('http://112.124.35.32:8083/xiangliban/education/selectAllCourseCategory')
        .then(successResponse => {
          this.courseCategory = successResponse.data; // 将获取的数据保存
          this.list_empty = (this.courseCategory.length === 0);
          this.searched = successResponse.data;
        })
        .catch(error => {
          console.log(error) // 记录出错信息
          this.errored = true // 在前端提示用户出错
        })
        .finally(() => this.loading = false) // 将加载中动画设为不可见
  },
  methods: {
    // 模糊搜索
    searchOnTable() {
      this.searched = searchById(this.courseCategory, this.search)
      this.searched_empty = (!this.searched.isEmpty)
    },
    // 点击修改后调用此方法记录选择的条目
    alterSelectedDetails(item) {
      this.alterCourseTypeData.pop(); // 清理alterCourseTypeData
      this.alterCourseTypeData.push(item); // 放入得到的数据
      this.afterAlterName = item.courseCategoryName;  // 将当前名称放入对话框以便用户修改
      this.alterCourseTypeVisible = true; // 设置修改对话框可见
    },
    // 点击修改后调用此方法打开对话框
    addCourseCategory() {
      this.addCourseCategoryVisible = true;
    },
    // 点击确认更改后调用此方法
    executeUpdate(item) {
      // 如果是要执行更新
      if (item === "update") {
        var params = new URLSearchParams();
        params.append("courseCategoryId", this.alterCourseTypeData[0].courseCategoryId);
        params.append("courseCategoryName", this.afterAlterName);
        this.$axios
            .post('http://112.124.35.32:8083/xiangliban/education/alterCourseCategoryNameById', params)
            .then(successResponse => {
              console.log(successResponse.data);
              this.$message({
                type: 'success',
                message: '课程类别名称已经修改'
              });
              this.alterCourseTypeData.pop(); // 弹出刚刚所保存的条目
              this.afterAlterName = ""; // 清除刚刚输入的新名称
              this.reload();
            }).catch(failResponse => {
          this.$message.error('出错了, 课程类别名称更新失败!');
        })
        // 如果要执行新增
      } else if (item === "new") {
        var params = new URLSearchParams();
        params.append("courseCategoryName", this.addNewName);
        this.$axios
            .post('http://112.124.35.32:8083/xiangliban/education/addCourseCategory', params)
            .then(successResponse => {
              console.log(successResponse.data);
              this.$message({
                type: 'success',
                message: '课程类别已经新增'
              });
              this.addNewName = ""; // 清除刚刚输入的新名称
              this.reload();
            }).catch(failResponse => {
          this.$message.error('出错了, 课程类别新增失败!');
          this.addNewName = "";
        })
      }
    },
    // 点击删除按钮调用此方法, item为当前要删除的条目
    open(item) {
      var count = 0;
      for (var i = 0; i < this.course_list.length; ++i) {
        if (this.course_list[i].courseCategoryId === item.courseCategoryId) {
          count++;
        }
      }
      var alertMessage = "此操作将永久删除该课程类别, 是否继续?";
      if (count !== 0) {
        alertMessage = "有" + count + "个课程都属于此课程类别, 此操作将永久删除该课程类别, 是否继续?";
      }
      this.alterCourseTypeData.push(item);
      this.$confirm(alertMessage, '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = new URLSearchParams();
        params.append("courseCategoryId", item.courseCategoryId);
        this.$axios
            .post('http://112.124.35.32:8083/xiangliban/education/deleteCourseCategory', params)
            .then(successResponse => {
              console.log(successResponse.data);
              this.$message({
                type: 'success',
                message: '课程类别已经删除'
              });
              this.alterCourseTypeData.pop();
              this.reload();
            }).catch(failResponse => {
          this.$message.error('出错了, 删除失败!');
          this.alterCourseTypeData.pop();
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