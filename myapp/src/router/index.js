import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Home from '../pages/Home.vue'
import User from '../pages/user/Default.vue'
import Auth from '../pages/user/Auth.vue'
import UserList from '../pages/user/UserList.vue'
import Edit from '../pages/user/Edit.vue'
import Goods from '../pages/goods/Default.vue'
import NotFound from '../pages/NotFound.vue'
import Add      from '../pages/user/Add.vue'
import GoodsList from '../pages/goods/GoodsList.vue'
import GoodsStore from '../pages/goods/GoodsStore.vue'
import GoodsChannel from '../pages/goods/GoodsChannel.vue'
import GoodsOrder   from '../pages/goods/GoodsOrder.vue'


const router = new VueRouter({
    routes:[
      {
       path:'/',
       redirect: '/home'
      },
      {
        path:'/home',
        component: Home
      },{
        path:'/user',
        component:User,
        children:[
           {path:'',redirect: 'list'},
           {path:"add",component:Add},
           {path:'edit',component:Edit},
           {path:'auth',component:Auth},          
           {path:'list',component:UserList}     
        ]
      },
      {
        path:'/goods',
        component:Goods,
        children:[
          {path:'',redirect: 'list'},
          {path:"store",component:GoodsStore},
          {path:'channel',component:GoodsChannel},         
          {path:'list',component:GoodsList} ,
          {path:'order',component:GoodsOrder}    
       ]
      },
      {
        path:'/404',
        component:NotFound
      },
      {
        path: '*',
        redirect: '/404'
      }
    ]
  })

 export default router;