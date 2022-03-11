import Vue from "vue";
import VueRouter from "vue-router";

// 重写push方法
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error);
};

import Login from "../frontend/user/Login.vue";
import Index from "../frontend/Index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
    redirect: "main",
    children: [
      // 主页面
      {
        path: "main",
        component: () =>
          import(/* webpackChunkName: "details" */ "../frontend/Main.vue"),
      },
      // 注册页面
      {
        path: "register",
        component: () =>
          import(
            /* webpackChunkName: "details" */ "../frontend/user/Register.vue"
          ),
      },
      // 添加收货地址
      {
        path: "address",
        component: () =>
          import(/* webpackChunkName: "details" */ "../frontend/Address.vue"),
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

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 从哪个路径跳转而来
  // next 函数 表示放行
  // next() 放行
  // next('/login') 强制跳转

  if (to.path === "/main") return next();
  if (to.path === "/login") return next();
  if (to.path === "/register") return next();
  // 获取token
  const tokenStr = window.sessionStorage.getItem("uid");
  if (!tokenStr) return next("/login");
  next();
});

export default router;
