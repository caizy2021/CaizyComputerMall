<template>
  <div>
    <div class="commsg_box">支付订单</div>
    <div class="complete_box">
      <div class="zf_success">
        <img src="../../../public/img/pay/pay_succ.png" alt="">
        订单生成成功！请您尽快支付！
      </div>
      <div>订单号：324235435</div>
      <div>支付金额：￥{{ total }}元</div>
    </div>
  </div>
</template>

<script>
export default {
  // 数据
  data() {
    return {
      total: sessionStorage.getItem("total"),
    };
  },
  // 挂载
  mounted() {},
  // 方法
  methods: {},
};
</script>

<style scoped>
.commsg_box {
  background-color: #ddd;
  box-shadow: 0 0 30px #aaa;
  padding: 15px;
  text-align: center;
  font-size: 24px;
}
.zf_success {
  font-weight: bolder;
  font-size: 30px;
  color: #0aa1ed;
  margin-bottom: 15px;
}
.complete_box {
  margin: 30px 0;
  /* border: 1px solid black; */
  background-color: #fff;
  box-shadow: 0 0 30px #aaa;
  padding: 30px;
  text-align: center;
}
</style>
