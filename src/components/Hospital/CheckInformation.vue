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
            <md-input v-model="Name" md-counter="30"></md-input>
          </md-field>

          <md-field>
            <label>身份证号码</label>
            <md-input v-model="IDnum" maxlength="30"></md-input>
          </md-field>

          <md-field :md-counter="false">
            <label>联系方式</label>
            <md-input v-model="Telephone" maxlength="10"></md-input>
          </md-field>

          <md-field>
            <label>具体住址</label>
            <md-textarea v-model="Address" md-autogrow md-counter="200"></md-textarea>
          </md-field>

          <md-field>
            <label>病情描述：</label>
            <md-textarea v-model="textarea" md-counter="80"></md-textarea>
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
  data() {
    return {
      Name: "施志豪",
      IDnum: "110",
      Telephone: "99911",
      Address: "浙江工业大学屏峰校区西十三",
      textarea: "连打了一千个小时的代码而晕倒过去了"
    };
  },
  methods:{
    accept(){
      window.alert('新增已提交')
    },
    goBack(){
      this.$router.go(-1);
    },
  },
};
</script>
<style></style>
