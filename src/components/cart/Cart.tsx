"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CartItem } from "./CartItem";

export const Cart = () => {
  const dispatch = useDispatch();
  const { products, totalPrice } = useSelector(
    (state: RootState) => state.cartSlice.value
  );
  return (
    <div>
      <div>
        {products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
        <div>Общая стоимость: {totalPrice} ₽</div>
      </div>
    </div>
  );
};
