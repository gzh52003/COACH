import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import request from '../utils/request'

Vue.use(VueRouter)

  const routes = [
  {
   path:'/',
   redirect:{name:'Home'}
  },
  {
   path:'*',
   redirect:{name:'404'}
  },
  {
   path:'/404',
   name:'404',
   component:()=>import('../views/404.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path:'/reg',
    name:'reg',
    component:()=>import('../views/Reg.vue')
  },
  {
    path:'/login',
    name:'Login',
    component:()=>import('../views/Login.vue')
  },
  {
    path:'/discover',
    name:'Discover',
    component:()=>import('../views/Discover.vue'),
    meta:{
      requiresAuth:true
  },
   },
   {
    path:'/mine',
    name:'Mine',
    component:()=>import('../views/Mine.vue')
   },
  {
    path:'/carts',
    name:'carts',
    component:()=>import('../views/Carts.vue'),
    meta:{
      requiresAuth:true
   },
  },
  {
   path: '/goods/:id',
   name: 'Goods',
   component:()=>import('../views/Goods.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/search',
    name:'Search',
    component: Search
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach(function(to,from,next){
 try{
  let user =JSON.parse (localStorage.getItem('userInfo')) || {};
  if(to.meta.requiresAuth){
    if(user.authorization){
      request.get('/jwtverify',{
        params:{
          authorization:user.authorization
        }
      }).then(({data})=>{
        if(data.code === 0){
          next({
            path:'/login',
            query:{
              redirectTo:to.fullPath
            }
          });
        }
      })
      next();
    }else{
      next({
        path:'/login',
        query:{
            // 跳转到登录页面，并传递目标页面路径
            redirectTo:to.fullPath
        }
    })
    }
    
  }else{
    next();
  }
 }catch(err){
   alert('用户错误')
 }
    
    

})
export default router
