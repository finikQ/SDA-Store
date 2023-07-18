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
      <div className={styles.container}>
        <div className={styles.checkout}>
          <div className={styles.title}>
            <h1>Корзина</h1>
            <Link href="/clother" aria-label="Назад к Покупкам">
              Назад к Покупкам
            </Link>
          </div>

          <div className={styles.products}>
            {products.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </div>
          <div>Общая сумма: {totalPrice}</div>
        </div>
        <div className={styles.total}>
          <h4>Итоги заказа</h4>

          <div className={styles.total_info}>
            <div className={styles.total_priceInfo}>
              <div>Сумма:</div>
              <div>ДоставкаName:</div>
            </div>
            <div className={styles.total_prices}>
              <div>{totalPrice} ₽</div>
              <div>500 ₽</div>
            </div>
          </div>

          <div className={styles.total_final_price}>
            <div>Итоговая сумма:</div>
            <div>{totalPrice + 500} ₽</div>
          </div>
          <button aria-label="Оформить Заказ">Оформить Заказ</button>
        </div>
      </div>
    </div>
  );
};
