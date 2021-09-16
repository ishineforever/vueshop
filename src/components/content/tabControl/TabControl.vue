<template>
  <div id="tab-control">
    <div v-for="(item,key) in titles" class="tab-control-item" :class="{active:key===currentIndex}" @click="spanClick(key)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
    export default {
      name: "TabControl",
      data(){
        return {
          currentIndex :0
        }
      },
      props:{
          titles:Array,
      },
      methods:{
        spanClick(key){
          this.currentIndex=key;
          this.$emit('tabClick',key)
        }
      }
    }
</script>

<style scoped>
  #tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }
  .tab-control-item{
    flex: 1;
  }
  .tab-control-item span{
    padding: 5px;
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 3px solid  var(--color-tint);
  }

</style>
