<template>
  <div class="tag-or-category-list-container">
    <div class="tag-or-category-list-title">
      <i :class="`iconfont ${icon}`"></i><span class="title">{{ title }}</span>
    </div>
    <div class="tag-or-category-list-content">
      <div
        class="tag-or-category-list-content-item"
        v-for="item in list"
        :key="item.id"
        @click="listenChooseItem(item.id)"
      >
        <div class="item-title">{{ item.name }}</div>
        <div class="item-count">( {{ item.count }} )</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTagsListInfo } from '@api/tags'
import { getCategoriesListInfo } from '@api/categories'

export default {
  name: 'TagOrCategoryList',
  props: {
    type: {
      type: Number,
      required: true
    }
  },
  created() {
    this.getDataList()
  },
  data() {
    return {
      title: '',
      icon: '',
      list: []
    }
  },
  methods: {
    async getDataList() {
      if (this.type === 0) {
        this.title = '标签'
        this.icon = 'icon-card-tag-copy'
        this.list = await getTagsListInfo()
      } else {
        this.title = '分类'
        this.icon = 'icon-icon_category-copy'
        this.list = await getCategoriesListInfo()
      }
    },
    listenChooseItem(id) {
      if (this.type === 0) {
        this.$router.push({
          path: '/main/tags',
          query: {
            id
          }
        })
      } else {
        this.$router.push({
          path: '/main/categories',
          query: {
            id
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.tag-or-category-list-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding: 20px;
  box-sizing: border-box;
  color: #7f7d7d;
  .tag-or-category-list-title {
    width: 100%;
    margin-bottom: 5px;
    i {
      margin-right: 5px;
      font-size: 18px;
    }
    .title {
      font-size: 18px;
    }
  }
  .tag-or-category-list-content {
    width: 100%;
    .tag-or-category-list-content-item {
      width: 100%;
      display: flex;
      padding: 5px 10px;
      box-sizing: border-box;
      align-items: center;
      justify-content: center;
      .item-title {
        flex: 5;
        font-size: 18px;
      }
      .item-count {
        flex: 2;
        font-size: 14px;
        text-align: right;
      }
    }
    .tag-or-category-list-content-item:hover {
      /*-webkit-transform: scale(1.05, 1.05);*/
      transform: scale(1.05);
      -webkit-transition: 1s;
      transition: 1s;
      cursor: pointer;
      background-color: rgba(123, 208, 248, 0.44);
    }
  }
}
</style>
