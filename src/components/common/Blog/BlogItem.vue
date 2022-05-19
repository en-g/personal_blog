<template>
  <transition name="el-fade-in-linear">
    <div
      class="blog-item-container"
      :class="{ 'item-not-show': !isShow, 'item-show': isShow }"
      :ref="`blogitem${blogData.id}`"
      @click="navigateToDetail"
    >
      <div class="blog-item-image">
        <el-image class="image" :src="blogData.cover_url" lazy></el-image>
        <span class="blog-item-title">{{ blogData.title }}</span>
      </div>
      <div
        class="blog-item-content"
        :class="{ 'border-bottom-radius': !blogData.tags }"
      >
        <div class="content">
          <span>{{ blogData.description }}</span>
        </div>
        <div class="bottom">
          <div class="time">
            <i class="iconfont icon-shijian"></i>
            <span>{{ blogData.createTime }}</span>
          </div>
          <div>
            <div class="category" v-if="blogData.category">
              <i class="iconfont icon-tianchongxing-"></i>
              <span>{{ blogData.category.name }}</span>
            </div>
            <div class="author" v-else>
              <i class="iconfont icon-yonghu"></i>
              <span>{{ blogData.author }}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        class="blog-item-tags"
        :class="{ 'border-bottom-radius': blogData.tags }"
        v-show="blogData.tags"
      >
        <el-tag
          class="tag"
          v-for="item in blogData.tags"
          :key="item.id"
          size="small"
          effect="dark"
        >
          {{ item.name }}
        </el-tag>
      </div>
    </div>
  </transition>
</template>

<script>
import { listenScrollPositionToShow } from '@common/utils'

export default {
  name: 'BlogItem',
  props: {
    blogData: {
      type: Object,
      default() {
        return {}
      },
      required: true
    }
  },
  mounted() {
    listenScrollPositionToShow(
      this.$refs[`blogitem${this.blogData.id}`],
      (bool) => {
        this.isShow = bool
      }
    )
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    navigateToDetail() {
      this.$router.push(`detail/${this.blogData.id}`)
    }
  }
}
</script>

<style scoped lang="less">
.blog-item-container {
  width: 350px;
  padding: 10px 0;
  margin: 0 12px 5px;
  .blog-item-image {
    width: 100%;
    height: 250px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    color: #fff;
    font-size: 30px;
    .image {
      width: 100%;
      height: 100%;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    .blog-item-title {
      position: absolute;
      top: 180px;
      padding: 0 20px;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
  .blog-item-content {
    width: 100%;
    padding: 20px 20px 10px;
    box-sizing: border-box;
    background-color: #fff;
    color: rgba(132, 127, 127, 0.85);
    border-bottom: 1px solid #e3e3e3;
    .content {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .bottom {
      display: flex;
      margin-top: 10px;
      font-size: 14px;
      .time {
        flex: 1;
      }
      .author,
      .category {
        flex: 1;
        text-align: right;
      }
    }
  }
  .blog-item-tags {
    padding: 10px 20px;
    display: flex;
    background-color: #fff;
    .tag {
      /*border-radius: 30px;*/
      /*height: 25px;*/
      /*line-height: 22px;*/
      margin-right: 8px;
      cursor: pointer;
    }
  }
}
.blog-item-container:hover {
  -webkit-transform: scale(1.05, 1.05);
  transform: scale(1.05, 1.05);
  -webkit-transition: 0.5s;
  transition: 0.5s;
  cursor: pointer;
}
.border-bottom-radius {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>
