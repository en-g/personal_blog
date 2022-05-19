<template>
  <div class="archives-container">
    <div class="archives-verbatim-print">
      <VerbatimPrinting />
    </div>
    <div class="archives-timeline">
      <el-timeline reverse>
        <el-timeline-item
          v-for="(item, index) in blogList"
          :key="index"
          :timestamp="item.time"
          size="large"
          placement="top"
        >
          <BlogItem :blogData="item" />
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import VerbatimPrinting from '@components/common/VerbatimPrinting/VerbatimPrinting'
import BlogItem from '@components/common/Blog/BlogItem'

import { getBlogListInfo } from '@api/index'
import { handleBlogInfo } from '@utils/data-handle'

export default {
  name: 'Archives',
  components: {
    VerbatimPrinting,
    BlogItem
  },
  created() {
    this.getBlogListInfoData()
  },
  data() {
    return {
      blogList: []
    }
  },
  methods: {
    async getBlogListInfoData() {
      const blogList = await getBlogListInfo()
      handleBlogInfo(blogList)
      console.log(blogList)
      this.blogList = blogList
    }
  }
}
</script>

<style scoped lang="less">
.archives-container {
  width: 100%;
  .archives-verbatim-print {
    width: 70%;
    margin: 100px auto;
  }
  .archives-timeline {
    width: 40%;
    margin: 0 auto;
  }
}
/deep/ .el-timeline-item__timestamp {
  color: #fff;
  font-size: 15px;
}
</style>
