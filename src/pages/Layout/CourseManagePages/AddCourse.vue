<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">新增课程</h4>
        <p class="category">新增一门课程</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>课程编号</label>
              <md-input v-model="course_id"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>课程名称</label>
              <md-input v-model="course_name" maxlength="10" required></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>课程类别</label>
              <md-select v-model="course_category" name="课程类别" id="course_category" required>
                <md-option value="feature">本地特色</md-option>
                <md-option value="daily">日常生活</md-option>
                <md-option value="literature">文学</md-option>
                <md-option value="art">艺术</md-option>
                <md-option value="tech">科技</md-option>
                <md-option value="science">理学</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-datepicker v-model="course_start_time" required>
              <label>课程开始时间</label>
            </md-datepicker>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-datepicker v-model="course_end_time" required>
              <label>课程结束时间</label>
            </md-datepicker>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>课程节数</label>
              <md-input v-model="course_sections" type="number" required></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-25">
            <md-field>
              <label>课程教师名称</label>
              <md-input v-model="course_teacher_name" type="text" required></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-25">
            <md-field>
              <label>课程费用</label>
              <md-input v-model="course_fee" type="text" required></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-25">
            <md-field>
              <label>课程状态</label>
              <md-select v-model="course_status" name="课程状态" id="order_courier_status" required>
                <md-option value="ready">可报名</md-option>
                <md-option value="fulled">已报满</md-option>
                <md-option value="ended">已结束</md-option>
                <md-option value="NC">未开始</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-25">
            <md-field>
              <label>课程收到的赞</label>
              <md-input v-model="course_like" type="number"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100">
            <md-field maxlength="5">
              <label>课程详细描述</label>
              <md-textarea v-model="course_details" maxlength="200"></md-textarea>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100">
            <md-field maxlength="5">
              <label>课程封面</label>
              <md-file v-model="course_cover" accept="image/*" />
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" @click="goBack">放弃并返回</md-button>
            <md-button class="md-raised md-success" @click="addCourse">提交新增课程</md-button>
          </div>
          <br>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
export default {
  name: "add-course",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "green",
    },
  },
  data() {
    return {
      course_id: "C#",
      course_name: "",
      course_category: "feature",
      course_start_time: "",
      course_end_time: "",
      course_sections: "",
      course_teacher_name: "",
      course_fee: "免费",
      course_status: "ready",
      course_like: "",
      course_details: "",
    };
  },
  methods:{
    addCourse(){
      window.alert('新增已提交')
    },
    goBack(){
      this.$router.go(-1);
    },
  },
};
</script>
<style></style>
