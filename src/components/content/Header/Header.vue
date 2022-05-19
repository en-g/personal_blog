<template>
  <div class="header-container" :class="{ 'background-color': isActive }">
    <div class="header-container-center">
      <el-popover placement="bottom" width="150" trigger="click">
        <div class="header-avatar-list">
          <div
            style="
              display: flex;
              padding: 5px 0;
              box-sizing: border-box;
              position: relative;
            "
            v-for="item in avatarList"
            :key="item.id"
          >
            <div @click="chooseAvatar(item.id, item.avatar_url)">
              <el-avatar
                style="cursor: pointer"
                size="large"
                :src="item.avatar_url"
              ></el-avatar>
            </div>
            <el-link
              style="position: absolute; right: 10px; top: 15px"
              type="danger"
              @click="deleteAvatar(item.id)"
              >删除
            </el-link>
          </div>
          <div style="text-align: center; font-size: 20px">
            <el-upload
              action="http://81.71.162.78:8008/avatar/upload"
              name="avatar"
              :headers="avatarParams"
              :show-file-list="false"
              :on-success="uploadAvatarSuccess"
            >
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
        <div class="head-portrait-username" slot="reference">
          <div class="head-portrait">
            <el-avatar :size="50" :src="avatarUrl"></el-avatar>
          </div>
          <div class="head-username">{{ nickname }}</div>
        </div>
      </el-popover>
      <div class="header-navbar">
        <el-menu
          class="header-navbar-menu"
          default-active="/main/index"
          mode="horizontal"
          background-color="rgba(255, 255, 255, 0)"
          text-color="#fff"
          active-text-color="#fff"
          router
        >
          <el-menu-item index="/main/index">
            <i class="iconfont icon-zhuye"></i>主页
          </el-menu-item>
          <el-menu-item index="/main/tags">
            <i class="iconfont icon-tag"></i>标签
          </el-menu-item>
          <el-menu-item index="/main/categories">
            <i class="iconfont icon-icon_category"></i>分类
          </el-menu-item>
          <el-menu-item index="/main/archives">
            <i class="iconfont icon-danganwenwu"></i>归档
          </el-menu-item>
          <el-menu-item index="/main/friends">
            <i class="iconfont icon-lianjie"></i>友情链接
          </el-menu-item>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuthorInfo, deleteAvatar } from '@api/avatar'

export default {
  name: 'Header',
  data() {
    return {
      nickname: '',
      avatarUrl: '',
      avatarList: [],
      isActive: false,
      avatarParams: {
        authorization: localStorage.getItem('token')
      }
    }
  },
  created() {
    this.getAuthorInfoData()
  },
  mounted() {
    window.addEventListener('scroll', this.listenPageScroll)
  },
  methods: {
    async getAuthorInfoData() {
      const { nickname, avatar_list } = await getAuthorInfo()
      this.nickname = nickname
      this.avatarUrl = avatar_list.find(
        (item) => item.id === this.$store.state.curAvatarId
      ).avatar_url
      this.avatarList = avatar_list
    },
    listenPageScroll() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 0) {
        this.isActive = true
      } else {
        this.isActive = false
      }
    },
    uploadAvatarSuccess(response) {
      if (response.code === 200) {
        this.getAuthorInfoData()
        this.$message({
          message: '上传头像成功~',
          type: 'success'
        })
      }
    },
    chooseAvatar(avatarId, avatarUrl) {
      this.avatarUrl = avatarUrl
      this.$store.commit('SET_CUR_AVATAR_ID', avatarId)
    },
    async deleteAvatar(id) {
      const res = await deleteAvatar(id)
      if (res) {
        if (
          id === this.$store.state.curAvatarId &&
          id === this.avatarList[0].id
        ) {
          this.$store.commit('SET_CUR_AVATAR_ID', this.avatarList[1].id)
        } else if (id === this.$store.state.curAvatarId) {
          this.$store.commit('SET_CUR_AVATAR_ID', this.avatarList[0].id)
        }
        this.$message({
          message: '删除头像成功~',
          type: 'success'
        })
      }
      await this.getAuthorInfoData()
    }
  }
}
</script>

<style scoped lang="less">
.header-container {
  width: 100%;
  height: 60px;
  .header-container-center {
    display: flex;
    width: 1125px;
    height: 100%;
    margin: 0 auto;
    .head-portrait-username {
      display: flex;
      flex: 1;
      padding: 0 10px;
      box-sizing: border-box;
      .head-portrait {
        display: flex;
        align-items: center;
        margin-right: 15px;
      }
      .head-username {
        color: #fff;
        line-height: 60px;
      }
    }
    .head-portrait-username:hover {
      background-color: rgba(255, 255, 255, 0.16);
      cursor: pointer;
    }
    .header-navbar {
      flex: 5;
      .header-navbar-menu {
        display: flex;
        justify-content: end;
        border-bottom: none;
        color: #fff;
      }
    }
  }
}
.el-menu-item:focus,
.el-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}
.background-color {
  background-color: #00bfff;
}
</style>
