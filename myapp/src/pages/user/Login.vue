<template>
    <div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="username">
    <el-input type="username" v-model="ruleForm.username" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="验证码" prop="vcode">
    <el-input v-model="ruleForm.vcode">
        <template v-slot:append > <div v-html="vcodeSvg" class="vcode" @click="getvcode"></div></template>
    </el-input>
  </el-form-item>
    <el-form-item  prop="mdl">
    <el-checkbox label="下次免登录" v-model="ruleForm.mdl">
        
    </el-checkbox>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm">提交</el-button>
    <el-button @click="resetForm">重置</el-button>
  </el-form-item>
</el-form>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          username:'',
          password:'',
          vcode:'',
          mdl:true
        },
        vcodeSvg:'',
        rules: {
          username: [
            { required: true,message:'用户名必填' ,trigger: 'blur' }
          ],
          password: [
            { required: true,message: '密码必填', trigger: 'blur' }
          ],
          vcode: [
            { required: true, message: '验证码必填', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm() {
          
        this.$refs['ruleForm'].validate(async (valid) => {
          if (valid) {
            
         const {data} = await  this.$request.get('/login',{
                params:{
                    ...this.ruleForm
                }
                

            });
            if(data.code === 1){
                this.$message({
                    message:'登录成功',
                    type:'success'
                });
                localStorage.setItem('userInfo',JSON.stringify(data.data))
                const {redirectTo = '/home'} = this.$route.query;
                this.$router.replace(redirectTo);

                console.log(redirectTo+'   red')
                console.log(data);
              
                // localStorage.setItem('userInfo',JSON.stringify(data.data))
            }
          } else {
            return false;
          }
        });
      },
      resetForm() {
        this.$refs['ruleForm'].resetFields();
      },
    async  getvcode(){
         const {data} =await this.$request.get('/vcode') ;
         this.vcodeSvg = data.data;
      }
    },
    created(){
        this.getvcode();
    }
  }
</script>
<style scoped lang='scss'>

</style>
