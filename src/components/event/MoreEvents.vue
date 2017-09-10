<template>
  <clip-loading v-if="!events.length"></clip-loading>
  <div class="events-wrapper" v-else>
    <h1 class="nav">{{ locName }} >> {{ eventsMapping[type] }}</h1>

    <router-link 
      class="event-item" 
      v-for="event in events" 
      tag="div" 
      :to="'/cities/event/' + event.id">
      <div class="event-poster">
        <img :src="event.image">
      </div>
      <div class="event-body">
        <h2 class="event-title">{{ event.title }}</h2>
        <ul class="event-info">
          <li><span class="event-info-title">时间：</span>{{ event.time_str }}</li>
          <li><span class="event-info-title">地点：</span>{{ event.address }}</li>
          <li><span class="event-info-title">费用：</span>{{ event.price_range }}</li>
        </ul>
      </div>
    </router-link>

    <infinite-loading 
      :on-infinite="getEventsList" 
      ref="infiniteLoading">
    </infinite-loading>
  </div>
  </div>
</template>

<script>
  import InfiniteLoading from 'vue-infinite-loading';
  import clipLoading from '../ClipLoading';
  import { eventsMapping } from '../../Utils';

  export default{
    name: 'eventList',
    components: { InfiniteLoading, clipLoading },
    data() {
      return {
        isLoadComplete: false,
        locId: '',
        locName: '',
        type: '',
        eventsMapping,
        events: [],
        totalEvents: 0,
        currEventsCount: 0,
      };
    },
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        /* eslint-disable */
        vm.locId = to.query.loc_id;
        vm.locName = to.query.loc_name;
        vm.type = to.query.type;
        vm.getEventsList();
      })
    },
    methods: {
      getEventsList() {
        this.$axios.get(`/v2/event/list?loc=${this.locId}&type=${this.type}&start=${this.currEventsCount}`)
          .then((response) => {
            let data = response.data;

            if (this.totalEvents === 0) this.totalEvents = data.total;

            this.events = this.events.concat(data.events);
            this.currEventsCount += data.count;
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');

            if (this.currEventsCount >= this.totalEvents) {
              this.currEventsCount = this.totalEvents;
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
            }
          })
      },
      loadMore() {
        if (this.currEventsCount >= this.totalEvents) return;

        this.getEventsList().then((response) => {
          let data = response.data;
          this.events = this.events.concat(data.events);
          this.currEventsCount += data.count;
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
          
          if (this.currEventsCount >= this.totalEvents) {
            this.currEventsCount == this.totalEvents;
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
          }
        })
      },
    },
  };
</script>

<style lang="scss">
  .nav{
    padding: 10px 15px 0;
    color: #42bd56;
    font-size: 1rem;
    font-weight: normal;
  }
  .event-item{
    display: flex;
    padding: 20px 15px;
    border-bottom:1px solid rgba(170, 170, 170, 0.1);
    &:last-child{
      border-bottom-width: 0;
    }
  }
  .event-poster{
    width:35%;
    img {
      /*max-width: 100%;*/
      max-height: 150px;
    }
  }
  .event-title{
    color: #494949;
  }
  .event-body{
    padding-left: 10px;
  }
  .event-info{
    color: #aaaaaa;
    list-style: none;
    li {
      padding: 5px 0;
    }
  }
</style>
