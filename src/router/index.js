import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../frontend/user/Login.vue";
import PersonalCenter from "../frontend/user/PersonalCenter.vue";
import Index from "../frontend/Index.vue";
import Main from "../frontend/Main.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
    redirect: "login",
    children: [
      { path: "main", component: Main },
      // 个人中心
      { path: "center", component: PersonalCenter },
      // 商品详情
      {
        path: "details",
        name: "details",
        component: () =>
          import(/* webpackChunkName: "details" */ "../frontend/detail/Details.vue"),
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
          import(/* webpackChunkName: "details" */ "../frontend/order/Order.vue"),
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
