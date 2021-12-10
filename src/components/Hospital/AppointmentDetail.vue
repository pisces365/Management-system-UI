<template>
  <div class="md-layout-item">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100">
        <h5>医生您好，下面是需要处理的出诊</h5>
        <div class="alert alert-info">
          <span>1.用户789的申请出诊</span>
          <md-button class="md-warning" @click="CheckInformation">查看</md-button>
        </div>
        <div class="alert alert-info">
          <button type="button" aria-hidden="true" class="close">

          </button>
          <span>2.用户2200的申请出诊</span>
          <md-button class="md-warning" @click="CheckInformation">查看</md-button></div>

      </div>
    </div>
    <md-button class="md-raised md-success" @click="goBack">返回</md-button>
  </div>
</template>

<script>
export default {
  name: "AppointmentDetail",
  methods: {
    CheckInformation() {
      this.$router.push('CheckInformation')
    },
    goBack() {
      this.$router.go(-1);
    },
  }
}
</script>

<style scoped>

</style>