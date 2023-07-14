import { Catalog } from "../../components/Catalog.jsx";

async function getProducts() {
  const response = await fetch("https://dummyjson.com/products");
  return response.json();
}

export default async function Clothers() {
  let clothersList = await getProducts();

  return (
    <div>
      <div></div>
      <Catalog props={clothersList.products} />
    </div>
  );
}
