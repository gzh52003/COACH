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
            @cancel="onCancel"
            @click="fadeClassify"
            @input="content"
          />
        </form>
      </van-col>
    </van-row>

    <search-list v-show='getShowBool'></search-list>

    <van-divider></van-divider>
    <div id="main" v-show="mianShow">
      <van-image :src="getAdv" />
      <div class="btn_group"> 
      <van-button plain type="primary" size='mini' color='blue' @click="salesSort">销量</van-button>
      <van-button plain type="primary" size='mini' color='blue' @click="priceSort">价格</van-button>
      <van-button plain type="primary" size='mini' color='blue' @click="praiseSort">好评</van-button>
      </div>
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
        <p class="goodInfo">
         <span>已销售{{item.sales | number}}</span>
         <span>已评价{{item.praise | number}}</span>
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
          <p class="goodInfo">
         <span>已销售{{item.sales | number}}</span>
         <span>已评价{{item.praise | number}}</span>
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
          <p class="goodInfo">
         <span>已销售{{item.sales | number}}</span>
         <span>已评价{{item.praise | number}}</span>
        </p>
      </van-grid-item>
    </van-grid>        
      <div
        class="van-multi-ellipsis--l2 text"
        style="font-size:12px;text-align:center;width:300px;margin:0 auto;"
      >
      <h1>KEEP MOVING 安踏集团简介</h1>
      安踏集团是一家专门从事设计、生产、销售运动鞋服、配饰等运动装备的综合性、多品牌的体育用品集团。</div>
    <van-divider
  :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
  style="margin-bottom:50px;"
   >
  我也是有底线的_o_
</van-divider>
    </div>
    
  </div>
</template>
<script>
import Vue from "vue";
import { Col, Row } from "vant";
import { Divider } from "vant";
import { Search } from "vant";
import { Image as VanImage } from "vant";
import { Grid, GridItem } from "vant";
import searchList from "../components/Search"
import throttle from "../utils/throttle";
import request from "../utils/request";

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
  components: { topbar, searchList},
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
      this.$store.dispatch('trgChangeShowBool',{bool:true})
      this.$store.dispatch('trgChangeSearchBool',{bool:false})
      this.$store.commit('displayTabbar',true);
    },
    fadeClassify(e) {
      this.classify = false;
      this.$store.dispatch('trgChangeShowBool',{bool:false})
      this.$store.dispatch('trgChangeSearchBool',{bool:true})
      this.$store.commit('displayTabbar',false);
    },
    salesSort(){
     this.$store.dispatch('partChage',{tag:'sales',n:true});
    },
    priceSort(){
     this.$store.dispatch('partChage',{tag:'salePrice'});
    },
    praiseSort(){
     this.$store.dispatch('partChage',{tag:'praise',n:true});
    },
    content(value){
      if(typeof value !== 'string') return false;
      let val = value.trim();
      let store = this.$store;
    async  function getSearchListData(payload){
        let data =await request.get('/goods',{
          params:{
            size:''
          }
        });
        let ephemeralData = data.data.data.data;
        let searchResult =  ephemeralData.map(item=>{
          if(item.title.indexOf(val) !== -1 || item.tag.indexOf(val) !== -1){
            return item;
          }
        })
        let result   = searchResult.filter(item=> item!== undefined);
        payload.dispatch('trgChangeArr',{data:result});
      }
      throttle(getSearchListData(store), 500)
    }
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
 beforeDestroy(){
      this.$store.dispatch('trgChangeShowBool',{bool:true})
      this.$store.dispatch('trgChangeSearchBool',{bool:false})
      this.$store.commit('displayTabbar',true);
  },
  computed: {
    discoverlist() {
      return (
        this.$store.getters.getpartOneData
      )
    },
    titleArr(){return this.$store.state.dischild.distitleArr},
    discoverareaOne() {
      return (
        this.$store.getters.getpartTwoData
      )
    },
    discoverareaTwo() {
      return(
        this.$store.getters.getpartOneData
      )
    },
    getAdv(){
      return (
        this.$store.getters.topAdv
      );
    },
    getShowBool(){
      return this.$store.getters.getSearchBool
    },
    mianShow(){
    return  this.$store.getters.getShowBool;
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
  .btn_group{
    padding: 10px;
    text-align: right;
  }
  .goodInfo{
    height: 20px;
    span{
      font-size: 8px;
      padding: 2px;
      transform: scale(0.5);
      margin-bottom: -20px;
    }
  }
</style>