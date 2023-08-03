"use client";

import React, { useState } from "react";
import styles from "./paymentOption.module.css";

type PaymentOptionProps = {
  onCallback: (data: { paymentOption: string }) => void;
};

export const PaymentOption: React.FC<PaymentOptionProps> = ({ onCallback }) => {
  const [paymentOption, setPaymentOption] = useState("cash");
  const handlePaymentOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentOption(event.target.value);
  };

  return (
    <div className={styles["payment-option"]}>
      <h2 className={styles.subtitle}>3. Способ Оплаты</h2>

      <div className={styles.radio_group}>
        <div className={styles["radio-container"]}>
          <input
            type="radio"
            id="cash"
            value="cash"
            checked={paymentOption === "cash"}
            onChange={handlePaymentOptionChange}
          />
          <label htmlFor="cash" className={styles["custom-radio"]}></label>
          <label htmlFor="cash">При получении</label>
        </div>

        <div className={styles["radio-container"]}>
          <input
            type="radio"
            id="sbp"
            value="sbp"
            checked={paymentOption === "sbp"}
            onChange={handlePaymentOptionChange}
          />
          <label htmlFor="sbp" className={styles["custom-radio"]}></label>
          <label htmlFor="sbp">Система Быстрых Платежей</label>
        </div>
      </div>

      {paymentOption === "cash" && <div></div>}

      {paymentOption === "sbp" && <div></div>}
    </div>
  );
};
