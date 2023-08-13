"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";

import productSmall from "./productSmall.module.css";
import productLarge from "./productLarge.module.css";

export const Product = ({ props, isFavorite, handlers, cardSize }) => {
  const { addProductHandler, toggleFavoriteHandler } = handlers;
  const heightRef = useRef(null);
  const [hover, setActive] = useState(false);

  const handleMouseOver = () => {
    setActive(true);
  };

  const handleMouseOut = () => {
    setActive(false);
  };

  const handleAddProduct = () => {
    addProductHandler(props);
  };

  const handleToggleFavorite = () => {
    toggleFavoriteHandler(props);
  };

  let styles = cardSize === "small" ? productSmall : productLarge;

  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      key={props.id}
      className={`${styles.card} ${hover ? styles.hover : ""}`}
      ref={heightRef}
    >
      <div className={`${styles.card__wrapper} `}>
        <Link className={styles.card__link} href={`/catalog/${props.id}`}>
          {cardSize === "small" ? (
            <Image
              className={styles.card__img}
              src={props.images[0]}
              alt={props.description}
              width={285}
              height={320}
            />
          ) : (
            <Image
              className={styles.card__img}
              src={props.images[0]}
              alt={props.description}
              width={390}
              height={440}
            />
          )}
        </Link>
        <div className={styles.card__body}>
          <div>
            <Link className={styles.card__title} href={`/catalog/${props.id}`}>
              {props.title}
            </Link>
            <p className={styles.card__description}>{props.description}</p>
          </div>
          <div className={styles.card__footer}>
            <div className={styles.card__price}>{props.price} ₽</div>
          </div>
          <button
            className={styles.card__btn_tocart}
            onClick={handleAddProduct}
          >
            <Image
              src="/catalog/product/cart.svg"
              alt="Корзина"
              width={15}
              height={13.667}
            />
            <span>В Корзину</span>
          </button>
        </div>

        <div
          className={`${styles.card__favorite__container} ${
            isFavorite ? styles.card__favorite__container_visible : ""
          }`}
        >
          <div onClick={handleToggleFavorite} className={styles.card__favorite}>
            <span className={styles.card__favorite__form} />
            <span
              className={`${styles.card__favorite__icon} ${
                isFavorite
                  ? styles.card__favorite__icon_full
                  : styles.card__favorite__icon_hollow
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Product), { ssr: false });
