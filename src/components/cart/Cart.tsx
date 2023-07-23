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

  const [deliveryOption, setDeliveryOption] = useState("Самовывоз");
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
      {/* <div>Breadcrumb</div> */}
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>Корзина</h1>
        </div>
        <div className={styles.cart__container}>
          <div className={styles.cart}>
            <div className={styles.products}>
              {products.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
              <div className={styles.products__totalPrice}>
                Общая сумма: {totalPrice} ₽
              </div>
            </div>
            <DeliveryOption onCallback={handleCallback} />
            <PaymentOption onCallback={handlePaymentOptionCallback} />
          </div>
          <div className={styles.totalPrice__container}>
            <div className={styles.totalPrice__wrapper}>
              <div className={styles.totalPrice}>
                <div className={styles.totalPrice__title}>
                  <h2>Итоги заказа</h2>
                </div>
                <div className={styles.totalPrice__subTotal__container}>
                  <div className={styles.totalPrice__subTotal}>
                    <div className={styles.totalPrice__line}>
                      <div>Сумма:</div>
                      <div>{totalPrice} ₽</div>
                    </div>
                    <div className={styles.totalPrice__line}>
                      <div>{deliveryOption}:</div>
                      <div>{deliveryPrice} ₽</div>
                    </div>
                  </div>
                </div>
                <div className={styles.totalPrice__finalTotal}>
                  <div className={styles.totalPrice__line}>
                    <div>Итоговая сумма: </div>
                    <div>{totalPrice + deliveryPrice} ₽</div>
                  </div>
                </div>
              </div>
              <div className={styles.totalPrice__ConfirmButton}>
                <button tabIndex={0} aria-label="Оформить Заказ">
                  Оформить Заказ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
