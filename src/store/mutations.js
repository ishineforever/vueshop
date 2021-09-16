import {ADD_COUNTER,ADD_TO_CART} from "./mutation-types";

export default {
  //mutations唯一的目的就是修改state中的状态
  //mutations里面的每个方法实现的事件要尽可能单一一点
  [ADD_COUNTER](state,payload){
    payload.count+=1;

  },

  [ADD_TO_CART](state,payload){
    payload.checked=true;
    state.cartList.push(payload)
  }
}
