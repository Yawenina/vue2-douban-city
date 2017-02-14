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
      <city-list :items="event.data" :type="type" v-for="(event, type) in events" v-if="event.data.length">
        <h2>{{event.name}}</h2>
      </city-list>
    </template>
  </div>
</template>

<script>
  import cityList from './cityList';

  const events = {
    music: {
      name: '音乐类',
      data: [],
    },
    film: {
      name: '电影类',
      data: [],
    },
    drama: {
      name: '戏剧类',
      data: [],
    },
    commonweal: {
      name: '公益类',
      data: [],
    },
    salon: {
      name: '沙龙类',
      data: [],
    },
    exhibition: {
      name: '展览类',
      data: [],
    },
    party: {
      name: '聚会类',
      data: [],
    },
    sports: {
      name: '运动类',
      data: [],
    },
    travel: {
      name: '旅游类',
      data: [],
    },
    others: {
      name: '其他',
      data: [],
    },
  };

  export default{
    name: 'Cities',
    data() {
      return {
        cities: [],
        types: ['music', 'film', 'drama', 'commonweal', 'salon', 'exhibition', 'party', 'sports', 'travel', 'others'],
        events,
      };
    },
    components: { cityList },
    methods: {
      fetchCities() {
        return this.$axios.get('/v2/loc/list');
      },
      fetchEvents(loc, type) {
        const api = `/v2/event/list?loc=${loc}&type=${type}`;
        return this.$axios.get(api);
      },
      fetchData(loc, type) {
        const api = `/v2/event/list?loc=${loc}&type=${type}`;
        this.$axios.get(api).then((response) => {
          this.$data.events[type].data = response.data.events.slice(0, 8);
        });
      },
    },
    mounted() {
      this.fetchCities().then((response) => {
        this.cities = response.data.locs;
      });
      this.types.forEach((item) => {
        this.fetchData(108288, item);
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
