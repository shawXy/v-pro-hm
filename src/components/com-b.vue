<template>
<div>
  <p>父子传值的子组件</p>
  <button @click="son()">点我向父组件传值</button>
  <hr>
  <p>{{pdata}}</p>
</div>
</template>

<script>
export default {
  props: ['pdata'],
  data () {
    return {
      msg: '我是子组件中的数据'
    }
  },
  methods: {
    son () {
      this.$emit('eventb', this.msg)
    }
  }
}
</script>

<style lang='less' scoped>

</style>
