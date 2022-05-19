<template>
  <div class="footer-container">
    <div class="footer-content">Copyright © 2022 Chen</div>
    <div class="footer-navigation">
      <JumpLink />
    </div>
  </div>
</template>

<script>
import JumpLink from '@components/common/JumpLink/JumpLink'

export default {
  name: 'Footer',
  components: {
    JumpLink
  }
}
</script>

<style scoped lang="less">
.footer-container {
  display: flex;
  width: 1125px;
  margin: 0 auto;
  box-sizing: border-box;
  .footer-content {
    flex: 2;
    padding-left: 100px;
    padding-right: 150px;
    text-align: left;
    color: #fff;
  }
  .footer-navigation {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
}
</style>
