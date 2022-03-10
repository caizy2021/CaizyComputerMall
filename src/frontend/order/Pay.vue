<template>
  <div>
    <!-- 网上银行支付模块 -->
    <div class="pay_box">网上银行支付</div>
    <!-- 银行选项模块 -->
    <el-radio-group v-model="radio">
      <el-radio :label="1" border>
        <img src="../../../public/img/pay/pay_img1.jpg" alt="" />
      </el-radio>
      <el-radio :label="2" border>
        <img src="../../../public/img/pay/pay_img2.jpg" alt="" />
      </el-radio>
      <el-radio :label="3" border>
        <img src="../../../public/img/pay/pay_img3.jpg" alt="" />
      </el-radio>
      <el-radio :label="4" border>
        <img src="../../../public/img/pay/pay_img4.jpg" alt="" />
      </el-radio>
      <el-radio :label="5" border>
        <img src="../../../public/img/pay/pay_img5.jpg" alt="" />
      </el-radio>
    </el-radio-group>
    <!-- 总金额模块 -->
    <div class="total_box">
      <div>尊敬的用户，您一共需要支付￥{{ total }}元</div>
      <!-- 订单号 -->
      <div>支付订单：324235435 收款方：正阳商城</div>
    </div>
  </div>
</template>

<script>
export default {
  // 数据
  data() {
    return {
      total: sessionStorage.getItem("total"),
      radio: 1,
    };
  },
  // 挂载
  mounted() {},
  // 方法
  methods: {},
};
</script>

<style scoped>
.el-radio-group .el-radio {
  margin: 0;
  padding: 10px;
  height: 76px;
  display: flex;
  align-items: center;
}
.el-radio-group {
  margin: 15px 0;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 0 15px #aaa;
  display: flex;
  justify-content: space-evenly;
}
.total_box {
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  background-color: #fff;
  box-shadow: 0 0 15px #aaa;
  padding: 15px;
}
.pay_box {
  /* margin-top: 15px; */
  padding: 15px;
  background-color: #ddd;
  box-shadow: 0 0 15px #aaa;
  font-size: 24px;
  text-align: center;
}
</style>
