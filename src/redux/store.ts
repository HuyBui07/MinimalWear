import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

// Reducers
import userReducer from "./slices/userSlice";
import favoriteReducer from "./slices/favoriteSlice";
import cartReducer from "./slices/cartSlice";

const rootReducer = combineReducers({
  user: userReducer,
  favorite: favoriteReducer,
  cart: cartReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
