"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const FavoriteCount = () => {
  const { favorite_products } = useSelector(
    (state: RootState) => state.cartSlice.value,
    (prev, curr) => prev.favorite_products === curr.favorite_products
  );
  const totalCount = favorite_products.length

  return <>{totalCount}</>;
};
