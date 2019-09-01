<template>
<div class="container">
  <div class="btn_img" @click="openDialog">
    <img :src="value||checkImageUrl" alt="">
  </div>
  <el-dialog
    :visible.sync="dialogVisible"
    width="750px">
    <div class="tabs">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="images">
          <el-radio-group v-model="reqparams.collect" size="small" @change="changeTab">
            <el-radio-button label="false">全部</el-radio-button>
            <el-radio-button label="true">收藏</el-radio-button>
          </el-radio-group>
          <div class="images_list">
            <div class="image_item" v-for="item in images" :key="item.id"
            @click="selectImage(item.url)" :class="{selected:item.url===selectedImage}">
              <img :src="item.url">
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
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :show-file-list="false"
          :headers="headers"
          name="image"
          :on-success="handleSuccess">
          <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-tab-pane>
      </el-tabs>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="checkImage">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import store from '@/store'
import defaultImage from '../assets/images/default.png'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      activeName: 'images',
      reqparams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      total: 0,
      images: [],
      uploadImageUrl: null,
      checkImageUrl: defaultImage,
      selectedImage: null,
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
    openDialog () {
      this.dialogVisible = true
      this.activeName = 'images'
      this.selectedImage = null
      this.uploadImageUrl = null
      this.getImages()
    },
    changeTab () {
      this.reqparams.page = 1
      this.getImages()
    },
    changePage (current) {
      this.reqparams.page = current
      this.getImages()
    },
    selectImage (imageUrl) {
      this.selectedImage = imageUrl
    },
    handleSuccess (res) {
      this.uploadImageUrl = res.data.url
      this.$message.success('上传素材成功！')
    },
    checkImage () {
      let imageTemp = null
      if (this.activeName === 'images') {
        if (!this.selectedImage) { return this.$message.info('请选择一张图片！') }
        imageTemp = this.selectedImage
      } else {
        if (!this.uploadImageUrl) { return this.$message.info('请上传一张图片！') }
        imageTemp = this.uploadImageUrl
      }
      // this.checkImageUrl = imageTemp
      this.$emit('input', imageTemp)
      this.dialogVisible = false
    }
  }
}
</script>

<style lang='less' scoped>
.container{
  display: inline-block;
  margin-right: 20px;
}
.btn_img{
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  margin-top: 10px;
  img{
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
.images_list{
  padding-top: 10px;
  .image_item{
    display: inline-block;
    margin: 0 15px 10px 0;
    width: 160px;
    height: 120px;
    border: 1px dashed #ddd;
    position: relative;
    img{
      width: 100%;
      height: 100%;
      display: block;
      object-fit: contain;
    }
    &.selected{
      &::after{
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0,.3)  url(../assets/images/selected.png) no-repeat center / 60px;
      }
    }
  }

}
.el-pagination{
  text-align: center;
}
.avatar-uploader{
  text-align: center;
}
</style>
