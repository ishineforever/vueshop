<template>
    <div class="tab-bar-item"  @click="itemClick">
      <div v-if="!isActive"><slot name="img"></slot></div>
      <div v-else><slot name="img-active"></slot></div>
      <div :style="activeStyle"><slot name="text"></slot></div>
    </div>
</template>

<script>
    export default {
        name: "TarBarItem",
        data(){
          return{
            // isActive:true
          }
      },
        methods:{
          itemClick(){
            this.$router.replace(this.path)
          }
        },
      props:{
          path:String,
           activedColor:{
            type:String,
           default:'red'
         }
      },
      computed:{
          isActive(){
            return this.$route.path.indexOf(this.path)!==-1
          },
        activeStyle(){
            return this.isActive  ? {color: this.activedColor} : {}
        }
      }
    }
</script>

<style scoped>

</style>
