"use client";

import { ProductList } from "@/components/catalog/product/ProductList";
import { RootState } from "@/redux/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./recentlyviewed_carousel.module.css";
import Image from "next/image";

export const RecentlyViewed_Carousel = () => {
  const resentlyViewedList = useSelector(
    (state: RootState) => state.cartSlice.value.recentlyViewed_products
  );

  const [currentPage, setRvPage] = React.useState(1);

  const itemsPerPage = 4;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const products = [...resentlyViewedList]
    .reverse()
    .slice(startIndex, endIndex);

  const handleLeft = () => {
    if (currentPage > 1) {
      setRvPage((prev) => prev - 1);
    }
  };

  const handleRight = () => {
    if (currentPage < Math.ceil(resentlyViewedList.length / itemsPerPage)) {
      setRvPage((prev) => prev + 1);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.header__title}>Недавно просмотренное</h2>
          <div className={styles.header__buttons}>
            <button className={styles.header__button} onClick={handleLeft}>
              <Image
                src="/catalog/product/Left.svg"
                alt="Влево"
                width={24}
                height={24}
              />
            </button>
            <button className={styles.header__button} onClick={handleRight}>
              <Image
                src="/catalog/product/Right.svg"
                alt="Вправо"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
        <div className={styles.body}>
          <ProductList props={products} cardSize={"small"} />
        </div>
      </div>
    </div>
  );
};
