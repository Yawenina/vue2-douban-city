<template>
  <div class="card">
    <div class="loading-wrapper" v-if="showLoading">
      <loading-bar ref="loadingBar"></loading-bar>
      <loading></loading>
    </div>
    <template v-else>
      <section id="movie-showing">
        <header>
          <h2>影院热映</h2>
          <router-link to="/movie/in_theaters">更多</router-link>
        </header>
        <div class="section-content">
          <List :items="showing"></List>
        </div>
      </section>

      <section id="movie-coming-soon">
        <header>
          <h2>即将上映</h2>
          <router-link to="/movie/coming_soon">更多</router-link>
        </header>
        <div class="section-content">
          <List :items="coming"></List>
        </div>
      </section>

      <section id="movie-latest">
        <header>
          <h2>Top250</h2>
          <router-link to="/movie/top250">更多</router-link>
        </header>
        <div class="section-content">
          <List :items="top"></List>
        </div>
      </section>
    </template>
  </div>
</template>

<script>
  import Loading from './Loading';
  import loadingBar from './loadingBar';
  import List from './List';

  export default {
    name: 'movies',
    components: {
      List,
      Loading,
      loadingBar,
    },
    data() {
      return {
        showLoading: true,
        showing: [],
        coming: [],
        top: [],
      };
    },
    mounted() {
      // 当所有内容加载好时才显示页面，否则显示loading动画
      this.$refs.loadingBar.start();
      this.fetchData('/v2/movie/in_theaters', 'showing');
      this.fetchData('/v2/movie/coming_soon', 'coming');
      this.fetchData('/v2/movie/top250', 'top');
    },
    methods: {
      // 获取所需要的榜单的数据
      fetchData(api, data) {
        return this.$axios.get(api).then((response) => {
          this.$data[data] = this.getFirstEightItems(response.data.subjects);
          if (this.$refs.loadingBar) {
            this.$refs.loadingBar.finish();
            this.showLoading = false;
          }
        });
      },
      // 获取榜单的前8个数据
      getFirstEightItems(data) {
        return data.slice(0, 8);
      },
    },
  };
</script>

<style lang="scss">
  @import '../assets/styles/_common.scss';
</style>
