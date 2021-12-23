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
              <label>科室</label>
              <md-input v-model="hospital_department"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>地名</label>
              <md-input v-model="hospital_location_name" maxlength="10" required></md-input>
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
      hospital_department:'',
      hospital_location_name:''
    };
  },
  methods:{
    addAddress() {
      var param = new URLSearchParams();
      param.append("hospital_department",this.hospital_department);
      param.append("hospital_location_name",this.hospital_location_name);
      this.$axios
              .post('http://112.124.35.32:8085/xiangliban/insertNewLocation',param)
              .catch(error => {
                console.log(error) // 记录出错信息
              })
      window.alert('新增已提交')
    },
    goBack(){
      this.$router.push("HospitalCrowdedSituation2");
    },
  },
};
</script>
<style></style>
