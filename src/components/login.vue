<template>
<div class="lg-contain">
  <el-card class="card">
    <img src="../assets/images/logo_index.png" alt="">
    <el-form :model="loginForm" :rules="loginRules" ref="loginForm" status-icon>
      <el-form-item prop="mobile">
        <el-input v-model="loginForm.mobile" placeholder="请输入您的手机号"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:286px;margin-right:10px"></el-input>
      <el-button>发送验证码</el-button>
      </el-form-item>
      <el-form-item>
        <el-checkbox  :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login()" style="width:100%">登录</el-button>
      </el-form-item>

    </el-form>
  </el-card>
</div>
</template>

<script>
import store from '@/store'
// import { async } from 'q'
export default {
  data () {
    const checkmobile = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}/.test(value)) {
        rule = new Error('手机格式不对')
        return callback(rule)
      }
      callback()
    }
    return {
      loginForm: {
        mobile: '18061751202',
        code: '246810'
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入您的手机号', trigger: 'blur' },
          { validator: checkmobile, message: '手机格式不对', trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位数字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          // 使用async await替换一下写法
          // this.$http.post('/authorizations', this.loginForm)
          //   .then(res => {
          //     store.setUser(res.data.data)
          //     this.$router.push('/')
          //   })
          //   .catch(() => {
          //     this.$message.error('手机号或者验证码错误')
          //   })
          // await处理的是请求成功的结果。所以要加上捕获异常的try catch来处理失败结果
          try {
            // const res = await this.$http.post('/authorizations', this.loginForm)
            // store.setUser(res.data.data)
            // 可以使用解构赋值的方式写
            const { data: { data } } = await this.$http.post('/authorizations', this.loginForm)
            store.setUser(data)
            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号或者验证码错误')
          }

          // console.log(this.loginForm)
        }
      })
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
