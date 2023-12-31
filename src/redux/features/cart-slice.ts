import { calcTotalPrice } from "@/utils/calcTotalPrice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type InitialState = {
  value: {
    cart_products: typeCartItem[];
    cart_totalPrice: number;
    favorite_products: typeCartItem[];
    recentlyViewed_products: typeCartItem[];
  };
};

export type typeCartItem = {
  id: number;
  title: string;
  description: string;
  brand: string;
  material: string;
  color: string[];
  type: string;
  size: string;
  price: number;
  priceBeforeDiscount: number;
  condition: string;
  stock: number;
  productionYear: string | number;
  manufacturerCountry: string;
  thumbnail: string;
  images: string[];

  count?: number;
};

const initialState = {
  value: {
    cart_products: [] as typeCartItem[],
    cart_totalPrice: 0,
    favorite_products: [] as typeCartItem[],
    recentlyViewed_products: [] as typeCartItem[],
  },
} as InitialState;

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<typeCartItem>) => {
      const findItem = state.value.cart_products.find(
        (obj) => obj.id === action.payload.id
      );

      if (findItem) {
        if (findItem.count !== undefined) {
          findItem.count++;
        }
      } else {
        state.value.cart_products.push({ ...action.payload, count: 1 });
      }

      state.value.cart_totalPrice = calcTotalPrice(state.value.cart_products);
    },

    removeProduct: (state, action: PayloadAction<number>) => {
      const findItem = state.value.cart_products.find(
        (obj) => obj.id === action.payload
      );

      if (findItem) {
        if (findItem.count !== undefined) {
          findItem.count--;
        }
      }

      state.value.cart_totalPrice = calcTotalPrice(state.value.cart_products);
    },

    setProductCount: (
      state,
      action: PayloadAction<{ id: number; count: number }>
    ) => {
      const findItem = state.value.cart_products.find(
        (obj) => obj.id === action.payload.id
      );

      if (findItem) {
        if (findItem.count !== undefined) {
          findItem.count = action.payload.count;
        }
      }

      state.value.cart_totalPrice = calcTotalPrice(state.value.cart_products);
    },

    deleteProduct: (state, action: PayloadAction<number>) => {
      state.value.cart_products = state.value.cart_products.filter(
        (item) => item.id !== action.payload
      );

      state.value.cart_totalPrice = calcTotalPrice(state.value.cart_products);
    },
    clearProducts: (state) => {
      state.value.cart_products = [];
    },

    toggleFavorite: (state, action) => {
      const findItem = state.value.favorite_products.find(
        (obj) => obj.id === action.payload.id
      );

      if (findItem) {
        if (findItem !== undefined) {
          state.value.favorite_products = state.value.favorite_products.filter(
            (item) => item.id !== action.payload.id
          );
        }
      } else {
        state.value.favorite_products.push({ ...action.payload });
      }
    },

    clearFavorites: (state) => {
      state.value.favorite_products = [];
    },

    addRecentlyViewed: (state, action) => {
      const findItem = state.value.recentlyViewed_products.find(
        (obj) => obj.id === action.payload.id
      );

      if (findItem) {
        if (findItem !== undefined) {
          state.value.recentlyViewed_products =
            state.value.recentlyViewed_products.filter(
              (item) => item.id !== action.payload.id
            );
        }
      }

      if (state.value.recentlyViewed_products.length > 20) {
        state.value.recentlyViewed_products.shift();
      }

      state.value.recentlyViewed_products.push({ ...action.payload });
    },
  },
});

export const {
  addProduct,
  removeProduct,
  setProductCount,
  deleteProduct,
  toggleFavorite,
  clearProducts,
  clearFavorites,
  addRecentlyViewed,
} = cartSlice.actions;
export default cartSlice.reducer;
