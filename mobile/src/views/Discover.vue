<template id='discover'>
  <div>
    <topbar></topbar>
    <van-row type="flex" justify="center" style="text-align:center; ">
      <template v-if="classify">
        <van-col span="4">
          <van-button color="#7232dd" plain style="border:none;" @click="changeMan">男子专区</van-button>
        </van-col>
        <van-col span="4">
          <van-button color="#7232dd" plain style="border:none;" @click="changeWoman">女子专区</van-button>
        </van-col>
        <van-col span="4">
          <van-button color="#7232dd" plain style="border:none;" @click="changeKids">儿童专区</van-button>
        </van-col>
        <van-col span="4">
          <van-button color="#7232dd" plain style="border:none;" @click="goto('/mine')">畅聊专区</van-button>
        </van-col>
      </template>
      <van-col :span="classify ? 8 : 24">
        <form action="/">
          <van-search
            v-model="value"
            show-action
            @search="onSearch"
            @cancel="onCancel"
            @click="fadeClassify"
          />
        </form>
      </van-col>
    </van-row>
    <van-divider></van-divider>
    <div id="main">
      <van-image :src="getAdv" />
      
        <h4 class="border_tit">
                <p v-text="titleArr[0]"></p>
        </h4>

    <van-grid :column-num="3">
      <van-grid-item
        v-for="item in discoverlist"
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
         <h4 class="border_tit">
                <p v-text="titleArr[1]"></p>
        </h4>
    <van-grid :column-num="3">
      <van-grid-item
        v-for="item in discoverareaOne"
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
         <h4 class="border_tit">
                <p v-text="titleArr[2]"></p>
        </h4>
        <van-grid :column-num="3">
      <van-grid-item
        v-for="item in discoverareaTwo"
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
      <div
        class="van-multi-ellipsis--l2 text"
        style="font-size:12px;text-align:center;width:300px;margin:0 auto;"
      >
      <h1>KEEP MOVING 安踏集团简介</h1>
      安踏集团是一家专门从事设计、生产、销售运动鞋服、配饰等运动装备的综合性、多品牌的体育用品集团。</div>
    </div>
<van-divider
  :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
  style="margin-bottom:50px;"
>
  我也是有底线的_o_
</van-divider>
  </div>
</template>
<script>
import Vue from "vue";
import { Col, Row } from "vant";
import { Divider } from "vant";
import { Search } from "vant";
import { Image as VanImage } from "vant";
import { Grid, GridItem } from "vant";

Vue.use(Grid);
Vue.use(GridItem);
Vue.use(VanImage);
Vue.use(Search);
Vue.use(Divider);
Vue.use(Col);
Vue.use(Row);
import topbar from "../components/TopBar.vue";
export default {
  name: "Discover",
  components: { topbar },
  methods: {
    changeMan(){
     this.$store.commit('changetitleArr',{arr:['男士热卖','男生热推','可爱男生']})
     this.$store.commit('changeShow',{tag:['男衣','男鞋','男裤']})
     this.$store.dispatch('changeAdv',{img:'/img/ns.jpg'})
    },
    changeWoman(){
    this.$store.commit('changetitleArr',{arr:['女士热卖','女生热推','可爱女生']})
    this.$store.commit('changeShow',{tag:['女衣','女鞋','女裤']})
    this.$store.dispatch('changeAdv',{img:'/img/nv.jpg'})
    },
    changeKids(){
    this.$store.commit('changetitleArr',{arr:['儿童热卖','儿童良品','小可爱哟']})
    this.$store.commit('changeShow',{tag:['童衣','童鞋','童裤']})
    this.$store.dispatch('changeAdv',{img:'/img/kids.jpg'})
    },    
    onSearch(a, b, c) {
      console.log(1);
    },
    goto(path){
     this.$router.push(path)
    },
    gotoDetail(id) {
      this.goto({
        name: "Goods",
        params: {
          id,
        },
      });
    },
    onCancel() {
      this.classify = true;
    },
    fadeClassify(e) {
      this.classify = false;
      console.log(this.classify);
    },
  },
  data() {
    return {
      classify: true,
      value: "",
    };
  },
  created() {
    this.$store.dispatch("trgInit");
  },
  computed: {
    discoverlist() {
      return this.$store.state.dischild.discoverlist;
    },
    titleArr(){return this.$store.state.dischild.distitleArr},
    discoverareaOne() {
      return this.$store.state.dischild.discoverareaOne;
    },
    discoverareaTwo() {
      return this.$store.state.dischild.discoverareaTwo;
    },
    getAdv(){
      return (
        this.$store.getters.topAdv
      );
    }
  },
};
</script>
<style scoped lang="scss">
#main h1 {
  text-align: center;
  font-size: 16px;
}
::v-deep .van-image {
  padding: 0;
}
::v-deep .van-image__img {
  padding: 0;
  width: 100%;
  height: 100%;
}
 #main h1{
  background: rgba(128, 214, 208, 0.3);
  border-radius: 8px;
  color: rgba(1, 3, 3, 0.274);
}


.border_tit{
	border: 1.5px solid #2e71f0;
    height: 40px;
    margin: 0 auto;
	margin-top: 20px;
	width: 30px;
    position: relative;
    color: orange;
}
.border_tit p{
	position: absolute;
	top:1%; 
	background: #fff;
	font-size: 12px;
	width: 60px;
	left: -5px;
	text-indent:0;
	left: 15px;
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