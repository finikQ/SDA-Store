"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import styles from "./filters.module.css";
import { typeCartItem } from "@/redux/features/cart-slice";

export const Filters: React.FC<{
  props: typeCartItem[];
  filters: any;
  setFilters: any;
}> = ({ props, filters, setFilters }) => {
  const [visibleFilter, setVisibleFilters] = useState({
    visibleBrands: 5,
    visibleSizes: 5,
  });

  const handleShowAllBrands = () => {
    if (visibleFilter.visibleBrands !== 5) {
      setVisibleFilters({ ...visibleFilter, visibleBrands: 5 });
    } else {
      setVisibleFilters({ ...visibleFilter, visibleBrands: brandSet.size });
    }
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, minPrice: Number(event.target.value) });
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, maxPrice: Number(event.target.value) });
  };

  const handleShowAllSizes = () => {
    if (visibleFilter.visibleSizes !== 5) {
      setVisibleFilters({ ...visibleFilter, visibleSizes: 5 });
    } else {
      setVisibleFilters({ ...visibleFilter, visibleSizes: sizeSet.size + 1 });
    }
  };

  let brandSet: Set<string> = new Set(props.map((item) => item.brand));
  let sizeSet: Set<string> = new Set(props.map((item) => item.category));
  return (
    <div>
      <aside>
        <div>
          <div>Бренд</div>
          <div>
            <ul>
              {Array.from(brandSet).map(
                (mapItem, index) =>
                  index < visibleFilter.visibleBrands && (
                    <li key={mapItem}>
                      <label>
                        <input
                          type="checkbox"
                          checked={filters.brands.includes(mapItem)}
                          onChange={() => {
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
                        />
                        {mapItem}
                      </label>
                    </li>
                  )
              )}
            </ul>
            <span onClick={handleShowAllBrands}>
              {visibleFilter.visibleBrands === 5 ? "Показать все" : "Скрыть"}
            </span>
          </div>
        </div>

        <div>
          <div>Цена</div>
          <div>
            <input
              type="number"
              pattern="[0-9]*"
              inputMode="numeric"
              value={filters.minPrice}
              onChange={handleMinPriceChange}
            />
            <input
              type="number"
              pattern="[0-9]*"
              inputMode="numeric"
              value={filters.maxPrice}
              onChange={handleMaxPriceChange}
            />
          </div>
        </div>

        <div>
          <div>Размер</div>
          <div>
            <ul>
              {Array.from(sizeSet).map(
                (mapItem, index) =>
                  index < visibleFilter.visibleSizes && (
                    <li key={mapItem}>
                      <label>
                        <input
                          type="checkbox"
                          checked={filters.sizes.includes(mapItem)}
                          onChange={() => {
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
                        />
                        {mapItem}
                      </label>
                    </li>
                  )
              )}
            </ul>
            <span onClick={handleShowAllSizes}>
              {visibleFilter.visibleSizes === 5 ? "Показать все" : "Скрыть"}
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Filters), { ssr: false });
