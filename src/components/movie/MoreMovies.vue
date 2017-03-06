<!--更多电影列表-->
<template>
    <div class="more">
      <loading-bar ref="loadingBar"></loading-bar>
      <loading v-if="!isDataLoaded"></loading>

      <div class="content" v-else @scroll="scrollHandler" ref="mainContent" v-set-height>
        <h2 class="category-title">{{title}}</h2>

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

        <p class="is-loading loading-tip" v-if="!allDataLoaded">正在加载中...</p>
        <p class="no-more loading-tip" v-else="allDataLoaded">Oops...没有更多啦</p>
      </div>
    </div>
</template>

<script>
  /* eslint-disable */
  import loadingBar from '../loadingBar';
  import loading from '../Loading'
  import ratingStars from '../ratingStars';
  import { throttle } from '../../Utils';

  const movieListMapping = {
    "in_theaters": "影院热映",
    "coming_soon": "即将上映",
    "top250": "Top250",
  }

  export default {
    name: 'MoreMovies',
    components: {
      loadingBar,
      loading,
      ratingStars,
    },
    directives: {
      setHeight: {
        bind(el) {
          el.style.height = window.innerHeight*.9 + "px";
        }
      }
    },
    data() {
      return {
        title: movieListMapping[this.$route.params.type],
        isDataLoaded: false,
        allDataCount: 0,
        allDataLoaded: false,
        currentRenderedData: [],
        currRenderedDataCount: 0,
        busy: false,
        api: '',
        isLoadComplete: true,
      };
    },
//    created() {
//      const routeParams = this.$route.params;
//      const api = `/v2/${routeParams.category}/${routeParams.type}`;
//      this.$axios.get(api)
//        .then(response => (this.currentRenderedData = response.data.subjects.slice(0, 18)));
//    },
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        vm.api = `/v2/movie/${to.params.type}?count=9`;
        vm.$refs.loadingBar.start();
        vm.fetchData(vm.api).then((response) => {
          let data = response.data;
          vm.allDataCount = data.total;
          vm.updateDataInfo(data.subjects, data.count);
          vm.$refs.loadingBar.finish();
          vm.isDataLoaded = true;
        })
      })
    },
    methods: {
      fetchData(api) {
        return this.$axios.get(api);
      },
      updateDataInfo(newData, newDataCount) {
        this.currentRenderedData = this.currentRenderedData.concat(newData);
        this.currRenderedDataCount = this.currRenderedDataCount + newDataCount >= this.allDataCount ? this.allDataCount : this.currRenderedDataCount + newDataCount;
        if (this.currRenderedDataCount >= this.allDataCount) {
          this.allDataLoaded = true;
        }
      },
      loadMore() {
        if (this.currRenderedDataCount >= this.allDataCount) return;

        this.isLoadComplete = false;
        let api = `${this.api}&start=${this.currRenderedDataCount}`;
        this.fetchData(api).then(response => {
          let data = response.data;
          this.updateDataInfo(data.subjects, data.count);
          this.isLoadComplete = true;
        })
      },
      scrollHandler() {
        let ref = this.$refs.mainContent;
        let scrollTop = ref.scrollTop,
            scrollHeight = ref.scrollHeight,
            clientHeight = ref.clientHeight;

        if (scrollHeight - 30 <= scrollTop + clientHeight && this.isLoadComplete) {
          this.loadMore();
        }
      }
    },
  };

</script>

<style lang="scss" scoped>
  .content{
    height:100%;
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
  .loading-tip{
    font-size: 1.1em;
    color: #42bd56;
    text-align: center;
  }
</style>
