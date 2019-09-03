<template>
<div class="fans">
  <el-card>
    <div slot="header">
      <my-bread>粉丝管理</my-bread>
    </div>
    <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="粉丝列表" name="fans_list">
      <div class="fansList">
        <div class="fansItem" v-for="item in fansList" :key="item.id.toString()">
          <el-avatar :size="80" :src="item.photo"></el-avatar>
          <p class="fansname">{{item.name}}</p>
          <el-button type="primary" plain size="mini">+关注</el-button>
        </div>
      </div>
      <el-pagination
      background
      layout="prev, pager, next,total"
      hide-on-single-page
      :page-size="reqParams.per_page"
      :current-page="reqParams.page"
      @current-change="changePage"
      :total="total">
    </el-pagination>
    </el-tab-pane>
    <el-tab-pane label="粉丝画像" name="fans_chart">
      <div class="charts" ref="mycharts">

      </div>
    </el-tab-pane>
  </el-tabs>
  </el-card>
</div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      activeName: 'fans_chart',
      reqParams: {
        page: 1,
        per_page: 24
      },
      fansList: [],
      total: 0
    }
  },
  methods: {
    async getFans () {
      const { data: { data } } = await this.$http.get('/followers', { params: this.reqParams })
      // console.log(data)
      this.fansList = data.results
      this.total = data.total_count
    },
    changePage (current) {
      this.reqParams.page = current
      this.getFans()
    },
    setChart () {
      const mycharts = echarts.init(this.$refs.mycharts)
      const option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      }
      mycharts.setOption(option)
    }
  },
  created () {
    this.getFans()
  },
  mounted () {
    this.setChart()
  }
}
</script>

<style lang='less' scoped>
.fansList{
  .fansItem{
    display: inline-block;
    text-align: center;
    margin-right: 50px;
    width: 120px;
    height: 170px;
    padding-top: 10px;
    margin-bottom: 20px;
    border:1px dashed #ddd;
    .fansname{
      font-size: 12px;
      padding: 10px
    }
  }
}
.el-pagination{
  text-align: center;
  margin-top: 10px;
}
.charts{
  width: 500px;
  height: 500px;
}
</style>
