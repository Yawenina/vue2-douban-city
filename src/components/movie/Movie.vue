<template>
  <div class="card">
    <div class="loading-wrapper" v-if="showLoading">
      <clip-loading :loading="showLoading"></clip-loading>
    </div>
    <template v-else>
      <section id="movie-showing" class="horizontal-list">
        <header>
          <h2>影院热映</h2>
          <router-link to="/movie/in_theaters">更多</router-link>
        </header>
        <div class="section-content">
          <movie-list :items="showing"></movie-list>
        </div>
      </section>

      <section id="movie-coming-soon" class="horizontal-list">
        <header>
          <h2>即将上映</h2>
          <router-link to="/movie/coming_soon">更多</router-link>
        </header>
        <div class="section-content">
          <movie-list :items="coming"></movie-list>
        </div>
      </section>

      <section id="movie-latest" class="horizontal-list">
        <header>
          <h2>Top250</h2>
          <router-link to="/movie/top250">更多</router-link>
        </header>
        <div class="section-content">
          <movie-list :items="top"></movie-list>
        </div>
      </section>
    </template>
  </div>
</template>

<script>
  import ClipLoading from '../ClipLoading';
  import MovieList from './MovieList';

  export default {
    name: 'Movie',
    components: {
      MovieList,
      ClipLoading,
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
      this.fetchData('/v2/movie/in_theaters', 'showing');
      this.fetchData('/v2/movie/coming_soon', 'coming');
      this.fetchData('/v2/movie/top250', 'top');
    },
    methods: {
      // 获取所需要的榜单的数据
      fetchData(api, data) {
        return this.$axios.get(api).then((response) => {
          this.$data[data] = response.data.subjects.slice(0, 8);
        });
      },
    },
  };
</script>

<style lang="scss">
  @import '../../assets/styles/common';
</style>
