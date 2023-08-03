"use client";

import React, { useState } from "react";
import styles from "./deliveryoption.module.css";

type DeliveryOptionProps = {
  onCallback: (data: { deliveryOption: string; deliveryPrice: number }) => void;
};

export const DeliveryOption: React.FC<DeliveryOptionProps> = ({
  onCallback,
}) => {
  const [deliveryOption, setDeliveryOption] = useState("Самовывоз");

  const handleDeliveryOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeliveryOption(event.target.value);
    let deliveryPrice: number;
    switch (event.target.value) {
      case "Самовывоз":
        deliveryPrice = 0;
        break;
      case "Доставка курьером":
        deliveryPrice = 500;
        break;
      default:
        deliveryPrice = 0;
    }

    onCallback({
      deliveryOption: event.target.value,
      deliveryPrice: deliveryPrice,
    });
  };

  const [shipping_adress, setAdrress] = useState({
    shipping_street: "",
    shipping_house: "",
    shipping_flat: "",
  });
  const handleAdrressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAdrress((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  const [contactInfo, setContactInfo] = useState({
    contact_name: "",
    contact_surname: "",
    contact_phone: "",
    contact_email: "",
  });
  const handleContactInfoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    if (name == "contact_phone") {
      if (/^\d*$/.test(event.target.value)) {
        setContactInfo((prevInputValues) => ({
          ...prevInputValues,
          [name]: value,
        }));
      }
    } else {
      setContactInfo((prevInputValues) => ({
        ...prevInputValues,
        [name]: value,
      }));
    }
  };
  return (
    <div className={styles.delivery_option}>
      <h2 className={styles.subtitle}>2. Способ Доставки</h2>
      <div className={styles.radio_group}>
        <div className={styles["radio-container"]}>
          <input
            type="radio"
            id="Самовывоз"
            value="Самовывоз"
            checked={deliveryOption === "Самовывоз"}
            onChange={handleDeliveryOptionChange}
          />
          <label htmlFor="Самовывоз" className={styles["custom-radio"]}></label>
          <label htmlFor="Самовывоз">Самовывоз</label>
        </div>

        <div className={styles["radio-container"]}>
          <input
            type="radio"
            id="Доставка курьером"
            value="Доставка курьером"
            checked={deliveryOption === "Доставка курьером"}
            onChange={handleDeliveryOptionChange}
          />
          <label
            htmlFor="Доставка курьером"
            className={styles["custom-radio"]}
          ></label>
          <label htmlFor="Доставка курьером">Доставка курьером</label>
        </div>
      </div>

      {deliveryOption === "Самовывоз" && (
        <div className={styles.delivery_options_container}>
          <input
            type="text"
            placeholder="Имя"
            name="contact_name"
            value={contactInfo.contact_name}
            onChange={handleContactInfoChange}
          />
          <input
            type="text"
            placeholder="Фамилия"
            name="contact_surname"
            value={contactInfo.contact_surname}
            onChange={handleContactInfoChange}
          />

          <input
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
            placeholder="Номер телефона"
            name="contact_phone"
            value={contactInfo.contact_phone}
            onChange={handleContactInfoChange}
          />
          <input
            type="text"
            placeholder="Почта"
            name="contact_email"
            value={contactInfo.contact_email}
            onChange={handleContactInfoChange}
          />
        </div>
      )}

      {deliveryOption === "Доставка курьером" && (
        <div className={styles.delivery_options_container}>
          <input
            type="text"
            placeholder="Имя"
            name="contact_name"
            value={contactInfo.contact_name}
            onChange={handleContactInfoChange}
          />
          <input
            type="text"
            placeholder="Фамилия"
            name="contact_surname"
            value={contactInfo.contact_surname}
            onChange={handleContactInfoChange}
          />

          <input
            type="text"
            placeholder="Номер телефона"
            pattern="[0-9]*"
            inputMode="numeric"
            name="contact_phone"
            value={contactInfo.contact_phone}
            onChange={handleContactInfoChange}
          />
          <input
            type="text"
            placeholder="Почта"
            name="contact_email"
            value={contactInfo.contact_email}
            onChange={handleContactInfoChange}
          />

          <input
            type="text"
            placeholder="Улица"
            name="shipping_street"
            value={shipping_adress.shipping_street}
            onChange={handleAdrressChange}
          />
          <input
            type="text"
            placeholder="Дом"
            name="shipping_house"
            value={shipping_adress.shipping_house}
            onChange={handleAdrressChange}
          />

          <input
            type="text"
            placeholder="Квартира/Офис"
            name="shipping_flat"
            value={shipping_adress.shipping_flat}
            onChange={handleAdrressChange}
          />

          <input type="date" placeholder="Дата доставки" />
        </div>
      )}
    </div>
  );
};
