npm
<template>
  <div class="index-container">
    <div class="index-main-content">
      <div class="index-verbatim-printing">
        <VerbatimPrinting />
      </div>
      <div class="index-jump-link">
        <JumpLink />
      </div>
    </div>
    <div class="index-search">
      <InputSearch />
    </div>
    <div class="index-slogan">
      <Slogan />
    </div>
    <div class="index-blog-content">
      <transition name="el-fade-in-linear">
        <div
          class="blog-operation"
          :class="{ 'item-not-show': !isShow, 'item-show': isShow }"
          ref="blogOperationRef"
        >
          <el-button
            class="blog-operation-button"
            type="primary"
            round
            @click="uploadBlogVisible = true"
            >上传博客</el-button
          >
          <el-button
            class="blog-operation-button"
            type="primary"
            round
            @click="deleteBlogVisible = true"
            >删除博客</el-button
          >
        </div>
      </transition>
      <Blog :blogList="blogList" />
    </div>
    <el-dialog title="上传博客" :visible.sync="uploadBlogVisible" width="50%">
      <el-form ref="form" :model="uploadBlogInfo" label-width="80px">
        <el-form-item label="博客标题">
          <el-input v-model="uploadBlogInfo.title"></el-input>
        </el-form-item>
        <el-form-item label="博客描述">
          <el-input v-model="uploadBlogInfo.description"></el-input>
        </el-form-item>
        <el-form-item label="博客标签">
          <el-checkbox-group v-model="uploadBlogInfo.tags" size="small">
            <el-checkbox-button
              v-for="item in tagsList"
              :label="item.id"
              :key="item.id"
              >{{ item.name }}</el-checkbox-button
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="博客分类">
          <el-radio-group v-model="uploadBlogInfo.category" size="small">
            <el-radio-button
              v-for="item in categoriesList"
              :key="item.id"
              :label="item.id"
              >{{ item.name }}</el-radio-button
            >
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-upload
        style="margin-left: 10px"
        ref="uploadBlogRef"
        drag
        action=""
        multiple
        accept=".jpg,.png,.jpeg,.md"
        :auto-upload="false"
        :limit="2"
        :on-change="listenUploadBlogChange"
        :on-success="listenUploadBlogSuccess"
        :http-request="listenUploadBlog"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">上传一个md文件和一张图片</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadBlogVisible = false">取 消</el-button>
        <el-button type="primary" @click="listenUploadBlog">上 传</el-button>
      </span>
    </el-dialog>
    <el-dialog title="删除博客" :visible.sync="deleteBlogVisible" width="50%">
      <el-collapse accordion>
        <div v-for="item in blogList" :key="item.id">
          <el-collapse-item :title="item.title">
            <div style="padding: 10px 0">{{ item.description }}</div>
            <el-link type="primary" @click="listenDeleteBlog(item.id)">
              删除
            </el-link>
          </el-collapse-item>
        </div>
      </el-collapse>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="deleteBlogVisible = false"
          >取 消</el-button
        >
        <el-button
          size="small"
          type="primary"
          @click="deleteBlogVisible = false"
          >完 成</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import InputSearch from '@components/common/InputSearch/InputSearch'
import JumpLink from '@components/common/JumpLink/JumpLink'
import Slogan from '@views/index/childsComp/Slogan'
import Blog from '@components/common/Blog/Blog'
import VerbatimPrinting from '@components/common/VerbatimPrinting/VerbatimPrinting'

import { getBlogListInfo, uploadBlog, deleteBlog } from '@api/index'
import { getTagsListInfo } from '@api/tags'
import { getCategoriesListInfo } from '@api/categories'
import { handleBlogInfo } from '@utils/data-handle'
import { listenScrollPositionToShow } from '@common/utils'

export default {
  name: 'Index',
  components: {
    InputSearch,
    JumpLink,
    Slogan,
    Blog,
    VerbatimPrinting
  },
  created() {
    this.getBlogListInfoData()
    this.getTagsListInfoData()
    this.getCategoriesListInfoData()
  },
  mounted() {
    listenScrollPositionToShow(this.$refs.blogOperationRef, (bool) => {
      this.isShow = bool
    })
  },
  data() {
    return {
      nickname: '',
      blogList: [],
      tagsList: [],
      categoriesList: [],
      isShow: false,
      uploadBlogVisible: false,
      uploadList: [],
      uploadBlogInfo: {
        title: '',
        description: '',
        tags: []
      },
      deleteBlogVisible: false
    }
  },
  methods: {
    async getBlogListInfoData() {
      const blogList = await getBlogListInfo()
      handleBlogInfo(blogList)
      this.blogList = blogList
    },
    async getTagsListInfoData() {
      this.tagsList = await getTagsListInfo()
    },
    async getCategoriesListInfoData() {
      this.categoriesList = await getCategoriesListInfo()
    },
    async listenUploadBlog() {
      let formData = new FormData()
      this.uploadList.forEach((item) => {
        if (item.name.includes('md')) {
          formData.append('blog', item.raw)
        } else {
          formData.append('cover', item.raw)
        }
      })
      formData.append('title', this.uploadBlogInfo.title)
      formData.append('description', this.uploadBlogInfo.description)
      formData.append('tags', JSON.stringify(this.uploadBlogInfo.tags))
      formData.append('category', this.uploadBlogInfo.category)
      if (
        !formData.get('title') ||
        !formData.get('description') ||
        !formData.get('blog') ||
        !formData.get('cover')
      ) {
        this.$message({
          message: '博客信息不完整~',
          type: 'error'
        })
        return
      } else {
        const res = await uploadBlog(formData)
        if (res) {
          this.$message({
            message: '上传博客成功~',
            type: 'success'
          })
        }
      }
      this.uploadBlogVisible = false
      this.uploadBlogInfo = { tags: [] }
      this.$refs.uploadBlogRef.clearFiles()
      await this.getBlogListInfoData()
    },
    listenUploadBlogChange(file, fileList) {
      this.uploadList = fileList
    },
    listenUploadBlogSuccess(res, file, fileList) {
      console.log(res, file, fileList)
    },
    async listenDeleteBlog(id) {
      const res = await deleteBlog(id)
      if (res) {
        this.$message({
          message: '删除成功!',
          type: 'success'
        })
      }
      await this.getBlogListInfoData()
    }
  }
}
</script>

<style scoped lang="less">
.index-container {
  width: 100%;
  .index-main-content {
    width: 100%;
    height: calc(100vh - 60px);
    padding-top: 200px;
    box-sizing: border-box;
    .index-verbatim-printing {
      width: 70%;
      margin: 0 auto 200px;
    }
    .index-jump-link {
      width: 70%;
      margin: 0 auto;
      text-align: center;
    }
  }
  .index-search {
    width: 50%;
    margin: 0 auto 80px;
  }
  .index-slogan {
    width: 100%;
    margin-bottom: 30px;
  }
  .index-blog-content {
    .blog-operation {
      text-align: right;
      margin-bottom: 10px;
      .blog-operation-button {
        margin-left: 20px;
      }
    }
  }
}
</style>
