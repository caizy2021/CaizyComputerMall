import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../frontend/user/Login.vue";
import Index from "../frontend/Index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
    redirect: "login",
    children: [
      // 主页面
      {
        path: "main",
        component: () =>
          import(/* webpackChunkName: "details" */ "../frontend/Main.vue"),
      },
      // 个人中心
      {
        path: "personal",
        component: () =>
          import(
            /* webpackChunkName: "details" */ "../frontend/user/Personal.vue"
          ),
      },
      // 商品详情
      {
        path: "details",
        name: "details",
        component: () =>
          import(
            /* webpackChunkName: "details" */ "../frontend/detail/Details.vue"
          ),
      },
      // 购物车
      {
        path: "cart",
        name: "cart",
        component: () =>
          import(/* webpackChunkName: "details" */ "../frontend/Cart.vue"),
      },
      // 订单
      {
        path: "order",
        name: "order",
        component: () =>
          import(
            /* webpackChunkName: "details" */ "../frontend/order/Order.vue"
          ),
      },
      // 收藏夹
      {
        path: "collect",
        name: "collect",
        component: () =>
          import(/* webpackChunkName: "details" */ "../frontend/Collect.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
