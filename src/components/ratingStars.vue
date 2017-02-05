<template>
    <span class="rating-stars">
      <span v-for="n in 5" :class="{'full-star': score >= n * 2}" class="star">★</span>
    </span>
</template>
<style>
  .star.full-star {
    color: #FDB631;
  }
</style>
<script>
    export default{
      props: {
        average: Number,
      },
      computed: {
        score() {
          return Math.round(this.average);
        },
      },
    };
</script>
