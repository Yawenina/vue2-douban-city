<template>
  <div class="loading-bar">
    <div class="bar" ref="bar" v-show="showBar"></div>
  </div>
</template>
<style lang="scss">
  .loading-bar{
    width: 100%;
  }
  .bar{
    height: 2px;
    background-color: #4FC456;
    position: fixed;
    top:0;
  }
</style>
<script>
  export default{
    data() {
      return {
        percent: 0,
        showBar: true,
        timer: null,
      };
    },
    watch: {
      percent() {
        this.$refs.bar.style.width = `${this.percent}%`;
      },
    },
    methods: {
      start() {
        this.timer = setInterval(() => {
          this.increment(Math.random() * 3);
          if (this.percent > 95) {
            this.finish();
          }
        }, 100);
      },
      increment(num) {
        this.percent += num;
      },
      finish() {
        this.percent = 100;
        this.showBar = false;
        clearInterval(this.timer);
        this.timer = null;
        setTimeout(() => { this.percent = 0; });
      },
    },
  };
</script>
