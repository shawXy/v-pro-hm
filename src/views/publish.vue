<template>
<div class="publish">
  <el-card>
    <div slot="header">
    <my-bread>{{articleId?'修改':'发布'}}文章</my-bread>
    </div>
    <el-form :model="pubForm" ref="pubform" label-width="100px">
      <el-form-item label="标题：">
        <el-input v-model="pubForm.title"></el-input>
      </el-form-item>
      <el-form-item label="内容：">
        <quill-editor v-model="pubForm.content" :options="editorOption"></quill-editor>
      </el-form-item>
      <el-form-item label="封面：">
        <el-radio-group v-model="pubForm.cover.type" @change="changeImage">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
        <div v-if="pubForm.cover.type===1">
          <my-image v-model="pubForm.cover.images[0]"></my-image>
        </div>
        <div v-if="pubForm.cover.type===3">
          <my-image v-model="pubForm.cover.images[0]"></my-image>
          <my-image v-model="pubForm.cover.images[1]"></my-image>
          <my-image v-model="pubForm.cover.images[2]"></my-image>
        </div>
      </el-form-item>
      <el-form-item label="频道：">
        <my-channel v-model="pubForm.channel_id"></my-channel>
      </el-form-item>
      <el-form-item v-if="!articleId">
        <el-button type="primary" @click="submit(false)">发表</el-button>
        <el-button @click="submit(true)">存入草稿</el-button>
      </el-form-item>
      <el-form-item v-else>
        <el-button type="primary" @click="update(false)">修改</el-button>
        <el-button @click="update(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: { quillEditor },
  created () {
    this.articleId = this.$route.query.id
    if (this.articleId) { this.getArticle() }
  },
  watch: {
    $route (to, from) {
      if (to.path === '/publish') {
        this.articleId = null
        this.pubForm = {
          title: null,
          content: null,
          cover: {
            type: 1,
            images: []
          },
          channel_id: null
        }
      }
    }
  },
  data () {
    return {
      pubForm: {
        title: '',
        content: '',
        channel_id: null,
        cover: {
          type: 1,
          images: []
        }
      },
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      },
      articleId: ''
    }
  },
  methods: {
    changeImage () {
      this.pubForm.cover.images = []
    },
    async submit (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.pubForm)
      this.$message.success(draft ? '存入草稿成功' : '发表文章成功')
      this.$router.push('/article')
    },
    async update (draft) {
      await this.$http.put(`articles/${this.articleId}?draft=${draft}`, this.pubForm)
      this.$message.success(draft ? '存入草稿成功' : '修改文章成功')
      this.$router.push('/article')
    },
    async getArticle () {
      const { data: { data } } = await this.$http.get(`articles/${this.articleId}`)
      this.pubForm = data
    }
  }
}
</script>

<style lang='less' scoped>

</style>
