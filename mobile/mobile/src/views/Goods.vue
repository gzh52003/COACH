<template>
  <div>
    <topbar></topbar>
    <van-image :src="data.img" class="bigPic" @click="showBig"></van-image>
    <h1>{{data.title}}</h1>
    <van-tag type="primary">{{data.tag}}</van-tag>
    <p class="price">
      <del>{{data.price}}</del>
      <span>{{data.salePrice}}</span>
    </p>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">热销商品</van-divider>
    <!-- 热销商品 -->
    <van-grid :column-num="3">
      <van-grid-item
        v-for="item in recommend"
        :key="item._id"
        class="hotSales"
        @click="gotoDetail(item._id)"
      >
        <van-image :src="item.img" />
        <h4>{{item.title}}</h4>
        <p class="hotPrice">
          <del>{{item.price}}</del>
          <span>{{item.salePrice}}</span>
        </p>
      </van-grid-item>
    </van-grid>
    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
      style="margin-bottom: 50px;"
    >我也是有底线的_o_</van-divider>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
      <van-goods-action-icon icon="cart-o" text="购物车" :badge="carSum" @click="goto('/carts')" />
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
      <van-goods-action-button type="warning" text="加入购物车" @click="add2car" />
      <van-goods-action-button type="danger" text="立即购买" @click="buynow" />
    </van-goods-action>
  </div>
</template>
<script>
import Vue from "vue";

import { Grid, GridItem } from "vant";
import { Image as VanImage } from "vant";
import { Tag } from "vant";
import { Divider } from "vant";
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from "vant";
import { ImagePreview } from "vant";
import topbar from "../components/TopBar";
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Divider);
Vue.use(Tag);
Vue.use(VanImage);
Vue.use(Grid);
Vue.use(GridItem);

export default {
  name: "Goods",
  data() {
    return {
      data: {},
      recommend: [],
    };
  },
  methods: {
    showBig() {
      ImagePreview([this.data.img]);
    },
    async getRecommend() {
      const { data: recommend } = await this.$request.get("/goods", {
        params: {
          sort: "qty",
          total: 0,
          size: 9,
        },
      });
      this.recommend = recommend.data;
    },
    async getData(id) {
      const { data } = await this.$request.get("/goods/" + id);
      this.data = data.data;
    },
    add2car() {
      const {_id} = this.data;
      console.log(_id,this.cartlist)
      const current = this.cartlist.filter(item=>item._id === _id)[0];
      if(current){
       this.$store.commit('changeNum',{_id,num:current.num+1})
      }else{
        const goods = {
          ...this.data,
        }

        this.$store.commit("add", goods);
       }
    },
    goto(path) {
      this.$router.push(path);
    },
    buynow() {
      this.add2car();
      this.$router.push("/cart");
    },
    gotoDetail(id) {
      this.goto({
        name: "Goods",
        params: {
          id,
        },
      });
    },
  },
  components: {
    topbar,
  },
  async created() {
    const { id } = this.$route.params;
    this.getData(id);
    this.getRecommend();
  },
  computed: {
   cartlist() {
      return this.$store.state.carts.goodslist;
    },
    carSum() {
      return this.$store.state.carts.goodslist.length;
    },
  },
    mounted(){
   this.$store.commit('displayTabbar',false)
  },
  destroyed() {
    this.$store.commit('displayTabbar',true)
  },
  /*   watch:{
      '$route':function(to,from){
        const {id} = to.params;
        const {id:oldId} = from.params;
        if(id !== oldId){
            this.getData(id);
            this.getRecommend();
        }
      }
  } */
  beforeRouteUpdate(to, from, next) {
    const id = to.params.id;
    const oldId = from.params.id;
    if (id !== oldId) {
      this.getData(id);
      this.getRecommend();
    }
    next();
  },
};
</script>
<style lang="scss" scoped>
::v-deep .bigPic {
  width: 100%;
  height: 20%;
  ::v-deep .bigPic img {
    width: 100%;
    height: 100%;
  }
}
h1 {
  margin-bottom: 0;
  font-size: 24px;
  height: 32px;
  padding: 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}

.price {
  text-align: center;
  height: 30px;
  del {
    color: #999;
    font-size: 18px;
  }
  del::before {
    content: "￥";
  }
  span::before {
    content: "￥";
  }
  span {
    color: red;
    font-size: 20px;
  }
}
::v-deep .van-tag {
  margin-left: 2rem;
}
.hotSales {
  h4 {
    margin-bottom: 0;
    font-size: 12px;
    height: 30px;
    padding: 0px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
  .hotPrice {
    del {
      color: #999;
      font-size: 10px;
    }
    del::before {
      content: "￥";
    }
    span::before {
      content: "￥";
    }
    span {
      color: red;
      font-size: 12px;
    }
  }
}
</style>