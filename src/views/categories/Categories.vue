<template>
  <div class="categories-container">
    <div class="categories-verbatim-print">
      <VerbatimPrinting />
    </div>
    <div class="categories-card">
      <Card :icon="'iconfont icon-icon_category-copy'" :title="'文章分类'">
        <template v-slot:content>
          <div style="text-align: right; margin-bottom: 10px">
            <el-link
              v-if="!isDeleteCategory"
              type="primary"
              @click="isAddCategory = true"
              >添加分类</el-link
            >
            <el-link
              v-if="!isDeleteCategory"
              type="primary"
              style="margin-left: 20px"
              @click="isDeleteCategory = true"
              >删除分类</el-link
            >
            <el-link
              v-if="isDeleteCategory"
              type="primary"
              style="margin-left: 20px"
              @click="isDeleteCategory = false"
              >完成</el-link
            >
          </div>
          <div class="categories-content">
            <TagsList :tagsList="categoriesList" @showBlog="listenShowBlog">
              <template v-slot:add>
                <div class="categories-add" v-if="isAddCategory">
                  <el-input
                    v-model="addCategoryName"
                    placeholder="添加分类"
                    :autofocus="true"
                    @change="listenAddCategory"
                    @blur="isAddCategory = false"
                  ></el-input>
                </div>
              </template>
              <template v-slot:delete="scope">
                <i
                  v-if="isDeleteCategory"
                  class="iconfont icon-chahao"
                  @click="listenDeleteCategory(scope.id)"
                ></i>
              </template>
            </TagsList>
          </div>
        </template>
      </Card>
    </div>
    <div class="categories-blog-content">
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
  getCategoriesListInfo,
  getCategoriesListInfoById,
  addCategory,
  deleteCategory
} from '@api/categories'
import { handleBlogInfo } from '@utils/data-handle'

export default {
  name: 'Categories',
  components: {
    VerbatimPrinting,
    Card,
    TagsList,
    Blog
  },
  data() {
    return {
      categoriesList: [],
      blogList: [],
      isAddCategory: false,
      isDeleteCategory: false,
      addCategoryName: ''
    }
  },
  created() {
    this.getCategoriesListInfoData()
  },
  methods: {
    async getCategoriesListInfoData() {
      this.categoriesList = await getCategoriesListInfo()
      const { id } = this.$route.query
      if (id) {
        await this.listenShowBlog(id)
      }
    },
    async listenShowBlog(id) {
      const res = await getCategoriesListInfoById(id)
      handleBlogInfo(res)
      this.blogList = res
    },
    async listenAddCategory() {
      const res = await addCategory(this.addCategoryName)
      if (res) {
        this.$message({
          message: '添加分类成功~',
          type: 'success'
        })
      }
      this.isAddCategory = false
      this.addCategoryName = ''
      await this.getCategoriesListInfoData()
    },
    async listenDeleteCategory(id) {
      const res = await deleteCategory(id)
      if (res) {
        this.$message({
          message: '删除分类成功~',
          type: 'success'
        })
      }
      await this.getCategoriesListInfoData()
    }
  }
}
</script>

<style scoped lang="less">
.categories-container {
  width: 100%;
  .categories-verbatim-print {
    width: 70%;
    margin: 100px auto;
  }
  .categories-card {
    .categories-content {
      width: 100%;
      padding-top: 20px;
      box-sizing: border-box;
      .categories-add {
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
  .categories-blog-content {
    width: 100%;
    margin-top: 30px;
    box-sizing: border-box;
  }
}
</style>
