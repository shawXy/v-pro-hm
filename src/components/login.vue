<template>
<div class="lg-contain">
  <el-card class="card">
    <img src="../assets/images/logo_index.png" alt="">
    <el-form :model="loginForm">
      <el-form-item>
        <el-input v-model="loginForm.mobile" placeholder="请输入您的手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:286px;margin-right:10px"></el-input>
      <el-button>发送验证码</el-button>
      </el-form-item>
      <el-form-item>
        <el-checkbox  :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%">登录</el-button>
      </el-form-item>

    </el-form>
  </el-card>
</div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: ''
      }
    }
  }
}
</script>

<style lang='less' scoped>
.lg-contain{
  width: 100%;
  height: 100%;
  position: fixed;
  background: url('../assets/images/login_bg.jpg') center / cover;
  .card{
    width: 450px;
    height: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    img{
      display: block;
      width: auto;
      margin: 10px auto 30px;
    }
  }
}
</style>
