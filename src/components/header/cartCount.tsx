"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { typeCartItem } from "@/redux/features/cart-slice";

export const CartCount = () => {
  const { cart_products } = useSelector(
    (state: RootState) => state.cartSlice.value,
    (prev, curr) => prev.cart_products === curr.cart_products
  );
  const totalCount = cart_products.reduce(
    (sum: number, item: typeCartItem) => sum + (item.count ?? 0),
    0
  );

  return <>{totalCount}</>;
};
