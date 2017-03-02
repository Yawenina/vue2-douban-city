<!--更多电影列表-->
<template>
    <div class="more">
      <loading-bar ref="loadingBar"></loading-bar>
      <loading v-if="!isDataLoaded"></loading>
      <div class="content" v-else v-infinite-scroll="getScrollTop" @scroll="loadMore">
        <h2 class="category-title">{{$route.query.category}}</h2>
        <div class="more-currentRenderedData">
          <router-link v-for="item in currentRenderedData" class="item" :to="'/movie/subject/' + item.id">
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
      </div>
</template>

<script>
  /* eslint-disable */
  import loadingBar from './loadingBar';
  import loading from './Loading'
  import ratingStars from './ratingStars';

  export default {
    name: 'moreMovies',
    components: {
      loadingBar,
      loading,
      ratingStars,
    },
    data() {
      return {
        isDataLoaded: false,
        currentRenderedData: [],
        allData:[],
        allDataLen: 0,
        busy: false,
      };
    },
//    created() {
//      const routeParams = this.$route.params;
//      const api = `/v2/${routeParams.category}/${routeParams.type}`;
//      this.$axios.get(api)
//        .then(response => (this.currentRenderedData = response.data.subjects.slice(0, 18)));
//    },
    beforeRouteEnter(to, from, next) {
      let api = `/v2/movie/${to.params.type}?start=0&count=10`;
      next((vm) => {
        vm.$refs.loadingBar.start();
        vm.fetchData(api).then((response) => {
          vm.allData = response.data.subjects;
          vm.allDataLen = vm.allData.length;
          vm.currentRenderedData = response.data.subjects.slice(0, 9);
          vm.$refs.loadingBar.finish();
          vm.isDataLoaded = true;
        })
      })
    },
    computed: {
      currRenderedDataLen() {
        return this.currentRenderedData.length;
      }
    },
    methods: {
      fetchData(api) {
        return this.$axios.get(api);
      },
      loadMore() {
        console.log(1)
        if (this.currRenderedDataLen + 9 > this.allDataLen) return;
        console.log(2)
//        this.busy = true;
        this.currentRenderedData = this.currentRenderedData.concat(this.allData.slice(this.currRenderedDataLen, this.currRenderedDataLen + 9));
        this.currRenderedDataLen += 9;
        console.log(3)
//        this.busy = false;
      },
      getScrollTop() {
        console.log("scrolled")
      }
    },
  };

</script>

<style lang="scss" scoped>
  .content{
    height:500px;
    overflow:auto;
  }
  .category-title{
    font-size: 1.06rem;
    font-weight: normal;
    padding: 15px 20px;
  }
  .item{
    display: inline-block;
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
