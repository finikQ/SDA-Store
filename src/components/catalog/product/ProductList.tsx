import React from "react";
import Product from "./Product";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  toggleFavorite,
  typeCartItem,
} from "@/redux/features/cart-slice";

export const ProductList: React.FC<{
  props: typeCartItem[];
  cardSize: string;
}> = ({ props, cardSize }) => {
  const dispatch = useDispatch();

  const handlers = {
    addProductHandler: (product: typeCartItem) => {
      dispatch(addProduct(product));
    },

    toggleFavoriteHandler: (product: typeCartItem) => {
      dispatch(toggleFavorite(product));
    },
  };

  // FIXME: Временное решение, поскольку значение отсутствует в fake Rest api
  const favorite_products = useSelector(
    (state: RootState) => state.cartSlice.value.favorite_products
  );
  let isFavorite: boolean;

  return (
    <>
      {props.map((props: typeCartItem) => {
        isFavorite = favorite_products.some((item) => item.id === props.id);
        return (
          <Product
            key={props.id}
            props={props}
            isFavorite={isFavorite}
            handlers={handlers}
            cardSize={cardSize}
          />
        );
      })}
    </>
  );
};
