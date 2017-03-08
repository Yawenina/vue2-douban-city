<template>
    <div class="subject details">
      <clip-loading ref="loadingBar" v-if="!subject"></clip-loading>

      <template v-else>
        <section class="subject-poster">
          <img :src="subject.images.medium">
        </section>

        <section class="subject-info">
          <div class="left">
            <h1>{{subject.title}}</h1>
            <div class="meta">
              <p>年代：{{subject.year}}</p>
              <p>制作国家/地区： {{subject.countries.join("/")}}</p>
              <p>影片类型：{{subject.genres.join("/")}}</p>
            </div>
          </div>
          <div class="right">
            <div class="rating">
              <p class="rating-average">{{subject.rating.average}}</p>
              <p>
                <rating-stars :average="subject.rating.average"></rating-stars>
              </p>
              <p class="rating-count">{{subject.ratings_count}}人</p>
            </div>
          </div>
        </section>

        <section class="subject-intro">
          <h3 class="section-title">剧情简介</h3>
          <p>{{subject.summary}}</p>
        </section>

        <section class="subject-pics">
          <h3 class="section-title">影人</h3>
          <ul>
            <li v-for="cast in subject.casts">
              <img :src="cast.avatars.small">
              <span>{{subject.name}}</span>
            </li>
          </ul>
        </section>
      </template>
    </div>
</template>

<script>
  import clipLoading from '../ClipLoading';
  import ratingStars from '../ratingStars';

  export default {
    name: 'Subject',
    components: {
      clipLoading,
      ratingStars,
    },
    data() {
      return {
        subject: null,
      };
    },
    beforeRouteEnter(to, from, next) {
      const api = `/v2/${to.fullPath}`;
      /* eslint no-param-reassign: ["error", { "props": false }] */
      next((vm) => {
        vm.fetchData(api).then((response) => {
          vm.subject = response.data;
        });
      });
    },
    methods: {
      fetchData(api) {
        return this.$axios.get(api);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .section-title{
    color: #aaa;
    font-weight: normal;
    margin-bottom: 10px;
  }
  .subject-poster{
    text-align: center;
  }
  .subject-info{
    display: flex;
    justify-content: space-between;
    .meta{
      color: #aaa;
      line-height:1.5em;
    }
    .right{
      color: #aaa;
      padding: 15px;
      background: #fff;
      text-align: center;
      box-shadow: 2px 2px #bdbdbd;
    }
  }
  .rating-average{
    color: #111;
    font-size: 1.8em;
  }
  .subject-pics ul{
    display: flex;
    justify-content: space-between;
    list-style: none;
  }
</style>
