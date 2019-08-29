<template>
<div class="article">
  <el-card>
    <div slot="header">
      <my-bread>内容管理</my-bread>
    </div>
    <el-form label-width="80px" size="small">
      <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="频道：">
        <my-channel v-model="reqParams.channel_id"></my-channel>
        <!-- <el-select v-model="reqParams.channel_id" placeholder="请选择" clearable>
          <el-option
            v-for="item in channelOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            >
          </el-option>
        </el-select> -->
      </el-form-item>
      <el-form-item label="日期：">
        <el-date-picker
        v-model="dateArr"
        type="daterange"
        value-format="yyyy-MM-dd"
        @change="changeDate"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
    </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">筛选</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card>
    <div slot="header">根据筛选条件共查询到 {{total}} 条结果：</div>
    <el-table
      :data="articles">
      <el-table-column
        label="封面">
        <template slot-scope="scope">
         <el-image
          style="width: 120px; height: 120px"
          :src="scope.row.cover.images[0]"
          fit="fit">
            <div slot="error">
              <img src="../assets/images/error.gif" alt="" style="width: 120px; height: 120px">
            </div>
          </el-image>
      </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
          <el-tag v-if="scope.row.status===1">待审核</el-tag>
          <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
          <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
          <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="发布时间">
      </el-table-column>
      <el-table-column
        label="操作" width="150">
        <template slot-scope="scope">
          <!-- {{scope.row.id}} -->
            <el-button type="primary" icon="el-icon-edit" @click="$router.push('/publish?id='+scope.row.id)" circle plain></el-button>
            <el-button type="danger" @click="delArticle(scope.row.id)" icon="el-icon-delete" circle plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next,total"
      hide-on-single-page
      :page-size="reqParams.per_page"
      :current-page="reqParams.page"
      @current-change="changePage"
      :total="total">
    </el-pagination>
  </el-card>
</div>
</template>

<script>
// import MyBread from '@/components/my-bread.vue'
export default {
  // components: { MyBread },
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      // channelOptions: [],
      dateArr: [],
      total: 0,
      articles: []
    }
  },
  methods: {
    // 获取文章列表
    async getArticles () {
      const { data: { data } } = await this.$http.get('/articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
    },
    // 页码改变切换传参中的page值
    changePage (current) {
      this.reqParams.page = current
      this.getArticles()
    },
    // 日期选择
    changeDate (curdate) {
      // console.log(curdate)
      if (curdate) {
        this.reqParams.begin_pubdate = curdate[0]
        this.reqParams.end_pubdate = curdate[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 筛选功能
    search () {
      this.reqParams.page = 1
      if (this.reqParams.channel_id === '') {
        this.reqParams.channel_id = null
      }
      this.getArticles()
    },
    // 删除数据功能
    delArticle (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`/articles/${id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getArticles()
      }).catch(() => {

      })
    }
  },
  created () {
    this.getArticles()
  }
}
</script>

<style lang='less' scoped>
  .el-card{
    margin-bottom: 20px;
  }
  .el-pagination{
    text-align: center;
    padding-top: 30px;
  }
</style>
