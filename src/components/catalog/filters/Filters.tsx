"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import styles from "./filters.module.css";
import { typeCartItem } from "@/redux/features/cart-slice";

export const Filters: React.FC<{ props: typeCartItem[] }> = ({ props }) => {
    const [visibleFilter, setVisibleFilters] = useState ({
    visibleBrands: 5,
    visiblePrices: 5,
    visibleSizes: 5,
  });

  const handleShowAllBrands = () => {
    setVisibleFilters({ ...visibleFilter, visibleBrands: brandSet.size });
  };

  let brandSet: Set<string> = new Set(props.map((item) => item.brand));
  return (
    <div>
      <aside>
        <div>
          <div>Бренд</div>
          <div>
            <ul>
              {Array.from(brandSet).map((brand, index) => (
            index < visibleFilter.visibleBrands && <li key={brand}>{brand}</li>
          ))}
            </ul>
            {visibleFilter.visibleBrands < brandSet.size && (
          <span onClick={handleShowAllBrands}>Показать все</span>
        )}
          </div>
        </div>

        <div>Цена</div>
        <div>Размер</div>
      </aside>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Filters), { ssr: false });
