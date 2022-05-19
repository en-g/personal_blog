<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isLogin: false
    }
  }
}
</script>

<style lang="less">
@import 'assets/css/icon.css';
@import 'assets/css/base.css';
</style>
