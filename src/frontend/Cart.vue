<template>
  <div>
    <div v-if="cart.length == 0">
      <el-empty description="购物车是空的..."></el-empty>
    </div>
    <div v-else class="cart_main">
      <!-- 收货地址 -->
      <div class="cart_font">收货地址</div>
      <div class="address">
        <div v-text="address[0].receiver"></div>
        <div v-text="address[0].cellphone"></div>
        <div
          v-text="address[0].city + address[0].county + address[0].address"
        ></div>
      </div>
      <el-divider></el-divider>

      <!-- 购物车项 -->
      <a href="javascript:;" class="cart" v-for="(item,index) in cart" :key="index">
        <div class="cart_item">
          <div><img :src="item.md" alt=""></div>
          <div>{{item.lname}}</div>
          <div>{{item.price}} × {{item.count}}</div>
          <el-checkbox v-model="checked">选购</el-checkbox>
        </div>
        <el-divider></el-divider>
      </a>

      <!-- 总价/提交订单 -->
      <div class="submit">
        <span>总价：￥1111</span>
        <span>运费：￥0</span>
        <span>优惠：-￥200</span>
        <el-button type="danger">提交订单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uid: sessionStorage.getItem("uid"),
      // uid: 2,
      cart: [],
      address: {},
      checked: true
    };
  },
  methods: {
    // 请求用户地址方法
    getAddress() {
      let url = "address?uid=" + this.uid;
      this.$axios.get(url).then((res) => {
        this.address = res.data;
        console.log(this.address);
      });
    },
    // 请求购物车方法
    getCart() {
      let url = "cartItems?uid=" + this.uid;
      this.$axios.get(url).then((res) => {
        // console.log(res);
        this.cart = res.data;
        console.log(this.cart);
      });
    },
  },
  // mounted 挂载时
  mounted() {
    console.log(`mounted挂载时...`);
    // 用户地址方法
    this.getAddress();
    // 购物车方法
    this.getCart();
  },
};
</script>

<style lang="less" scoped>
.cart {
  margin: 0;
  padding: 0;
  color: black;
  text-decoration: none;
}
.submit {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
img {
  height: 198px;
}
.cart_item:hover{
  background-color: #eee;
}
.cart_item {
  display: flex;
  justify-content: space-between;
  // width: 800px;
  align-items: center;
  text-align: center;
  padding: 20px;
}
.cart_main {
  background-color: #fff;
  box-shadow: 0 0 15px #aaa;
  padding: 20px;
  // height: 500px;
}
.cart_font {
  font-size: 25px;
  font-weight: bold;
  padding-bottom: 10px;
  border-bottom-style: solid;
  margin-bottom: 20px;
  color: orange;
}
.address {
  display: flex;
  justify-content: space-around;
  width: 300px;
}
</style>
