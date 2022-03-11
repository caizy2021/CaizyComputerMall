<template>
  <div>
    <div class="title_box">个人中心</div>
    <div class="msg_box">用户{{ this.uname }}的个人中心</div>
    <div class="per_box">
      <el-button @click="toInsertAddress" type="primary">添加收货地址</el-button>
    </div>
    <div class="per_box">
      <el-descriptions
        class="margin-top"
        title="用户基本信息"
        :column="3"
        border
      >
        <template slot="extra">
          <el-button type="primary" size="small">修改用户信息</el-button>
        </template>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            姓名
          </template>
          {{ userdetail.user_name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            手机号
          </template>
          {{ userdetail.phone }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-custom"></i>
            邮箱
          </template>
          {{ userdetail.email }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-custom"></i>
            性别
          </template>
          {{ userdetail.gender ? "男" : "女" }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-view"></i>
            用户名
          </template>
          {{ userdetail.uname }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uname: sessionStorage.getItem("uname"), // 用户名
      uid: sessionStorage.getItem("uid"), // 用户ID
      userdetail: [], // 存储用户信息
    };
  },
  // 挂载
  mounted() {
    this.getUserDetail();
  },
  // 方法
  methods: {
    // 点击跳转到添加地址页面
    toInsertAddress(){
      this.$router.push('/address')
    },
    // 获取用户信息
    async getUserDetail() {
      const sql = `/user/detail?uid=${this.uid}`;
      const { data: res } = await this.$axios.get(sql);
      this.$message.success("获取用户信息成功");
      this.userdetail = res.data;
      console.log(this.userdetail);
    },
  },
};
</script>

<style scoped>
.per_box {
  background-color: #fff;
  box-shadow: 0 0 15px #aaa;
  margin-top: 15px;
  padding: 15px;
}
.msg_box {
  /* margin-top: 15px; */
  padding: 15px;
  background-color: #ddd;
  box-shadow: 0 0 15px #aaa;
  font-size: 24px;
  text-align: center;
}
.title_box {
  color: #409eff;
  font-size: 30px;
  font-weight: bolder;
  border-bottom: 5px solid #409eff;
  padding: 15px 0;
}
</style>
