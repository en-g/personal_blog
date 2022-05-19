<template>
  <div class="detail-container">
    <div class="detail-blog-title">
      {{ blogDetail.title }}
      <div class="detail-blog-description">
        {{ blogDetail.description }}
      </div>
    </div>
    <div class="detail-blog-main">
      <transition name="el-zoom-in-center">
        <div
          ref="directoryRef"
          class="detail-directory-navigation"
          v-show="isShowDirectory"
        >
          <div class="detail-directory-navigation-wrap">
            <div
              class="detail-directory-navigation-item"
              v-for="item in directoryList"
              :key="item.id"
              @click="listenDirectoryNavigate(item.id)"
            >
              {{ item.title }}
            </div>
          </div>
        </div>
      </transition>
      <div
        class="detail-blog-content"
        :class="{ 'detail-blog-content-margin': isShowDirectory }"
      >
        <div
          v-show="!isShowDirectory"
          class="detail-directory-navigation-open-close"
          @click="listenDirectoryNavigateHide"
        >
          打开目录
        </div>
        <el-card class="detail-blog-content-card" shadow="always">
          <mavon-editor
            ref="markdown"
            v-model="blogDetail.content"
            defaultOpen="preview"
            :boxShadow="false"
            style="z-index: 0"
            :editable="false"
            :subfield="false"
            :toolbarsFlag="false"
          />
        </el-card>
        <div
          v-show="isShowDirectory"
          class="detail-directory-navigation-open-close"
          @click="listenDirectoryNavigateHide"
        >
          收起目录
        </div>
      </div>
      <transition name="el-zoom-in-center">
        <div class="detail-right-operation" v-show="!isShowDirectory">
          <div class="detail-author-info">
            <AuthorInfo />
          </div>
          <div class="detail-tags-list">
            <TagOrCategoryList :type="0" />
          </div>
          <div class="detail-categories-list">
            <TagOrCategoryList :type="1" />
          </div>
          <div class="detail-notices-list">
            <Notice />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import AuthorInfo from '@views/detail/childComp/AuthorInfo'
import TagOrCategoryList from '@views/detail/childComp/TagOrCategoryList'
import Notice from '@views/detail/childComp/Notice'
import BScroll from 'better-scroll'

import { getBlogDetailInfo } from '@api/detail'

export default {
  name: 'Detail',
  components: {
    AuthorInfo,
    TagOrCategoryList,
    Notice
  },
  created() {
    this.getBlogDetailInfoData()
  },
  mounted() {
    this.initDirectoryNavigation()
    this.initBetterScroll()
  },
  data() {
    return {
      blogDetail: {},
      directoryList: [],
      directoryScroll: null,
      isShowDirectory: false
    }
  },
  methods: {
    async getBlogDetailInfoData() {
      const blogId = Number(this.$route.params.blogId)
      const res = await getBlogDetailInfo(blogId)
      this.blogDetail = {
        ...res
      }
    },
    initDirectoryNavigation() {
      const nodeList = this.$refs.markdown.$refs.vShowContent.children
      const nodes = []
      let timer = setInterval(() => {
        if (nodeList.length) {
          clearInterval(timer)
          timer = null
          Array.from(nodeList).forEach((item) => {
            const title = item.querySelector('a')
            if (title) {
              nodes.push({
                id: title.id,
                title: title.parentElement.innerText,
                top: title.offsetTop
              })
            }
          })
          this.directoryList = nodes
        }
      }, 100)
    },
    listenDirectoryNavigate(id) {
      document.documentElement.scrollTop =
        this.directoryList.find((item) => item.id === id).top + 230
    },
    initBetterScroll() {
      this.directoryScroll = new BScroll(this.$refs.directoryRef, {
        scrollbar: true
      })
      setTimeout(() => {
        this.directoryScroll.refresh()
      }, 200)
    },
    listenDirectoryNavigateHide() {
      this.isShowDirectory = !this.isShowDirectory
      this.initBetterScroll()
    }
  }
}
</script>

<style scoped lang="less">
.detail-container {
  width: 100%;
  .detail-blog-title {
    width: 100%;
    text-align: center;
    padding: 50px;
    box-sizing: border-box;
    color: #fff;
    font-size: 50px;
    font-weight: 600;
    .detail-blog-description {
      padding: 10px;
      font-size: 18px;
      color: #fff;
      box-sizing: border-box;
      font-weight: 400;
    }
  }
  .detail-blog-main {
    display: flex;
    .detail-directory-navigation {
      width: 280px;
      height: 400px;
      background-color: #fff;
      padding: 20px 10px;
      box-sizing: border-box;
      border-radius: 10px;
      overflow: hidden;
      position: fixed;
      .detail-directory-navigation-item {
        padding: 5px 10px;
        box-sizing: border-box;
        cursor: pointer;
        color: #7f7d7d;
      }
      .detail-directory-navigation-item:hover {
        transform: scale(1.08, 1.08);
        transition: 0.5s;
      }
    }
    .detail-blog-content {
      width: 800px;
      display: flex;
      .detail-directory-navigation-open-close {
        width: 24px;
        height: 98px;
        border-radius: 10px;
        background-color: #fff;
        cursor: pointer;
        font-size: 14px;
        box-sizing: border-box;
        color: #7f7d7d;
        text-align: center;
        padding: 10px 0;
      }
      .detail-blog-content-card {
        width: 756px;
        border-radius: 10px;
        margin: 0 10px;
      }
    }
    .detail-blog-content-margin {
      margin-left: 300px;
    }
    .detail-right-operation {
      margin-left: 20px;
      .detail-author-info,
      .detail-tags-list,
      .detail-categories-list,
      .detail-notices-list {
        width: 280px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
