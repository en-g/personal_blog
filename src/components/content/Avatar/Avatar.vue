<template>
  <div class="avatar-container">
    <div class="avatar-circle">
      <img class="avatar-img" alt="img" v-lazy="avatarUrl" />
      <div class="avatar-info" @click="enterBlogIndex">
        <div class="avatar-info-back">
          <div class="avatar-info-name">{{ nickname }}</div>
          <div class="avatar-info-major">{{ major }}</div>
        </div>
      </div>
    </div>
    <div class="avatar-self-introduction">
      <div class="name">{{ name }}</div>
      <div class="personal">个人博客</div>
    </div>
    <div class="avatar-hello">欢迎来到我的个人博客~</div>
    <div class="avatar-border-bottom"></div>
  </div>
</template>

<script>
import { getAuthorInfo } from '@api/avatar'

export default {
  name: 'Avatar',
  data() {
    return {
      avatarUrl: '',
      nickname: '',
      major: '',
      name: '陈梓锐'
    }
  },
  created() {
    this.getAuthorInfoData()
  },
  methods: {
    async getAuthorInfoData() {
      const authorInfo = await getAuthorInfo()
      const { nickname, major, avatar_list } = authorInfo
      this.nickname = nickname
      this.major = major
      this.avatarUrl = avatar_list[0].avatar_url
      this.$store.commit('SET_CUR_AVATAR_ID', avatar_list[0].id)
    },
    enterBlogIndex() {
      this.$emit('enterBlogIndex')
    }
  }
}
</script>

<style scoped lang="less">
.avatar-container {
  width: 100%;
  height: 100%;
  background-color: rgba(7, 7, 7, 0.62);
  box-sizing: border-box;
  padding-top: 200px;
  .avatar-circle {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    position: relative;
    margin: auto;
    box-sizing: border-box;
    cursor: pointer;
    .avatar-img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      z-index: 99;
      transform-origin: 0 50%;
      position: absolute;
    }
    .avatar-info {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      z-index: 9;
      background-color: rgba(24, 24, 24, 0.7);
      position: absolute;
      .avatar-info-back {
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .avatar-info-name {
          flex: 2;
          font-size: 20px;
          font-weight: 600;
          padding-top: 50px;
          color: #fff;
        }
        .avatar-info-major {
          flex: 3;
          font-size: 12px;
          color: #bbb;
        }
      }
    }
  }
  .avatar-circle:hover .avatar-img {
    transform: rotate3d(0, 1, 0, -180deg);
    transition: all 0.5s ease-in-out;
    transform-style: preserve-3d;
  }
  .avatar-self-introduction {
    width: 450px;
    height: 70px;
    margin: 0 auto 30px;
    text-align: center;
    padding: 20px 0;
    border-bottom: 1px solid rgba(187, 187, 187, 0.38);
    .name {
      font-size: 35px;
      font-weight: 600;
      color: #fff;
    }
    .personal {
      color: #bbb;
    }
  }
  .avatar-hello {
    width: 200px;
    height: 50px;
    margin: 0 auto;
    text-align: center;
    color: #fff;
  }
  .avatar-border-bottom {
    width: 100px;
    margin: 0 auto;
    border-bottom: 1px solid rgba(187, 187, 187, 0.38);
  }
}
</style>
