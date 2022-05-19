<template>
  <div>
    <div
      class="input-search-container"
      :class="{ 'item-show': isShow, 'item-not-show': !isShow }"
      ref="inputSearch"
    >
      <el-input
        class="index-search-input"
        placeholder="请输入搜索内容"
        @focus="searchBlogVisible = true"
      ></el-input>
    </div>
    <el-dialog
      class="index-search-dialog"
      title="搜索博客"
      :visible.sync="searchBlogVisible"
      width="50%"
    >
      <el-input
        class="index-search"
        v-model="searchKeyWord"
        placeholder="请输入搜索关键字"
        @input="listenSearchBlog"
      ></el-input>
      <div class="index-search-result">
        <div
          class="index-search-result-item"
          v-for="item in searchResult"
          :key="item.id"
          @click="navigateToBlogDetail(item.id)"
        >
          <div class="title">{{ item.title }}</div>
          <div class="description">{{ item.description }}</div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeSearchBlogDialog">取 消</el-button>
        <el-button size="small" type="primary" @click="closeSearchBlogDialog"
          >完 成</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { listenScrollPositionToShow } from '@common/utils'
import { searchBlog } from '@api/index'

export default {
  name: 'InputSearch',
  data() {
    return {
      searchKeyWord: '',
      isShow: false,
      searchBlogVisible: false,
      searchResult: [],
      timer: null
    }
  },
  mounted() {
    listenScrollPositionToShow(this.$refs.inputSearch, (bool) => {
      this.isShow = bool
    })
  },
  methods: {
    listenSearchBlog() {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(async () => {
        this.searchResult = await searchBlog(this.searchKeyWord)
      }, 1000)
    },
    closeSearchBlogDialog() {
      this.searchBlogVisible = false
      this.searchKeyWord = ''
      this.searchResult = []
    },
    navigateToBlogDetail(id) {
      this.$router.push(`/main/detail/${id}`)
    }
  }
}
</script>

<style scoped lang="less">
.input-search-container {
  width: 100%;
  height: 50px;
  border: 1px solid rgba(227, 228, 229, 0.81);
  background: rgba(255, 255, 255, 0);
  color: #fff;
  border-radius: 25px;
  .index-search-input {
    width: 100%;

    /deep/ .el-input__inner {
      height: 50px;
      line-height: 50px;
      background-color: transparent;
      border: none;
      text-align: center;
      font-size: 17px;
      color: rgba(227, 228, 229, 0.81);
    }
  }
}
.index-search-dialog {
  .index-search {
    /deep/ .el-input__inner {
      height: 50px;
      line-height: 50px;
      background-color: transparent;
      font-size: 18px;
    }
  }
  .index-search-result {
    width: 100%;
    margin-right: 10px;
    margin-top: 5px;
    box-sizing: border-box;
    .index-search-result-item {
      padding: 15px;
      border: 1px solid #fff;
      .title {
        font-size: 17px;
      }
      .description {
        padding-left: 30px;
        margin-top: 5px;
        box-sizing: border-box;
        font-size: 13px;
        color: #8b8b8b;
      }
    }
    .index-search-result-item:hover {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }
  }
}
</style>
