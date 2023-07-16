"use client";

import dynamic from "next/dynamic";
import React from "react";
import styles from "./catalog.module.css";
import { Product } from "./product/Product";

export const Catalog = ({ props }) => {
  return (
    <div>
      <div className={styles.breadcrumb}>
        <div>Breadcrumb</div>
        <div>Active Filters</div>
      </div>
      <div className={styles.toolbar}>Some buttons</div>
      <div className={styles.mainWrapper}>
        <div className={styles.filters}>
          <aside>
            <div>Цена</div>
            <div>Размер</div>
          </aside>
        </div>
        <div className={styles.productList}>
          {props.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Catalog), { ssr: false });
