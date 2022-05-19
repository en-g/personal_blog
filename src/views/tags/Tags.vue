<template>
  <div class="tags-container">
    <div class="tags-verbatim-print">
      <VerbatimPrinting />
    </div>
    <div class="tags-card">
      <Card :icon="'iconfont icon-card-tag-copy'" :title="'文章标签'">
        <template v-slot:content>
          <div style="text-align: right; margin-bottom: 10px">
            <el-link v-if="!isDeleteTag" type="primary" @click="isAddTag = true"
              >添加标签</el-link
            >
            <el-link
              v-if="!isDeleteTag"
              type="primary"
              style="margin-left: 20px"
              @click="isDeleteTag = true"
              >删除标签</el-link
            >
            <el-link
              v-if="isDeleteTag"
              type="primary"
              style="margin-left: 20px"
              @click="isDeleteTag = false"
              >完成</el-link
            >
          </div>
          <div class="tags-content">
            <TagsList :tagsList="tagsList" @showBlog="listenShowBlog">
              <template v-slot:add>
                <div class="tags-add" v-if="isAddTag">
                  <el-input
                    v-model="addTagName"
                    placeholder="添加标签"
                    :autofocus="true"
                    @change="listenAddTag"
                    @blur="isAddTag = false"
                  ></el-input>
                </div>
              </template>
              <template v-slot:delete="scope">
                <i
                  v-if="isDeleteTag"
                  class="iconfont icon-chahao"
                  @click="listenDeleteTag(scope.id)"
                ></i>
              </template>
            </TagsList>
          </div>
        </template>
      </Card>
    </div>
    <div class="tags-blog-content">
      <Blog :blogList="blogList" />
    </div>
  </div>
</template>

<script>
import VerbatimPrinting from '@components/common/VerbatimPrinting/VerbatimPrinting'
import Card from '@components/common/Card/Card'
import TagsList from '@components/content/TagsList/TagsList'
import Blog from '@components/common/Blog/Blog'

import {
  getTagsListInfo,
  getTagsListInfoById,
  addTag,
  deleteTag
} from '@api/tags'
import { handleBlogInfo } from '@utils/data-handle'

export default {
  name: 'Tags',
  components: {
    VerbatimPrinting,
    Card,
    TagsList,
    Blog
  },
  data() {
    return {
      tagsList: [],
      blogList: [],
      isAddTag: false,
      isDeleteTag: false,
      addTagName: ''
    }
  },
  created() {
    this.getTagsListInfoData()
  },
  methods: {
    async getTagsListInfoData() {
      this.tagsList = await getTagsListInfo()
      const { id } = this.$route.query
      if (id) {
        await this.listenShowBlog(id)
      }
    },
    async listenShowBlog(id) {
      const res = await getTagsListInfoById(id)
      handleBlogInfo(res)
      this.blogList = res
    },
    async listenAddTag() {
      const res = await addTag(this.addTagName)
      if (res) {
        this.$message({
          message: '添加标签成功~',
          type: 'success'
        })
      }
      this.isAddTag = false
      this.addTagName = ''
      await this.getTagsListInfoData()
    },
    async listenDeleteTag(id) {
      const res = await deleteTag(id)
      if (res) {
        this.$message({
          message: '删除标签成功~',
          type: 'success'
        })
      }
      await this.getTagsListInfoData()
    }
  }
}
</script>

<style scoped lang="less">
.tags-container {
  width: 100%;
  .tags-verbatim-print {
    width: 70%;
    margin: 100px auto;
  }
  .tags-card {
    position: relative;
    .tags-content {
      width: 100%;
      padding-top: 20px;
      box-sizing: border-box;
      .tags-add {
        padding-left: 30px;
        margin: 8px 5px 0;
        box-sizing: border-box;
        text-align: left;
        /deep/ .el-input__inner {
          width: 90px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        }
      }
      i {
        position: absolute;
        right: -20px;
        top: calc(50% - 8px);
        color: rgba(92, 91, 91, 0.5);
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
  .tags-blog-content {
    width: 100%;
    margin-top: 30px;
    box-sizing: border-box;
  }
}
</style>
