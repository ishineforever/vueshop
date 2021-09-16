<template>
    <tab-bar>
      <tab-bar-item  path="/home"  actived-color="deeppink">
        <div slot="img"><img src="~assets/img/tabbar/home.svg" alt=""></div>
        <div slot="img-active"><img src="~assets/img/tabbar/home_active.svg" alt=""></div>
        <div slot="text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category" actived-color="deeppink">
        <div slot="img"><img src="~assets/img/tabbar/category.svg" alt=""></div>
        <div slot="img-active"><img src="~assets/img/tabbar/home_active.svg" alt=""></div>
        <div slot="text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" actived-color="deeppink">
        <div slot="img"><img src="~assets/img/tabbar/shopcart.svg" alt=""></div>
        <div slot="img-active"><img src="~assets/img/tabbar/home_active.svg" alt=""></div>
        <div slot="text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" actived-color="deeppink">
        <div slot="img"><img src="~assets/img/tabbar/profile.svg" alt=""></div>
        <div slot="img-active"><img src="~assets/img/tabbar/home_active.svg" alt=""></div>
        <div slot="text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
  import  TabBar from 'components/common/tabbar/TabBar'
  import  TabBarItem from  'components/common/tabbar/TarBarItem'
    export default {
        name: "MainTabBar",
      components:{
        TabBar,
        TabBarItem
      }
    }
</script>

<style scoped>

</style>
