"use client";

import Image from "next/image";
import React from "react";
import styles from "./btn.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  toggleFavorite,
  typeCartItem,
} from "@/redux/features/cart-slice";
import { RootState } from "@/redux/store";

export const ProductCardButtons: React.FC<{ props: typeCartItem }> = ({
  props,
}) => {
  const dispatch = useDispatch();
  const handleAddProduct = () => {
    dispatch(addProduct(props));
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(props));
  };

  // FIXME: Временное решение, поскольку значение отсутствует в fake Rest api
  const favorite_products = useSelector(
    (state: RootState) => state.cartSlice.value.favorite_products
  );
  let isFavorite: boolean = favorite_products.some(
    (item) => item.id === props.id
  );
  return (
    <div className={styles.product_card__buttons}>
      <button
        className={styles.product_card__buttons__toCart}
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
      <button
        className={`${styles.product_card__buttons__toFavorite} ${
          isFavorite
            ? styles.product_card__buttons__Favorite_on
            : styles.product_card__buttons__Favorite_off
        }`}
        onClick={handleToggleFavorite}
      >
        <Image
            src="/blackHollowHeart.svg"
            alt="Избранное"
            width={16}
            height={16}
          />

        <span>Избранное</span>
      </button>
    </div>
  );
};
