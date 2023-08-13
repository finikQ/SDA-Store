import { Catalog } from "@/components/catalog/Catalog";
import { typeCartItem } from "@/redux/features/cart-slice";
import db from "@/../db.json";

async function getProducts() {
  const response = db;
  return response;
  //const response = await fetch("https://dummyjson.com/products");
  //return response.json();
}

export default async function Clothers() {
  let productList = await getProducts();

  const priceRange = {
    minPriceDefault: Math.min(
      ...productList.products.map((item: typeCartItem) => item.price)
    ),
    maxPriceDefault: Math.max(
      ...productList.products.map((item: typeCartItem) => item.price)
    ),
  };

  return <Catalog props={productList.products} priceRange={priceRange} />;
}
