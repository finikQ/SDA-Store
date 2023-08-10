"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import styles from "./catalog.module.css";
import { typeCartItem } from "@/redux/features/cart-slice";
import { Filters } from "./filters/Filters";
import Image from "next/image";
import Breadcrumb from "@/utils/Breadcrumb";
import { ProductList } from "./product/ProductList";

export const Catalog: React.FC<{
  props: any[];
  priceRange: { minPriceDefault: number; maxPriceDefault: number };
}> = ({ props, priceRange }) => {
  const [filteredProducts, setFilteredProducts] = useState<typeCartItem[]>([]);

  const { minPriceDefault, maxPriceDefault } = priceRange;

  const [filters, setFilters] = useState<{
    brands: string[];
    minPrice: number;
    maxPrice: number;
    types: string[];
  }>({
    brands: [],
    minPrice: minPriceDefault,
    maxPrice: maxPriceDefault,
    types: [],
  });

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

  useEffect(() => {
    let filteredProps: typeCartItem[] = props.filter((product) => {
      const brandFilter =
        filters.brands.length === 0 || filters.brands.includes(product.brand);
      const priceFilter =
        product.price >= filters.minPrice && product.price <= filters.maxPrice;
      const sizeFilter =
        filters.types.length === 0 || filters.types.includes(product.category);
      return brandFilter && priceFilter && sizeFilter;
    });

    setFilteredProducts(filteredProps);
  }, [props, filters]);

  const clearBrandFilter = () => {
    setFilters({ ...filters, brands: [] });
  };

  const clearPriceFilter = () => {
    setFilters({
      ...filters,
      minPrice: minPriceDefault,
      maxPrice: maxPriceDefault,
    });
  };

  const clearSizeFilter = () => {
    setFilters({ ...filters, types: [] });
  };

  const clearAllFilters = () => {
    setFilters({
      brands: [],
      minPrice: minPriceDefault,
      maxPrice: maxPriceDefault,
      types: [],
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

            {filters.minPrice != minPriceDefault ||
            filters.maxPrice != maxPriceDefault ? (
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

            {filters.types.length > 0 ? (
              <button
                className={styles.activeFilters}
                onClick={clearSizeFilter}
              >
                <Image
                  src="/catalog/cross.svg"
                  alt="Убрать фильтр типа"
                  width={16}
                  height={16}
                />
                <span>Тип</span>
              </button>
            ) : null}

            {filters.brands.length > 0 ||
            filters.minPrice != minPriceDefault ||
            filters.maxPrice != maxPriceDefault ||
            filters.types.length > 0 ? (
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
      <div className={styles.mainWrapper}>
        <div>
          <Filters props={props} filters={filters} setFilters={setFilters} />
        </div>
        <div className={styles.productList}>
          <ProductList props={filteredProducts} cardSize={"small"} />
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Catalog), { ssr: false });
