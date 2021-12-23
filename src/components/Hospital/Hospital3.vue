<template>
  <div class="content">
      <div>
        <el-field class="my-layout">
          <el-select v-model="departmentValue" placeholder="请选择科室" @change="selectDoctorByDepartment" class="my-select my-layout-item">
            <el-option
              v-for="item in departmentList"
              :key="item.departmentValue"
              :value="item">
            </el-option>
          </el-select>

          <el-select v-model="doctorValue" placeholder="请选择医生" class="my-select my-layout-item2">
            <el-option
              v-for="item in doctorList"
              :key="item.doctorValue"
              :value="item">
            </el-option>
          </el-select>

          </el-field>
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
            <h1 class="my-font">{{waitNumbers}}</h1>
          </md-content>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      departmentValue: '',
      waitNumbers: '',
      departmentList: [],
      doctorList: [],
      doctorValue: '',
      type: ["", "info", "success", "warning", "danger"],
      notifications: {
        topCenter: false,
      },
    };
  },
  beforeCreate() {
    this.$axios
      .get('http://112.124.35.32:8085/xiangliban/selectDepartment')
      .then(successResponse => {
        console.log(successResponse.data);
        this.departmentList = successResponse.data; // 将获取的数据保存
      })
      .catch(error => {
        console.log(error) // 记录出错信息
      })
  },
  methods: {
    Check1(){
      this.$router.push({name:"AskOnlineDetail",params:{doctorValue:this.doctorValue,departmentValue:this.departmentValue}})
    },
    Check2(){
      this.$router.push({name:'AppointmentDetail',params:{doctorname:this.doctorValue,department:this.departmentValue}})
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
    selectDoctorByDepartment(){
      this.$axios
        .get('http://112.124.35.32:8085/xiangliban/selectDoctorByDepartment',{params:{"department":this.departmentValue}})
        .then(successResponse => {
          console.log(successResponse.data);
          this.doctorList = successResponse.data; // 将获取的数据保存
        })
        .catch(error => {
          console.log(error) // 记录出错信息
        })
      this.$axios
        .get('http://112.124.35.32:8085/xiangliban/selectWaitNumber',{params:{"hospitalDepartment":this.departmentValue}})
        .then(successResponse => {
          console.log(successResponse.data);
          this.waitNumbers = successResponse.data; // 将获取的数据保存
        })
        .catch(error => {
          console.log(error) // 记录出错信息
        })
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
  justify-content: center;
  color: #64dd17;
  background-color: #a7ffeb;
}
  .my-select{
    width: 47%;

    /*box-shadow: 0px 1px 3px 0px #000;*/
  }
  .my-layout{
    display: block;
  }
  .my-layout-item{
    left: 1%;
  }
.my-layout-item2 {
  left: 5%;
}
  .my-font{
    margin-top: 35%;
  }
</style>