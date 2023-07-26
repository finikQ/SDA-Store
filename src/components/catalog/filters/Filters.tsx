"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import styles from "./filters.module.css";
import { typeCartItem } from "@/redux/features/cart-slice";
import Image from "next/image";

export const Filters: React.FC<{
  props: typeCartItem[];
  filters: any;
  setFilters: any;
}> = ({ props, filters, setFilters }) => {
  const [visibleFilter, setVisibleFilters] = useState({
    visibleBrands: false,
    visiblePrices: false,
    visibleSizes: false,
  });

  const handleShowBrands = () => {
    setVisibleFilters((prev) => ({
      ...prev,
      visibleBrands: !visibleFilter.visibleBrands,
    }));
  };

  const handleShowPrices = () => {
    setVisibleFilters((prev) => ({
      ...prev,
      visiblePrices: !visibleFilter.visiblePrices,
    }));
  };

  const handleShowSizes = () => {
    setVisibleFilters((prev) => ({
      ...prev,
      visibleSizes: !visibleFilter.visibleSizes,
    }));
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, minPrice: Number(event.target.value) });
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, maxPrice: Number(event.target.value) });
  };

  let brandSet: Set<string> = new Set(props.map((item) => item.brand));
  let sizeSet: Set<string> = new Set(props.map((item) => item.category));

  return (
    <>
      <aside className={styles.filters__list}>
        <div className={styles.filters__filter}>
          <button
            className={styles.filters__filter__expand_btn}
            onClick={handleShowBrands}
          >
            <div className={styles.filters__filter__name}>Бренд</div>
            <div>{visibleFilter.visibleBrands ? "-" : "+"}</div>
          </button>

          <div
            className={` ${
              visibleFilter.visibleBrands
                ? styles.filter__open
                : styles.filter__close
            }`}
          >
            <ul className={`${styles.filters__filter__list}`}>
              {Array.from(brandSet).map((mapItem) => (
                <li key={mapItem}>
                  <label
                    className={styles.filters__filter__label}
                    onClick={() => {
                      if (filters.brands.includes(mapItem)) {
                        setFilters({
                          ...filters,
                          brands: filters.brands.filter(
                            (brand: any) => brand !== mapItem
                          ),
                        });
                      } else {
                        setFilters({
                          ...filters,
                          brands: [...filters.brands, mapItem],
                        });
                      }
                    }}
                  >
                    <div>
                      {filters.brands.includes(mapItem) ? (
                        <Image
                          src="/catalog/filter/checked.svg"
                          width={16}
                          height={16}
                          alt="checked"
                          className={styles.checked_image}
                        />
                      ) : (
                        <Image
                          src="/catalog/filter/unchecked.svg"
                          width={16}
                          height={16}
                          alt="unchecked"
                          className={styles.checked_image}
                        />
                      )}
                    </div>
                    <div className={styles.filters__filter__category_name}>
                      {mapItem}
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.filters__filter}>
          <button
            className={styles.filters__filter__expand_btn}
            onClick={handleShowPrices}
          >
            <div className={styles.filters__filter__name}>Цена</div>
            <div>{visibleFilter.visiblePrices ? "-" : "+"}</div>
          </button>

          <div
            className={`${styles.filters__filter__numbers} ${
              visibleFilter.visiblePrices === false
                ? styles.filter__close
                : styles.filter__open
            }`}
          >
            <input
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              value={filters.minPrice}
              onChange={handleMinPriceChange}
            />
            <div>-</div>
            <input
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              value={filters.maxPrice}
              onChange={handleMaxPriceChange}
            />
          </div>
        </div>

        <div className={styles.filters__filter}>
          <button
            className={styles.filters__filter__expand_btn}
            onClick={handleShowSizes}
          >
            <div className={styles.filters__filter__name}>Размер</div>
            <div>{visibleFilter.visibleSizes ? "-" : "+"}</div>
          </button>

          <div
            className={` ${
              visibleFilter.visibleSizes
                ? styles.filter__open
                : styles.filter__close
            }`}
          >
            <ul className={`${styles.filters__filter__list}`}>
              {Array.from(sizeSet).map((mapItem) => (
                <li key={mapItem}>
                  <label
                    className={styles.filters__filter__label}
                    onClick={() => {
                      if (filters.sizes.includes(mapItem)) {
                        setFilters({
                          ...filters,
                          sizes: filters.sizes.filter(
                            (size: any) => size !== mapItem
                          ),
                        });
                      } else {
                        setFilters({
                          ...filters,
                          sizes: [...filters.sizes, mapItem],
                        });
                      }
                    }}
                  >
                    <div>
                      {filters.sizes.includes(mapItem) ? (
                        <Image
                          src="/catalog/filter/checked.svg"
                          width={16}
                          height={16}
                          alt="checked"
                          className={styles.checked_image}
                        />
                      ) : (
                        <Image
                          src="/catalog/filter/unchecked.svg"
                          width={16}
                          height={16}
                          alt="unchecked"
                          className={styles.checked_image}
                        />
                      )}
                    </div>
                    <div className={styles.filters__filter__category_name}>
                      {mapItem}
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default dynamic(() => Promise.resolve(Filters), { ssr: false });
