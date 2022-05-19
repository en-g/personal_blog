<template>
  <div class="author-info-container">
    <div class="author-info-image">
      <img class="author-info-avatar" :src="avatarUrl" alt="avatar" />
    </div>
    <div class="author-info-nickname">{{ authorInfo.nickname }}</div>
    <div class="author-info-count">
      <div class="author-info-count-item" @click="navigateToIndex">
        <div class="title">文章</div>
        <div class="count">{{ authorInfo.blog_count }}</div>
      </div>
      <div class="author-info-count-item" @click="navigateToTags">
        <div class="title">标签</div>
        <div class="count">{{ authorInfo.tag_count }}</div>
      </div>
      <div class="author-info-count-item" @click="navigateToCategories">
        <div class="title">分类</div>
        <div class="count">{{ authorInfo.category_count }}</div>
      </div>
    </div>
    <div class="author-info-link">
      <JumpLink :isOrigin="true" />
    </div>
  </div>
</template>

<script>
import JumpLink from '@/components/common/JumpLink/JumpLink'

import { getAuthorInfo } from '@api/avatar'

export default {
  name: 'AuthorInfo',
  components: {
    JumpLink
  },
  data() {
    return {
      authorInfo: {},
      avatarUrl: ''
    }
  },
  created() {
    this.getAuthorInfoData()
  },
  methods: {
    async getAuthorInfoData() {
      const authorInfo = await getAuthorInfo()
      this.authorInfo = authorInfo
      this.avatarUrl = authorInfo.avatar_list.find(
        (item) => item.id === this.$store.state.curAvatarId
      ).avatar_url
    },
    navigateToIndex() {
      this.$router.push('/main/index')
    },
    navigateToTags() {
      this.$router.push('/main/tags')
    },
    navigateToCategories() {
      this.$router.push('/main/categories')
    }
  }
}
</script>

<style scoped lang="less">
.author-info-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding-bottom: 15px;
  box-sizing: border-box;
  .author-info-image {
    width: 100%;
    height: 250px;
    .author-info-avatar {
      width: 100%;
      height: 100%;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
  }
  .author-info-nickname {
    width: 100%;
    padding: 10px 20px 0;
    box-sizing: border-box;
    font-weight: 600;
    text-align: center;
  }
  .author-info-count {
    width: 100%;
    padding: 10px 20px 0;
    box-sizing: border-box;
    display: flex;
    .author-info-count-item {
      flex: 1;
      text-align: center;
      color: #7f7d7d;
      .title {
        margin-bottom: 3px;
      }
      .count {
        font-size: 20px;
      }
    }
    .author-info-count-item:hover {
      cursor: pointer;
      color: rgb(33, 177, 245);
    }
  }
  .author-info-link {
    text-align: center;
    padding: 10px 20px 0;
    box-sizing: border-box;
  }
}
</style>
