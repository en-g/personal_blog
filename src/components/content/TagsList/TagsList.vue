<template>
  <div class="tags-list-container">
    <div
      class="tags-list-content-item"
      v-for="(item, index) in tagsList"
      :key="item.id"
    >
      <el-badge :value="item.count" class="item">
        <div
          :class="`tags-list-content-tag tag-list-background-color${index % 6}`"
          @click="listenShowBlog(item.id)"
        >
          {{ item.name }}
        </div>
      </el-badge>
      <slot name="delete" :id="item.id"></slot>
    </div>
    <slot name="add"></slot>
  </div>
</template>

<script>
export default {
  name: 'TagsList',
  props: {
    tagsList: {
      type: Array,
      required: true
    }
  },
  methods: {
    listenShowBlog(id) {
      this.$emit('showBlog', id)
    }
  }
}
</script>

<style scoped lang="less">
.tags-list-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .tags-list-content-item {
    margin: 0 25px 30px;
    position: relative;
    .tags-list-content-tag {
      padding: 8px 15px;
      box-sizing: border-box;
      border-radius: 5px;
      margin: 7px 5px;
      color: #474747;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    }
    .tags-list-content-tag:hover {
      cursor: pointer;
      background-color: #7edbfa;
      color: #ffffff;
      border: 1px solid #7cd9f8;
    }
    .tags-list-content-tag:focus {
      background-color: red;
    }
  }
  .tags-list-content-item:hover {
    animation: shake 0.8s cubic-bezier(0.36, 0.7, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
  }
}
.tag-list-background-color0 {
  border: 1px solid rgb(253, 209, 209);
  background-color: rgb(253, 209, 209);
}
.tag-list-background-color1 {
  border: 1px solid rgb(252, 252, 185);
  background-color: rgb(252, 252, 185);
}
.tag-list-background-color2 {
  border: 1px solid rgb(216, 250, 216);
  background-color: rgb(216, 250, 216);
}
.tag-list-background-color3 {
  border: 1px solid rgb(230, 200, 252);
  background-color: rgb(230, 200, 252);
}
.tag-list-background-color4 {
  border: 1px solid rgb(250, 231, 192);
  background-color: rgb(250, 231, 192);
}
.tag-list-background-color5 {
  border: 1px solid rgb(202, 246, 252);
  background-color: rgb(202, 246, 252);
}
@keyframes shake {
  10%,
  90% {
    transform: translate3d(5px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(-5px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(5px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(-5px, 0, 0);
  }
}
</style>
