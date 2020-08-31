<template>
  <div>
    <h1>用户编辑</h1>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="用户民" prop="username">
        <el-input type="text" v-model="ruleForm.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="ruleForm.gender">
          <el-option label="男" value="male"></el-option>
          <el-option label="女" value="female"></el-option>
          <el-option label="保密" value="baomi"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (value < 18) {
        return callback(new Error("未满18禁止浏览"));
      } else {
        callback();
      }
    };
    return {
      userid: "",
      ruleForm: {
        username: "",
        password: "",
        gender: "male",
        age: "",
      },
      rules: {
        age: [
          { required: true, message: "年龄必填", trigger: "blur" },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          {
            validator: checkAge,
            trigger: "change",
          },
        ],
        gender:[
           {
            validator: checkAge,
            trigger: "change",
          },
        ]
      },
    };
  },
  methods: {
    submitForm() {
      console.log(12, this.$refs["ruleForm"]);
      this.$refs["ruleForm"].validate(async (valid) => {
        console.log(13, valid);
        if (valid) {
          const { userid, ruleForm } = this;
          const { data } = await this.$request.put("/user/" + userid, {
            ...ruleForm,
          });
          if (data.code === 1) {
            this.$message({
              type: "success",
              message: "修改成功!",
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  async created() {
    console.log("Router=", this.$router);
    console.log("Route=", this.$route);
    // const { a, b } = this.$route.query;
    const { id } = this.$route.params;
    const { data } = await this.$request.get("/user/" + id);
    this.userid = id;
    this.ruleForm.username = data.data.name;
    this.ruleForm.age = data.data.age;
    //  Object.assign(this.ruleForm,data.data);
  },
};
</script>