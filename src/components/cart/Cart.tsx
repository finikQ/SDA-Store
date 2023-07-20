"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CartItem } from "./CartItem";
import Link from "next/link";
import styles from "./cart.module.css";

export const Cart = () => {
  const { products, totalPrice } = useSelector(
    (state: RootState) => state.cartSlice.value
  );

  /* Доставка */
  const [deliveryOption, setDeliveryOption] = useState("");
  const handleDeliveryOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeliveryOption(event.target.value);
  };

  /* Оплата */
  const [paymentOption, setPaymentOption] = useState("");
  const handlePaymentOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentOption(event.target.value);
  };

  const [name, setName] = useState("");
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const [surname, setSurname] = useState("");
  const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(event.target.value);
  };

  const [phone, setPhone] = useState("");
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const [additionalInfo, setAdditionalInfo] = useState("");
  const handleadditionalInfoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAdditionalInfo(event.target.value);
  };

  const [adrress, setAdrress] = useState("");
  const handleAdrressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdrress(event.target.value);
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
          <div>
            <h2>Способ Доставки</h2>
            <div>
              <label>
                <input
                  type="radio"
                  value="pickup"
                  checked={deliveryOption === "pickup"}
                  onChange={handleDeliveryOptionChange}
                />
                Самовывоз
              </label>
              <label>
                <input
                  type="radio"
                  value="courier"
                  checked={deliveryOption === "courier"}
                  onChange={handleDeliveryOptionChange}
                />
                Доставка курьером
              </label>
            </div>

            {deliveryOption === "pickup" && (
              <div>
                <input
                  type="text"
                  placeholder="Имя"
                  value={name}
                  onChange={handleNameChange}
                />
                <input
                  type="text"
                  placeholder="Фамилия"
                  value={surname}
                  onChange={handleSurnameChange}
                />
                <input
                  type="text"
                  placeholder="Номер телефона"
                  value={phone}
                  onChange={handlePhoneChange}
                />
                <input
                  type="text"
                  placeholder="Комментарий"
                  value={additionalInfo}
                  onChange={handleadditionalInfoChange}
                />
              </div>
            )}

            {deliveryOption === "courier" && (
              <div>
                <input
                  type="text"
                  placeholder="Имя"
                  value={name}
                  onChange={handleNameChange}
                />
                <input
                  type="text"
                  placeholder="Фамилия"
                  value={surname}
                  onChange={handleSurnameChange}
                />
                <input
                  type="text"
                  placeholder="Номер телефона"
                  value={phone}
                  onChange={handlePhoneChange}
                />
                <input
                  type="text"
                  placeholder="Адрес"
                  value={adrress}
                  onChange={handleAdrressChange}
                />
                <input type="date" placeholder="Дата доставки" />
                <input
                  type="text"
                  placeholder="Комментарий"
                  value={additionalInfo}
                  onChange={handleadditionalInfoChange}
                />
              </div>
            )}
          </div>

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
