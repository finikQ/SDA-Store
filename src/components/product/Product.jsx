"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./product.module.css";

import { addProduct } from "@/redux/features/cart-slice";
import { useDispatch } from "react-redux";

export const Product = ({ product }) => {
  const dispatch = useDispatch();

  const addProductHandler = () => {
    dispatch(addProduct(product));
  };

  return (
    <div key={product.id} className={styles.product}>
      <Link href={`/clother/${product.id}`}>
        <Image
          src={product.images[0]}
          alt={product.description}
          width={250}
          height={250}
        />
      </Link>
      <div className={styles["card-body"]}>
        <Link href={`/clother/${product.id}`}>{product.title}</Link>
      </div>

      <div className={styles["card-footer"]}>
        <div>{product.price} ₽</div>
        <button onClick={addProductHandler}>В Корзину</button>
      </div>

      <div className={styles["card-favorite"]}>
        <span className={styles["heart-icon"]}></span>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Product), { ssr: false });
