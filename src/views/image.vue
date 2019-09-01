<template>
<div class="image">
  <el-card>
    <div slot="header">
      <my-bread>素材管理</my-bread>
    </div>
    <el-radio-group v-model="reqparams.collect" size="small" @change="changeTab">
      <el-radio-button label="false">全部</el-radio-button>
      <el-radio-button label="true">收藏</el-radio-button>
    </el-radio-group>
    <el-button style="float:right" type="success" size="small" @click="dialogVisible = true">添加素材</el-button>
      <el-dialog title="添加素材"
       :visible.sync="dialogVisible"
       width="360px"
       >
        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :show-file-list="false"
          :headers="headers"
          name="image"
          :on-success="handleSuccess">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>

    <div class="images_list">
      <div class="image_item" v-for="item in images" :key="item.id">
        <img :src="item.url">
        <div class="options">
          <span class="el-icon-star-off" :class="{red:item.is_collected}" @click="isCollect(item)"></span>
          <span class="el-icon-delete" @click="delImage(item)"></span>
        </div>
      </div>
    </div>
    <el-pagination
    background
    layout="prev, pager, next,total"
    @current-change="changePage"
    hide-on-single-page
    :current-page="reqparams.page"
    :total="total">
    </el-pagination>
  </el-card>
</div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      reqparams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      total: 0,
      images: [],
      dialogVisible: false,
      imageUrl: '',
      headers: {
        Authorization: 'Bearer ' + store.getUser().token
      }
    }
  },
  methods: {
    async getImages () {
      const { data: { data } } = await this.$http.get('/user/images', { params: this.reqparams })
      this.images = data.results
      this.total = data.total_count
    },
    changePage (current) {
      this.reqparams.page = current
      this.getImages()
    },
    changeTab () {
      this.reqparams.page = 1
      this.getImages()
    },
    async isCollect (item) {
      const { data: { data } } = await this.$http.put(`/user/images/${item.id}`, { collect: !item.is_collected })
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏')
      item.is_collected = data.collect
    },
    delImage (item) {
      this.$confirm('此操作将永久删除该素材, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`/user/images/${item.id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getImages()
      }).catch(() => {})
    },
    handleSuccess (res) {
      this.imageUrl = res.data.url
      this.$message.success('上传素材成功！')
      window.setTimeout(() => {
        this.dialogVisible = false
        this.imageUrl = null
        this.reqparams.page = 1
        this.getImages()
      }, 2000)
    }
  },
  created () {
    this.getImages()
  }

}
</script>

<style lang='less' scoped>
.images_list{
  padding-top: 20px;
  .image_item{
    display: inline-block;
    margin: 0 50px 20px;
    width: 160px;
    height: 160px;
    border: 1px dashed #ddd;
    position: relative;
    img{
      width: 100%;
      height: 100%;
      display: block;
    }
    .options{
      position: absolute;
      left: 0;
      bottom: 0;
      height: 30px;
      width: 100%;
      color: #fff;
      line-height: 30px;
      display: flex;
      font-size: 20px;
      align-items: center;
      background: rgba(0, 0, 0, .3);
      span{
         flex: 1;
         text-align: center;
      }
    }
  }
}
.el-pagination{
  text-align: center;
}
.red{
  color: red;
}
.avatar-uploader{
  text-align: center;
}

</style>
