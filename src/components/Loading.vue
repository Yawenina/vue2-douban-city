<template>
  <div class="loading">
    <h1>加载中...</h1>
    <svg id="load" x="0" y="0" viewBox="0 0 150 150">
      <circle id="load-inner" cx="75" cy="75" r="60"></circle>
    </svg>
  </div>
</template>
<style lang="scss" scoped>
  .loading{
    margin:50px auto;
    text-align: center;
    width:150px;
     > h1 {
       margin-bottom: 1.3em;
       font-weight: 300;
       color: #8E8E8E;
     }
  }
  #load{
    width:150px;
    animation: loading 3s linear infinite;
    #load-inner{
      stroke: {
        width: 5;
        dashoffset: 0;
        dasharray: 300;
        miterlimit: 10;
        linecap: round;
      }
      stroke: #51BBA7;
      fill: transparent;
      animation: loading-circle 2s linear infinite;
    }
  }
  @keyframes loading {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes loading-circle {
    0% {
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dashoffset: -600;
    }
  }
</style>
<script>
  export default{
    data() {
      return {
      };
    },
  };
</script>
