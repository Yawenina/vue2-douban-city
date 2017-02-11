<!--榜单列表-->
<template>
  <ul class="row items">
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

<style lang="scss" scoped>
  .items{
    white-space: nowrap;
    padding: 15px 0 20px 0;
    overflow-x: auto;
    &::-webkit-scrollbar{
      display: none;
    }
  }
  .item{
    display: inline-block;
    width:100px;
    margin-left: 0.48rem;
    text-align: center;

    &:first-child{
      margin-left: 1.12rem;
    }

    &:last-child{
      margin-right: 1.12rem;
    }
  }
  .item-poster{
    display: inline-block;
    width:100%;
    height: 140px;
  }
  .item-title{
    margin-top: .6rem;
    font-size: .94rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item-rating{
    color: #aaa;
    line-height: .94rem;
    margin-top: .3rem;
    font-size: .72rem;
  }
</style>
