<template>
 
  <div>
     <h1>用户编辑</h1>
     <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-bind:value="ruleForm.username" disabled v-if="userid"></el-input>
         <el-input type="text" v-model="ruleForm.username"  v-else></el-input>
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
        <el-button type="success" @click="submitForm">{{ !userid ? '添加' :'修改'}}</el-button>
      </el-form-item>
    </el-form>
</div>
</template>

<script>
  export default {
    data(){
      let checkName = (rule,value,callback) =>{
         if(value.trim() === ''){
           return callback(new Error('用户名不能为空'));
         }
         else{
         if(!this.userid){ 
           this.$request('/reg/check',{
             params:{
               username:value
             }
           }).then(({data})=>{
             if(data.code === 0){
               callback(new Error("用户名已存在"))
             }else{
              callback();
             }
           })
           }else{
             callback();
           } 
         }
      };
      let checkAge = (rule,value,callback) =>{
         if(value<18){
           return callback(new Error('年龄未超过18周岁'))
         }else{
           callback();
         }
      };
      return {
        userid: '',
        ruleForm:{
          username:'',
          password:'',
          gender:'male',
          age:''
          
        },
        rules:{
          age:[
            { required : true , message: "年龄必填" , trigger : "blur"},
            { validator: checkAge, trigger:'blur'},
            { type:"number" , message :"只能输入数字", trigger : "change"}
          ],
          password:[
            { required : false , message: "密码为8-16位" , min : 8 , max : 16 , trigger : "blur"}
          ],
          username:[
            { validator: checkName , trigger: "blur"}
          ]
        }
      }
    },
    watch:{
      userid: function (newval,oldval){
       console.log(newval,oldval);
      },
      'ruleForm.username': function (newval,oldval){
       console.log(newval,' name ',oldval);
      },
      '$route.path': function (newval,oldval){
        console.log(newval,' route ',oldval)
        if(newval === '/user/add'){
          this.userid = '',
          this.ruleForm = {
          username:'',
          password:'',
          gender:'male',
          age:''
          }
        }
      }
    },
    methods:{
      submitForm(){
        this.$refs['ruleForm'].validate(async (valid)=>{
          if(valid){
            const {userid,ruleForm} = this;
            if(userid){
              const {data} = await this.$request.put("/user/"+userid,{
              ...ruleForm
            });
            if(data.code === 1){
               this.$message({
                 type:"success",
                 message: "修改成功"
               });
            }
            }else{
              const {data} = await this.$request.post("/user",{
                ...ruleForm
              });
              if(data.code === 1){
                this.$message({
                  type:"success",
                  message: "添加成功"
                });
                
              }
            }
          }else{
            console.log('error submit !!');
            return false;
          }
        });
      }
    },
   async created(){
      const {id}  = this.$route.params;
      this.userid    = id;
      console.log(id);
      const {data} =await this.$request.get('/user/'+id);
      console.log(data)
      Object.assign(this.ruleForm,data.data);
    },
    // beforeRouteUpdate(to , from ,next){
      
    //   next();
    // }
  }
</script>