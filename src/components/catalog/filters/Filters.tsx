"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
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
    visibleTypes: false,
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

  const handleShowTypes = () => {
    setVisibleFilters((prev) => ({
      ...prev,
      visibleTypes: !visibleFilter.visibleTypes,
    }));
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const minPrice = parseInt(inputValue);
    if (!isNaN(minPrice)) {
      setFilters({ ...filters, minPrice });
    }
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const maxPrice = parseInt(inputValue);
    if (!isNaN(maxPrice)) {
      setFilters({ ...filters, maxPrice });
    }
  };

  let brandSet: Set<string> = new Set(props.map((item) => item.brand));
  let typesSet: Set<string> = new Set(props.map((item) => item.category));

  return (
    <>
      <aside className={styles.filters__list}>
        <section className={styles.filters__filter}>
          <button
            className={styles.filters__filter__expand_btn}
            onClick={handleShowBrands}
          >
            <div className={styles.filters__filter__name}>Бренд</div>
            <Image
              src={
                visibleFilter.visibleBrands
                  ? "/catalog/filter/minus.svg"
                  : "/catalog/filter/plus.svg"
              }
              alt={
                visibleFilter.visibleBrands
                  ? "Скрыть фильтр Производитель"
                  : "Открыть фильтр Производитель"
              }
              width={16}
              height={16}
            />
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
                      <Image
                        src={
                          filters.brands.includes(mapItem)
                            ? "/catalog/filter/checked.svg"
                            : "/catalog/filter/unchecked.svg"
                        }
                        width={16}
                        height={16}
                        alt={
                          filters.brands.includes(mapItem)
                            ? "checked"
                            : "unchecked"
                        }
                        className={styles.checked_image}
                      />
                    </div>
                    <div className={styles.filters__filter__category_name}>
                      {mapItem}
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.filters__filter}>
          <button
            className={styles.filters__filter__expand_btn}
            onClick={handleShowPrices}
          >
            <div className={styles.filters__filter__name}>Цена</div>
            <Image
              src={
                visibleFilter.visiblePrices
                  ? "/catalog/filter/minus.svg"
                  : "/catalog/filter/plus.svg"
              }
              alt={
                visibleFilter.visiblePrices
                  ? "Открыть фильтр цены"
                  : "Скрыть фильтр цены"
              }
              width={16}
              height={16}
            />
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
        </section>

        <section className={styles.filters__filter}>
          <button
            className={styles.filters__filter__expand_btn}
            onClick={handleShowTypes}
          >
            <div className={styles.filters__filter__name}>Тип</div>
            <Image
              src={
                visibleFilter.visibleTypes
                  ? "/catalog/filter/minus.svg"
                  : "/catalog/filter/plus.svg"
              }
              alt={
                visibleFilter.visibleTypes
                  ? "Скрыть фильтр типа"
                  : "Открыть фильтр типа"
              }
              width={16}
              height={16}
            />
          </button>
          <div
            className={` ${
              visibleFilter.visibleTypes
                ? styles.filter__open
                : styles.filter__close
            }`}
          >
            <ul className={`${styles.filters__filter__list}`}>
              {Array.from(typesSet).map((mapItem) => (
                <li key={mapItem}>
                  <label
                    className={styles.filters__filter__label}
                    onClick={() => {
                      if (filters.types.includes(mapItem)) {
                        setFilters({
                          ...filters,
                          types: filters.types.filter(
                            (size: any) => size !== mapItem
                          ),
                        });
                      } else {
                        setFilters({
                          ...filters,
                          types: [...filters.types, mapItem],
                        });
                      }
                    }}
                  >
                    <div>
                      <Image
                        src={
                          filters.types.includes(mapItem)
                            ? "/catalog/filter/checked.svg"
                            : "/catalog/filter/unchecked.svg"
                        }
                        width={16}
                        height={16}
                        alt={
                          filters.types.includes(mapItem)
                            ? "checked"
                            : "unchecked"
                        }
                        className={styles.checked_image}
                      />
                    </div>
                    <div className={styles.filters__filter__category_name}>
                      {mapItem}
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </aside>
    </>
  );
};

export default dynamic(() => Promise.resolve(Filters), { ssr: false });
