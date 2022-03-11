<template>
  <div>
    <div class="title_box">新用户注册</div>
    <div class="msg_box">请输入注册信息</div>
    <!-- 表单区域 -->
    <div class="add_box">
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="80px"
      >
        <!-- 用户名称 -->
        <el-form-item label="用户名称" prop="uname">
          <el-input v-model="addForm.uname"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="upwd">
          <el-input v-model="addForm.upwd"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <!-- 手机 -->
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
        <!-- 真实姓名 -->
        <el-form-item label="真实姓名" prop="user_name">
          <el-input v-model="addForm.user_name"></el-input>
        </el-form-item>
        <!-- 性别 -->
        <el-form-item label="性别" prop="gender">
          <el-select v-model="addForm.gender" placeholder="请选择活动区域">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button @click="register" type="primary">注册</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // 验证邮箱的校验规则
    var checkEmail = (rule, value, callback) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+([\.a-zA-Z0-9_-])+/;
      // 验证
      if (regEmail.test(value)) {
        // 合法邮箱
        return callback();
      }
      // 未通过
      callback(new Error("请输入合法的邮箱"));
    };
    // 验证手机号的校验规则
    var checkPhone = (rule, value, callback) => {
      // 验证手机的正则表达式
      const regPhone =
        /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      // 验证
      if (regPhone.test(value)) {
        // 合法手机号
        return callback();
      }
      // 未通过
      callback(new Error("请输入合法的手机号"));
    };
    return {
      // 添加用户的表单的数据对象
      addForm: {
        uname: "czy", // 用户名称
        upwd: "123456", // 密码
        email: "caizy2021@163.com", // 邮箱
        phone: "13444444444", // 手机
        user_name: "蔡正阳", // 真实姓名
        gender: "", // 性别
      },
      // 添加用户的表单的验证规则对象
      addFormRules: {
        // 用户名称验证规则
        uname: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 3, max: 10, message: "用户名称长度在3~10个字符之间" },
        ],
        // 密码验证规则
        upwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "密码称长度在6~15个字符之间" },
        ],
        // 邮箱验证规则
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        // 手机验证规则
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" },
        ],
        // 真实姓名验证规则
        user_name: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
        ],
        // 真实姓名验证规则
        gender: [{ required: true, message: "请输入性别", trigger: "blur" }],
      },
    };
  },
  mounted() {},
  methods: {
    // 发送请求注册
    register() {
      // 预校验表单
      this.$refs.addFormRef.validate(async (valid) => {
        // 不通过则return
        if (!valid) return;
        // console.log(this.addForm);
        const sql = "user/register";
        const params = this.addForm;
        console.log(params);
        // 发送请求执行注册
        const { data: res } = await this.$axios.get(sql, { params });
        console.log(res);
        if (res.code == 200) {
          this.$message.success("注册成功！三秒后跳转到登录界面");
          setTimeout(() => {
            this.$router.push("/login");
          }, 3000);
        }
      });
    },
  },
};
</script>

<style scoped>
.add_box {
  margin-top: 15px;
  padding: 30px;
  display: flex;
  flex-flow: column;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 15px #aaa;
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
