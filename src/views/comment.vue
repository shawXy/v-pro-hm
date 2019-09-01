<template>
<div class="comment">
  <el-card>
    <div slot="header">
      <my-bread>评论管理</my-bread>
    </div>
    <el-table :data="results">
      <el-table-column label="标题" width="400px" prop="title"></el-table-column>
      <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
      <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{scope.row.comment_status?'正常':'关闭'}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120px">
        <template slot-scope="scope">
            <el-button type="danger" v-if="scope.row.comment_status" size="small" @click="toggleComment(scope.row)">关闭评论</el-button>
            <el-button type="success" v-else size="small" @click="toggleComment(scope.row)">打开评论</el-button>
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
export default {
  data () {
    return {
      reqParams: {
        page: 1,
        per_page: 20,
        response_type: 'comment'
      },
      results: [],
      total: 0
    }
  },
  methods: {
    async getComment () {
      const { data: { data } } = await this.$http.get('/articles', { params: this.reqParams })
      this.results = data.results
      this.total = data.total_count
    },
    changePage (current) {
      this.reqParams.page = current
      this.getComment()
    },
    async toggleComment (row) {
      const { data: { data } } = await this.$http.put(`/comments/status?article_id=${row.id}`,
        { allow_comment: !row.comment_status })
      this.$message.success(data.allow_comment ? '打开评论成功' : '关闭评论成功')
      row.comment_status = data.allow_comment
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style lang='less' scoped>
  .el-pagination{
    text-align: center;
    margin-top: 20px;
  }
</style>
