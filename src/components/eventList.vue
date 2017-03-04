<template>
  <div>
    <loading v-if="showLoading"></loading>
    <div class="wrapper" v-else>
      <h1>{{ locId }} >> {{ type }}</h1>
      <div class="event-item" v-for="item in items">
        <div class="event-poster"></div>
        <div class="event-body">
          <h1>{{ event.title }}</h1>
          <ul class="event-info">
            <li><span class="event-info-title">时间：</span>{{ event.time_str }}</li>
            <li><span class="event-info-title">地点：</span>{{ event.address }}</li>
            <li><span class="event-info-title">费用：</span>{{ event.price_range }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Loading from './Loading';

  export default{
    components: { Loading },
    data() {
      return {
      };
    },
    methods: {
      getEventsList() {

      },
    },
  };
</script>

<style lang="scss">
</style>
