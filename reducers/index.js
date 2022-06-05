import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart';
import userReducer from './user';

const store = configureStore({
  reducer: {
    cartInfo: cartReducer,
    userInfo: userReducer,
  }
});

export default store;