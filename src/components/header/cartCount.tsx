"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const CartCount = () => {
  const { products } = useSelector(
    (state: RootState) => state.cartSlice.value,
    (prev, curr) => prev.products === curr.products // Добавьте сравнение для products
  );
  const totalCount = products.reduce(
    (sum: number, item: any) => sum + item.count,
    0
  );

  return <>{totalCount}</>;
};
