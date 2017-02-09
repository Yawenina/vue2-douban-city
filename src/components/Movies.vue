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
      this.$refs.loadingBar.start();
//      当所有内容加载好时才显示页面，否则显示loading动画
      this.$axios.all([this.getShowing(), this.getComing(), this.getTop()])
        .then(this.$axios.spread((showing, coming, top) => {
          this.showing = this.getFirstEightItems(showing.data.subjects);
          this.coming = this.getFirstEightItems(coming.data.subjects);
          this.top = this.getFirstEightItems(top.data.subjects);
          this.$refs.loadingBar.finish();
          this.showLoading = false;
        }));
    },
    methods: {
//      获取所需要的榜单的数据
      getShowing() {
        return this.$axios.get('/v2/movie/in_theaters');
      },
      getComing() {
        return this.$axios.get('/v2/movie/coming_soon');
      },
      getTop() {
        return this.$axios.get('/v2/movie/top250');
      },
//      获取榜单的前8个数据
      getFirstEightItems(data) {
        return data.slice(0, 8);
      },
    },
  };
</script>

<style lang="scss">
  @import '../assets/styles/_common.scss';
</style>
