import { calcTotalPrice } from "@/utils/calcTotalPrice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type InitialState = {
  value: {
    products: typeCartItem[];
    totalPrice: number;
  };
};

export type typeCartItem = {
  id: number;
  title: string;
  description: string;
  price: number;

  brand: string;
  thumbnail: string;
  images: string[];

  category: string;
  discountPercentage: number;
  rating: number;
  stock: number;
  count?: number;
};

const initialState = {
  value: {
    products: [] as typeCartItem[],
    totalPrice: 0,
  },
} as InitialState;

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<typeCartItem>) => {
      const findItem = state.value.products.find(
        (obj) => obj.id === action.payload.id
      );

      if (findItem) {
        if (findItem.count !== undefined) {
          findItem.count++;
        }
      } else {
        state.value.products.push({ ...action.payload, count: 1 });
      }

      state.value.totalPrice = calcTotalPrice(state.value.products);
    },

    removeProduct: (state, action: PayloadAction<number>) => {
      const findItem = state.value.products.find(
        (obj) => obj.id === action.payload
      );

      if (findItem) {
        if (findItem.count !== undefined) {
          findItem.count--;
        }
      }

      state.value.totalPrice = calcTotalPrice(state.value.products);
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.value.products = state.value.products.filter(
        (item) => item.id !== action.payload
      );

      state.value.totalPrice = calcTotalPrice(state.value.products);
    },
    clearProducts: (state) => {
      state.value.products = [];
    },
  },
});

export const { addProduct, removeProduct, deleteProduct, clearProducts } =
  cartSlice.actions;
export default cartSlice.reducer;
