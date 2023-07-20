"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CartItem } from "./CartItem/CartItem";
import Link from "next/link";
import styles from "./cart.module.css";
import { DeliveryOption } from "./DeliveryOption/DeliveryOption";

export const Cart = () => {
  const { products, totalPrice } = useSelector(
    (state: RootState) => state.cartSlice.value
  );

  /* Оплата */
  const [paymentOption, setPaymentOption] = useState("");
  const handlePaymentOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentOption(event.target.value);
  };

  const [deliveryOption, setDeliveryOption] = useState('');
  const [deliveryPrice, setDeliveryPrice] = useState(0);

  const handleCallback = (data: { deliveryOption: string; deliveryPrice: number; }) => {
    setDeliveryOption(data.deliveryOption);
    setDeliveryPrice(data.deliveryPrice);
  };

  return (
    <div>
      <div>Breadcrumb</div>
      <div className={styles.container}>
        <div>
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
            <div>Общая сумма: {totalPrice} ₽</div>
          </div>

          {/* СПОСОБ ДОСТАВКИ */}
          <DeliveryOption onCallback={handleCallback}/>
          {/* ОПЛАТА */}
          <div>
            <h2>Способ Оплаты</h2>
            <div>
              <label>
                <input
                  type="radio"
                  value="cash"
                  checked={paymentOption === "cash"}
                  onChange={handlePaymentOptionChange}
                />
                При получении
              </label>
              <label>
                <input
                  type="radio"
                  value="sbp"
                  checked={paymentOption === "sbp"}
                  onChange={handlePaymentOptionChange}
                />
                Система Быстрых Платежей
              </label>
            </div>
            {paymentOption === "cash" && <div></div>}

            {paymentOption === "sbp" && <div></div>}
          </div>
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
            <div>Итоговая сумма:</div>
            <div>{totalPrice + deliveryPrice} ₽</div>
          </div>
          <button aria-label="Оформить Заказ">Оформить Заказ</button>
        </div>
      </div>
    </div>
  );
};
