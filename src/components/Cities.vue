<template>
  <div>
    <header>
      <div class="select">
        <label>选择城市</label>
        <select>
          <option v-for="city in cities" :data-city-id="city">{{city}}</option>
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
      <section>
        <header>
          <h1></h1>
        </header>
      </section>
    </template>
  </div>
</template>
<style lang="scss">
</style>
<script>
  export default{
    data() {
      return {
        cities: [],
        types: ['all', 'music', 'film', 'drama', 'commonweal', 'salon', 'exhibition', 'party', 'sports', 'travel', 'others'],
      };
    },
    methods: {
      fetchCities() {
        return this.$axios.get('/v2/loc/list');
      },
    },
    mounted() {
      this.fetchCities().then((response) => {
        this.cities = response.data;
      });
    },
  };
</script>
