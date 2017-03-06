// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueLazyload from 'vue-lazyload';
import App from './App';

import MovieList from './components/movie/MovieList';
import MoreMovies from './components/movie/MoreMovies';
import MovieDetails from './components/movie/MovieDetails';

import Cities from './components/Cities';
import eventDetails from './components/eventDetails';
import eventList from './components/eventList';

Vue.use(VueRouter);
Vue.use(VueLazyload, {
  loading: 'static/loading.gif',
  try: 3,
});


Vue.prototype.$axios = axios;

const router = new VueRouter({
  routes: [
    {
      path: '/movie',
      component: MovieList,
      meta: {
        keepAlive: true,
      },
      alias: '/',
    },
    {
      path: '/movie/:category',
      component: MoreMovies,
    },
    {
      path: '/movie/subject/:id',
      component: MovieDetails,
    },
    {
      path: '/cities',
      component: Cities,
    },
    {
      path: '/cities/event/:id',
      component: eventDetails,
    },
    {
      path: '/cities/events',
      component: eventList,
    },
  ],
});

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  template: '<App/>',
  components: { App },
});
