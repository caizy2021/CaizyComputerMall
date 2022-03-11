<template>
  <el-container class="index_container">
    <!-- header区域 -->
    <el-header>
      <!-- 商城的标题 -->
      <div class="header_logo">
        <img src="../../public/img/logo/trm32.png" alt="" />
      </div>

      <!-- 导航栏：定宽1200px -->
      <div class="header_nav">
        <el-menu
          default-active="main"
          class="el-menu-demo"
          mode="horizontal"
          router
        >
          <el-menu-item index="main">首页</el-menu-item>
          <el-menu-item index="cart">我的购物车</el-menu-item>
          <el-menu-item index="order">我的订单</el-menu-item>
          <!-- <el-menu-item index="collect">收藏夹</el-menu-item> -->
          <el-menu-item index="personal">个人中心</el-menu-item>
        </el-menu>
      </div>

      <!-- 登录 -->
      <div class="login_box" v-if="!uname">
        <el-button type="info" @click="toRegister">注册</el-button>
        <el-button type="primary" @click="toLogin">登录</el-button>
      </div>

      <!-- 用户信息 -->
      <div class="header_user" v-if="uname">
        <div class="user_uname">欢迎你！{{ uname }}</div>
        <el-button type="info" @click="logout">退出</el-button>
      </div>
    </el-header>

    <!-- main区域：定宽1200px -->
    <el-main>
      <router-view class="index_main"></router-view>
    </el-main>

    <!-- footer区域 -->
    <el-footer>
      <div>
        <span>©2021 caizy2021@163.com 版权所有</span>
        <br />
        <span>gitee主页：https://gitee.com/caizy2021</span>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  data() {
    // var lastname = sessionStorage.getItem("key");
    return {
      uname: sessionStorage.getItem("uname"),
    };
  },
  methods: {
    // 去注册
    toRegister() {
      this.$router.push("/register");
    },
    // 去登录
    toLogin() {
      this.$router.push("/login");
    },
    // 登出
    logout() {
      window.sessionStorage.clear();
      this.$message.warning("退出成功");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="less" scoped>
.login_box {
  display: flex;
  align-items: center;
}

.index_container {
  height: 100%;
  .el-header {
    min-width: 1400px;
    // height: 100px !important;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    .header_logo {
      display: flex;
      align-items: center;
      padding-left: 20px;
    }
    .header_nav {
      background-color: #eee;
      width: 1200px;
      margin-left: 75px;
    }
    .header_user {
      display: flex;
      align-items: center;
      .user_uname {
        margin-right: 20px;
        text-align: center;
      }
    }
  }

  .el-main {
    // background-color: #eee;
    .index_main {
      width: 1200px;
      margin: 0 auto;
      background-color: #eee;
    }
  }

  .el-footer {
    display: flex;
    justify-content: center;
    background-color: #fff;
    align-items: center;
  }
}
</style>
