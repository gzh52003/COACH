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
// import Add      from '../pages/user/Add.vue'
import GoodsList from '../pages/goods/GoodsList.vue'
import GoodsStore from '../pages/goods/GoodsStore.vue'
import GoodsChannel from '../pages/goods/GoodsChannel.vue'
import GoodsOrder   from '../pages/goods/GoodsOrder.vue'
import Login        from '../pages/user/Login.vue'
import Index        from '../pages/Index.vue'
import request      from '../tools/request'

const router = new VueRouter({
    routes:[
      {
       path:'/',
       meta:{
         requiresAuth:true
       },
       component:Index,
       children:[
        {path:'/home',component:Home},
        {path:'/user',component:User,
        children:[
          {path:'add',component:Edit},
          {path:'edit:id',component:Edit,name:'userEdit'},
          {path:'auth',component:Auth},
          {path:'list',component:UserList}
        ]
        },
        {path:'/goods',component:Goods,
        children:[
          {path:'',redirect: 'list'},
          {path:"store",component:GoodsStore},
          {path:'channel',component:GoodsChannel},         
          {path:'list',component:GoodsList} ,
          {path:'order',component:GoodsOrder} 
        ]
        }
       ]
      },
      {path:"/login",component: Login},
      
      { path:'/404', component:NotFound},
      {path: '*',redirect: '/404'}
    ]
  });

  router.beforeEach(function(to,from,next){
      if(to.matched.some(item=>item.meta.requiresAuth)){
        let userInfo = localStorage.getItem('userInfo') || {};
        try{
          userInfo = JSON.parse(userInfo) ;
        }catch(err){
         userInfo =  {};
        }
        if( userInfo.authorization){
          request.get('/jwtverify',{
            params:{
              authorization:userInfo.authorization
            }
          }).then(({data})=>{
            if(data.code === 0){
              next({
                path:'/login',
                query:{
                  redirectTo:to.fullPath
                }
              })
            }
          })
          next();
        }else{
          next({
            path:'/login',
            query:{
              redirectTo:to.fullPath
            }
          })
        }
      }else{
        next();
      }
  });

 export default router;