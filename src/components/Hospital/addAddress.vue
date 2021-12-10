<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">新增拥挤信息</h4>
        <p class="category">新增一行关于医院地名的拥挤信息</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>编号</label>
              <md-input v-model="course_id"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>地名</label>
              <md-input v-model="course_name" maxlength="10" required></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>等待人数</label>
              <md-input v-model="course_waitnum"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>拥挤情况</label>
              <md-input v-model="course_crowd"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" @click="goBack">放弃并返回</md-button>
            <md-button class="md-raised md-success" @click="addAddress">提交新增地名</md-button>
          </div>
          <br>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
export default {
  name: "add-address",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "green",
    },
  },
  data() {
    return {
      course_id: "55",
      course_name: "四楼儿科诊室",
      course_waitnum:"10",
      course_crowd:"良好"
    };
  },
  methods:{
    addAddress(){
      window.alert('新增已提交')
    },
    goBack(){
      this.$router.go(-1);
    },
  },
};
</script>
<style></style>
