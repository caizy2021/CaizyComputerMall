<template>
  <div>
    <!-- 步骤条模块 -->
    <el-steps :active="active" finish-status="success">
      <el-step title="确认订单信息"></el-step>
      <el-step title="支付订单"></el-step>
      <el-step title="支付完成"></el-step>
    </el-steps>
    <div class="title_box" v-show="active == 0">确认订单</div>
    <div class="title_box" v-show="active == 1">支付方式</div>
    <div class="title_box" v-show="active == 2">支付订单</div>
    <div class="title_box" v-show="active == 3">支付完成</div>
    <!-- 如果 active==0，显示 确认订单信息 -->
    <Confirm v-show="active == 0" />
    <!-- 如果 active==1，显示 支付订单 -->
    <Pay v-show="active == 1" />
    <!-- 如果 active==2，显示 支付完成 -->
    <Complete v-show="active == 2" />
    <!-- 如果 active==3，显示 支付完成 -->
    <Success v-show="active == 3" />
    <!-- 确认订单信息底部按钮 -->
    <div class="Confirm_box" v-if="active == 0">
      <p>合计（不含运费）：{{ total }}</p>
      <el-button @click="next" type="primary">确认并付款</el-button>
    </div>
    <!-- 支付订单底部按钮 -->
    <div class="Pay_box" v-if="active == 1">
      <el-checkbox v-model="checked"
        >我已经阅读并同意签署消费者保证服务协议</el-checkbox
      >
      <el-button :disabled="!checked" @click="next" type="primary"
        >确认支付</el-button
      >
    </div>
    <!-- 支付完成底部按钮 -->
    <div class="Complete_box" v-if="active == 2">
      <el-button @click="next" type="primary">立即支付</el-button>
    </div>
    <!-- 支付完成底部按钮 -->
    <div class="Success_box" v-if="active == 3">
      <el-button @click="next" type="primary">支付完成</el-button>
    </div>
  </div>
</template>

<script>
import Confirm from "./Confirm.vue";
import Pay from "./Pay.vue";
import Complete from "./Complete.vue";
import Success from "./Success.vue";
export default {
  components: {
    Confirm,
    Pay,
    Complete,
    Success,
  },
  // 数据
  data() {
    return {
      active: 0, // 步骤条
      total: sessionStorage.getItem("total"), //总金额
      checked: false, // 控制单选框
    };
  },
  // 挂载
  mounted() {
    console.log(`mounted挂载时...`);
  },
  // 方法
  methods: {
    // 步骤条
    next() {
      if (this.active++ > 2) {
        this.$router.push("/main");
      }
    },
  },
};
</script>

<style scoped>
.Success_box {
  margin-top: 15px;
  padding: 15px;
  background-color: #ddd;
  box-shadow: 0 0 15px #aaa;
  display: flex;
  justify-content: end;
  align-items: center;
}
.title_box {
  color: #409eff;
  font-size: 30px;
  font-weight: bolder;
  border-bottom: 5px solid #409eff;
  padding: 15px 0;
}
.Complete_box {
  margin-bottom: 15px;
  padding: 15px;
  background-color: #ddd;
  box-shadow: 0 0 15px #aaa;
  display: flex;
  justify-content: end;
  align-items: center;
}
.Pay_box {
  margin-bottom: 15px;
  padding: 15px;
  background-color: #ddd;
  box-shadow: 0 0 15px #aaa;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.Confirm_box p {
  margin-right: 30px;
}
.Confirm_box {
  margin-bottom: 15px;
  padding: 15px;
  background-color: #ddd;
  box-shadow: 0 0 15px #aaa;
  display: flex;
  justify-content: end;
  align-items: center;
}
</style>
