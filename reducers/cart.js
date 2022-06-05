const initCartSate = {
  data: []
};

//IncreToCart
const INCRETOCART = 'INCRETOCART';
export let IncreToCart = (o) => {
  return {
    type: INCRETOCART,
    item: o,
  };
};

//DecreToCart
const DECRETOCART = 'DECRETOCART';
export const DecreToCart = DMATHANGID => ({
  type: DECRETOCART,
  DMATHANGID: DMATHANGID,
});

//Remove To Cart
const REMOVETOCART = 'REMOVETOCART';
export const RemoveToCart = DMATHANGID => ({
  type: REMOVETOCART,
  DMATHANGID: DMATHANGID,
});

const cartReducer = (state = initCartSate, action) => {
  if (action.type == INCRETOCART) {
    // let hasItem = false;
    // state.forEach((element, index) => {
    //   if (element.DMATHANGID == o.DMATHANGID) {
    //     hasItem = true;
    //     element.SOLUONG += 1;
    //   }
    // });
    // if (!hasItem) {
    //   state.push(o);
    // }
  }

  if (action.type == DECRETOCART) {
    let remove = -1;
    // if (state != null) {
    //   state.forEach((element, index) => {
    //     if (element.DMATHANGID == o.DMATHANGID) {
    //       element.SOLUONG -= 1;
    //       if (element.SOLUONG <= 0) {
    //         remove = index;
    //       }
    //     }
    //   });
    //   if (remove >= 0) {
    //     state.splice(remove, 1);
    //   }
    // }
  }

  if (action.type == REMOVETOCART) {
    // let remove = -1;
    // state.forEach((element, index) => {
    //   if (element.DMATHANGID == DMATHANGID) {
    //     remove = index;
    //   }
    // });
    // if (remove >= 0) {
    //   state.splice(remove, 1);
    // }
  }
  return state;
};

module.exports = cartReducer;
