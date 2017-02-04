<template>
  <ul>
    <li v-for="item in items">
      <a>
        <img class="item-poster" :src="item.images.large">
        <span class="item-title">{{item.title}}</span>
        <div class="item-rating">
          <div class="rank">
            <span class="rating-stars">
              <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
            </span>
            <span>{{item.rating.average}}</span>
          </div>
        </div>
      </a>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'List',
    props: {
      items: Array,
    },
  };
</script>
