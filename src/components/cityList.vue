<template>
  <section class="horizontal-list">
    <header>
      <slot></slot>
      <router-link :to="'/eventList?loc_id=' + locId + '&type=' + type + '&loc_name=' + locName">更多</router-link>
    </header>
    <ul class="items">
      <li v-for="item in items" class="item">
        <router-link :to="'/event/' + item.id">
          <img v-lazy="item.image" class="item-poster">
          <p class="item-title">{{item.title.slice(0, 13)}}...</p>
          <p class="item-date">{{item.time_str}}</p>
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script>
  export default{
    props: {
      items: Array,
      type: String,
      locId: String,
      locName: String,
    },
    data() {
      return {
      };
    },
  };
</script>

<style lang="scss" scoped>
  .item-title{
    white-space: initial;
    height:38px;
    font-size: .9rem;
  }
  .item-date{
    color: #aaa;
    margin-top: 5px;
  }
</style>
