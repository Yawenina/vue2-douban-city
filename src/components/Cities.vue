<template>
  <div class="card">
    <header class="select-area">
      <div class="select">
        <label>选择城市</label>
        <select>
          <option v-for="city in cities" :data-city-id="city">{{city.name}}</option>
        </select>
      </div>
      <div class="select">
        <label>选择活动类型</label>
        <select>
          <option v-for="type in types" :data-type-id="type">{{type}}</option>
        </select>
      </div>
    </header>

    <template>
      <section id="movie-showing">
        <header>
          <h2>音乐类</h2>
          <router-link to="/movie/in_theaters">更多</router-link>
        </header>
        <div class="section-content">
          <ul class="row items">
            <li v-for="music in musics" class="item">
              <img :src="music.image" class="item-poster">
              <p class="item-title">{{music.title.slice(0, 10)}}...</p>
              <p>{{music.time_str}}</p>
            </li>
          </ul>
        </div>
      </section>
    </template>
  </div>
</template>

<script>
  import List from './List';

  export default{
    data() {
      return {
        cities: [],
        types: ['all', 'music', 'film', 'drama', 'commonweal', 'salon', 'exhibition', 'party', 'sports', 'travel', 'others'],
        musics: [],
      };
    },
    components: { List },
    methods: {
      fetchCities() {
        return this.$axios.get('/v2/loc/list');
      },
      fetchEvents(loc, type) {
        const api = `/v2/event/list?loc=${loc}&type=${type}`;
        return this.$axios.get(api);
      },
    },
    mounted() {
      this.fetchCities().then((response) => {
        this.cities = response.data.locs;
      });
      this.fetchEvents(108288, 'music').then((response) => {
        this.musics = response.data.events.slice(1, 9);
      });
    },
  };
</script>

<style lang="scss" scoped>
  .select-area{
    display: flex;
    justify-content: space-between;
    padding: 10px 1.12rem;
  }
  .item-title{
    white-space: initial;
  }
</style>
