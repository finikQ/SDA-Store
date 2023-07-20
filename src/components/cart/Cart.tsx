"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CartItem } from "./CartItem/CartItem";
import Link from "next/link";
import styles from "./cart.module.css";
import { DeliveryOption } from "./DeliveryOption/DeliveryOption";
import { PaymentOption } from "./PaymentOption/PaymentOption";

export const Cart = () => {
  const { products, totalPrice } = useSelector(
    (state: RootState) => state.cartSlice.value
  );

  const [deliveryOption, setDeliveryOption] = useState("");
  const [deliveryPrice, setDeliveryPrice] = useState(0);

  const handleCallback = (data: {
    deliveryOption: string;
    deliveryPrice: number;
  }) => {
    setDeliveryOption(data.deliveryOption);
    setDeliveryPrice(data.deliveryPrice);
  };

  const handlePaymentOptionCallback = () => {};

  return (
    <div>
      <div>Breadcrumb</div>
      <div className={styles.container}>
        <div className={styles.cart}>
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
              <div>Общая сумма: {totalPrice} ₽</div>
            </div>
          </div>
          <DeliveryOption onCallback={handleCallback} />
          <PaymentOption onCallback={handlePaymentOptionCallback} />
        </div>

        <div className={styles.total}>
          <h4>Итоги заказа</h4>

          <div className={styles.total_info}>
            <div className={styles.total_priceInfo}>
              <div>Сумма:</div>
              <div>{deliveryOption}:</div>
            </div>
            <div className={styles.total_prices}>
              <div>{totalPrice} ₽</div>
              <div>{deliveryPrice} ₽</div>
            </div>
          </div>

          <div className={styles.total_final_price}>
            <div>Итоговая сумма: </div>
            <div>{totalPrice + deliveryPrice} ₽</div>
          </div>
          <button aria-label="Оформить Заказ">Оформить Заказ</button>
        </div>
      </div>
    </div>
  );
};
