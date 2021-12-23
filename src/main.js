// =========================================================
// * Vue Material Dashboard - v1.5.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/vue-material-dashboard/blob/master/LICENSE.md)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";


// router setup
import routes from "./routes/routes";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";

import axios from 'axios';
// local url
// var axios = require('axios');
// axios.defaults.baseURL = 'http://localhost:8087/xiangliban';
axios.defaults.baseURL = 'http://112.124.35.32:8087/xiangliban';
// server url
// axios.defaults.baseURL = 'http://112.124.35.32:8081/xiangliban';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
Vue.prototype.$axios = axios;
// Vue.config.productionTip = false;
// Vue.use(VueI18n);
// Vue.use(store);

import myprojectmytheme from "./myprojectmytheme.scss";

import ElementUI from"element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import {Message} from "element-ui";
// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active",
});

Vue.prototype.$Chartist = Chartist;
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);
Vue.use(myprojectmytheme);
Vue.prototype.$message = Message;
/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
  data: {
    Chartist: Chartist,
  },
});

import BaiduMap from 'vue-baidu-map';
Vue.use(BaiduMap, {

  ak: 'A31QmFIobMkdMpSFNmDHC9uS7BB6b4SP'
});
// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth) {
//     console.log('router.beforeEach(): ' + JSON.stringify(store.state.user));
//     if (store.state.token) {
//       console.log('coming to next ');
//       next();
//     } else {
//       next({
//         path: '/login',
//         query: {redirect: to.fullPath}
//       });
//     }
//   } else {
//     next();
//   }
// });
import VueAMap from 'vue-amap';

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '08dcec3b12f0c04c74fbaf8ed048a7df',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType',],
  v: '1.4.4'
});