import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import Home from "../pages/Home.vue";
import User from "../pages/user/Default.vue";
import Auth from "../pages/user/Auth.vue";
import UserList from "../pages/user/UserList.vue";
import Edit from "../pages/user/Edit.vue";
import Goods from "../pages/goods/Default.vue";
import NotFound from "../pages/NotFound.vue";
import Add from "../pages/user/Add.vue";
import GoodsList from "../pages/goods/GoodsList.vue";
import GoodsStore from "../pages/goods/GoodsStore.vue";
import GoodsChannel from "../pages/goods/GoodsChannel.vue";
import GoodsOrder from "../pages/goods/GoodsOrder.vue";
import Login from "../pages/user/Login.vue";

const router = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/user",
      component: User,
      children: [
        { path: "", redirect: "list" },
        { path: "add", component: Add },
        { path: "edit", component: Edit },
        { path: "auth", component: Auth },
        { path: "list", component: UserList },
      ],
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/goods",
      component: Goods,
      meta: {
        requiresAuth: true,
      },
      children: [
        { path: "", redirect: "list" },
        { path: "store", component: GoodsStore },
        { path: "channel", component: GoodsChannel },
        { path: "list", component: GoodsList },
        { path: "order", component: GoodsOrder },
      ],
    },
    {
      path: "/404",
      component: NotFound,
    },
    {
      path: "*",
      redirect: "/404",
    },
  ],
});

// let userInfo = localStorage.getItem("userInfo");
// try {
//   userInfo = JSON.parse(userInfo)
// } catch (error) {
//   userInfo = {};
// }
// console.log(userInfo)
// 全局路由守卫
// beforeEach  在路由切换前执行
// router.beforeEach(function(to, from, next) {
//   // 判断目标路由是否需要登录才可以访问
//  if(to.meta.requiresAuth)
//  next();
// });
export default router;
