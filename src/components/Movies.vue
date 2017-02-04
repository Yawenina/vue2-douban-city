<template>
    <div class="card">
      <section id="movie-showing">
        <header>
          <h2>影院热映</h2>
          <a href="/">更多</a>
        </header>
        <div class="section-content">
          <List :items="showing"></List>
        </div>
      </section>

      <section id="movie-coming-soon">
        <header>
          <h2>即将上映</h2>
          <a href="/">更多</a>
        </header>
        <div class="section-content">
          <List :items="comming"></List>
        </div>
      </section>

      <section id="movie-latest">
        <header>
          <h2>Top250</h2>
          <a href="/">更多</a>
        </header>
        <div class="section-content">
          <List :items="top"></List>
        </div>
      </section>

    </div>
</template>

<script>
  /* eslint-disable */
  import List from './List.vue';

  export default {
    name: 'movies',
    components: { List },
    data() {
      return {
        showing: [],
        comming: [],
        top: [],
      };
    },
    created() {
      this.$axios.get('/v2/movie/in_theaters')
          .then(response => this.showing = response.data.subjects.slice(0, 8));
      this.$axios.get('/v2/movie/coming_soon')
        .then(response => this.comming = response.data.subjects.slice(0, 8));
      this.$axios.get('/v2/movie/top250')
        .then(response => this.top = response.data.subjects.slice(0, 8));
    },
  };
</script>

<style lang="scss">
  @import '../assets/styles/_common.scss';
</style>
