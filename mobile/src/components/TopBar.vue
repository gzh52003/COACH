<template id="topbar">
        <!--top 导航条  -->
    <van-sticky>
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="ellipsis" size="18" width="100" height="100" />
      </template>
    </van-nav-bar>
    </van-sticky>
</template>
<script>
import Vue from 'vue';
import { NavBar } from "vant";
import { Sticky } from 'vant';

Vue.use(Sticky);
Vue.use(NavBar);
export default {
    name:'topbar',
    methods:{
      onClickLeft(value) {
      console.log(value);
      this.$router.push({
          name:'Home'
      });
    },
    onClickRight(value) {
      console.log(value);
    }, 
 },
 beforeRouteUpdate(to,from,next){
     console.log(to,from)
 }
}
</script>