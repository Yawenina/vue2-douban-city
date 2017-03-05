<template>
  <div class="events-list">
    <div class="events-wrapper">
      <h1 class="nav">{{ locName }} >> {{ eventsName[type] }}</h1>
      <router-link class="event-item" v-for="event in events" tag="div" :to="'/event/' + event.id">
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
    </div>
    <infinite-loading :on-infinite="getEventsList" ref="infiniteLoading" spinner="spiral">
      <span slot="no-more" class="no-more-data">没有更多啦:)</span>
    </infinite-loading>
  </div>
</template>

<script>
  import InfiniteLoading from 'vue-infinite-loading';
  import { eventsName } from '../Utils';

  export default{
    name: 'eventList',
    components: { InfiniteLoading },
    data() {
      return {
        isLoadComplete: false,
        locId: '',
        locName: '',
        type: '',
        eventsName,
        events: [],
        totalEvents: 0,
        currEventsCount: 0,
      };
    },
//    beforeRouteEnter(to, from, next) {
//      next((vm) => {
//        /* eslint-disable */
//        vm.locId = to.query.loc_id;
//        vm.locName = to.query.loc_name;
//        vm.type = to.query.type;
//      })
//    },
    watch: {
      /* eslint-disable */
      $route: {
        handler: function () {
          this.locId = this.$route.query.loc_id;
          this.locName = this.$route.query.loc_name;
          this.type = this.$route.query.type;
        },
        immediate: true,
      },
    },
    methods: {
      getEventsList() {
        this.$axios.get(`/v2/event/list?loc=${this.locId}&type=${this.type}&start=${this.currEventsCount}`)
            .then((response) => {
              const data = response.data;
              if (this.totalEvents === 0) this.totalEvents = data.total;
              this.events = this.events.concat(data.events);
              this.currEventsCount += data.count;
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');

              if (this.currEventsCount >= this.totalEvents) {
                this.currEventsCount = this.totalEvents;
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
              }
            });
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
      border-bottom: none;
      padding-bottom: 0;
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
  .no-more-data{
    color: #42bd56;
  }
</style>
