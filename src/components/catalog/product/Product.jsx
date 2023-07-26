"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./product.module.css";

import { addProduct } from "@/redux/features/cart-slice";
import { useDispatch } from "react-redux";

export const Product = ({ props }) => {
  const dispatch = useDispatch();

  const addProductHandler = () => {
    dispatch(addProduct(props));
  };

  return (
    <div key={props.id} className={styles.product}>
      <Link href={`/clother/${props.id}`}>
        <Image
          src={props.images[0]}
          alt={props.description}
          width={285}
          height={320}
          layout="fixed"
        />
      </Link>
      <div className={styles["card-body"]}>
        <Link href={`/clother/${props.id}`}>{props.title}</Link>
      </div>

      <div className={styles["card-footer"]}>
        <div>{props.price} ₽</div>
        <button onClick={addProductHandler}>В Корзину</button>
      </div>

      <div className={styles["card-favorite"]}>
        <span className={styles["heart-icon"]}></span>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Product), { ssr: false });
