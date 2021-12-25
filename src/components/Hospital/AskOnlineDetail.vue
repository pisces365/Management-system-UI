<template>
  <div class="md-layout-item">
      <div class="md-layout-item md-medium-size-50">
        <h5>{{doctorValue}}医生您好，下面是需要处理的网上问诊</h5>
        <div class="alert alert-info" v-for="(item,index) in questionList" :key="index">
          <span>{{index+1}}.{{item.villagers_name}}的提问</span>
          <el-button type="success" round @click="checkInf(item)">查看网上问诊</el-button>

        </div>
      </div>
    <el-button type="danger" round @click="goBack">返回</el-button>
  </div>

</template>

<script>
export default {
  name: "AskOnlineDetail",

  data(){
    return{
      doctorValue: this.$route.params.doctorValue,
      departmentValue: this.$route.params.departmentValue,
      questionList: [],
      inquiry_id: '',
      villagers_name: '',
      inquiry_name: '',
      lastLocation: '',
      purpose: '',
      inquiry_question: '',
    }
  },
  beforeCreate() {
    this.$axios
            .get('http://112.124.35.32:8085/xiangliban/selectQuestion',{params:{"inquiry_department":this.$route.params.departmentValue,"inquiry_doctorname":this.$route.params.doctorValue}})
            .then(successResponse => {

              console.log(successResponse.data);
              this.questionList = successResponse.data; // 将获取的数据保存
            })
            .catch(error => {
              console.log(error) // 记录出错信息
            })
  },
  methods: {
    checkInf(item) {
      this.inquiry_id = item.inquiryid;
      this.villagers_name = item.villagers_name;
      this.inquiry_name = item.inquiry_name;
      this.lastLocation = item.lastLocation;
      this.purpose = item.purpose;
      this.inquiry_question = item.inquiry_question;
      this.$router.push(
              { name:'checkInf',
                params:{
                  doctorValue: this.doctorValue,
                  departmentValue: this.departmentValue,
                  inquiry_id: this.inquiry_id,
                  villagers_name: this.villagers_name,
                  inquiry_name: this.inquiry_name,
                  lastLocation: this.lastLocation,
                  purpose: this.purpose,
                  inquiry_question: this.inquiry_question
              }
              })
    },
    goBack(){
      this.$router.push("CopeMatter");
    },
  }
}
</script>

<style scoped>

</style>