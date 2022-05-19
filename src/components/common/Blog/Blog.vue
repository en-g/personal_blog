<template>
  <div class="blog-container" ref="blog">
    <div class="blog-item" v-for="(item, index) in blogList" :key="index">
      <BlogItem :blogData="item" />
    </div>
  </div>
</template>

<script>
import BlogItem from '@components/common/Blog/BlogItem'

export default {
  name: 'Blog',
  props: {
    blogList: {
      type: Array,
      default() {
        return []
      },
      required: true
    }
  },
  components: {
    BlogItem
  }
}
</script>

<style scoped lang="less">
.blog-container {
  width: 100%;
  column-count: 3; /*表示分割的列数 */
  column-gap: 0; /*表示列之间的间隔*/
  /*column-width 规定列宽*/
  .blog-item {
    break-inside: avoid; /*避免元素内部断行并产生新列*/
  }
}
</style>
