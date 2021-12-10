<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">选举E#00001详细信息</h4>
        <p class="category">选定选举的详细信息</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>选举类别</label>
              <md-input v-model="election_type" readonly></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>选举主题</label>
              <md-input v-model="election_theme" readonly></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>发布单位</label>
              <md-input v-model="election_units" readonly></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100">
            <md-field maxlength="5">
              <label>规则/简介/要求</label>
              <md-textarea v-model="election_rules" readonly></md-textarea>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>选举起止时间</label>
              <md-input v-model="election_time" readonly></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-20">
            <label>封面图片</label>
            <br><br>
            <img src="./electiondemo.jpg" alt="cover"/>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
export default {
  name: "election-details",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "green",
    },
  },
  data() {
    return {
      election_type: "普通选举",
      election_theme: "村干部竞选",
      election_units: "村党支部",
      election_rules: "禁止舞弊",
      election_time: "2022-11-05 12:00:00 - 2022-12-05 12:00:00",
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
