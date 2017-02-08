<template>
    <div class="more">
      <div class="more-items">
        <a v-for="item in items" class="item">
          <img class="item-poster" :src="item.images.large">
          <p class="item-title">{{item.title}}</p>
          <div class="item-rating">
            <div class="rank">
              <rating-stars :average="item.rating.average"></rating-stars>
              <span>{{item.rating.average}}</span>
            </div>
          </div>
        </a>
    </div>
</template>

<script>
  import ratingStars from './ratingStars';

  export default {
    name: 'more',
    components: {
      ratingStars,
    },
    data() {
      return {
        items: [],
      };
    },
    created() {
      const routeParams = this.$route.params;
      const api = `/v2/${routeParams.category}/${routeParams.type}`;
      this.$axios.get(api)
        .then(response => (this.items = response.data.subjects.slice(0, 18)));
    },
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
