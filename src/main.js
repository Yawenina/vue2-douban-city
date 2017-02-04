// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import Movies from './components/Movies';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: Movies },
    { path: '/movies', component: Movies },
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
