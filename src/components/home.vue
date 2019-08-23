<template>
<el-container class="home">
  <el-aside :width="isCollape?'64px':'200px'">
    <div class="mlogo" :class="{min_logo:isCollape}"></div>
    <el-menu
      default-active="1"
      background-color="#002033"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollape"
      :collapse-transition="false"
      >
      <el-menu-item index="1">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-document"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-picture"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-s-promotion"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-chat-dot-round"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="6">
        <i class="el-icon-present"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
      <el-menu-item index="7">
        <i class="el-icon-setting"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
  <el-container>
    <el-header>
      <span class="h-icon el-icon-s-fold" @click="toggleMenu()"></span>
      <span class="h-text">江苏传智播客科技教育有限公司</span>
      <el-dropdown>
        <span class="el-dropdown-link">
          <img src="../assets/images/avatar.jpg" alt="">
          <span class="username">人渣反派</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
        <el-dropdown-item icon="el-icon-unlock">退出登录</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  data () {
    return {
      isCollape: false
    }
  },
  methods: {
    toggleMenu () {
      this.isCollape = !this.isCollape
    }
  }

}
</script>

<style lang='less' scoped>
.home{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .el-aside{
    background-color: #002033;
    .mlogo{
      height: 60px;
      background:#002244 url(../assets/images/logo_admin.png) no-repeat center / 140px auto;
    }
    .el-menu{
      border-right: none;
    }
    .min_logo{
      background-image: url(../assets/images/logo_admin_01.png);
      background-size: 36px auto;
  }
  }

  .el-header{
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .h-icon{
      vertical-align: middle;
      font-size: 24px;
      padding-right: 10px;
    }
    .h-text{
      vertical-align: middle;
    }
    .el-dropdown{
      float: right;
      img{
        width: 30px;
        height: 30px;
        vertical-align: middle;
        margin-right: 6px;
      }
      .username{
        vertical-align: middle;
        font-weight: bold;
        color: #333;
      }
    }
  }
}
</style>
