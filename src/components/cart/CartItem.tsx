"use client";

import React from "react";
import Image from "next/image";

import { useDispatch } from "react-redux";
import {
  addProduct,
  removeProduct,
  deleteProduct,
  setProductCount,
} from "@/redux/features/cart-slice";
import { typeCartItem } from "@/redux/features/cart-slice";
import Link from "next/link";

import styles from "./cartitem.module.css";

type CartItemProps = {
  product: typeCartItem;
};

export const CartItem = ({ product }: CartItemProps) => {
  const dispatch = useDispatch();

  const addProductHandler = () => {
    if ((product.count ?? 0) >= product.stock) {
      const payload = {
        id: product.id,
        count: product.stock,
      };
      dispatch(setProductCount(payload));
    }

    dispatch(addProduct(product));
  };

  const removeProductHandler = () => {
    if (product.count == 1) {
    } else {
      dispatch(removeProduct(product.id));
    }
  };

  const deleteProductHandler = () => {
    dispatch(deleteProduct(product.id));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(event.target.value);
    const payload = {
      id: product.id,
      count: 1,
    };
    if (inputValue >= 1) {
      payload.count = inputValue > product.stock ? product.stock : inputValue;
    }
    dispatch(setProductCount(payload));
  };

  return (
    <div className={styles["item"]}>
      <div>
        <Link href={`/clother/${product.id}`}>
          <Image
            src={product.images[0]}
            alt={product.description}
            width={80}
            height={80}
          />
        </Link>
      </div>

      <div className={styles["item-info"]}>
        <Link href={`/clother/${product.id}`}>{product.title}</Link>
      </div>

      <div className={styles["item-count"]}>
        <button onClick={removeProductHandler}></button>
        <input
          type="number"
          max={product.stock}
          value={product.count}
          onChange={handleChange}
        />
        <button onClick={addProductHandler}></button>
      </div>

      <div className={styles["item-price"]}>
        {product.price * (product.count ?? 1)} ₽
        <div className={styles["item-actions"]}>
          <button>
            <Image src="/heart.svg" alt="favorites" width={20} height={20} />
          </button>
          <button onClick={deleteProductHandler}>
            <Image src="/trash.svg" alt="delete item" width={20} height={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
