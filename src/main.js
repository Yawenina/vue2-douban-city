// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import App from './App';
import Movies from './components/Movies';
import More from './components/More';

Vue.use(VueRouter);

Vue.prototype.$axios = axios;

const router = new VueRouter({
  routes: [
    { path: '/movies', component: Movies, alias: '/' },
    { path: '/:category/:type', component: More },
    // { path: "/list", component: List},
  ],
});

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  template: '<App/>',
  components: { App },
});
