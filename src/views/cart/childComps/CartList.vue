<template>
  <div class="cart-list">
    <Scroll class="content" ref="scroll">
      <cart-list-item :itemInfo="item" v-for="(item,index) in cartList"  :key="index"></cart-list-item>
    </Scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem from './CartListItem'
  import {mapGetters} from 'vuex'
  export default {
    name: "CartList",
    components:{
      Scroll,
      CartListItem
    },
    computed:{
      ...mapGetters(['cartList'])
    },
    activated(){
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>

  .content{
    height: calc( 100vh - 93px - 40px);
    overflow: hidden;
  }
</style>
