import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/About.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/auth/Login.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/auth/Register.vue")
    }
  ]
});
