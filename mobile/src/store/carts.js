import request from '../utils/request'
import {Notify} from 'vant'
import { notify } from '../../../../server/port/goods/goods';

const cart = {
    state:{
        goodslist:[
            {
                "img": "/img/y5.jpg",
                "title": "安踏男服输攻墨守套头卫衣2020新款",
                "price": " 199.00",
                "qty" : 199,
                "salePrice":" 139.00",
                "addTime" : "2020-09-03",
                "praise"  : "12003",
                "sales"   : "12408",
                "tag" :"男衣",
                "inv" : 129,
                "num" : 1,
                "checked" :false
              }, {
                "img": "/img/y6.jpg",
                "title": "安踏男服输攻墨守连帽卫衣2020新款",
                "price": " 279.00",
                "qty" : 149,
                "salePrice":" 179.00",
                "addTime" : "2020-09-03",
                "praise"  : "120003",
                "sales"   : "102408",
                "tag" :"男衣",
                "inv" : 9,
                "num" : 1,
                "checked" :false
              }, {
                "img": "/img/y7.jpg",
                "title": "安踏男服运动裤速干束脚休闲修身小脚长裤",
                "price": " 199.00",
                "qty" : 1419,
                "salePrice":" 119.00",
                "addTime" : "2020-09-03",
                "praise"  : "130003",
                "sales"   : "142408",
                "tag" :"男衣",
                "inv" : 49,
                "num" : 1,
                "checked" :false
              }, {
                "img": "/img/y8.jpg",
                "title": "安踏男款针织运动长裤",
                "price": " 169.00",
                "qty" : 1419,
                "salePrice":" 119.00",
                "addTime" : "2020-09-03",
                "praise"  : "30003",
                "sales"   : "146408",
                "tag" :"男衣",
                "inv" : 39,
                "num" : 1,
                "checked" :false
              } 
        ]
    },
    getters:{
        totalPrice(state,getters,rootState,rootGetters){
            return state.goodslist.reduce((pre,cur)=>pre+cur.salePrice*cur.item.qty,0)*100;
        },
        test(){
            return 'cart'
        }
    },
    mutations:{
        initCart(state,data){
            state.goodslist = data;
        },
        add(state,data){
            state.goodslist.unshift(goods)
        },
        changeQty(state,{_id,qty}){
            state.goodslist = state.goodslist.map(item=>{
                if(item._id === _id){
                    item.qty = qty;
                }
                return item;
            });
            console.log(state.goodslist)
        },
        remove(state,_id){
            state.goodslist = state.goodslist.filter(item=>item._id!==_id)
        },
        clear(state){
            state.goodslist = []
        }
    },
    actions:{
        async changeQtyAsync(context,{_id,qty}){
            const {data:inv} = await request.get(`/goods/${_id}/inv`);
            if(inv>qty){
             notify({type: 'danger',message:'库存不足'})
             qty = inv;     
            }
            context.commit('changeQty',{_id:qty})
        },
        async GamepadHapticActuator(){
            const {data} = await request.get(`/cart`);
            context.commit('initCart',data.data)
        }
    }
}
export default cart;