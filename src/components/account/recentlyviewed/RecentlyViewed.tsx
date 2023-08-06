"use client";

import { ProductList } from "@/components/catalog/product/ProductList";
import { RootState } from "@/redux/store";
import dynamic from "next/dynamic";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./recentlyviewed.module.css";
import Link from "next/link";

export const RecentlyViewed: React.FC<{}> = () => {
  const recentlyViewedProducts = useSelector(
    (state: RootState) => state.cartSlice.value.recentlyViewed_products
  );
  const products = [...recentlyViewedProducts].reverse();

  return (
    <>
      {products.length > 0 ? (
        <div className={styles.wishlist}>
          <div className={styles.header}>
            <h2 className={styles.header__naming}>Недавно просмотренное</h2>
          </div>
          <div className={styles.product__list}>
            <ProductList props={products} cardSize={"large"} />
          </div>
        </div>
      ) : (
        <div className={styles.wishlist}>
          <h2 className={styles.header__naming}>Недавно просмотренное</h2>
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
        </div>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(RecentlyViewed), { ssr: false });
