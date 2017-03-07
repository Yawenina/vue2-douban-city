<template>
  <div id="app">
    <div class="topNav">
      <header>
        <div class="topNav-primary">
          <a href='/'>
            <h1>豆瓣</h1>
          </a>
          <nav class="mainNav">
            <ul>
              <li class="movies"><router-link to="/movie">电影</router-link></li>
              <li class="cities"><router-link to="/cities">同城</router-link></li>
              <li class="search"><img src="./assets/search.png"></li>
            </ul>
          </nav>
        </div>
      </header>
    </div>

    <div class="page">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>

  </div>
</template>

<style lang="scss">
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Helvetica Neue",Helvetica,Roboto,Arial,sans-serif;
  }
  body{
    font-size: 12px;
  }
  a{
    color: #111;
    text-decoration: none;
  }
  .topNav-primary{
    width:100%;
    height: 47px;
    display: flex;
    padding: 0 18px;
    justify-content: space-between;
    align-items: center;
    border-bottom:1px solid #f3f3f3;

    h1 {
      width:46px;
      height:22px;
      font-size:0;
      background: url('./assets/logo.png') no-repeat;
      -webkit-background-size:cover;
      background-size:cover;
    }
  }

  .mainNav li{
      display: inline-block;
      font-size: 15px;
      margin-right:19px;
  }

  .movies a{
    color: #2384E8;
  }
  .books a{
    color: #9F7860;
  }
  .cities a{
    color: #E4A813;
  }
  .search img{
    width: 24px;
    vertical-align: middle;
    background: url('./assets/search.png') no-repeat;
    background-size: cover;
  }
</style>
