<template>
  <div id="app">

    <router-view/>
  <van-tabbar v-model="active" v-show="showTabbar" >
  <van-tabbar-item icon="home-o" v-for="item in menu" :icon="item.icon" :badge="item.name === 'carts' ? carsum : '' " :key="item.name" :to="item.path">{{item.text}}</van-tabbar-item>
  </van-tabbar>

  </div>
</template>

<script>

import Vue from 'vue';
import { Button } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { Icon } from "vant";
import { Divider } from 'vant';

Vue.use(Divider);
Vue.use(Icon);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Button);
Vue.filter('number',(val,fmt)=>{
  
   val=val*1
  if(val>10000){
    let n = parseInt(val/10000);
    val=n+'万+';
    return val;
  }else if(val>1000){
    let m = parseInt(val/1000) 
    val = m+'千+';
    return val;
  }else{
    return val;
  }
})
export default {
    data(){
      return{
              active:0,
            
      menu:[{
        name:'home',
        path:'/home',
        icon:'wap-home-o',
        text:'首页'
      },
      {
        name:'discover',
        path:'/discover',
        icon:'eye-o',
        text:'发现'
      },
      {
        name:'carts',
        path:'/carts',
        icon:'shopping-cart-o',
        text:'购物车',
        requiresAuth:true
      },
      {
        name:'mine',
        path:'/mine',
        icon:'user-o',
        text:'我的',
        
      }
      ],
      }
    },
    computed:{
      carsum(){
        return this.$store.state.carts.goodslist.length
      },
      showTabbar(){
        return this.$store.state.common.showTabbar
      }
    }, 
};

</script>

 <style>
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
  .van-swipe-item img{
    display: block;
    width: 100%;
    height: 100%;
  }
</style>

