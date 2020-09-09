<template>
    <div>
    <h1>
      <img src="/img/logo.png" alt="安踏注册页" id="titleLogo" />
    </h1>
<van-form @submit="onSubmit">
  <van-field
    v-model="username"
    name="用户名"
    label="用户名"
    placeholder="用户名"
    :rules="[{ required: true, message: '请填写用户名' }]"
  />
  <van-field
    v-model="password"
    type="password"
    name="密码"
    label="密码"
    placeholder="密码"
    :rules="[{ required: true, message: '请填写密码' }]"
  />
  <input-group v-on:getVcodeVal="codeCheckValVal" v-on:getMdlVal="mdlVal"></input-group>
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">
      登录
    </van-button>
  </div>
</van-form>
    </div>
</template>
<script>
import Vue from "vue";
import { Form } from "vant";
import { Field } from "vant";
import throttle from "../utils/throttle";
import request from "../utils/request";
import { Notify } from 'vant';
import  inputGroup  from '../components/inputGroup';
Vue.use(Field);
Vue.use(Form);
export default {
    name:'Login',
    data(){
      return {
        username:'',
        password:'',
        codeCheckVal:'',
        mdl:true,
        bool:true
      }
    },
    methods:{
    codeCheckValVal(val){
     this.codeCheckVal= val;
    },
    mdlVal(val){
     this.mdl = val;
    },
    async  onSubmit(val){
      let code = this.codeCheckVal;
      let postVal = val;
      let checkLogVal = Object.values(postVal);
      const checkLogResult =await request.get('/login',{
      params:{  username:checkLogVal[0],
                password:checkLogVal[1],
                mdl:this.mdl
             } 
      })
      const {data} = checkLogResult;
      if(data.code == 1 && this.bool===true){
        Notify({ type: 'primary', message: '登陆成功' });
        localStorage.setItem('userInfo',JSON.stringify(data.data));
        this.$router.replace('/mine');
      }else {
        this.bool = false;
        this.$store.dispatch('trgChangevcodeShow',{bool:true})
        const result = await request.get('/login',{
          params:{
            username:checkLogVal[0],
            password:checkLogVal[1],
            mdl:this.mdl,
            vcode:code
          }
        })
      if(result.data.code == 1){
        Notify({ type: 'primary', message: '登陆成功' });
        localStorage.setItem('userInfo',JSON.stringify(data.data));
        this.$router.replace('/mine');
      }else{
        Notify({  message: '账号密码错误' });
      }
       }
      }
    },
    computed:{
     getVerificationCodeStatus(){
       return this.$store.getters.getVerificationCode;
     }
    },
    components:{
     inputGroup:inputGroup
    },
    beforeDestroy(){
      this.$store.dispatch('trgChangevcodeShow',{bool:false})
    }
}
</script>
<style lang="scss" scoped>
#titleLogo {
  display: block;
  width: 50%;
  height: 50%;
  margin: 0 auto;
}
</style>