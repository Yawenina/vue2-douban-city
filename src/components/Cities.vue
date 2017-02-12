<template>
  <div>
    <header>
      <div class="select">
        <span>选择城市</span>
        <select>
          <option v-for="city in citys" :data-city-id="city">{{city}}</option>
        </select>
      </div>
      <div class="select">
        <span>选择活动类型</span>
        <select>
          <option v-for="type in types" :data-type-id="type">{{type}}</option>
        </select>
      </div>
    </header>

    <template>
      <section>
        <header>
          <h1></h1>
        </header>
      </section>
    </template>
  </div>
</template>
<style lang="scss">
</style>
<script>
  export default{
    data() {
      return {
        cities: [],
        types: []
      };
    },
  };
</script>
