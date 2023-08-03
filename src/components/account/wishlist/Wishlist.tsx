"use client";

import { ProductList } from "@/components/catalog/product/ProductList";
import { RootState } from "@/redux/store";
import dynamic from "next/dynamic";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./wishlist.module.css";
import Link from "next/link";
import Image from "next/image";
import { clearFavorites } from "@/redux/features/cart-slice";

export const Wishlist: React.FC<{}> = () => {
  const dispatch = useDispatch();

  const products = useSelector(
    (state: RootState) => state.cartSlice.value.favorite_products
  );

  const handleClearFavorite = () => {
    dispatch(clearFavorites());
  };

  return (
    <>
      {products.length > 0 ? (
        <div className={styles.wishlist}>
          <div className={styles.header}>
            <h2 className={styles.header__naming}>Избранное</h2>
            <button
              className={styles.header__button}
              onClick={handleClearFavorite}
            >
              <Image
                src="/account/delete.svg"
                alt="delete item"
                width={20}
                height={20}
              />
              <span>Очистить</span>
            </button>
          </div>
          <div className={styles.product__list}>
            <ProductList props={products} cardSize={"large"} />
          </div>
        </div>
      ) : (
        <div className={styles.wishlist}>
          <h2 className={styles.header__naming}>Избранное</h2>
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
              href={"/clother"}
              style={{ textDecoration: "underline", fontSize: "30px" }}
            >
              {"> "}Каталог{" <"}
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(Wishlist), { ssr: false });
