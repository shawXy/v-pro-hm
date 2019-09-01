<template>
<div class="setting">
  <el-card>
    <div slot="header">
      <my-bread>个人设置</my-bread>
    </div>
    <el-row>
      <el-col :span="12">
        <el-form label-width="120px">
          <el-form-item label="编号：">{{settingForm.id}}</el-form-item>
          <el-form-item label="手机：">{{settingForm.mobile}}</el-form-item>
          <el-form-item label="媒体名称：">
            <el-input v-model="settingForm.name"></el-input>
          </el-form-item>
          <el-form-item label="媒体介绍：">
            <el-input type="textarea" v-model="settingForm.intro" :rows="3"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：">
            <el-input v-model="settingForm.email"></el-input>
          </el-form-item>
          <el-form-item>
           <el-button type="primary" @click="saveSetting">保存设置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <el-upload
        class="avatar-uploader"
        action=""
        :show-file-list="false"
        :http-request="uploadAvatar"
        >
          <img v-if="settingForm.photo" :src="settingForm.photo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <p class="avatar-txt">修改头像</p>
      </el-col>
    </el-row>

  </el-card>
</div>
</template>

<script>
import store from '@/store'
import eventBus from '@/components/eventBus'
export default {
  data () {
    return {
      settingForm: {
        id: '',
        mobile: '',
        name: '',
        intro: '',
        email: '',
        photo: ''
      }
    }
  },
  methods: {
    // 获取用户信息
    async getUsers () {
      const { data: { data } } = await this.$http.get('/user/profile')
      // console.log(data)
      this.settingForm = data
    },
    // 保存设置
    async saveSetting () {
      const { name, intro, email } = this.settingForm
      await this.$http.patch('/user/profile', { name, intro, email })
      this.$message.success('修改用户信息成功')
      const user = store.getUser()
      // console.log(user.name)
      user.name = name
      // console.log(name)
      store.setUser(user)
      eventBus.$emit('updateName', name)
    },
    async uploadAvatar (res) {
      // console.log(res.file)
      // 组件默认上传方式为post，所以不能用，要自定义上传
      const fm = new FormData()
      fm.append('photo', res.file)
      const { data: { data } } = await this.$http.patch('/user/photo', fm)
      this.settingForm.photo = data.photo
      this.$message.success('上传头像成功')
      const user = store.getUser()
      user.photo = data.photo
      store.setUser(user)
      eventBus.$emit('updateAvatar', data.photo)
    }
  },
  created () {
    this.getUsers()
  }
}
</script>

<style lang='less' scoped>
.avatar-uploader{
  text-align: center;
}
.avatar-txt{
  text-align: center;
  font-size: 14px;
  margin-top: 15px;
}
</style>
