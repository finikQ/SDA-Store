"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CartItem } from "./CartItem";
import Link from "next/link";
import styles from "./cart.module.css";

export const Cart = () => {
  const { products, totalPrice } = useSelector(
    (state: RootState) => state.cartSlice.value
  );
  return (
    <div>
      <div>Breadcrumb</div>
      <div className={styles.checkout}>
        <div>
          <h1>Корзина</h1>
          <Link href="/clother">Назад к Покупкам</Link>
        </div>
        <div>
          {products.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div>
        <div>Итоги заказа</div>
        <div>Сумма: {totalPrice} ₽</div>
        <div>ДоставкаName: ДоставкаPrice 500 ₽</div>
        <div>Итоговая сумма: {totalPrice + 500} ₽</div>
        <button>Подтвердить</button>
      </div>
    </div>
  );
};
