<template>
  <div class="jump-link-container">
    <el-tooltip effect="dark" content="访问我的GitHub" placement="top">
      <i
        class="iconfont icon-github"
        :class="{ color: isOrigin }"
        @click="listenNavigate"
      ></i>
    </el-tooltip>
    <el-tooltip effect="dark" content="邮箱联系我" placement="top">
      <i class="iconfont icon-email" :class="{ color: isOrigin }"></i>
    </el-tooltip>
    <el-tooltip effect="dark" content="QQ联系我: 1820591474" placement="top">
      <i class="iconfont icon-QQ" :class="{ color: isOrigin }"></i>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'JumpLink',
  props: {
    isOrigin: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    listenNavigate() {
      window.open('https://github.com/en-g/personal_blog/tree/master', 'target')
    }
  }
}
</script>

<style scoped lang="less">
.jump-link-container {
  width: 100%;
  i {
    color: #fff;
  }
  i:hover {
    cursor: pointer;
  }
  .color {
    color: #7f7d7d;
  }
}
</style>
