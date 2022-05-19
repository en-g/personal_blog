<template>
  <div class="login-container">
    <div class="main-background-image">
      <img
        class="image"
        src="http://81.71.162.78:8008/backgroundImage/random"
        alt=""
      />
    </div>
    <el-card class="login-card" shadow="never">
      <div class="login-title">
        <i class="iconfont icon-denglu"></i><span>用户登录</span>
      </div>
      <el-input
        class="login-username"
        v-model="user.username"
        placeholder="请输入用户名"
      ></el-input>
      <el-input
        class="login-password"
        v-model="user.password"
        placeholder="请输入密码"
        show-password
      ></el-input>
      <div class="login-button">
        <el-link class="login-button-item" type="primary" @click="listenLogin"
          >登录</el-link
        >
        <el-link
          class="login-button-item"
          type="primary"
          @click="listenTouristLogin"
          >游客访问</el-link
        >
      </div>
    </el-card>
  </div>
</template>

<script>
import { login } from '@api/login'

export default {
  name: 'Login',
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async listenLogin() {
      const data = await login(this.user)
      if (data.id) {
        this.$message({
          message: '登录成功~',
          type: 'success'
        })
      } else {
        this.$message({
          message: '游客登录~',
          type: 'success'
        })
      }
      localStorage.setItem('token', data.token)
      this.$router.push('/main')
    },
    async listenTouristLogin() {
      const data = await login({})
      if (data) {
        this.$message({
          message: '游客登录~',
          type: 'success'
        })
      }
      localStorage.setItem('token', data.token)
      this.$router.push('/main')
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
  .login-card {
    width: 400px;
    padding: 30px;
    box-sizing: border-box;
    .login-title {
      color: rgba(255, 255, 255, 0.8);
      font-size: 20px;
      text-align: center;
      margin-bottom: 20px;
      i {
        font-size: 22px;
        margin-right: 5px;
      }
    }
    .login-username {
      margin-bottom: 20px;
    }
    .login-password {
      margin-bottom: 20px;
    }
    .login-button {
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      box-sizing: border-box;
      .el-link {
        color: rgba(255, 255, 255, 0.8);
      }
      .el-link.is-underline:hover:after {
        border-bottom-color: rgba(255, 255, 255, 0.8);
      }
    }
  }
}
/deep/ .el-card {
  background-color: rgba(250, 250, 250, 0);
  border: none;
}
/deep/ .el-input__inner {
  background-color: rgba(255, 255, 255, 0.22);
  color: #fff;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
/deep/ .el-input__inner::placeholder {
  color: rgba(255, 255, 255, 0.7);
}
</style>
