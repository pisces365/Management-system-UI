<!--
 * @FileDescription: 工作人员-课程管理页面
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
          <md-card-header data-background-color="courseGreen">
            <h4 class="title">课程管理</h4>
            <p class="category">系统内的所有课程</p>
          </md-card-header>
          <md-card-content>
            <!-- 页面加载/运算出错的提示 -->
            <section v-if="errored">
              <h4>很抱歉，出了点问题</h4>
            </section>
            <!-- 页面获取数据为空的提示 -->
            <section v-if="list_empty">
              <h4>课程列表为空</h4>
            </section>
            <!-- 页面正在加载的提示 -->
            <section v-if="loading">
              <el-skeleton :rows="6" animated/>
            </section>
            <div class="md-layout-item md-size-25 md-toolbar-section-end" style="float: right" v-if="errored === false && loading === false && list_empty === false">
              <el-input placeholder="查询课程编号" v-model="search" @input="searchOnTable"/>
            </div>
            <el-table :data="searched" style="width: 100%" max-height="500" v-if="errored === false && loading === false && list_empty === false">
              <el-table-column property="courseId" label="课程编号" fixed sortable></el-table-column>
              <el-table-column property="courseName" label="课程名称" sortable></el-table-column>
              <el-table-column property="courseCategoryName" label="课程类别" sortable></el-table-column>
              <el-table-column property="courseTeacherName" label="课程教师名称" sortable></el-table-column>
              <el-table-column property="courseStatus" label="课程状态" sortable>
                <template slot-scope="scope">
                  <el-tag :type="getLableColor(scope.row.courseStatus)">{{ scope.row.courseStatus }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="可选操作">
                <template slot-scope="scope">
                  <!-- 点击此按钮展示当前条目完整信息 -->
                  <el-button type="primary" @click="getSelectedDetails(scope.row)" icon="el-icon-info" size="mini"/>
                  <!-- 点击此按钮打开修改信息页 -->
                  <el-button type="warning" @click="alterSelectedDetails(scope.row); getAllCourseCategory()"
                             icon="el-icon-edit" size="mini"/>
                  <!-- 点击此按钮二次确认是否删除 -->
                  <el-button type="danger" @click="open(scope.row)" icon="el-icon-delete" size="mini"/>
                </template>
              </el-table-column>
            </el-table>
            <br>
            <div class="md-layout-item md-size-100 text-right"
                 v-if="errored === false && loading === false && list_empty === false">
              <!-- 点击此按钮打开新增课程页 -->
              <el-button type="success" @click="addCourse();getAllCourseCategory()">新增课程</el-button>
            </div>
          </md-card-content>
        </md-card>
        <div>
          <!-- 课程详情对话, 根据变量dialogTableVisible的值展示/关闭 -->
          <el-dialog title="课程详情" :visible.sync="dialogTableVisible">
            <!-- 课程详情 -->
            <el-card class="box-card">
              <div slot="header">
                <span style="font-weight: bold">课程详细信息</span>
              </div>
              <!-- 从selected取数据 -->
              <el-table :data="selected" border style="width: 100%">
                <el-table-column property="courseId" label="课程编号"></el-table-column>
                <el-table-column property="courseName" label="课程名称"></el-table-column>
                <el-table-column property="courseCategoryId" label="课程类别编号"></el-table-column>
                <el-table-column property="courseCategoryName" label="课程类别名称"></el-table-column>
                <el-table-column property="courseLink" label="课程视频链接" :show-overflow-tooltip='true'>
                </el-table-column>
                <el-table-column property="courseStartTime" label="课程开始时间"></el-table-column>
                <el-table-column property="courseEndTime" label="课程结束时间"></el-table-column>
              </el-table>
              <el-table :data="selected" border style="width: 100%">
                <el-table-column property="courseTeacherName" label="课程教师名称"></el-table-column>
                <el-table-column property="courseSections" label="课程节数"></el-table-column>
                <el-table-column property="courseDetails" label="课程详细描述"></el-table-column>
                <el-table-column property="courseFee" label="课程费用"></el-table-column>
                <el-table-column property="courseLike" label="课程收到的赞"></el-table-column>
                <el-table-column property="courseStatus" label="课程状态">
                  <template slot-scope="scope">
                    <el-tag :type="getLableColor(scope.row.courseStatus)">
                      {{ scope.row.courseStatus }}
                    </el-tag>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
            <!-- 课程封面 -->
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-weight: bold">课程封面</span>
              </div>
              <div class="block">
                <!-- 从selected_images逐张取照片 -->
                <el-image v-for="(image,index) in this.selected_images"
                          :src="image"
                          :key="index"
                          :preview-src-list="selected_images">
                </el-image>
              </div>
            </el-card>
          </el-dialog>
          <!-- 修改当前课程信息对话, 根据变量alterCourseVisible的值展示/关闭 -->
          <el-dialog title="修改当前课程信息" :visible.sync="alterCourseVisible">
            <el-card class="box-card">
              <el-form>
                <el-form-item label="课程名称" :label-width="formLabelWidth">
                  <el-input v-model="alterCourseData.courseName" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="课程类别" :label-width="formLabelWidth">
                  <el-select v-model="alterCourseData.courseCategoryId" placeholder="请选择">
                    <!-- 获取全部课程类别供选择 -->
                    <el-option
                        v-for="item in courseCategory"
                        :key="item.courseCategoryId"
                        :label="item.courseCategoryName"
                        :value="item.courseCategoryId">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="课程视频链接" :label-width="formLabelWidth">
                  <el-input v-model="alterCourseData.courseLink" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="课程开始时间" :label-width="formLabelWidth">
                  <el-date-picker
                      v-model="alterCourseData.courseStartTime"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="课程结束时间" :label-width="formLabelWidth">
                  <el-date-picker
                      v-model="alterCourseData.courseEndTime"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="课程教师名称" :label-width="formLabelWidth">
                  <el-input v-model="alterCourseData.courseTeacherName" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="课程节数" :label-width="formLabelWidth">
                  <el-input v-model="alterCourseData.courseSections" type="number" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="课程详细描述" :label-width="formLabelWidth">
                  <el-input v-model="alterCourseData.courseDetails" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="课程费用" :label-width="formLabelWidth">
                  <el-input v-model="alterCourseData.courseFee" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="课程收到的赞" :label-width="formLabelWidth">
                  <el-input v-model="alterCourseData.courseLike" type="number" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="课程状态" :label-width="formLabelWidth">
                  <el-select v-model="alterCourseData.courseStatus" placeholder="请选择课程状态">
                    <el-option label="可报名" value="可报名"></el-option>
                    <el-option label="已结束" value="已结束"></el-option>
                    <el-option label="进行中" value="进行中"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="课程封面" :label-width="formLabelWidth">
                  <el-upload
                      action="#"
                      list-type="picture-card"
                      ref="upload"
                      accept=".jpg, .jpeg, .png"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove"
                      :limit="1"
                      :auto-upload="true"
                      :file-list="fileList"
                      :http-request="manualUpload">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <!-- 图片预览 -->
                  <el-dialog :visible.sync="picPreviewVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </el-form-item>
              </el-form>
            </el-card>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="executeUpdate('update')">确认修改</el-button>
            </div>
          </el-dialog>
          <!-- 新增一门课程信息对话, 根据变量addCourseVisible的值展示/关闭 -->
          <el-dialog title="新增一门课程" :visible.sync="addCourseVisible">
            <el-card class="box-card">
              <el-form>
                <el-form-item label="课程名称" :label-width="formLabelWidth">
                  <el-input v-model="addCourseData.courseName" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="课程类别" :label-width="formLabelWidth">
                  <el-select v-model="addCourseData.courseCategoryId" placeholder="请选择">
                    <el-option
                        v-for="item in courseCategory"
                        :key="item.courseCategoryId"
                        :label="item.courseCategoryName"
                        :value="item.courseCategoryId">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="课程视频链接" :label-width="formLabelWidth">
                  <el-input v-model="addCourseData.courseLink" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="课程开始时间" :label-width="formLabelWidth">
                  <el-date-picker
                      v-model="addCourseData.courseStartTime"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="课程结束时间" :label-width="formLabelWidth">
                  <el-date-picker
                      v-model="addCourseData.courseEndTime"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="课程教师名称" :label-width="formLabelWidth">
                  <el-input v-model="addCourseData.courseTeacherName" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="课程节数" :label-width="formLabelWidth">
                  <el-input v-model="addCourseData.courseSections" type="number" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="课程详细描述" :label-width="formLabelWidth">
                  <el-input v-model="addCourseData.courseDetails" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="课程费用" :label-width="formLabelWidth">
                  <el-input v-model="addCourseData.courseFee" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="课程收到的赞" :label-width="formLabelWidth">
                  <el-input v-model="addCourseData.courseLike" type="number" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="课程状态" :label-width="formLabelWidth">
                  <el-select v-model="addCourseData.courseStatus" placeholder="请选择课程状态">
                    <el-option label="可报名" value="可报名"></el-option>
                    <el-option label="已结束" value="已结束"></el-option>
                    <el-option label="进行中" value="进行中"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="课程封面" :label-width="formLabelWidth">
                  <el-upload
                      action="#"
                      list-type="picture-card"
                      ref="upload"
                      accept=".jpg, .jpeg, .png"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove"
                      :limit="1"
                      :auto-upload="true"
                      :file-list="fileList"
                      :http-request="manualUpload">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="picPreviewVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </el-form-item>
              </el-form>
            </el-card>
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
    return items.filter(item => toLower(item.courseId).includes(toLower(term)))
  }
  return items
}
export default {
  // 调入用于刷新界面的方法
  inject: ['reload'],
  data() {
    return {
      errored: false, // 数据加载是否错误
      loading: false, // 是否正在加载数据
      list_empty: false,  // 初始获取到的数据是否为空
      searched_empty: false,  // 搜素结果是否为空
      dialogTableVisible: false,  // 详情弹窗是否可见
      alterCourseVisible: false,  // 更改详情弹窗是否可见
      addCourseVisible: false,  // 增加课程弹窗是否可见
      formLabelWidth: '120px',
      search: null, // 模糊搜素的输入
      selected: [], // 当前选择的条目
      searched: [], // 模糊搜索结果
      course_list: [],  // 页面初始化时获取的所有课程
      selected_images: [],  // 选择的项目的照片
      alterCourseData: [],  // 要更改的课程信息
      addCourseData: [],  // 要新增的课程信息
      courseCategory: [], // 所有课程类别信息
      fileList: [], // 上传的照片集, 用于图片回显
      dialogImageUrl: '', // 用于预显示的图片url
      picPreviewVisible: false, // 图片预览是否可见
      img_url: "",  // 已经上传后的图片地址
    };
  },
  created() {
    this.$axios
        .get('http://112.124.35.32:8083/xiangliban/education/selectAllCourses')
        .then(successResponse => {
          this.course_list = successResponse.data; // 将获取的数据保存
          this.list_empty = (this.course_list.length === 0); // 将获取数据是否为空保存
          this.searched = this.course_list; // 再次初始化显示的内容
        })
        .catch(error => {
          console.log(error) // 记录出错信息
          this.errored = true // 在前端提示用户出错
        })
        .finally(() => this.loading = false) // 将加载中动画设为不可见
  },
  methods: {
    // 点击新增课程后, 设置对话可见
    addCourse() {
      this.addCourseVisible = true;
    },
    searchOnTable() {
      this.searched = searchById(this.course_list, this.search)
      this.searched_empty = (!this.searched.isEmpty)
    },
    // 自动设置标签颜色
    getLableColor(item) {
      if (item === "可报名") {
        return "success";
      } else if (item === "已结束") {
        return "danger";
      } else {
        return "warning";
      }
    },
    // 点击查看课程详情后, 获取当前课程信息并设置对话可见
    getSelectedDetails(item) {
      this.selected.pop();
      this.selected.push(item);
      this.selected_images.pop();
      this.selected_images.push(item.courseCover);
      this.dialogTableVisible = true; // 设置对话可见
    },
    // 点击修改课程详情后, 获取当前课程信息并设置对话可见
    alterSelectedDetails(item) {
      this.selected.pop();
      this.selected.push(item);
      this.alterCourseData = item;  // 当前条目放入变量中保存
      this.alterCourseVisible = true;
    },
    // 点击修改/新增课程后, 获取全部课程类别并放入变量中
    getAllCourseCategory() {
      this.$axios
          .get('http://112.124.35.32:8083/xiangliban/education/selectAllCourseCategory')
          .then(successResponse => {
            this.courseCategory = successResponse.data; // 将获取的数据保存
          })
          .catch(error => {
            console.log(error) // 记录出错信息
          })
    },
    // 删除图片触发的钩子, 其实没什么用
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.picPreviewVisible = true;
    },
    // 自动上传
    async manualUpload(file) {
      const formData = new FormData()
      formData.append('file', file.file);
      await this.$axios
          .post('http://112.124.35.32:8081/xiangliban/api/imgUpload', formData)
          .then(successResponse => {
            // 上传后的url放入变量中保存
            this.img_url = successResponse.data;
            console.log(successResponse.data);
          }).catch(failResponse => {
            console.log("图片上传失败");
          })
    },
    // 执行修改/新增课程
    async executeUpdate(item) {
      if (item === "update") {
        // 初始化各个字段
        var params = new URLSearchParams();
        params.append("courseCategoryId", this.alterCourseData.courseCategoryId);
        params.append("courseCover", this.img_url);
        params.append("courseDetails", this.alterCourseData.courseDetails);
        params.append("courseEndTime", this.alterCourseData.courseEndTime);
        params.append("courseId", this.alterCourseData.courseId);
        params.append("courseLink", this.alterCourseData.courseLink);
        params.append("courseLike", this.alterCourseData.courseLike);
        params.append("courseFee", this.alterCourseData.courseFee);
        params.append("courseName", this.alterCourseData.courseName);
        params.append("courseSections", this.alterCourseData.courseSections);
        params.append("courseStartTime", this.alterCourseData.courseStartTime);
        params.append("courseStatus", this.alterCourseData.courseStatus);
        params.append("courseTeacherName", this.alterCourseData.courseTeacherName);
        this.img_url = "";
        await this.$axios
            .post('http://112.124.35.32:8083/xiangliban/education/alterCourseById', params)
            .then(successResponse => {
              console.log(successResponse.data);
              this.$message({
                type: 'success',
                message: '课程信息已经修改'
              });
              this.reload();
            }).catch(failResponse => {
              this.$message.error('出错了, 课程信息更新失败!');
            })
      } else if (item === "new") {
        // 初始化各个字段
        var params = new URLSearchParams();
        params.append("courseCategoryId", this.addCourseData.courseCategoryId);
        params.append("courseCover", this.img_url);
        params.append("courseDetails", this.addCourseData.courseDetails);
        params.append("courseEndTime", this.addCourseData.courseEndTime);
        params.append("courseId", this.addCourseData.courseId);
        params.append("courseLink", this.addCourseData.courseLink);
        params.append("courseLike", this.addCourseData.courseLike);
        params.append("courseFee", this.addCourseData.courseFee);
        params.append("courseName", this.addCourseData.courseName);
        params.append("courseSections", this.addCourseData.courseSections);
        params.append("courseStartTime", this.addCourseData.courseStartTime);
        params.append("courseStatus", this.addCourseData.courseStatus);
        params.append("courseTeacherName", this.addCourseData.courseTeacherName);
        this.img_url = "";
        await this.$axios
            .post('http://112.124.35.32:8083/xiangliban/education/addNewCourse', params)
            .then(successResponse => {
              console.log(successResponse.data);
              this.$message({
                type: 'success',
                message: '课程已经新增'
              });
              this.reload();
            }).catch(failResponse => {
              this.$message.error('出错了, 课程信息新增失败!');
            })
      }
    },
    // 删除时二次确认
    open(item) {
      this.$confirm('此操作将永久删除该课程, 是否继续?', '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = new URLSearchParams();
        params.append("courseId", item.courseId);
        this.$axios
            .post('http://112.124.35.32:8083/xiangliban/education/deleteCourseById', params)
            .then(successResponse => {
              console.log(successResponse.data);
              this.$message({
                type: 'success',
                message: '课程已经删除'
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