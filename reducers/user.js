import { SETUSER, UPLOADAVATAR, REMOVEUSER } from './typeaction';

const initUserSate = {};

const userReducer = (state = initUserSate, action) => {
  if (action.type == SETUSER) {
    return {
      ...state,
      ...action.payload
    };
  }
  if (action.type == UPLOADAVATAR) {
    return {
      ...state,
      AVATAR: action.payload,
    };
  }
  if (action.type == REMOVEUSER) {
    return initUserSate;
  }
  return state;
};
module.exports = userReducer;
