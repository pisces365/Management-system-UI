<template>
  <form>
    <md-card class="md-layout-item md-medium-size-33 md-xsmall-size-33 md-size-33">
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">参选人EC#00001详细信息</h4>
        <h2 class="category">当前得票: 10</h2>
      </md-card-header>

      <md-card-content>
        <div class="md-layout md-size-33">
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>姓名</label>
              <md-input v-model="candidate_name" readonly></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>性别</label>
              <md-input v-model="candidate_gender" readonly></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>年龄</label>
              <md-input v-model="candidate_age" readonly></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>政治面貌</label>
              <md-input v-model="candidate_politics" readonly></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>竞选职务</label>
              <md-input v-model="candidate_position" readonly></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100">
            <md-field maxlength="5">
              <label>个人简历</label>
              <md-textarea v-model="candidate_resume" readonly></md-textarea>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100">
            <md-field maxlength="5">
              <label>工作规划</label>
              <md-textarea v-model="candidate_plan" readonly></md-textarea>
            </md-field>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
export default {
  name: "candidate-details",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "green",
    },
  },
  data() {
    return {
      candidate_name: "王德法",
      candidate_gender: "男",
      candidate_age: "25",
      candidate_politics: "党员",
      candidate_position: "村支书",
      candidate_resume: "今天是个好日子",
      candidate_plan: "建设最美乡村",
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
<style></style>
