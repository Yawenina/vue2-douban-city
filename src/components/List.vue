<template>
  <ul class="row items">
    <li v-for="item in items" class="item">
      <a>
        <img class="item-poster" :src="item.images.large">
        <p class="item-title">{{item.title}}</p>
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

<style lang="scss">
  .items{
    white-space: nowrap;
    padding: 15px 0 20px 0;
    overflow-x: auto;
    &::-webkit-scrollbar{
      display: none;
    }
  }
  .item{
    display: inline-block;
    width:100px;
    margin-left: 0.48rem;
    text-align: center;

    &:first-child{
      margin-left: 1.12rem;
    }

    &:last-child{
      margin-right: 1.12rem;
    }
  }
  .item-poster{
    display: inline-block;
    width:100%;
    height: 140px;
  }
  .item-title{
    margin-top: .6rem;
    font-size: .94rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item-rating{
    color: #aaa;
    line-height: .94rem;
    margin-top: .3rem;
    font-size: .72rem;
  }
</style>
