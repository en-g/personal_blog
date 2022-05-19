<template>
  <div class="main-container">
    <el-backtop><i class="iconfont icon-xiangshang"></i></el-backtop>
    <div class="main-background-image">
      <img
        class="image"
        src="http://81.71.162.78:8008/backgroundImage/random"
        alt=""
      />
    </div>
    <transition name="el-zoom-in-center">
      <div class="main-hello" v-if="isShowHello" @click="listenEnterBlogIndex">
        <Avatar />
        <div class="main-jump-link">
          <JumpLink />
        </div>
      </div>
    </transition>
    <transition name="el-fade-in-linear">
      <el-container v-if="!isShowHello">
        <el-header class="main-header"><Header /></el-header>
        <el-main class="main-content"><router-view /></el-main>
        <el-footer class="main-footer"><Footer /></el-footer>
      </el-container>
    </transition>
  </div>
</template>

<script>
import Header from '@components/content/Header/Header.vue'
import Footer from '@components/content/Footer/Footer.vue'
import Avatar from '@components/content/Avatar/Avatar'
import JumpLink from '@components/common/JumpLink/JumpLink'

export default {
  name: 'Main',
  components: {
    Header,
    Footer,
    Avatar,
    JumpLink
  },
  data() {
    return {
      isShowHello: true
    }
  },
  methods: {
    listenEnterBlogIndex() {
      this.isShowHello = false
      if (this.$route.path !== '/main/index') {
        this.$router.replace('/main/index')
      }
    }
  }
}
</script>

<style scoped lang="less">
.main-container {
  width: 100%;
  height: 100%;
  background: linear-gradient(
      60deg,
      rgba(255, 165, 150, 0.5) 5%,
      rgba(0, 228, 255, 0.35)
    )
    0 0 / cover;
  .main-background-image {
    width: 100%;
    height: 100%;
    z-index: -66;
    position: fixed;
    top: 0;
    left: 0;
    .image {
      width: 100%;
      height: 100%;
    }
  }
  .main-hello {
    width: 100%;
    height: 100vh;
    position: relative;
    .main-jump-link {
      position: absolute;
      top: 80vh;
      left: calc(50vw - 183px / 2);
    }
  }
  .main-header {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 99;
    padding: 0;
  }
  .main-content {
    width: 1125px;
    margin: 60px auto 30px;
    padding: 0;
  }
  .main-footer {
    width: 100%;
    text-align: end;
    background-color: #00bfff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
