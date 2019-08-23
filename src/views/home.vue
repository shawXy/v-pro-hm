<template>
<el-container class="home">
  <el-aside width="200px">Aside</el-aside>
  <el-container>
    <el-header>Header</el-header>
    <el-main>Main</el-main>
  </el-container>
</el-container>
</template>

<script>
export default {

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
    background-color: #fff;
  }
}
</style>
