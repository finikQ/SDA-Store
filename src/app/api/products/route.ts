import { NextResponse } from "next/server";
import db from "@/../db.json";

async function fetchProducts() {
  const response = db;
  return response;
  // const response = await fetch("https://dummyjson.com/products");
  // return response.json()
}

export async function GET(request: any) {
  const products = await fetchProducts();

  return NextResponse.json(products);
}
