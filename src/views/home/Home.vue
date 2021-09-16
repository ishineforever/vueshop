<template>
  <div id="home" >
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control  :titles="['流行','新款','精选']" @tabClick="tabClick"  ref="tabControl1"  class="tab-control"  v-show="isTabFixed"></tab-control>
    <scroll class="content"  ref="scroll"  :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners"  @imageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control  :titles="['流行','新款','精选']" @tabClick="tabClick"  ref="tabControl2"  ></tab-control>
      <goods-list :goods="goodsList"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from  'components/content/tabControl/TabControl'
  import GoodsList from  'components/content/goods/GoodsList'
  import  Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'


  import  HomeSwiper from './clildComps/HomeSwiper'
  import RecommendView from  './clildComps/RecommendView'
  import FeatureView from './clildComps/FeatureView'


  import { getHomeMultidata,getHomeGoods} from "network/home";
  import {debounce }   from 'common/utils'
  import {itemListenerMixin} from "common/mixins";


  export default {
    mixins:[itemListenerMixin],
    name: "Home",
    components:{
      NavBar,
      TabControl,
      GoodsList,
      HomeSwiper,
      RecommendView,
      FeatureView,
      Scroll,
      BackTop,
    },
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },
        currentType:'pop',
        isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0,
      }
    },
    computed:{
      goodsList(){
        return this.goods[this.currentType].list
      }
    },
    created(){
      //1.请求多个数据
      this.getHomeMultidata()

      //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')


    },
    methods:{

      // /**
      //  * 事件监听相关的方法
      //  * /

       tabClick(index){
         switch (index){
           case 0:
             this.currentType='pop'
                 break;
           case 1:
             this.currentType='new'
                 break;
           case 2:
             this.currentType='sell'
                 break;
         }
         this.$refs.tabControl1.currentIndex=index
         this.$refs.tabControl2.currentIndex=index
       },

      backClick(){
        this.$refs.scroll.scrollTo(0,0)
      },

      contentScroll(position){
        this.isShowBackTop=(-position.y)>1000

        this.isTabFixed=(-position.y)>this.tabOffsetTop
      },

      loadMore(){
        this.getHomeGoods(this.currentType)
      },

      swiperImageLoad(){
        this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop+215;
      },

      /**
       * 网络请求相关方法
       */
      getHomeMultidata(){
        getHomeMultidata().then(res =>{
          // console.log(res);
          this.banners=res.data.data.banner.list;
          this.recommends=res.data.data.recommend.list;
        })
      },
      getHomeGoods(type){
          const page=this.goods[type].page+1;
          getHomeGoods(type,page).then(res =>{
            // console.log(res);
             this.goods[type].list.push(...res.data.data.list)
             this.goods[type].page+=1

            //完成上拉加载更多
            this.$refs.scroll&&this.$refs.scroll.finishPullUp()
        })
      },
    },
    mounted(){

    },
    activated(){
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated(){
      //1.保存Y值
     this.saveY=this.$refs.scroll.getScrollY()

      //2.取消全局事件监听
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    }
    }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;

    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }



  .content{
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control{
    position: relative;
    z-index: 9;
  }

</style>
