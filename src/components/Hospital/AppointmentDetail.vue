<template>
  <div class="md-layout-item">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100">
        <h5>医生您好，下面是需要处理的出诊</h5>

        <div class="alert alert-info" v-for="(item,index) in outList" :key="index">
          <span>{{index+1}}.{{item.villagers_name}}的申请出诊</span>
          <md-button class="md-warning" @click="CheckInformation(item)">查看</md-button>
        </div>

      </div>
    </div>
    <md-button class="md-raised md-success" @click="goBack">返回</md-button>
  </div>
</template>

<script>
export default {
  name: "AppointmentDetail",
  data(){
    return{
      outList: [],
      department: this.$route.params.department,
      doctorname: this.$route.params.doctorname
    };
  },
  beforeCreate() {
    this.$axios
            .get('http://112.124.35.32:8085/xiangliban/doctorSelectAllOut',{params:{"department":this.$route.params.department}})
            .then(successResponse => {

              console.log(successResponse.data);
              this.outList = successResponse.data; // 将获取的数据保存
            })
            .catch(error => {
              console.log(error) // 记录出错信息
            })
  },
  methods: {
    CheckInformation(item) {
      console.log(this.doctorname)

      console.log(this.department)
      this.$router.push({
        name:'CheckInformation',
        params:{
          doctorname: this.doctorname,
          hospital_out_id: item.hospital_out_id,
          department: this.department
        }
      })
    },
    goBack() {
      this.$router.push("CopeMatter");
    },
  }
}
</script>

<style scoped>

</style>