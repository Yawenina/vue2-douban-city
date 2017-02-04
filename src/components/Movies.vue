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

      <section id="movie-free-stream">
        <header>
          <h2>免费在线观影</h2>
          <a href="/">更多</a>
        </header>
        <div class="section-content">
          <ul class="row items">
            <li class="item" v-for="item in free"></li>
          </ul>
        </div>
      </section>

      <section id="movie-latest">
        <header>
          <h2>新片速递</h2>
          <a href="/">更多</a>
        </header>
        <div class="section-content">
          <ul class="row items">
            <li class="item" v-for="item in latest"></li>
          </ul>
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
        free: [],
        latest: [],
      };
    },
    mounted() {
      this.$axios.get('/v2/movie/in_theaters', {
        headers: {
          'Content-type': 'application/json'
        }
      }).then(response => this.showing = response.data.subjects.slice(0, 8));
    },
  };
</script>

<style lang="scss">
  @import '../assets/styles/_common.scss';
</style>
