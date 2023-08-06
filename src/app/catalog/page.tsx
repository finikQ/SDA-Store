import { Catalog } from "@/components/catalog/Catalog";
import { typeCartItem } from "@/redux/features/cart-slice";

async function getProducts() {
  const response = await fetch("https://dummyjson.com/products");
  return response.json();
}

export default async function Clothers() {
  let clothersList = await getProducts();

  const priceRange = {
    minPriceDefault: Math.min(
      ...clothersList.products.map((item: typeCartItem) => item.price)
    ),
    maxPriceDefault: Math.max(
      ...clothersList.products.map((item: typeCartItem) => item.price)
    ),
  };

  return <Catalog props={clothersList.products} priceRange={priceRange} />;
}
