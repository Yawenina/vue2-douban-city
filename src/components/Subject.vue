<template>
    <div class="subject" v-if="subject">
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
    </div>
</template>

<script>
  import ratingStars from './ratingStars';

  export default {
    name: 'Subject',
    components: {
      ratingStars,
    },
    data() {
      return {
        subject: null,
      };
    },
    created() {
      const api = `/v2/${this.$route.fullPath}`;
      this.$axios.get(api).then(response => (this.subject = response.data));
    },
  };
</script>

<style lang="scss" scoped>
  section{
      padding: 23px 18px;
      border-bottom: 1px solid rgba(170, 170, 170, 0.1);
  }
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
    font-size: 1.5em;
  }
  .subject-pics ul{
    display: flex;
    justify-content: space-between;
    list-style: none;
  }
</style>
