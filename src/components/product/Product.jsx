"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./product.module.css";

export const Product = ({ product }) => {
  return (
    <div key={product.id} className={styles.product}>
      <a href={`/clother/${product.id}`}>
        <Image
          src={product.images[0]}
          alt={product.description}
          width={250}
          height={250}
        ></Image>
      </a>

      <div className={styles["card-body"]}>
        <Link href={`/clother/${product.id}`}>{product.title}</Link>
      </div>

      <div className={styles["card-footer"]}>
        <div>{product.price} ₽</div>
        <button>В Корзину</button>
      </div>

      <div className={styles["card-favorite"]}>
        <span className={styles["heart-icon"]}></span>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Product), { ssr: false });
