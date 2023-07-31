"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./product.module.css";

import { addProduct, toggleFavorite } from "@/redux/features/cart-slice";
import { useDispatch } from "react-redux";

export const Product = ({ props }) => {
  const dispatch = useDispatch();

  const addProductHandler = () => {
    dispatch(addProduct(props));
  };

  const toggleFavoriteHandler = () => {
    dispatch(toggleFavorite(props));
  };

  return (
    <div key={props.id} className={styles.card}>
      <Link className={styles.card__link} href={`/clother/${props.id}`}>
        <Image
          className={styles.card__img}
          src={props.images[0]}
          alt={props.description}
          width={285}
          height={320}
        />
      </Link>
      <div className={styles.card__body}>
        <Link className={styles.card__title} href={`/clother/${props.id}`}>
          {props.title}
        </Link>
        <p className={styles.card__description}>{props.description}</p>
      </div>

      <div className={styles.card__footer}>
        <div className={styles.card__price}>{props.price} ₽</div>

        <button className={styles.card__btn_tocart} onClick={addProductHandler}>
          В Корзину
        </button>
      </div>

      <div className={styles.card__favorite__container}>
        <div onClick={toggleFavoriteHandler} className={styles.card__favorite}>
          <span className={styles.card__favorite__form} />
          <span className={styles.card__favorite__icon} />
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Product), { ssr: false });
