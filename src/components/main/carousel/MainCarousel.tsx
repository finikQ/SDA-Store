"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

import Product from "@/components/catalog/product/Product";
import { typeCartItem } from "@/redux/features/cart-slice";
import styles from "./maincarousel.module.css";

export const MainCarousel: React.FC<{ props: typeCartItem[] }> = ({
  props,
}) => {
  const [newArrivalsPage, setNewArrivalsPage] = React.useState(0);
  const maxPages = props.length < 31 ? Math.ceil(props.length / 6) : 5;

  const changeCarouselPage = (index: any) => {
    setNewArrivalsPage(index * 1878);
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2>
          <Link href={"/new"}>Новинки</Link>
        </h2>
        <div>
          <h4>Ознакомьтесь с нашими последними поступлениями</h4>
          <Link href={"/new"}>Посмотреть коллекцию здесь</Link>
        </div>
      </div>

      <div className={styles.product_list__container}>
        <div className={styles.product_list__window}>
          <ul
            className={styles.product_list}
            style={{ transform: `translateX(-${newArrivalsPage}px)` }}
          >
            {props.map((product: any) => {
              return (
                <li key={product.id} className={styles.product_list__item}>
                  <Product props={product} />
                </li>
              );
            })}
          </ul>
        </div>

        <div className={styles.product_list__pagination}>
          {Array.from({ length: maxPages }, (_, index) => (
            <div
              key={index + 1}
              className={styles.product_list__pagination__item__container}
              onClick={() => changeCarouselPage(index)}
            >
              <button
                className={`${styles.product_list__pagination__item} ${
                  index * 1878 === newArrivalsPage ? styles.active : ""
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default dynamic(() => Promise.resolve(MainCarousel), { ssr: false });
