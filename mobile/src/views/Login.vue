<template>
  <div id="app">
    <van-row>
      <van-col span="24" align="center">
        <van-image width="30%" height="50%" src="/img/mine/login.jpg" />
      </van-col>
      <van-col span="24" align="center">
        <p class="text">
          <b>账号密码登录</b>
        </p>
      </van-col>
    </van-row>
    <van-cell-group>
      <van-field v-model="value" label="用户名" placeholder="请输入用户名" />
       <van-field v-model="password" type="password" label="密码" />
    </van-cell-group>


  </div>
</template>
<script>
import Vue from "vue";
import { Col, Row, Field } from "vant";
import { Image as VanImage } from "vant";

Vue.use(Field);
Vue.use(VanImage);
Vue.use(Col);
Vue.use(Row);
export default {
  name: "mine",



};
</script>

<style >
.van-row {
  margin-top: 15px;
}
.text {
  font-size: 20px;
}
</style>