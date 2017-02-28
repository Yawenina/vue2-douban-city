<template>
  <div class="card">
    <header class="select-area">
      <div class="select">
        <label>选择城市</label>
        <select v-model="searchCity">
          <option v-for="city in cities" :data-city-id="city" :value="city">{{city.name}}</option>
        </select>
      </div>
<!--       <div class="select">
        <label>选择活动类型</label>
        <select>
          <option v-for="type in types" :data-type-id="type" v-model="searchType" :value="type">{{events[type].name}}</option>
        </select>
      </div> -->
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
        searchCity: '',
      };
    },
    components: { cityList },
    methods: {
      getCities() {
        return this.$axios.get('/v2/loc/list');
      },
      setCities(response) {
        this.cities = response.data.locs;
        this.searchCity = response.data.locs[0];
      },
      fetchTypeEvents(loc, type) {
        const api = `/v2/event/list?loc=${loc}&type=${type}`;
        this.$axios.get(api).then((response) => {
          this.$data.events[type].data = response.data.events.slice(0, 8);
        });
      },
      fetchAllTypesEvents() {
        const searchCityId = this.searchCity.id;
        this.types.forEach((item) => {
          this.fetchTypeEvents(searchCityId, item);
        });
      },
    },
    watch: {
      searchCity() {
        this.fetchAllTypesEvents();
      },
    },
    mounted() {
      this.getCities().then(response => this.setCities(response));
    },
  };
</script>

<style lang="scss" scoped>
  .select-area{
    display: flex;
    justify-content: space-between;
    padding: 5px 1.15rem;
    font-size: .8rem;
  }
  select, select:focus{
    font-size: inherit;
    color: #42bd56;
    padding: 5px 8px;
    border: none;
    box-shadow: none;
    background-color: transparent;
    background-image: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  select:focus{
    outline: none;
  }
  .item-title{
    white-space: initial;
  }
</style>
