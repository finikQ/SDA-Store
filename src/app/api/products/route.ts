import { NextResponse } from "next/server";

async function fetchProducts() {
  const response = await fetch("https://dummyjson.com/products");

  const products = await response.json();
  return products;
}

export async function GET(request: any) {
  const products = await fetchProducts();

  return NextResponse.json(products);
}
