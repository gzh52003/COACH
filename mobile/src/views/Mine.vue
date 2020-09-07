<template>
  <div id="app">
    <div>
      <van-image class="img_da" width="100%" height="100%" src="https://img.yzcdn.cn/vant/cat.jpeg">
        <div class="img_xiao">
          <van-image round width="100" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </div>
      </van-image>
      <van-nav-bar>
        <template #title>
          <van-tag plain size="large" type="primary">大花猪要你·</van-tag>
        </template>
      </van-nav-bar>
    </div>
    <van-nav-bar>
      <template #left>
        <van-icon name="todo-list" size="25" />
        <p>我的订单</p>
      </template>

      <template #right>
        <p>查看全部订单</p>
        <van-icon name="arrow" size="20" color="#f777" />
      </template>
    </van-nav-bar>
    <van-grid :column-num="5">
      <van-grid-item
        v-for="item in columnNum"
        :key="item.text"
        :icon="item.icon"
        :badge="item.badge"
        :text="item.text"
      />
    </van-grid>
    <van-divider  :style="{  color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"></van-divider>

    <van-cell v-for="item in list_A" :key="item.text" :title="item.text" :icon="item.icon" :value="item.item" is-link />
    <van-divider  :style="{  color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"></van-divider>
    <van-cell v-for="item in list_B" :key="item.text" :title="item.text" :icon="item.icon" :value="item.item" is-link />
  
  
  </div>
</template>
<script>
import Vue from "vue";
import {
  Col,
  Row,
  NavBar,
  Divider,
  Grid,
  GridItem,
  Cell,
  CellGroup,
  Tag,
} from "vant";
import { Image as VanImage } from "vant";

Vue.use(Divider);
Vue.use(Tag);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(VanImage);
Vue.use(Col);
Vue.use(Row);
Vue.use(NavBar);
Vue.use(Grid);
Vue.use(GridItem);
export default {
  name: "Mine",
  data() {
    return {
      arrow: false,
      columnNum: [
        {
          icon: "pending-payment",
          text: "待付款",
          badge: "99+",
        },
        {
          icon: "logistics",
          text: "待发货",
          badge: "89",
        },
        {
          icon: "gift-o",
          text: "待收货",
          badge: "89",
        },
        {
          icon: "flower-o",
          text: "待评价",
          badge: "89+",
        },
        {
          icon: "refund-o",
          text: "退换货",
          badge: "89",
        },
      ],
      list_A: [
        {
          icon: "shopping-cart-o",
          text: "我的购物车",
          item: "2件商品",
        },
        {
          icon: "like-o",
          text: "我的收藏",
          item: "11",
        },
        {
          icon: "clock-o",
          text: "我的浏览器记录",
        },
      ],
      list_B:[
        { 
          icon: "edit",
          text: "意见反馈",
        },
        { 
          icon: "warning-o",
          text: "使用帮助",
        },
        { 
          icon: "desktop-o",
          text: "关于我们",
        },
      ]
    };
  },
};
</script>

<style >
.img_xiao {
  margin-top: -50px;
  margin-left: 140px;
}
.ccc {
  text-align: center;
}
</style>