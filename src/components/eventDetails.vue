<template>
  <div class="details" v-if="event">
    <section class="poster">
      <img v-lazy="event.image">
    </section>
    <section class="info">
      <div class="info-title">
        <h1>{{event.title}}</h1>
        <p class="interests-count gray">{{event.wisher_count}}人感兴趣/{{event.participant_count}}人要参加</p>
      </div>
      <ul class="info-body">
        <li>
          <span><i class="fa fa-calendar"></i>活动时间</span>
          <span>{{event.time_str}}</span>
        </li>
        <li>
          <span><i class="fa fa-map-marker"></i>举办地址</span>
          <span>{{event.address}}</span>
        </li>
        <li>
          <span><i class="fa fa-ticket"></i>费用</span>
          <span>price_range</span>
        </li>
        <li>
          <span><i class="fa fa-user-circle"></i>联系发起人</span>
          <span>
            <img v-lazy="event.owner.avatar">
            {{event.owner.name}}
          </span>
        </li>
      </ul>
    </section>
    <section class="intro">
      <div v-html="event.content"></div>
    </section>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        event: null,
      };
    },
    created() {
      this.fetchData(`/v2/${this.$route.fullPath}`);
    },
    methods: {
      fetchData(api) {
        this.$axios.get(api).then((response) => {
          this.event = response.data;
        });
      },
    },
  };
</script>

<style lang="scss">
  .info-body li{
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  i[class^="fa"] {
    padding-right: 5px;
  }
</style>
