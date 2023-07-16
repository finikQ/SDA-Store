"use client";

import React from "react";
import Image from "next/image";

import { useDispatch } from "react-redux";
import {
  addProduct,
  removeProduct,
  deleteProduct,
} from "@/redux/features/cart-slice";
import { typeCartItem } from "@/redux/features/cart-slice";

type CartItemProps = {
  product: typeCartItem;
};

export const CartItem = ({ product }: CartItemProps) => {
  const dispatch = useDispatch();

  const addProductHandler = () => {
    dispatch(addProduct(product));
  };

  const removeProductHandler = () => {
    console.log(product);
    if (product.count == 1) {
      dispatch(deleteProduct(product.id));
    } else {
      dispatch(removeProduct(product.id));
    }
  };

  const deleteProductHandler = () => {
    dispatch(deleteProduct(product.id));
  };

  return (
    <div>
      <div key={product.id}>
        <Image
          src={product.images[0]}
          alt={product.description}
          width={100}
          height={100}
        />
        <div>{product.title}</div>
        <div>
          <div>{product.count}</div>
          <button onClick={addProductHandler}>+</button>
          <button onClick={removeProductHandler}>-</button>
        </div>

        <div>{product.price * (product.count ?? 1)}</div>
        <div>
          <div>
            <div>
              <button onClick={deleteProductHandler}>-</button>
            </div>
            <span>To Favorite {"<3"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
