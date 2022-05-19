<template>
  <div class="notice-container">
    <div class="notice-title">
      <div class="title">
        <i class="iconfont icon-gonggao"></i><span>公告</span>
      </div>
      <div class="release-notice">
        <el-link type="primary" @click="listenReleaseNoticeInput">发布</el-link>
      </div>
    </div>
    <div class="notice-content" v-if="!isReleaseNewNotice">
      {{ notice ? notice : '暂无公告' }}
    </div>
    <div class="notice-release" v-else>
      <el-input
        class="notice-release-input"
        v-model="newNotice"
        placeholder="发布新公告"
        :autofocus="true"
        @change="listenReleaseNotice"
        @blur="isReleaseNewNotice = false"
      ></el-input>
    </div>
  </div>
</template>

<script>
import { getTheLastNotice, uploadNotice } from '@api/notice'

export default {
  name: 'Nocite',
  created() {
    this.getTheLastNoticeData()
  },
  data() {
    return {
      notice: '',
      newNotice: '',
      isReleaseNewNotice: false
    }
  },
  methods: {
    async getTheLastNoticeData() {
      const { content } = await getTheLastNotice()
      this.notice = content
    },
    listenReleaseNoticeInput() {
      this.isReleaseNewNotice = true
    },
    async listenReleaseNotice() {
      const res = await uploadNotice(this.newNotice)
      if (res) {
        this.$message({
          message: '发布公告成功~',
          type: 'success'
        })
      }
      await this.getTheLastNoticeData()
      this.isReleaseNewNotice = false
      this.newNotice = ''
    }
  }
}
</script>

<style scoped lang="less">
.notice-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding: 20px;
  box-sizing: border-box;
  color: #7f7d7d;
  .notice-title {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    font-size: 18px;
    i {
      margin-right: 5px;
      font-size: 18px;
    }
    .title {
      flex: 1;
    }
    .release-notice {
      flex: 1;
      text-align: right;
    }
  }
  .notice-content {
    width: 100%;
    padding-top: 10px;
    box-sizing: border-box;
  }
  .notice-release {
    margin-top: 10px;
    /deep/ .el-input__inner {
      border: none !important;
      font-size: 16px;
    }
  }
}
</style>
