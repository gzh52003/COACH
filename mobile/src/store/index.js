import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  state:{
    goodslist:[
      {
        "_id" : "5f52ff1e0189f72c88a06c08",
        "img" : "/img/1.jpg",
        "title" : "安踏KT5情人节配色男篮球鞋2020新品",
        "price" : " 649.00",
        "qty" : 7,
        "salePrice" : " 999.00",
        "addTime" : "2020-09-03",
        "praise" : "299",
        "sales" : "1278",
        "tag" : "男鞋",
        "inv" : 129,
        "num" : 1,
        "checked" : false
    }
    ]
  },
  mutations:{
    add(state,payload){
      state.goodslist.unshift(payload);
      console.log('add 2 cart',state,payload);
    },
    changeNum(state,payload){
      console.log(payload)
     const {_id:id,num:curNum} = payload;
     state.goodslist = state.goodslist.map(item=>{
       if(item._id === id){
         item.num = curNum;
       }
     })
    }
  }
})

export default store;