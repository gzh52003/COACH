import request from '../utils/request';
import {Notify} from 'vant';
const carts = {
    
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
        "inv" : 1,
        "num" : 1,
        "checked" : false
    }
    ]
  },
  mutations:{
    add(state,payload){
       console.log(payload,'aaaaaaa')
      state.goodslist.unshift(payload);
      console.log('add 2 cart',state,payload);
    },
    changeNum(state,payload){
     const {_id:id,num:curNum} = payload;
     console.log(id,curNum)
     state.goodslist = state.goodslist.map(item=>{
       if(item._id === id){
         item.num = curNum;
       }
       return item;
     })
    },
    removeItem(state,payload){
      console.log(payload)
      state.goodslist = state.goodslist.filter(item=>item._id !== payload);
    },
    clearItem(state,payload){
      state.goodslist = [];
    }
  },
  actions:{
  async changeAsyncNum(context,payload){
       let {_id,num} = payload;
       const result=await request.get(`/goods/${_id}/inv`);
       let {data} = result;
       let n =data.data.inv;
       console.log(num,n,'1')
        if(n<num){
          num=n;

         Notify('库存不足');
       } 
       context.commit('changeNum',{_id,num});

      

    }
  },
  getters:{
      totalPrice(state,getters,rootState,rootGetters){
          return state.goodslist.reduce((pre,cur)=>pre+cur.salePrice*cur.num,0)*100;
      }
  }

}
export default carts;