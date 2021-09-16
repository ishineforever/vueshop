<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="checked-all"  @click.native="checkClick" :is-checked="isSelectAll"
      />
      <span>全选</span>
    </div>
    <div class="totalPrice">合计：{{ totalPrice }}</div>
    <div class="calculate"  @click="calcClick">去结算({{ checkLength }})</div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'
  import {mapGetters} from 'vuex'
  export default {
    name: "CartBottomBar",
    components:{
      CheckButton,
    },
    computed:{
      ...mapGetters(['cartList']),
      totalPrice(){
        return  '￥'+ this.cartList.filter(item => item.checked)
          .reduce((preValue ,item) =>{ return preValue+item.price*item.count},0)
      },
      checkLength(){
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll(){
        if(this.cartList.length===0){
          return false
        }else{
          return !(this.cartList.filter(item => !item.checked).length)
        }
      }
    },
    methods:{
      checkClick(){
          if(this.isSelectAll){
            // for (let item of this.cartList) {
            //   item.checked = false;
            // }
            this.cartList.forEach(item =>item.checked = false)
          }else{
            // for (let item of this.cartList) {
            //   item.checked = true;
            // }
            this.cartList.forEach(item =>item.checked  = true)
          }
      },
      calcClick(){
        if(!this.isSelectAll){
           this.$toast.show('请选择购买的商品',2000)
        }
      }
    }

  }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;
    height: 60px;
    line-height: 60px;
    bottom: 20px;
    background-color: #eee;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  .checked-all {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .totalPrice {
    flex: 1;
    margin-left: 20px;
  }
  .calculate {
    width: 90px;
    background-color: #fb7299;
    text-align: center;
    color: #fff;
  }
</style>
