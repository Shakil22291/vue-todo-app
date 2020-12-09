// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Master from "@/views/layouts/Master.vue";
import { store } from "./store/index";
import axios from "axios";
import router from "./routes";

window.eventBus = new Vue();
axios.defaults.baseURL = "http://127.0.0.1:8000/api";

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { Master },
  template: "<Master/>"
});
