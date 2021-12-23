<template>
  <body id="poster">
  <el-form class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">乡里办后台管理系统登录</h3>
    <el-form-item>
      <el-input type="text" v-model="user.uid"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="user.password"
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>
<style>
#poster {
  background: url("../../src/assets/background1.jpg") no-repeat center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

body {
  margin: 0px;
}

.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 230px auto 90px;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

</style>

<script>
import globalVariable from "../globalVariable";

export default {
  name: 'Login',
  emulateJSON: true,
  data() {
    return {
      user: {
        uid: '',
        password: ''
      },
      responseResult: []
    }
  },
  methods: {
    login() {
      var params = new URLSearchParams();
      params.append("uid", this.user.uid);
      params.append("password", this.user.password);
      this.$axios
          .post('http://112.124.35.32:8087/xiangliban/login/userlogin', params)
          .then(successResponse => {
            console.log('login success')
            if (successResponse.data.uid !== null) {
              globalVariable.setId(successResponse.data.uid);
              globalVariable.setAuthorization(successResponse.data.authorization);
              this.$router.push('dashboard');
            }
          })
          .catch(failResponse => {
            console.log(failResponse)
            this.$message.error('登录失败')
            console.log('failed')
          })

    }

  }
}
</script>

<style scoped>

</style>
