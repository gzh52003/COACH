<template>
  <div class="login_form">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="from"
    >
      <h1 class="title">安踏后台管理系统</h1>
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="vcode">
        <el-input type="text" v-model="ruleForm.vcode" autocomplete="off">
          <template v-slot:append>
            <div v-html="vcodeSvg" class="vcode" @click="getVcode"></div>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="mdl">
        <el-checkbox label="没登录" v-model="ruleForm.mdl"></el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var vcode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      }
      callback();
    };
    return {
      ruleForm: {
        username: "",
        password: "",
        vcode: "",
        mdl: true,
      },
      vcodeSvg: "",
      rules: {
        username: [{ validator: checkAge, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        vcode: [{ validator: vcode, trigger: "blur" }],
      },
    };
  },
  components: {},

  methods: {
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate(async (valid) => {
        console.log(valid);
        if (valid) {
          //登录成功
          const { data } = await this.$request.get("./login", {
            params: {
              ...this.ruleForm,
            },
          });
          if (data.code === 1) {
            this.$message({
              message: "登录成功",
              type: "success",
            });
             alert("submit!");
             this.$router.replace('/home');

             //把用户信息写入本地存储
             localStorage.setItem("userInfo",JSON.stringify(data.data))
          }
         
        } else {
          //登录失败
          console.log("error submit!!");
          return false;
        }
      });
    },
    async getVcode() {
      const { data } = await this.$request.get("./vcode");
      this.vcodeSvg = data.data;
    },
  },
  created() {
    this.getVcode();
  },
};
</script>

<style >
.from {
  width: 360px;
  padding: 30px 70px 30px 30px;
  background: rgba(255, 255, 255, 0.5);
  margin: 100px auto;
}
.login_form {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url("../../assets/背景图.jpg");
  overflow: hidden;
}
.title {
  font-size: 30px;
  margin-bottom: 20px;
  text-align: center;
}
.el-input .el-input-group__append {
  padding: 0;
}
.vcode {
  width: 100px;
  height: 35px;
  position: relative;
  padding: 0;
}
.vcode svg {
  width: 100px;
  height: 35px;
}
</style>