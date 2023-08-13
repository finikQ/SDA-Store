import { NextResponse } from "next/server";
import db from "@/../db.json";
import { typeCartItem } from "@/redux/features/cart-slice";

async function fetchProducts() {
  const response = db;
  return response;
  //const response = await fetch("https://dummyjson.com/products");
  //return response.json();
}

export async function GET(request: any) {
  const products = await fetchProducts();
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query");

  const filteredProducts = products.products.filter((product: typeCartItem) => {
    if (query) {
      return (
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase()) ||
        product.type.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      return product;
    }
  });

  return NextResponse.json(filteredProducts);
}
