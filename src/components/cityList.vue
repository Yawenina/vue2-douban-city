<template>
  <section class="horizontal-list">
    <header>
      <slot></slot>
      <router-link to="">更多</router-link>
    </header>
    <ul class="items">
      <li v-for="item in items" class="item">
        <router-link :to="'/city/type/' + item.id">
          <img :src="item.image" class="item-poster">
          <p class="item-title">{{item.title.slice(0, 13)}}...</p>
          <p>{{item.time_str}}</p>
        </router-link>
      </li>
    </ul>
  </section>
</template>
<style lang="scss">
</style>
<script>
  export default{
    props: {
      items: Array,
      type: String,
    },
    data() {
      return {
      };
    },
  };
</script>
