<template>
<div>测试插槽代码
  <com-a>
    <div slot="header">我是1</div>
    <div slot="body">我是2</div>
  </com-a>

<hr>
  <com-a>
    <div slot="header"  slot-scope="scope">{{scope.msg}}</div>
    <div slot="body"  slot-scope="scope">{{scope.det}}</div>
    <template v-slot:footer="scope">{{scope.data}}+{{scope.detail}}</template>
  </com-a>

</div>
</template>

<script>
import ComA from '@/components/com-a.vue'
export default {
  components: {
    ComA
  }
}
</script>

<style lang='less' scoped>

</style>
