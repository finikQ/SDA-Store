"use client";

import dynamic from "next/dynamic";
import React from "react";
import styles from "./catalog.module.css";
import { Product } from "./product/Product";
import { typeCartItem } from "@/redux/features/cart-slice";
import { Filters } from "./filters/Filters";

export const Catalog: React.FC<{ props: typeCartItem[] }> = ({ props }) => {
  return (
    <div>
      <div className={styles.breadcrumb}>
        <div>Breadcrumb</div>
        <div>Active Filters</div>
      </div>
      <div className={styles.toolbar}>Some buttons</div>
      <div className={styles.mainWrapper}>
        <div className={styles.filters}>
          <Filters props={props} />
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
