"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import styles from "./catalog.module.css";
import { Product } from "./product/Product";
import { typeCartItem } from "@/redux/features/cart-slice";
import { Filters } from "./filters/Filters";
import Image from "next/image";
import Breadcrumb from "@/utils/Breadcrumb";

export const Catalog: React.FC<{ props: typeCartItem[] }> = ({ props }) => {
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
    { title: "Каталог", link: "/clother" },
  ];

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

  let filteredProps: typeCartItem[] = props.filter((product) => {
    const brandFilter =
      filters.brands.length === 0 || filters.brands.includes(product.brand);
    const priceFilter =
      product.price >= filters.minPrice && product.price <= filters.maxPrice;
    const sizeFilter =
      filters.sizes.length === 0 || filters.sizes.includes(product.category);
    return brandFilter && priceFilter && sizeFilter;
  });

  useEffect(() => {
    let priceSet: Array<number> = filteredProps.map((item) => item.price);
    setFilters((prevState: any) => ({
      ...prevState,
      minPrice: Math.min.apply(null, priceSet),
      maxPrice: Math.max.apply(null, priceSet),
    }));
  }, []);
  let priceSet: Array<number> = props.map((item) => item.price);

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
          {/* <div>🏠 / Каталог</div> */}
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

            {filters.minPrice != Math.min.apply(null, priceSet) ||
            filters.maxPrice != Math.max.apply(null, priceSet) ? (
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
            filters.minPrice != Math.min.apply(null, priceSet) ||
            filters.maxPrice != Math.max.apply(null, priceSet) ||
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
      <div className={styles.mainWrapper}>
        <div className={styles.filterList}>
          <Filters props={props} filters={filters} setFilters={setFilters} />
        </div>

        <div className={styles.productList}>
          {filteredProps.map((product) => (
            <Product key={product.id} props={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Catalog), { ssr: false });
