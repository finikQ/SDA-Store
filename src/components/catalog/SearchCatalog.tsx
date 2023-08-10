"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./catalog.module.css";
import { typeCartItem } from "@/redux/features/cart-slice";
import { Filters } from "./filters/Filters";
import Image from "next/image";
import Breadcrumb from "@/utils/Breadcrumb";
import { ProductList } from "./product/ProductList";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import db from "@/../db.json"
import { redirect } from 'next/navigation'

async function getProductsSearch(search: string, setIsEmptyRes: any) {
  console.log(search);
  
  const serverUrl = process.env.SERVER_URL || "";
  const response = await fetch(
    `${serverUrl}/api/products/search?query=${search}`
  );
  let data = await response.json();

  if (data.length == 0) {
    setIsEmptyRes(true);
    const response = db;
    return response
    //const response = await fetch("https://dummyjson.com/products");
    //return response.json();
  } else {
    setIsEmptyRes(false);
  }
  return data;
}

async function getProducts() {
  const response = await fetch("https://dummyjson.com/products");
  return response.json();
}

export const SearchCatalog: React.FC<{}> = ({}) => {
  const breadcrumbs = [
    {
      title: (
        <Image
          src="/breadcrumbs/Home.svg"
          alt="На главную"
          width={16}
          height={16}
        />
      ),
      link: "/",
    },
    { title: "Каталог", link: "/catalog" },
  ];

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEmptyRes, setIsEmptyRes] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const search = searchParams.get("query");
  const [products, setProducts] = useState<typeCartItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<typeCartItem[]>([]);

  const priceSet: Array<number> = useMemo(
    () => products.map((item) => item.price),
    [products]
  );
  const [filters, setFilters] = useState<{
    brands: string[];
    minPrice: number;
    maxPrice: number;
    sizes: string[];
  }>({
    brands: [],
    minPrice: 0,
    maxPrice: 100000,
    sizes: [],
  });

  useEffect(() => {
    if (search) {
      const fetchData = async () => {
        let fetchedProducts: typeCartItem[];
        fetchedProducts = await getProductsSearch(search, setIsEmptyRes);
        setProducts(fetchedProducts);
        setIsLoading(false);
      };
      fetchData();
    } else {
      redirect('/catalog')
    }
  }, [search]);

  useEffect(() => {
    let filteredProps: typeCartItem[] = products.filter((product) => {
      const brandFilter =
        filters.brands.length === 0 || filters.brands.includes(product.brand);
      const priceFilter =
        product.price >= filters.minPrice && product.price <= filters.maxPrice;
      const sizeFilter =
        filters.sizes.length === 0 || filters.sizes.includes(product.category);
      return brandFilter && priceFilter && sizeFilter;
    });

    setFilteredProducts(filteredProps);
  }, [filters, products]);

  const clearBrandFilter = () => {
    setFilters({ ...filters, brands: [] });
  };

  const clearPriceFilter = () => {
    setFilters({
      ...filters,
      minPrice: Math.min.apply(null, priceSet),
      maxPrice: Math.max.apply(null, priceSet),
    });
  };

  const clearSizeFilter = () => {
    setFilters({ ...filters, sizes: [] });
  };

  const clearAllFilters = () => {
    setFilters({
      brands: [],
      minPrice: Math.min.apply(null, priceSet),
      maxPrice: Math.max.apply(null, priceSet),
      sizes: [],
    });
  };

  return (
    <div className={styles.catalog}>
      <div className={styles.breadcrumb__container}>
        <div className={styles.breadcrumb__wrapper}>
          <Breadcrumb breadcrumbs={breadcrumbs} />
          <div className={styles.activeFilters__list}>
            {filters.brands.length > 0 ? (
              <button
                className={styles.activeFilters}
                onClick={clearBrandFilter}
              >
                <Image
                  src="/catalog/cross.svg"
                  alt="Убрать фильтр бренда"
                  width={16}
                  height={16}
                />
                <span>Бренд</span>
              </button>
            ) : null}

            {filters.minPrice != 0 || filters.maxPrice != 100000 ? (
              <button
                className={styles.activeFilters}
                onClick={clearPriceFilter}
              >
                <Image
                  src="/catalog/cross.svg"
                  alt="Убрать фильтр цены"
                  width={16}
                  height={16}
                />
                <span>Цена</span>
              </button>
            ) : null}

            {filters.sizes.length > 0 ? (
              <button
                className={styles.activeFilters}
                onClick={clearSizeFilter}
              >
                <Image
                  src="/catalog/cross.svg"
                  alt="Убрать фильтр размера"
                  width={16}
                  height={16}
                />
                <span>Размер</span>
              </button>
            ) : null}

            {filters.brands.length > 0 ||
            filters.minPrice != 0 ||
            filters.maxPrice != 100000 ||
            filters.sizes.length > 0 ? (
              <button
                className={styles.activeFilters}
                onClick={clearAllFilters}
              >
                <Image
                  src="/catalog/cross.svg"
                  alt="Убрать фильтр цены"
                  width={16}
                  height={16}
                />
                <span>Убрать все</span>
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {/* <div className={styles.toolbar}>paggination</div> */}
      {isEmptyRes && (
        <div className={styles.wishlist}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              height: "100%",
              width: "100%",
              fontSize: "20px",
              fontWeight: 700,
            }}
          >
            <div
              style={{
                margin: "30px 0 0 0",
              }}
            >
              По вашему запросу товаров сейчас нет ¯\_(ツ)_/¯
            </div>
            <div
              style={{
                margin: "30px 0 0 0",
              }}
            >
              ✿ Популярные товары, присмотритесь ✿
            </div>
          </div>
        </div>
      )}
      {isLoading ? (
        <div className={styles.fetching}></div>
      ) : products.length !== 0 ? (
        <div className={styles.mainWrapper}>
          <div>
            <Filters
              props={products}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <div className={styles.productList}>
            <ProductList props={filteredProducts} cardSize={"small"} />
          </div>
        </div>
      ) : (
        <div className={styles.wishlist}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              height: "100%",
              width: "100%",
              fontSize: "20px",
              fontWeight: 700,
            }}
          >
            <div>¯\_(ツ)_/¯</div>
            <div>Тут пусто</div>
            <Link
              href={"/catalog"}
              style={{ textDecoration: "underline", fontSize: "30px" }}
            >
              {"> "}Каталог{" <"}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(SearchCatalog), { ssr: false });
