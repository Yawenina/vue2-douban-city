<template>
    <div class="more">
      <loading-bar ref="loadingBar"></loading-bar>
      <div class="more-items">
        <router-link v-for="item in items" class="item" :to="'/movie/subject/' + item.id">
          <img class="item-poster" v-lazy="item.images.large">
          <p class="item-title">{{item.title}}</p>
          <div class="item-rating">
            <div class="rank">
              <rating-stars :average="item.rating.average"></rating-stars>
              <span>{{item.rating.average}}</span>
            </div>
          </div>
        </router-link>
    </div>
</template>

<script>
  /* eslint-disable */
  import loadingBar from './loadingBar';
  import ratingStars from './ratingStars';

  export default {
    name: 'more',
    components: {
      loadingBar,
      ratingStars,
    },
    data() {
      return {
        items: [],
      };
    },
//    created() {
//      const routeParams = this.$route.params;
//      const api = `/v2/${routeParams.category}/${routeParams.type}`;
//      this.$axios.get(api)
//        .then(response => (this.items = response.data.subjects.slice(0, 18)));
//    },
    beforeRouteEnter(to, from, next) {
      let api = `/v2/${to.params.category}/${to.params.type}`;
      next((vm) => {
        vm.$refs.loadingBar.start();
        vm.fetchData(api).then((response) => {
          vm.items = response.data.subjects.slice(0, 18);
          vm.$refs.loadingBar.finish();
        })
      })
    },
    methods: {
      fetchData(api) {
        return this.$axios.get(api);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .more-items{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-top: 20px;
  }
  .item{
    width:33.33333%;
    padding-left: 4%;
    padding-right: 4%;
    margin-bottom: 20px;
    text-align: center;
  }
  .item-poster{
    width:100%;
    height:140px;
  }
  .item-title{
    white-space:nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
