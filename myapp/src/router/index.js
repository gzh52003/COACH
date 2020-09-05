import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import Index from "../pages/user/Index.vue";
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
import request from "../tools/request.js";

const router = new VueRouter({
  routes: [
    {
      path: "/",
      meta: {
        requiresAuth: true,
      },
      component: Index,
      children: [
        {
          path: "/",
          redirect: "/home",
        },
        {
          path: "/home",
          component: Home,
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
        },
        {
          path: "/goods",
          component: Goods,

          children: [
            { path: "", redirect: "list" },
            { path: "store", component: GoodsStore },
            { path: "channel", component: GoodsChannel },
            { path: "list", component: GoodsList },
            { path: "order", component: GoodsOrder },
          ],
        },
      ],
    },
    {
      path: "/login",
      component: Login,
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

// 全局路由守卫
// beforeEach  在路由切换前执行
router.beforeEach(function(to, from, next) {
  // console.log("beforeEach====", to, from);
  // 判断目标路由是否需要登录才可以访问
  if (to.matched.some((item) => item.meta.requiresAuth)) {
    let userInfo = localStorage.getItem("userInfo") || {};
    try {
      userInfo = JSON.parse(userInfo);
    } catch (error) {
      userInfo = {};
    }

    // 判断当前用户信息是否包含token
    if (userInfo.authorization) {
      console.log("token===", userInfo.authorization);
      // 发起请求校验token的有效性
      request
        .get("/jwtverify", {
          params: {
            authorization: userInfo.authorization,
          },
        })
        .then(({ data }) => {
          if (data.code === 0) {
            next({
              path: "/login",
              query: {
                //跳转到登录页面，并传递目标页面路径
                redirectTo: to.fullPath,
              },
            });
          }
        });
      next();
    } else {
      // router.push('/login')

      next({
        path: "/login",
        query: {
          //跳转到登录页面，并传递目标页面路径
          redirectTo: to.fullPath,
        },
      });
    }
  } else {
    next();
  }
});
export default router;
