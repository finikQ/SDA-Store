"use client";

import { ProductList } from "@/components/catalog/product/ProductList";
import { RootState } from "@/redux/store";
import dynamic from "next/dynamic";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./wishlist.module.css";

export const Wishlist: React.FC<{}> = () => {
  const products = useSelector(
    (state: RootState) => state.cartSlice.value.favorite_products
  );
  return (
    <div className={styles.wishlist}>
      <div className={styles.header}>
        <h2 className={styles.header__naming}>Избранное</h2>
        <div>
          <button className={styles.header__button}>Очистить</button>
        </div>
      </div>
      <div className={styles.product__list}>
        <ProductList props={products} cardSize={"large"} />
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Wishlist), { ssr: false });
