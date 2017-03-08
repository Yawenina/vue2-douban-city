<template>
  <div class="card">
    <header class="select-area">
      <div class="select">
        <label>选择城市</label>
        <select v-model="searchLoc">
          <option v-for="loc in locs" :data-loc-id="loc" :value="loc">{{loc.name}}</option>
        </select>
      </div>
<!--       <div class="select">
        <label>选择活动类型</label>
        <select>
          <option v-for="type in types" :data-type-id="type" v-model="searchType" :value="type">{{eventsData[type].name}}</option>
        </select>
      </div> -->
    </header>

    <template>
      <event-list :items="event.data" :type="type" :locId="searchLoc.id" :locName="searchLoc.name"
                 v-for="(event, type) in eventsData"
                 v-if="event.data.length">
        <h2>{{event.name}}</h2>
      </event-list>
    </template>
  </div>
</template>

<script>
  import EventList from './EventList';
  import { eventsMapping } from '../../Utils';

  const eventsData = {};
  Object.keys(eventsMapping).forEach((key) => {
    eventsData[key] = {
      name: eventsMapping[key],
      data: [],
    };
  });

  export default{
    name: 'Cities',
    data() {
      return {
        locs: [],
        types: ['music', 'film', 'drama', 'commonweal', 'salon', 'exhibition', 'party', 'sports', 'travel', 'others'],
        eventsData,
        searchLoc: '',
      };
    },
    components: { EventList },
    methods: {
      getCities() {
        return this.$axios.get('/v2/loc/list');
      },
      setCities(response) {
        this.locs = response.data.locs;
        this.searchLoc = response.data.locs[0];
      },
      fetchTypeEvents(loc, type) {
        const api = `/v2/event/list?loc=${loc}&type=${type}`;
        this.$axios.get(api).then((response) => {
          this.$data.eventsData[type].data = response.data.events.slice(0, 8);
        });
      },
      fetchAllTypesEvents() {
        const searchLocId = this.searchLoc.id;
        this.types.forEach((item) => {
          this.fetchTypeEvents(searchLocId, item);
        });
      },
    },
    watch: {
      searchLoc() {
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
