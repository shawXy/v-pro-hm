<template>
  <el-select :value="value" placeholder="请选择" @change="choseChannel" clearable>
    <el-option
      v-for="item in channelOptions"
      :key="item.id"
      :label="item.name"
      :value="item.id"
      >
    </el-option>
  </el-select>
</template>

<script>

// 将默认值传给子组件，默认值包括所有的频道id
// 子组件选择了频道之后，将频道id传值给父组件

export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      channelOptions: []
    }
  },
  methods: {
    choseChannel (value) {
      // console.log(value)
      this.$emit('input', value)
    },
    // 获取下拉框中的所有频道
    async getChannels () {
      const { data: { data } } = await this.$http.get('/channels')
      this.channelOptions = data.channels
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style lang='less' scoped>

</style>
