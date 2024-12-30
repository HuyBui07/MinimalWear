import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

// Reducers
import userReducer from "./slices/userSlice";
import orderReducer from "./slices/orderSlice";

const rootReducer = combineReducers({
  user: userReducer,
  order: orderReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
