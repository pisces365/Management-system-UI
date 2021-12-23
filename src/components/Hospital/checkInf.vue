<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">用户的网上问诊</h4>

      </md-card-header>

      <md-card-content>
        <form>
          <md-field>
            <label>姓名</label>
            <md-input v-model="villagers_name" disabled="true"></md-input>
          </md-field>

          <md-field>
            <label>所患疾病</label>
            <md-input v-model="inquiry_name" disabled="true"></md-input>
          </md-field>

          <md-field>
            <label>上次就诊医院</label>
            <md-input v-model="lastLocation" disabled="true"></md-input>
          </md-field>
          <md-field>
            <label>本次咨询目的（病情咨询，报告解读，用药建议，诊后指导等等）</label>
            <md-textarea v-model="purpose" md-autogrow disabled="true"></md-textarea>
          </md-field>

          <md-field :md-counter="false">
            <label>病情描述（请包括用药情况，过敏史，既往病史）</label>
            <md-input v-model="inquiry_question" md-autogrow disabled="true"></md-input>
          </md-field>




        <md-field>
          <label>您的回答：</label>
          <md-textarea v-model="Answer" md-autogrow md-counter="200"></md-textarea>
        </md-field>
  </form>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" @click="goBack">放弃并返回</md-button>
            <md-button class="md-raised md-success" @click="reply">回复</md-button>
          </div>
          <br>

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
      doctorValue: this.$route.params.doctorValue,
      departmentValue: this.$route.params.departmentValue,
      inquiry_id: this.$route.params.inquiry_id,
      villagers_name: this.$route.params.villagers_name,
      inquiry_name: this.$route.params.inquiry_name,
      lastLocation: this.$route.params.lastLocation,
      purpose: this.$route.params.purpose,
      inquiry_question: this.$route.params.inquiry_question,
      Answer: '',
    };
  },
  methods:{
   reply(){
     var param = new URLSearchParams();
     param.append("inquiry_answer",this.Answer);
     param.append("inquiryid",this.inquiry_id);
     this.$axios
             .post("http://112.124.35.32:8085/xiangliban/doctorAnswer",param)
             .then(successResponse => {
               window.alert(successResponse.data)
             })
             .catch(error => {
               console.log(error) // 记录出错信息
             })
    },
    goBack(){
      this.$router.push({name:"AskOnlineDetail",params:{doctorValue:this.doctorValue,departmentValue:this.departmentValue}});
    },
  },
};
</script>
<style></style>
