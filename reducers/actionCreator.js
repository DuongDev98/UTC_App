import {
  CLEARTOCART,
  DECRETOCART,
  INCRETOCART,
  REMOVETOCART,
  REMOVEUSER,
  SETUSER,
  UPLOADAVATAR,
  SETPAYMENT
} from './typeaction';

export const IncreToCart = o => {
  return {
    type: INCRETOCART,
    payload: o,
  };
};

export const DecreToCart = DMATHANGID => {
  return {
    type: DECRETOCART,
    payload: DMATHANGID,
  };
};

export const RemoveToCart = DMATHANGID => {
  return {
    type: REMOVETOCART,
    payload: DMATHANGID,
  };
};

export const ClearToCart = () => {
  return {
    type: CLEARTOCART,
  };
};

export const UploadAvatar = url => {
  return {
    type: UPLOADAVATAR,
    payload: url,
  };
};

export const SetUser = o => {
  return {
    type: SETUSER,
    payload: o,
  };
};

export const RemoveUser = () => {
  return {
    type: REMOVEUSER,
  };
};

// export const SetPayment = o => {
//   return {
//     type: SETPAYMENT,
//     payload: o
//   };
// };