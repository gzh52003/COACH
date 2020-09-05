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
  }
]

const router = new VueRouter({
  routes
})

export default router
