<template>
  <div>
    <!-- 空状态 -->
    <div v-if="cart.length == 0">
      <el-empty description="购物车是空的..."></el-empty>
    </div>
    <!-- msgdiv -->
    <el-row class="msg_box">
      <el-col :span="18"><p>商品</p></el-col>
      <el-col :span="6"><p>单价（元）</p></el-col>
      <el-col :span="6"><p>数量</p></el-col>
      <el-col :span="6"><p>金额</p></el-col>
    </el-row>
    <!-- 购物车div -->
    <el-row class="cart_box" v-for="(item, index) in laptop" :key="index">
      <el-col :span="18">
        <div>
          <div>{{ item.title }}</div>
          <div>规格：{{ item.spec }}</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div>{{ item.price }}</div>
      </el-col>
      <el-col :span="6">
        <div>{{ item.count }}</div>
      </el-col>
      <el-col :span="6">
        <div>{{ item.price * item.count }}</div>
      </el-col>
    </el-row>
    <!-- 去结算 -->
    <div class="js_box">
      <p>合计（不含运费）：{{ total }}</p>
      <el-button @click="toPay" type="primary">去结算</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_id: sessionStorage.getItem("uid"), // 用户 user_id
      cart: [], // 购物车数据
      laptop: [], // 购物车对应的商品数据
      total: 0,
    };
  },
  methods: {
    // 点击'去结算'按钮触发
    toPay() {
      this.$router.push("/order");
    },

    // 请求我的购物车
    async getMyCart() {
      // 发送请求，获取我的购物车
      const user_id = sessionStorage.getItem("uid");
      const sql = "cart/detail?user_id=" + this.user_id;
      const { data: res } = await this.$axios.get(sql);
      // console.log(res);
      this.cart = res.item;
      this.laptop = res.laptop;
      res.item.forEach((item) => {
        // console.log(item);
        // 获取索引 index
        const index = res.item.indexOf(item);
        // console.log(index);
        // 保存数量 count
        this.laptop[index].count = item.count;
        // 计算总金额 total
        this.total += item.count * this.laptop[index].price;
        // console.log(this.total);
      });
      // console.log(this.cart);
      // console.log(this.laptop);
    },
  },
  // mounted 挂载时
  mounted() {
    console.log(`mounted挂载时...`);
    console.log(this.user_id);
    // 购物车方法
    this.getMyCart();
  },
};
</script>

<style lang="less" scoped>
.js_box p {
  margin-right: 30px;
}
.js_box {
  margin-bottom: 15px;
  padding: 15px;
  background-color: #ddd;
  box-shadow: 0 0 15px #aaa;
  display: flex;
  justify-content: end;
  align-items: center;
}
.cart_box {
  // border: 1px solid gray;
  margin-bottom: 15px;
  padding: 15px;
  background-color: #fff;
  // box-shadow: 0 0 15px #aaa;
  display: flex;
}
.msg_box {
  margin-bottom: 15px;
  background-color: #ddd;
  box-shadow: 0 0 15px #aaa;
  display: flex;
}

.el-col {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
