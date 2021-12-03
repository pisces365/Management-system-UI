<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">课程C#00001详细信息</h4>
        <p class="category">选定课程的详细信息</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>课程编号</label>
              <md-input v-model="course_id" readonly></md-input>
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
            <md-datepicker v-model="course_start_time"  required>
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
          <div class="md-layout-item md-size-20">
            <img src="./demopic.jpg" alt="cover"/>
          </div>
          <div class="md-layout-item md-size-100">
            <md-field maxlength="5">
              <label>课程封面</label>
              <md-file v-model="course_cover" accept="image/*" />
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" @click="submitAlter">确认修改</md-button>
          </div>
          <br>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-accent" @click="deleteCrs" data-background-color="red">删除课程</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
export default {
  name: "course-details",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "green",
    },
  },
  data() {
    return {
      course_id: "C#00001",
      course_name: "汉语言的艺术",
      course_category: "literature",
      course_start_time: "2021-12-05",
      course_end_time: "2022-11-05",
      course_sections: "120",
      course_teacher_name: "江映蓉",
      course_fee: "0 RMB",
      course_status: "ready",
      course_like: "2000",
      course_details: "一门简单课程",
    };
  },
  methods:{
    submitAlter(){
      window.alert('修改已提交')
    },
    deleteCrs(){
      window.alert('删除已提交')
    },
  },
};
</script>
<style>
.md-accent{
  background-color: red;
}
</style>
