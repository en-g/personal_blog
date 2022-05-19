<template>
  <transition name="el-zoom-in-center" appear>
    <el-card class="card-container">
      <div slot="header" class="card-title">
        <span>
          <i :class="icon"></i>
          {{ title }}
        </span>
      </div>
      <div class="card-content">
        <slot name="content"></slot>
      </div>
    </el-card>
  </transition>
</template>

<script>
export default {
  name: 'Card',
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.card-container {
  padding: 50px;
  border-radius: 15px;
  position: relative;
  .card-title {
    text-align: center;
    font-size: 30px;
    font-weight: 600;
    color: #34495e;
    border-bottom: none;
    i {
      font-size: 35px;
      margin-right: 10px;
    }
  }
  .card-content {
    width: 70%;
    margin: 0 auto;
    text-align: center;
    color: rgba(132, 127, 127, 0.85);
    font-size: 17px;
  }
}
/deep/.el-card__header {
  border-bottom: none;
  padding: 0;
}
</style>
