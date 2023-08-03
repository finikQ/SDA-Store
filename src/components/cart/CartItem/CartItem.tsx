"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { typeCartItem } from "@/redux/features/cart-slice";
import styles from "./cartitem.module.css";

export const CartItem: React.FC<{
  props: typeCartItem;
  isFavorite: boolean;
  handlers: any;
}> = ({ props, isFavorite, handlers }) => {
  const {
    addProductHandler,
    removeProductHandler,
    deleteProductHandler,
    countChangeHandler,
    toggleFavoriteHandler,
  } = handlers;

  const handleAddProduct = () => {
    addProductHandler(props);
  };

  const handleToggleFavorite = () => {
    toggleFavoriteHandler(props);
  };

  const handleRemoveProduct = () => {
    removeProductHandler(props);
  };

  const handleProductDelete = () => {
    deleteProductHandler(props);
  };

  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    countChangeHandler(props, event);
  };
  return (
    <div className={styles.product__container}>
      <div className={styles.product}>
        <div
          className={`${styles.product__image_container} ${styles.product_position}`}
        >
          <Link href={`/clother/${props.id}`}>
            <Image
              src={props.images[0]}
              alt={props.description}
              width={100}
              height={100}
            />
          </Link>
        </div>

        <div className={`${styles.product__info} ${styles.product_position}`}>
          <Link href={`/clother/${props.id}`}>{props.title}</Link>
          <div>{props.description}</div>
        </div>

        <div
          className={`${styles.product__count_wrapper} ${styles.product_position}`}
        >
          <div className={`${styles.product__count}`}>
            <button onClick={handleRemoveProduct}></button>
            <input
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              max={props.stock}
              value={props.count}
              onChange={handleCountChange}
            />
            <button onClick={handleAddProduct}></button>
          </div>
          <div className={`${styles.product__count_price}`}>
            {props.price} ₽
          </div>
        </div>
        <div className={styles.product__price}>
          {props.price * (props.count ?? 1)} ₽
          <div className={styles.item_actions}>
            <button
              className={styles.item_actions__button}
              onClick={handleToggleFavorite}
            >
              {isFavorite ? (
                <Image
                  className={styles.favorite}
                  src="/redFullHeart.svg"
                  alt="favorites"
                  width={20}
                  height={20}
                />
              ) : (
                <Image
                  src="/blackHollowHeart.svg"
                  alt="favorites"
                  width={20}
                  height={20}
                />
              )}
            </button>
            <button
              className={styles.item_actions__button}
              onClick={handleProductDelete}
            >
              <Image
                src="/trash.svg"
                alt="delete item"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
