<template id="Reg">
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
        ref="username"
        @input="checkUserName(username)"
        :rules="[{ required: true, message: '请填写用户名',validator:nameReg }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' ,validator:pswReg}]"
      />
      <van-field
        v-model="repetitionPassword"
        type="password"
        name="重复密码"
        label="重复密码"
        placeholder="请输入相同的密码"
        :rules="[{ required: true, message: '请填写相同的密码' ,validator:rpdReg}]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">注册</van-button>
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
Vue.use(Field);
Vue.use(Form);

export default {
  name: "Reg",
  data() {
    return {
      username: "",
      password: "",
      repetitionPassword:""
    };
  },
  methods: {
    nameReg(val) {
      return /^[a-zA-Z0-9\u4e00-\u9fa5]{3,8}$/.test(val);
    },
    pswReg(val){
    //   return /^[a-zA-Z][a-zA-Z0-9]{6,12}$/.test(val)
    return val
    },
    rpdReg(val){
        const p = this.$data.password;
      if(val !== p){
          Notify('用户名或密码错误');
      }
    },
 async onSubmit(values) {
       let info = Object.values(values);
       const result =await request.post('/reg',{
          
               username:info[0],
               password:info[1]
           
       })
       const {data} = result;
       if(data.code == 1){
           Notify('注册成功');
           this.$router.replace({
             name:'Login'
           })
       }
    },
    checkUserName(val){
      let tagThis = this;
      let checkVal = val;
      async  function check(vl,Tthis){
          const result =await request.get('/reg/check',{
              params:{
                  username : vl
              }
          })
           let {data} = result;
           if(data.code !==1){
               Notify('用户名重复');
               Tthis.$refs.username.value = ''
           }
        }
        throttle(check(checkVal,tagThis),500)
    }
  },
  components: {},
};
</script>
<style lang="scss" scoped>
#titleLogo {
  display: block;
  width: 50%;
  height: 50%;
  margin: 0 auto;
}
</style>