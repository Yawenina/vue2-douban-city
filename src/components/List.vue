<!--榜单列表-->
<template>
  <ul class="items">
    <li v-for="item in items" class="item">
      <router-link :to="'/movie/subject/' + item.id">
        <img class="item-poster" v-lazy="item.images.large">
        <p class="item-title">{{item.title}}</p>
        <div class="item-rating">
          <div class="rank">
            <rating-stars :average="item.rating.average" v-if="item.rating.average"></rating-stars>
            <span>{{item.rating.average ? item.rating.average : "暂无评分"}}</span>
          </div>
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script>
  import ratingStars from './ratingStars';

  export default {
    name: 'List',
    props: {
      items: Array,
    },
    components: {
      ratingStars,
    },
  };
</script>

<style lang="scss">
  .item-title{
    text-overflow: ellipsis;
  }
  .item-rating{
    color: #aaa;
    line-height: .94rem;
    margin-top: .3rem;
    font-size: .72rem;
  }
</style>
