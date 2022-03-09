<template>
  <div>
    <!-- 步骤条模块 -->
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps>

    <!-- 地址模块 -->
    <el-descriptions title="用户地址">
      <el-descriptions-item label="姓名">{{
        address.receiver
      }}</el-descriptions-item>
      <el-descriptions-item label="手机号">{{
        address.cellphone
      }}</el-descriptions-item>
      <el-descriptions-item label="居住地">{{
        address.city
      }}</el-descriptions-item>
      <el-descriptions-item label="备注">
        <el-tag size="small">{{ address.tag }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="联系地址">{{
        address.city + address.county + address.address
      }}</el-descriptions-item>
    </el-descriptions>

    <!-- 购物车模块 -->
    <div>
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
            <div class="title_div">{{ item.title }}</div>
            <div>规格：{{ item.spec }}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <p class="zy_p">正阳专属价</p>
            ￥{{ item.price }}
          </div>
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
        <el-button @click="next" type="primary">确认并付款</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 数据
  data() {
    return {
      user_id: sessionStorage.getItem("uid"), // 用户 user_id
      cart: [], // 购物车数据
      laptop: [], // 购物车对应的商品数据
      address: [], // 地址数据
      total: 0, // 总价
      active: 0, // 步骤条
    };
  },
  // 挂载
  mounted() {
    console.log(`mounted挂载时...`);
    console.log(this.user_id);
    // 用户地址方法
    this.getAddress();
    // 购物车方法
    this.getMyCart();
  },
  // 方法
  methods: {
    // 步骤条
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    // 请求用户地址方法
    async getAddress() {
      let url = "address?user_id=" + this.user_id;
      const { data: res } = await this.$axios.get(url);
      // console.log(res);
      // console.log(res[0]);
      this.address = res[0];
      console.log(this.address);
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
};
</script>

<style lang="less" scoped>
.title_div {
  font-weight: bolder;
  margin-bottom: 10px;
}
.zy_p {
  font-weight: bolder;
  color: #0aa1ed;
}
.el-descriptions {
  // border: 1px solid gray;
  background-color: #fff;
  margin: 30px 0px;
  padding: 15px;
  box-shadow: 0 0 20px #777;
}
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
  box-shadow: 0 0 10px #aaa;
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
