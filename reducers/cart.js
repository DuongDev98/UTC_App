import { INCRETOCART, DECRETOCART, REMOVETOCART } from './typeaction';

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
    let data = state.data;
    let remove = -1;
    data.forEach((element, index) => {
      if (element.DMATHANGID == action.payload.DMATHANGID) {
        element.SOLUONG -= 1;
        if (element.SOLUONG <= 0) {
          remove = index;
        }
      }
    });
    if (remove >= 0) {
      data.splice(remove, 1);
    }
    return {
      ...state, data: [...data]
    };
  }

  if (action.type == REMOVETOCART) {
    let data = state.data;
    let remove = -1;
    data.forEach((element, index) => {
      if (element.DMATHANGID == action.payload.DMATHANGID) {
        remove = index;
      }
    });
    if (remove >= 0) {
      data.splice(remove, 1);
    }

    return {
      ...state, data: [...data]
    };
  }
  
  return state;
};

module.exports = cartReducer;
