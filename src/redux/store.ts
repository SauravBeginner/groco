import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./rootReducer";
import { apiSlice } from "./apiSlice";

const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
