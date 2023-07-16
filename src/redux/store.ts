import cartSlice from "./features/cart-slice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: { cartSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
