import { typeCartItem } from "../redux/features/cart-slice";

export const calcTotalPrice = (products: typeCartItem[]) => {
  return products.reduce((sum, obj) => obj.price * (obj.count ?? 1) + sum, 0);
};
