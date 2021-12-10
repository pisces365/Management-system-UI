<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">用户的网上问诊</h4>

      </md-card-header>

      <md-card-content>
        <md-field md-clearable>
          <label for="movie">所患疾病</label>
          <md-select v-model="Disease">
            <md-option value="0">高血压</md-option>
            <md-option value="1">糖尿病</md-option>
            <md-option value="2">心律失常</md-option>
            <md-option value="3">慢性肾功能不全</md-option>
            <md-option value="4">劳力型心绞痛</md-option>
            <md-option value="5">心脏扩大</md-option>
            <md-option value="6">心脏瓣膜病</md-option>
            <md-option value="7">心功能不全</md-option>
          </md-select>
        </md-field>
        <md-field>
          <label>病情描述</label>
          <md-textarea v-model="textarea"></md-textarea>
        </md-field>
        <div>
          <label>本次咨询目的</label><br>
        <md-checkbox v-model="array" value="1">病情咨询</md-checkbox>
        <md-checkbox v-model="array" value="2">报告解读</md-checkbox>
        <md-checkbox v-model="boolean">用药建议</md-checkbox>
        <md-checkbox v-model="string" value="my-checkbox">诊后指导</md-checkbox>
        <md-checkbox v-model="novalue">其它</md-checkbox>
        </div>
        <md-field>
          <label>已就诊医院及科室（请输入最近就诊过的医院及科室）</label>
          <md-textarea v-model="description"></md-textarea>
        </md-field>
        <div>
          <p>用药情况</p>
          <md-radio v-model="radio" value="accent">有</md-radio>
          <md-radio v-model="radio" value="Primary">无</md-radio>
        </div>
        <div>
          <p>过敏史</p>
          <md-radio v-model="radio" value="accent">有</md-radio>
          <md-radio v-model="radio" value="Primary">无</md-radio>
        </div>
        <div>
          <p>既往病史</p>
          <md-radio v-model="radio" value="accent">有</md-radio>
          <md-radio v-model="radio" value="Primary">无</md-radio>
        </div>



        <md-field>
          <label>您的回答：</label>
          <md-textarea v-model="description"></md-textarea>
        </md-field>

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
      initial:"医生您好！我肚子不舒服已经十年了，请问我该怎么办呢？医生您好！我肚子不舒服已经十年了，请问我该怎么办呢？医生您好！我肚子不舒服已经十年了，请问我该怎么办呢？医生您好！我肚子不舒服已经十年了，请问我该怎么办呢？医生您好！我肚子不舒服已经十年了，请问我该怎么办呢？",
      array: [],
      boolean: false,
      string: null,
      novalue: null,
      disabled: true,
      obj1: {name: 'obj1'},
      obj2: {name: 'obj2'},
      obj: null,
      radio: 'accent'
    };
  },
  methods:{
   reply(){
      window.alert('回复已提交')
    },
    goBack(){
      this.$router.go(-1);
    },
  },
};
</script>
<style></style>
