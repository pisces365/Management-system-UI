<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">用户的申请上门就诊</h4>

      </md-card-header>

      <md-card-content>
        <form>
          <md-field>
            <label>姓名</label>
            <md-input v-model="villagers_name" md-counter="30" disabled></md-input>
          </md-field>

          <md-field>
            <label>身份证号码</label>
            <md-input v-model="villagers_id" maxlength="18" disabled></md-input>
          </md-field>

          <md-field :md-counter="false">
            <label>联系方式</label>
            <md-input v-model="villagers_phone" maxlength="11" disabled></md-input>
          </md-field>

          <md-field>
            <label>具体住址</label>
            <md-textarea v-model="villagers_location" md-autogrow md-counter="50" disabled></md-textarea>
          </md-field>

          <md-field>
            <label>病情描述：</label>
            <md-textarea v-model="villagers_disease" md-counter="200" disabled></md-textarea>
          </md-field>

        </form>
        <div class="md-layout-item md-size-100 text-right">
          <md-button class="md-raised md-success" @click="goBack">放弃并返回</md-button>
          <md-button class="md-raised md-success" @click="accept">同意出诊并接单</md-button>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
export default {
  name: "CheckInformation",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "green",
    },
  },
  beforeCreate() {
    this.$axios
            .get('http://112.124.35.32:8085/xiangliban/doctorSelectOneOut',{params:{"hospital_out_id":this.$route.params.hospital_out_id}})
            .then(successResponse => {
              console.log(successResponse.data);
              this.villagers_name = successResponse.data.villagers_name;
              this.villagers_id = successResponse.data.villagers_id;
              this.villagers_phone = successResponse.data.villagers_phone;
              this.villagers_location = successResponse.data.villagers_location;
              this.villagers_disease = successResponse.data.villagers_disease;
            })
            .catch(error => {
              console.log(error) // 记录出错信息
            })
    this.$axios
            .get('http://112.124.35.32:8085/xiangliban/selectDoctorIdByName',{params:{"doctorname":this.$route.params.doctorname}})
            .then(successResponse => {
              console.log(successResponse.data);
              this.doctorid = successResponse.data;

            })
            .catch(error => {
              console.log(error) // 记录出错信息
            })
  },
  data() {
    return {
      doctorid: '',
      villagers_name: '',
      villagers_id: '',
      villagers_phone: '',
      villagers_location: '',
      villagers_disease: '',
      hospital_out_id: this.$route.params.hospital_out_id,
      doctorname: this.$route.params.doctorname,
      department: this.$route.params.department
    };
  },
  methods:{
    accept(){
      var param = new URLSearchParams();
      param.append("doctorid",this.doctorid);
      param.append("hospital_out_id",this.hospital_out_id);
      console.log(this.doctorid)
      console.log(this.hospital_out_id)
      this.$axios
              .post("http://112.124.35.32:8085/xiangliban/updateOutSituation",param)
              .then(successResponse => {
                window.alert('已成功受诊')
                console.log(successResponse.data)
              })
              .catch(error => {
                console.log(error) // 记录出错信息
              })
    },
    goBack(){
      this.$router.push({name:"AppointmentDetail",params:{doctorname:this.doctorname,department:this.department}});
    },
  },
};
</script>
<style></style>
