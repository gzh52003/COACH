<template id="Related">
  <div>
    <van-divider />
    <h2>猜你喜欢</h2>
    <div class="btn">
    <van-button color="#333" size="mini" id="btn">即可选购</van-button>
    </div>
    <van-swipe style="height: 400px;" vertical>
      <van-swipe-item v-for="item in images" :key="item._id">
        <img v-lazy="item.pic" />
      </van-swipe-item>
    </van-swipe>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">爆款推荐</van-divider>
  </div>
</template>
<script>
import Vue from 'vue';
import { Swipe, SwipeItem } from 'vant';
import { Lazyload } from 'vant';
import { Divider } from 'vant';
import { Button } from 'vant';

Vue.use(Button);
Vue.use(Divider);
Vue.use(Lazyload);
Vue.use(Swipe);
Vue.use(SwipeItem);
export default {
    name:'Related',
    compontents:{
       Swipe,
       SwipeItem,
       Lazyload
    },
    data(){
        return {
            images:[
                {pic:"/img/banner/goods_banner_1.jpg",text:"星标系列短T"},
                {pic:"/img/banner/goods_banner_2.jpg",text:"星标系列梭织休闲长裤"},
                {pic:"/img/banner/goods_banner_3.jpg",text:"冬奥国旗款短T"},
                {pic:"/img/banner/goods_banner_4.jpg",text:"冬奥国旗款风衣"},
                {pic:"/img/banner/goods_banner_5.jpg",text:"KT5low复活节配色"},
                {pic:"/img/banner/goods_banner_6.jpg",text:"隆多6代篮球鞋"},
            ]
        }
    },


}
</script>
<style scoped>
h2 {
  font-weight: bold;
  line-height: 40px;
  font-size: 16px;
  text-align: center;
  color: #333;
}

.btn{
  margin-left: 50%;
  margin-top: -20px;
  margin-bottom: 10px;
  transform: translateX(-15%);
}
</style>