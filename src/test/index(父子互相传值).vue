<template>
<div>
  <p>父子传值的父组件</p>
  <hr>
  <com-b @eventb="parent"></com-b>
  {{pmsg}}

  <hr>
  <com-b :pdata="ppp">点我向子组件传值</com-b>

</div>
</template>

<script>
import ComB from '@/components/com-b.vue'
export default {
  components: { ComB },
  methods: {
    parent (data) {
      this.pmsg = data
    }
  },
  data () {
    return {
      pmsg: '',
      ppp: '我是父组件中的数据'
    }
  }
}
</script>

<style lang='less' scoped>

</style>
