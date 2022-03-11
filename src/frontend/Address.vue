<template>
  <div>
    <div class="title_box">添加收货地址</div>
    <div class="msg_box">请填写您的收货地址</div>
    <div class="add_box">
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="receiver">
          <el-input v-model="addForm.receiver" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="省份" prop="province">
          <el-input v-model="addForm.province"></el-input>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="addForm.city"></el-input>
        </el-form-item>
        <el-form-item label="市区" prop="county">
          <el-input v-model="addForm.county"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="addForm.address"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="cellphone">
          <el-input v-model="addForm.cellphone"  placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="固定电话" prop="fixedphone">
          <el-input v-model="addForm.fixedphone"  placeholder="请输入固定电话"></el-input>
        </el-form-item>
        <el-form-item label="邮编" prop="postcode">
          <el-input v-model="addForm.postcode" placeholder="请输入邮编"></el-input>
        </el-form-item>
        <el-form-item label="学校/住宅" prop="tag">
          <el-input v-model="addForm.tag" placeholder="请输入地址分类"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="add" type="primary">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // 验证手机号的校验规则
    var checkMobile = (rule, value, callback) => {
      // 验证手机的正则表达式
      const regMobile =
        /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

      // 验证
      if (regMobile.test(value)) {
        // 合法手机号
        return callback();
      }

      // 未通过
      callback(new Error("请输入合法的手机号"));
    };
    return {
      // 添加地址表单的数据对象
      addForm: {
        user_id: sessionStorage.getItem("uid"), // 用户id*
        receiver: "", //姓名*
        province: "广东省", // 省*
        city: "广州市", // 市*
        county: "从化区", // 区*
        address: "温泉大道882号广州南方学院", // 地址*
        cellphone: "", // 手机号*
        fixedphone: "", // 固定电话
        postcode: "", // 邮编
        tag: "", // tag*
        is_default: "1", // is_default
      },
      // 添加地址表单的验证规则
      addFormRules: {
        receiver: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        province: [{ required: true, message: "请输入省份", trigger: "blur" }],
        city: [
          { required: true, message: "请输入城市", trigger: "blur" },
        ],
        county: [
          { required: true, message: "请输入市区", trigger: "blur" },
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
        ],
        // 手机验证规则
        cellphone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
        tag: [
          { required: true, message: "请输入地址分类", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    // 发送请求添加地址
    add() {
      // 预验证
      this.$refs.addFormRef.validate(async (valid) => {
        // 失败
        if (!valid) {
          // 提示用户
          return this.$message.error(`请填写必要的表单项！`);
        }
        // sql
        const sql = "address/insert";
        console.log(this.addForm);
        // JSON 处理表单数据
        // const form = JSON.stringify(this.addForm);
        const form = this.addForm;
        // 发送请求
        const { data: res } = await this.$axios.get(sql, { params: form });
        console.log(res);
        if (res.code == 200) {
          // 提示成功
          this.$message.success("添加地址成功");
          // 重置表单 addFormRef
          this.$refs.addFormRef.resetFields();
        }
      });
    },
  },
};
</script>

<style scoped>
.msg_box {
  /* margin-top: 15px; */
  padding: 15px;
  background-color: #ddd;
  box-shadow: 0 0 15px #aaa;
  font-size: 24px;
  text-align: center;
}
.el-input {
  width: 400px;
}
.add_box {
  margin-top: 15px;
  padding: 30px;
  display: flex;
  flex-flow: column;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 15px #aaa;
}
.title_box {
  color: #409eff;
  font-size: 30px;
  font-weight: bolder;
  border-bottom: 5px solid #409eff;
  padding: 15px 0;
}
</style>
