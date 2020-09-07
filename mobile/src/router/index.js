import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


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
    name:'name',
    component:()=>import('../views/Login.vue')
  },
  {
    path:'/carts',
    name:'carts',
    component:()=>import('../views/Carts.vue')
  },
  {
    path:'/discover',
    name:'discover',
    component:()=>import('../views/Discover.vue')
  },
  {
   path: '/goods/:id',
   name: 'Goods',
   component:()=>import('../views/Goods.vue')
  },
  {
    path: '/mine',
    name: 'Mine',
    component:()=>import('../views/Mine.vue')
   },

]

const router = new VueRouter({
  routes
})

export default router
