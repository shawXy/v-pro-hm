<template>
<div>组件com-a
<div><slot name="header" :msg="msg">备用头部</slot></div>
<div><slot name="body" det="hahaha">备用主体</slot></div>
<div><slot name="footer" :data="msg" detail="哈哈哈哈">备用尾部</slot></div>
</div>
</template>

<script>
export default {
  data () {
    return {
      msg: '自定义组件com-a内部的数据'
    }
  }
}
</script>

<style lang='less' scoped>

</style>
