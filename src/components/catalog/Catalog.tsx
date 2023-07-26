"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import styles from "./catalog.module.css";
import { Product } from "./product/Product";
import { typeCartItem } from "@/redux/features/cart-slice";
import { Filters } from "./filters/Filters";

export const Catalog: React.FC<{ props: typeCartItem[] }> = ({ props }) => {
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

  return (
    <>
      <div className={styles.breadcrumb}>
        <div>🏠 / Каталог</div>
        <div className={styles.activeFilters}>
          {filters.brands.length > 0 ? (
            <div>
              <button onClick={clearBrandFilter}>
                <span>Бренд</span>
              </button>
            </div>
          ) : null}
          {filters.minPrice != Math.min.apply(null, priceSet) ||
          filters.maxPrice != Math.max.apply(null, priceSet) ? (
            <div>
              <button onClick={clearPriceFilter}>
                <span>Цена</span>
              </button>
            </div>
          ) : null}
          {filters.sizes.length > 0 ? (
            <div>
              <button onClick={clearSizeFilter}>
                <span>Размер</span>
              </button>
            </div>
          ) : null}
        </div>
      </div>
      {/* <div className={styles.toolbar}>Some buttons</div> */}
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
    </>
  );
};

export default dynamic(() => Promise.resolve(Catalog), { ssr: false });
