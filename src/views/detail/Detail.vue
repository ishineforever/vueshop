<template>
<div  id="detail">
  <detail-nav-bar class="detail-nav"   @titleClick="titleClick" ref="nav"></detail-nav-bar>
  <scroll class="content" ref="scroll" @scroll="getPositionY" :probeType="3">
    <detail-swiper  :topImages="topImages" ></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-images-info :images-info="detailInfo" @imgLoad="imageLoad"></detail-images-info>
    <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
    <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
    <goods-list :goods="recommends" ref="recommends"></goods-list>
  </scroll>
  <back-top v-show="isShowBackTop" @click.native="backClick" ></back-top>
  <detail-bottom-bar  @addToCart="addToCart"></detail-bottom-bar>
  <toast :isShow="show" :message="message"></toast>
</div>
</template>

<script>

  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from  './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailImagesInfo from  './childComps/DetailImagesInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'
  import BackTop from 'components/content/backTop/BackTop'

  import  Scroll from 'components/common/scroll/Scroll'
  import GoodsList from  'components/content/goods/GoodsList'
  import Toast from 'components/common/toast/Toast'

  import {debounce}   from 'common/utils'
  import {itemListenerMixin} from "common/mixins";

  import {getDetail ,Goods,Shop,GoodsParams,getRecommend} from "network/detail";
  import {mapActions} from 'vuex'

  export default {
      mixins: [itemListenerMixin],
      name: "Detail",
      components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailImagesInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        BackTop,
        Scroll,
        Toast,
        GoodsList,
      },
     methods: {
       ...mapActions(['addCart']),
       getDetail() {
         getDetail(this.iid).then(res => {
           const data = res.data.result
           // console.log(res);
           this.topImages = res.data.result.itemInfo.topImages
           //获取商品信息
           this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
           //获取店铺信息
           this.shop = new Shop(data.shopInfo)
           //保存商品的详情数据
           this.detailInfo = data.detailInfo;
           //获取参数信息
           this.paramInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule)
           //获取评论信息
           if (data.rate.cRate !== 0) {
             this.commentInfo = data.rate.list[0]
           }


         })
       },
       imageLoad() {
         this.$refs.scroll.refresh()
         this.themeTopYs.push(0)
         this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
         this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
         this.themeTopYs.push(this.$refs.recommends.$el.offsetTop - 44)
         // console.log(this.themeTopYs);
       },
       titleClick(index) {
         this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
       },
       getPositionY(position){
         let length=this.themeTopYs.length;
         let positionY=-position.y;
         this.isShowBackTop=(-position.y)>1000

         for(let i=0;i< length;i++){
            if(this.currentIndex!==i&&((i<length-1&&positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1]) ||(i===length-1&&positionY>=this.themeTopYs[i]))){
               this.currentIndex=i;
               this.$refs.nav.currentIndex=i;
            }
         }
       },
       backClick(){
         this.$refs.scroll.scrollTo(0,0,300)
       },
       addToCart(){
         const product={
         }
         product.img=this.topImages[0];
         product.title=this.goods.title;
         product.desc=this.goods.desc;
         product.price=this.goods.lowNowPrice;
         product.iid=this.iid;
         // this.$store.dispatch('addCart',product).then(res =>{
         //   console.log(res);
         // })
         this.addCart(product).then(res =>{
           // console.log(res);
           // this.show=true
           // this.message=res
           // setTimeout(()=>{
           //   this.show=false
           //   this.message=''
           //  },1500)
           this.$toast.show(res,2000)
         })

       }
     },

    data(){
          return{
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommends:[],
            themeTopYs:[],
            currentIndex:0,
            isShowBackTop:false,
            show:false,
            message:'哈哈哈哈'
          }
      },
    created(){
         this.iid=this.$route.params.iid
         this.getDetail()
        getRecommend().then(res =>{
          // console.log(res);
          this.recommends=res.data.data.list
          // console.log(res.data.data.list);
        })
      },
    mounted(){

    },
    destroyed(){
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    }

    }
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  height: 100vh;
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content{
  height: calc(100% - 44px - 50px);
  overflow: hidden;
}
</style>
