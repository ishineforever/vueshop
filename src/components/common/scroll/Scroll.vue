<template>
<div class="wrapper"  ref="wrapper">
  <div class="content">
    <slot></slot>
  </div>
</div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
      name: "scroll",
      props:{
        probeType:{
          Type:Number,
          default:0
        },
        pullUpLoad:{
          Type:Boolean,
          default:false
        },
      },
      data(){
          return {
            Scroll:null
          }
      },
      mounted(){
        this.scroll=new BScroll(this.$refs.wrapper,{
          click:true,
          observeDOM:true,
          probeType:this.probeType,
          pullUpLoad:this.pullUpLoad
        })

        if(this.probeType===2||this.probeType===3){
          this.scroll.on('scroll',position =>{
            this.$emit('scroll',position)
          })
        }

        // console.log(this.scroll);

        if(this.pullUpLoad){
          this.scroll.on('pullingUp',()=>{
            this.$emit('pullingUp')
          })
        }
      },
      methods:{
          scrollTo(x,y,time=300){
            this.scroll.scrollTo(x,y,time)
          },
          refresh(){
            // console.log('----');
            this.scroll.refresh()
          },
          finishPullUp(){
            this.scroll.finishPullUp()
        },
          getScrollY(){
            return this.scroll?this.scroll.y:0
          }
        }

    }
</script>

<style scoped>

</style>
