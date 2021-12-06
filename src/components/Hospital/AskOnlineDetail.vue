<template>
  <div class="md-layout-item">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100">
        <h5>医生您好，下面是需要处理的网上问诊</h5>
        <div class="alert alert-info">
          <span>1.用户262的提问</span>
          <md-button class="md-warning" @click="checkInf">查看</md-button>
        </div>
        <div class="alert alert-info">
          <button type="button" aria-hidden="true" class="close">

          </button>
          <span>2.用户4562的提问</span>
          <md-button class="md-warning" @click="checkInf">查看</md-button>
        </div>
      </div>

    </div>
    <md-button class="md-raised md-success" @click="goBack">返回</md-button>
  </div>

</template>

<script>
export default {
  name: "AskOnlineDetail",
  methods: {
    checkInf() {
      this.$router.push('checkInf')
    },
    goBack(){
      this.$router.go(-1);
    },
  }
}
</script>

<style scoped>

</style>