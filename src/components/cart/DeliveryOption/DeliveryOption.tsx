"use client";

import React, { useState } from "react";
import styles from "./deliveryoption.module.css";

type DeliveryOptionProps = {
    onCallback: (data: { deliveryOption: string; deliveryPrice: number }) => void
  };

export const DeliveryOption: React.FC<DeliveryOptionProps> = ({ onCallback }) => {
  const [deliveryOption, setDeliveryOption] = useState("");



  const handleDeliveryOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeliveryOption(event.target.value);
    let deliveryPrice:number;
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
    console.log(event.target.value, " ", deliveryPrice);
    
    onCallback({deliveryOption: event.target.value, deliveryPrice: deliveryPrice})
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
    contact_additionalInfo: "",
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
    <div>
      <h2>Способ Доставки</h2>
      <div>
        <label>
          <input
            type="radio"
            value="Самовывоз"
            checked={deliveryOption === "Самовывоз"}
            onChange={handleDeliveryOptionChange}
          />
          Самовывоз
        </label>
        <label>
          <input
            type="radio"
            value="Доставка курьером"
            checked={deliveryOption === "Доставка курьером"}
            onChange={handleDeliveryOptionChange}
          />
          Доставка курьером
        </label>
      </div>

      {deliveryOption === "Самовывоз" && (
        <div>
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
          <input
            type="text"
            placeholder="Комментарий"
            name="contact_additionalInfo"
            value={contactInfo.contact_additionalInfo}
            onChange={handleContactInfoChange}
          />
        </div>
      )}

      {deliveryOption === "Доставка курьером" && (
        <div>
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
          <div>
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
          </div>

          <input type="date" placeholder="Дата доставки" />
          <input
            type="text"
            placeholder="Комментарий"
            name="contact_additionalInfo"
            value={contactInfo.contact_additionalInfo}
            onChange={handleContactInfoChange}
          />
        </div>
      )}
    </div>
  );
};
