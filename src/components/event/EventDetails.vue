<template>
  <clipLoading v-if="!event"></clipLoading>
  <div class="details" v-else>
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
          <span class="info-item-title"><i class="fa fa-calendar"></i>活动时间</span>
          <span>{{event.time_str}}</span>
        </li>
        <li>
          <span class="info-item-title"><i class="fa fa-map"></i>举办地址</span>
          <span>{{event.address}}</span>
        </li>
        <li>
          <span class="info-item-title"><i class="fa fa-ticket"></i>费用</span>
          <span>{{event.price_range}}</span>
        </li>
        <li>
          <span class="info-item-title"><i class="fa fa-user-circle"></i>联系发起人</span>
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
  import clipLoading from '../ClipLoading';

  export default{
    components: { clipLoading },
    data() {
      return {
        event: null,
      };
    },
    created() {
      this.fetchData(`/v2/event/${this.$route.params.id}`);
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
  .details .info{
    border-bottom-width: 0px;
  }
  .info-body {
    margin-top: 10px;
  }
  .info-body li{
    display: flex;
    justify-content: space-between;
    padding: 12px 0px;
    color: #aaa;
    border-bottom: 1px solid #f5f5f5;
  }
  .info-item-title{
    color: #000;
    font-weight: bold;
  }
  i[class^="fa"] {
    color: #aaa;
    padding-right: 10px;
  }
</style>
