<template>
  <div>
    <div class="dz_box">选择您的收货地址</div>
    <!-- 地址模块 -->
    <el-radio-group
      v-model="radio"
      v-for="(item, index) in address"
      :key="index"
    >
      <el-radio :label="index">
        <el-descriptions :title="`收货地址${index+1}`">
          <el-descriptions-item label="姓名">{{
            item.receiver
          }}</el-descriptions-item>
          <el-descriptions-item label="手机号">{{
            item.cellphone
          }}</el-descriptions-item>
          <el-descriptions-item label="居住地">{{
            item.city
          }}</el-descriptions-item>
          <el-descriptions-item label="备注">
            <el-tag size="small">{{ item.tag }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="联系地址">{{
            item.province + item.city + item.county + item.address
          }}</el-descriptions-item>
        </el-descriptions>
        <el-button @click="deleteAddress(item.aid)" type="danger" size="mini"
          >删除</el-button
        >
      </el-radio>
    </el-radio-group>

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
      radio: 0,
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
  methods: {
    // 删除对应地址方法
    async deleteAddress(aid) {
      // console.log(aid);
      const sql = "address/delete?aid=" + aid;
      // console.log(sql);
      const { data: res } = await this.$axios.get(sql);
      if (res.code == 200) {
        this.$message.success("地址删除成功");
        this.getAddress();
      }
    },
    // 请求用户地址方法
    async getAddress() {
      let url = "address?user_id=" + this.user_id;
      const { data: res } = await this.$axios.get(url);
      // console.log(res);
      // console.log(res[0]);
      this.address = res;
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
      window.sessionStorage.setItem("total", this.total);
      // console.log(this.cart);
      // console.log(this.laptop);
    },
  },
};
</script>

<style lang="less" scoped>
.el-descriptions{
  margin-top: 15px;
}
.dz_box {
  // margin-bottom: 15px;
  padding: 15px;
  background-color: #ddd;
  box-shadow: 0 0 15px #aaa;
  font-size: 24px;
  text-align: center;
}
.title_div {
  font-weight: bolder;
  margin-bottom: 10px;
}
.zy_p {
  font-weight: bolder;
  color: #409eff;
}
.el-radio-group {
  // border: 1px solid gray;
  display: flex;
  flex-flow: column;
}
.el-radio-group .el-radio {
  background-color: #fff;
  margin: 0;
  margin-top: 15px;
  padding: 15px;
  box-shadow: 0 0 15px #777;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  margin-top: 30px;
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
