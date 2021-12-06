<template>
  <div class="content">
      <div class="md-layout md-gutter">
        <div class="md-layout-item">
          <md-field>
            <label for="movie">请选择科室</label>
            <md-select v-model="movie1" name="movie1" id="movie1">
              <md-option value="儿科">儿科</md-option>
              <md-option value="妇科">妇科</md-option>
              <md-option value="内科">内科</md-option>
              <md-option value="外科">外科</md-option>
              <md-option value="皮肤科">皮肤科</md-option>
            </md-select>
          </md-field>
        </div>

        <div class="md-layout-item">
          <md-field>
            <label for="movie">医生姓名</label>
            <md-select v-model="movie2" name="movie1" id="movie1">
              <md-option value="施志豪">施志豪</md-option>
              <md-option value="杨捷宁">杨捷宁</md-option>
              <md-option value="刘元驰">刘元驰</md-option>
              <md-option value="赵泷">赵泷</md-option>
              <md-option value="陈培枫">陈培枫</md-option>
            </md-select>
          </md-field>
        </div>
        </div>
    <div>

      <md-card>
        <md-card-header data-background-color="green">
          <h4 class="title">业务处理</h4>
        </md-card-header>
        <md-card-content>
        </md-card-content>
      </md-card>
    </div>


    <div>
    <md-button class="md-warning" @click="Check1">查看网上问诊</md-button>
      <br>
    <md-button class="md-warning" @click="Check2">查看网上预约出诊</md-button>
      </div>
    <div>

      <div class="elevation-demo">
        <h4>该医生所在科室当前的挂号等待人数：</h4>
        <md-content class="md-elevation-1">
          <h1>5位</h1>
        </md-content>
    </div>
  </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      type: ["", "info", "success", "warning", "danger"],
      notifications: {
        topCenter: false,
      },
    };
  },
  methods: {

    Check1(){
      this.$router.push('AskOnlineDetail')
    },
    Check2(){
      this.$router.push('AppointmentDetail')
    },
    notifyVue(verticalAlign, horizontalAlign) {
      var color = Math.floor(Math.random() * 4 + 1);
      this.$notify({
        message:
            "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer.",
        icon: "add_alert",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: this.type[color],
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.elevation-demo {
  padding: 50px;
  display: flex;
  flex-wrap: wrap;

}

.md-content {
  width: 300px;
  height: 300px;
  margin: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64dd17;
  background-color: #a7ffeb;
}
</style>