import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import { apiSlice } from "./apiSlice";

const rootReducers = combineReducers({
  auth: authReducer,
  //   product: productReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducers>;

export default rootReducers;
