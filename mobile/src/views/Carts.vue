<template>
  <div>
    <topbar></topbar>
    <van-steps :active="active">
      <van-step>买家下单</van-step>
      <van-step>商家接单</van-step>
      <van-step>买家提货</van-step>
      <van-step>交易完成</van-step>
    </van-steps>
    <van-card
      v-for="item in goodslist"
      :key="item._id"
      :price="item.salePrice"
      :title="item.title"
      :thumb="item.img"
      :origin-price="item.price"
    >
      <template v-slot:price>
        <p class="price">
          <span>{{item.salePrice}}</span>
          &times; {{item.num}}
        </p>
      </template>
      <template v-slot:tag>
          <van-checkbox v-model="item.checked"></van-checkbox>
      </template>
      <template v-slot:footer>
        <van-button round mini type="denger" icon="cross"></van-button>
      </template>
    </van-card>
    <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checkAll">全选</van-checkbox>
      <template #tip>
        你的收货地址不支持同城送,
        <span @click="onClickEditAddress">修改地址</span>
      </template>
    </van-submit-bar>
  </div>
</template>
<script>
import Vue from "vue";
import { Card } from "vant";
import topbar from "../components/TopBar";
import { Step, Steps } from "vant";
import { SubmitBar } from "vant";
import { Checkbox, CheckboxGroup } from 'vant';

Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(SubmitBar);
Vue.use(Step);
Vue.use(Steps);
Vue.use(Card);
export default {
  name: "Carts",
  data() {
    return {
      active: 0,
      selected:[],

    };
  },
  computed:{
/*    ...mapState({
     goodslist(state){
       return state.cart.goodslist
     }
   }), */

   goodslist(){
     return this.$store.state.goodslist;
   },
   checkAll:{
     get(){
      return this.goodslist.every(item=> item.checked)
     },
     set(val){
      this.goodslist = this.goodslist.map(item=>{
          item.checked = val;
          return item;
      })
     }
   },
   totalPrice(){
    return this.goodslist.reduce((pre,cur)=>pre+cur.salePrice*cur.num,0)*100
   }
  },
  components: {
    topbar,
  },
  methods:{
      onClickEditAddress(){

      },
      onSubmit(){

      },
      // gotoDetail(id){
      //   this.$router.push('/goods'+id);
      // },
      // ...mapMutations({
      //   removeItem:'remove',
      //   clearCar:'clear'
      // }),
/*       ...mapActions({
        changeQty(dispatch,_id,qty){
          dispatch('changeQtyAsync',{_id,qty})
        }
      }) */
  }
 ,
 created(){
   console.log(typeof this.$store.state.goodslist);
  //  this.$store.commit('displayTabbar',false);
 },
 beforeDestroy(){
  //  this.$store.commit('displayTabbar',true);
 }
};
</script>