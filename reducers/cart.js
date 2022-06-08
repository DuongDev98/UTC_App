import { INCRETOCART, DECRETOCART, REMOVETOCART, CLEARTOCART } from './typeaction';

const initCartSate = {
  data: []
};

const cartReducer = (state = initCartSate, action) => {

  if (action.type == INCRETOCART) {
    if(state.data.filter(item=>item.DMATHANGID==action.payload.DMATHANGID).length>0){
      return {
        ...state,data:[...state.data.map(item=>item.DMATHANGID==action.payload.DMATHANGID? {...item,SOLUONG:item.SOLUONG+1}:item)]
      }
    }
    return {
      ...state,data:[...state.data,{...action.payload}]
    }
  }

  if (action.type == DECRETOCART) {
    if (state.data.filter(item=>(item.DMATHANGID == action.payload && item.SOLUONG == 1)).length > 0)
    {
      return {
        ...state,data:[...state.data.filter(item=>item.DMATHANGID != action.payload)]
      };
    }
    return {
      ...state,data:[...state.data.map(item=>item.DMATHANGID==action.payload? {...item,SOLUONG:item.SOLUONG-1}:item)]
    }
  }

  if (action.type == REMOVETOCART) {
    return {
      ...state, data: [...state.data.filter(item=>item.DMATHANGID != action.payload)]
    };
  }

  if (action.type == CLEARTOCART) {
    return {
      ...state, data: []
    };
  }
  
  return state;
};

module.exports = cartReducer;
