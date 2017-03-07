<template>
  <div class="spinner" v-show="loading">
    <div class="clip-spinner" :style="spinnerStyle"></div>
    <p :style="{color: this.color}"><slot>加载中...</slot></p>
  </div>
</template>

<script>
  export default {
    props: {
      loading: {
        type: Boolean,
        default: true,
      },
      size: {
        type: String,
        default: '35px',
      },
      color: {
        type: String,
        default: '#42bd56',
      },
    },
    computed: {
      spinnerStyle() {
        return {
          width: this.size,
          height: this.size,
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: `${this.color} ${this.color} transparent`,
          borderRadius: '100%',
        };
      },
    },
  };
</script>

<style scoped>
  @keyframes clipSpinner {
    0% {
      transform: rotate(0deg) scale(1);
    }
    50% {
      transform: rotate(180deg) scale(0.8);
    }
    100% {
      transform: rotate(360deg) scale(1);
    }
  }
  .spinner{
    text-align: center;
    font-size: 1.2em;
  }
  .clip-spinner{
    margin:20px auto;
    animation: clipSpinner 1s infinite linear;
  }
</style>

