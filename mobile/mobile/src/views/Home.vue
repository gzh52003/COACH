<template>
  <div class="home">
  
  <van-sticky>
  <form action="/">
  <van-search
    show-action
    placeholder="请输入搜索关键词"
    @cancel="onCancel"
    @click.stop="fadeClassify"
    @input="content"
  />
 </form>
 </van-sticky>
 <search-list v-show="getShowBool"></search-list>
 <div v-show="mianShow">
 
  
 <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" >
  <van-swipe-item v-for="(images, index) in images" :key="index"><img v-lazy="images" /></van-swipe-item>
</van-swipe>
<van-grid :border="false" :column-num="1" :gutter="0" :style="adv">
  <van-grid-item v-for="(item,index) in mainpic" :key="index">
    <van-image :src="item.pic" />
  </van-grid-item>
</van-grid>
<star></star>
<related></related>
<van-grid :border="false" :column-num="2" class=" recommend">
  <van-grid-item v-for="item in indexgoods" :key="item._id" @click="gotoDetail(item._id)">
   <van-image :src="item.img"/>
   <h4>{{item.title}}</h4>
   <p class="price">
    <del>{{item.price}}</del>
    <span>{{item.salePrice}}</span>
   </p>
  </van-grid-item>
</van-grid>
<van-divider style="margin-bottom: 50px;">我也是有底线的_o_</van-divider>

 </div>
  
  </div>

</template>

<script>
// @ is an alias to /src
import Vue from 'vue';
import { Search } from 'vant';
import { Toast } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { Lazyload } from 'vant';
import { Image as VanImage } from 'vant';
import { Grid, GridItem } from 'vant';
import star from '../components/Star';
import related from '../components/Related'
import { Sticky } from 'vant';
import { Divider } from 'vant';
import search from './Search';
import throttle from "../utils/throttle";
import request from "../utils/request";
import searchList from "../components/Search";

Vue.use(Divider);
Vue.use(Sticky);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(VanImage);
Vue.use(Lazyload)
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use( Toast )
Vue.use(Search);
export default {
  name: 'Home',
  computed:{
    getShowBool(){
      return this.$store.getters.getSearchBool
    },
    mianShow(){
    return  this.$store.getters.getShowBool;
    }
  },
  data(){
    return {
      images:[
        '/img/banner/banner_1.jpg',
        '/img/banner/banner_2.jpg'
      ],
      mainpic:[
       { pic:'/img/main/main_1.jpg'},
       { pic:'/img/main/main_2.jpg'},
       { pic:'/img/main/main_3.jpg'},
       { pic:'/img/main/main_4.jpg'}
      ],
      indexgoods: [],
      goodslist:[],
      adv:{
        padding:0
      }
    }
  },
  methods:{
    fadeClassify(e) {
      this.$store.dispatch('trgChangeSearchBool',{bool:true})
      this.$store.commit('displayTabbar',false);
      this.$store.dispatch('trgChangeShowBool',{bool:false})  
    },
   onCancel(){
      this.$store.dispatch('trgChangeSearchBool',{bool:false})
      this.$store.commit('displayTabbar',true);
      this.$store.dispatch('trgChangeShowBool',{bool:true})   
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
    },
   gotoDetail(id){
     this.$router.push({
       name:'Goods',
       params:{
         id
       }
     })
   }
  },
  components:{
    star:star,
    related:related,
    searchList
  },
 async created(){
    const {data:{data:recommed}} = await this.$request('/goods',{
      params:{
        size:10,
        sort:"sales",
        total:0
      }
    });
    console.log(recommed)
    this.indexgoods = recommed;
  },
  beforeCreate(){
       this.$store.dispatch('trgChangeSearchBool',{bool:false})
       this.$store.commit('displayTabbar',true); 
       this.$store.dispatch('trgChangeShowBool',{bool:true})
  }
  
}
</script>
<style scoped lang="scss">
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.my-swipe .van-swipe-item img {
  height: 100%;
}
h4{
  width: 140px;
  height: 40px;
  margin-bottom: 0;
  font-size: 14px;
  padding:0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}
del{
  color: #999;
  font-size: 10px;
}
del::before{
  content: "￥";
}
span::before{
  content: "￥";
}
span{
  color: red;
  font-size: 12px;
}
::v-deep .van-grid-item__content{
  padding: 0;
}
</style>