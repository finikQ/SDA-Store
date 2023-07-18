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
      dispatch(deleteProduct(product.id));
    } else {
      dispatch(removeProduct(product.id));
    }
  };

  const deleteProductHandler = () => {
    dispatch(deleteProduct(product.id));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(event.target.value);
    if (inputValue === 0) {
      dispatch(deleteProduct(product.id));
    }

    const payload = {
      id: product.id,
      count: inputValue > product.stock ? product.stock : inputValue,
    };

    dispatch(setProductCount(payload));
  };

  return (
    <div className={styles["order-item"]}>
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

      <div className={styles["order-info"]}>{product.title}</div>

      <div className={styles["order-count"]}>
        <input
          type="number"
          max={product.stock}
          value={product.count}
          onChange={handleChange}
        />
        <div className={styles["count-buttons"]}>
          <button onClick={addProductHandler}>+</button>
          <button onClick={removeProductHandler}>-</button>
        </div>
      </div>

      <div>{product.price * (product.count ?? 1)}</div>
      <div>
        <div>
          <button onClick={deleteProductHandler}>-</button>
        </div>
        <button>To Favorite {"<3"}</button>
      </div>
    </div>
  );
};
