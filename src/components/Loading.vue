<template>
  <div class="loading">
    <svg id="load" x="0" y="0" viewBox="0 0 100 100">
      <circle id="load-inner" cx="50" cy="50" r="30"></circle>
    </svg>
    <h1>加载中...</h1>
  </div>
</template>
<style lang="scss" scoped>
  .loading{
    margin:50px auto;
    text-align: center;
    width:100px;
    transform: translateY(50%);
     > h1 {
       margin-top: 1.3em;
       color: #4FC456;
       font-size: 1.2rem;
     }
  }
  #load{
    width:100px;
    animation: loading 3s linear infinite;
    #load-inner{
      stroke: {
        width: 5;
        dashoffset: 0;
        dasharray: 200;
        miterlimit: 5;
        linecap: round;
      }
      stroke: #4FC456;
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
      stroke-dashoffset: -100;
    }
  }
</style>
