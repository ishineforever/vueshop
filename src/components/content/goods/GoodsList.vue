<template>
  <div class="good-list">
      <goods-list-item v-for="item in goods" :goods-item="item">

      </goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem'
    export default {
      name: "goodsList",
      props:{
        goods:Array
      },
      components:{
        GoodsListItem
      }
    }
</script>

<style scoped>
  .good-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: var(--color-background);

    padding: 2px;
  }
</style>
