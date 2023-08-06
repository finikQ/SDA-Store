"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CartItem } from "./CartItem/CartItem";
import styles from "./cart.module.css";
import { DeliveryOption } from "./DeliveryOption/DeliveryOption";
import { PaymentOption } from "./PaymentOption/PaymentOption";
import Image from "next/image";
import Breadcrumb from "@/utils/Breadcrumb";
import {
  addProduct,
  clearProducts,
  deleteProduct,
  removeProduct,
  setProductCount,
  toggleFavorite,
  typeCartItem,
} from "@/redux/features/cart-slice";
import Link from "next/link";

export const Cart = () => {
  const dispatch = useDispatch();
  const breadcrumbs = [
    {
      title: (
        <Image
          src="/breadcrumbs/Home.svg"
          alt="На главную"
          width={16}
          height={16}
        />
      ),
      link: "/",
    },
    { title: "Корзина", link: "/cart" },
  ];

  // FIXME: favorite_products Временное решение, поскольку значение отсутствует в fake Rest api
  const { cart_products, cart_totalPrice, favorite_products } = useSelector(
    (state: RootState) => state.cartSlice.value
  );

  const [deliveryOption, setDeliveryOption] = useState("Самовывоз");
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [addInfo, setAddInfoChange] = useState("");
  const handleAddInfoChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAddInfoChange(event.target.value);
  };

  const handleCallback = (data: {
    deliveryOption: string;
    deliveryPrice: number;
  }) => {
    setDeliveryOption(data.deliveryOption);
    setDeliveryPrice(data.deliveryPrice);
  };

  const handlePaymentOptionCallback = () => {};

  const handlers = {
    addProductHandler: (product: typeCartItem) => {
      if ((product.count ?? 0) >= product.stock) {
        const payload = {
          id: product.id,
          count: product.stock,
        };
        dispatch(setProductCount(payload));
      } else {
        dispatch(addProduct(product));
      }
    },

    removeProductHandler: (product: typeCartItem) => {
      if (product.count == 1) {
      } else {
        dispatch(removeProduct(product.id));
      }
    },

    deleteProductHandler: (product: typeCartItem) => {
      dispatch(deleteProduct(product.id));
    },

    countChangeHandler: (
      proudct: typeCartItem,
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const inputValue = Number(event.target.value);
      const payload = {
        id: proudct.id,
        count: 1,
      };
      if (inputValue >= 1) {
        payload.count = inputValue > proudct.stock ? proudct.stock : inputValue;
      }
      dispatch(setProductCount(payload));
    },

    toggleFavoriteHandler: (product: typeCartItem) => {
      dispatch(toggleFavorite(product));
    },
  };

  const handleSubmit = () => {
    dispatch(clearProducts());
  };

  let isFavorite: boolean;

  return (
    <>
      <div className={styles.breadcrumbs_container}>
        <div className={styles.breadcrumbs_wrapper}>
          <Breadcrumb breadcrumbs={breadcrumbs} />
        </div>
      </div>

      {cart_products.length > 0 ? (
        <div className={styles.cart__container}>
          <div className={styles.cart}>
            <section className={styles.cart__section}>
              <div className={styles.cart__header}>
                <h1 className={styles.title}>Корзина</h1>
                <Link className={styles.link} href={"/clother"}>
                  В Каталог
                </Link>
              </div>
            </section>

            <section className={styles.cart__section}>
              <h2 className={styles.subtitle}>1. Список товаров</h2>
              <div className={styles.products}>
                {cart_products.map((product) => {
                  isFavorite = favorite_products.some(
                    (item) => item.id === product.id
                  );
                  return (
                    <CartItem
                      key={product.id}
                      props={product}
                      isFavorite={isFavorite}
                      handlers={handlers}
                    />
                  );
                })}
                <div className={styles.products__totalPrice}>
                  Общая сумма: {cart_totalPrice} ₽
                </div>
              </div>
            </section>

            <section className={styles.cart__section}>
              <DeliveryOption onCallback={handleCallback} />
            </section>

            <section className={styles.cart__section}>
              <PaymentOption onCallback={handlePaymentOptionCallback} />
            </section>

            <section className={styles.cart__section}>
              <h2 className={styles.subtitle}>4. Дополнительная Информация</h2>
              <div>
                <h4 className={styles.addInfo__label}>Заметки к заказу</h4>
                <textarea
                  className={styles.addInfo__input}
                  placeholder="Дополнительная инофрмация к заказу"
                  name="Дополнение к заказу"
                  value={addInfo}
                  onChange={handleAddInfoChange}
                />
              </div>
            </section>
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
                      <div>{cart_totalPrice} ₽</div>
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
                    <div>{cart_totalPrice + deliveryPrice} ₽</div>
                  </div>
                </div>
              </div>
              <div className={styles.totalPrice__ConfirmButton}>
                <button
                  onClick={handleSubmit}
                  tabIndex={0}
                  aria-label="Оформить Заказ"
                >
                  Оформить Заказ
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            height: "100%",
            width: "100%",
            fontSize: "20px",
            fontWeight: 700,
          }}
        >
          <div>¯\_(ツ)_/¯</div>
          <div>Тут пусто</div>
          <Link
            href={"/catalog"}
            style={{ textDecoration: "underline", fontSize: "30px" }}
          >
            {"> "}Каталог{" <"}
          </Link>
        </div>
      )}
    </>
  );
};
