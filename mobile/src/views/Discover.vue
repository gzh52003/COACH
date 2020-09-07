<template>
  <div class="app">
    <!-- 头部导航 -->
    <van-nav-bar class="top" fixed="fixed" placeholder="placeholder" z-index="50">
      <template #right>
        <van-icon name="shopping-cart" size="25" />
        <van-icon name="manager" size="25" />
      </template>
      <template #title>
        <van-icon name="card" size="25" />
      </template>
      <template #left>
        <van-icon name="wap-nav" size="25" @click="showPopup" />
        <van-icon name="search" size="25" />
      </template>
    </van-nav-bar>

    <van-popup v-model="show" position="left" :style="{ height: '100%' }">内容4564564654546</van-popup>

    <!-- 商品 -->

    <van-tabs @click="onClick">
      <van-tab title="新品">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          offset="100"
        >
          <van-grid :border="false" :column-num="2">
            <van-grid-item v-for="item in goodslist" :key="item._id">
              <van-image :src="item.img" />
              <h4>{{ item.title }}</h4>
              <p class="price">
                <del>{{ item.price }}</del>
                <span>{{ item.salePrice }}</span>
              </p>
            </van-grid-item>
          </van-grid>
        </van-list>
      </van-tab>
      <van-tab title="热销">
        <van-grid :border="false" :column-num="2">
          <van-grid-item v-for="item in list" :key="item._id">
            <van-image :src="item.img" />
            <h4>{{ item.title }}</h4>
            <p class="price">
              <del>{{ item.price }}</del>
              <span>{{ item.salePrice }}</span>
            </p>
          </van-grid-item>
        </van-grid>
      </van-tab>
      <van-tab>
        <template #title>
          价格
          <van-icon name="down" />
        </template>
        内容
      </van-tab>
    </van-tabs>

    <!-- 商品数据 -->
  </div>
</template>
<script>
import Vue from "vue";
import {
  NavBar,
  Cell,
  CellGroup,
  Grid,
  GridItem,
  Col,
  Row,
  Tab,
  Tabs,
  Popup,
  List,
  Toast,
} from "vant";

Vue.use(List);
Vue.use(Popup);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Col);
Vue.use(Row);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(NavBar);
export default {
  name: "discover",
  data() {
    return {
      goodslist: [],
      show: false,
      fixed: true,
      placeholder: true,
       
      list: [],
      loading: false,
      finished: false,
      size11: 10,
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    onLoad() {
      setTimeout(async () => {
        const {
          data: { data: recommed },
        } = await this.$request("/goods", {
          params: {
            size: this.size11,
            sort: "addTime",
            total: 0,
          },
        });

        this.goodslist = recommed;
        this.loading = false;
        this.size11 += 10;
        if (this.size11 >= 40) {
          this.finished = true;
        }
      }, 1000);
    },

    async onClick(name, title) {
      if (title == "热销") {
        
        const { data } = await this.$request("/goods", {
          params: {
            
            sort: "salePrice,1"
            
          },
        });

        this.list = data.data.data;
      }
    },
  },

  // async created() {
  //   const {
  //     data: { data: recommed },
  //   } = await this.$request("/goods", {
  //     params: {
  //       size: 10,
  //       sort: "sales",
  //       total: 0,
  //     },
  //   });

  //   this.goodslist = recommed;
  // },
};
</script>

<style>
.top .van-icon {
  padding: 0px 5px;
}
.goods-right {
  margin-right: 25px;
}
.goods-text .van-col {
  color: #777;
  font-size: 14px;
}
h4 {
  width: 140px;
  height: 40px;
  margin-bottom: 0;
  font-size: 14px;
  padding: 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}
del {
  color: #999;
  font-size: 10px;
}
del::before {
  content: "￥";
}
/* span::before{
  content: "￥";
} */
</style>
