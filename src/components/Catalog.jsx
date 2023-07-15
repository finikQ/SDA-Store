"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./catalog.module.css";

export const Catalog = (props) => {
  console.log(props.props[0]);
  return (
    <div>
      <div className={styles.breadcrumb}>
        <div>Breadcrumb</div>
        <div>Active Filters</div>
      </div>
      <div className={styles.toolbar}>Some buttons</div>
      <div className={styles.mainWrapper}>
        <div className={styles.filters}>
          <aside>
            <div>Цена</div>
            <div>Размер</div>
          </aside>
        </div>
        <div className={styles.productList}>
          {props.props.map((post) => (
            <div key={post.id} className={styles.product}>
              <a href={`/clother/${post.id}`}>
                <Image
                  src={post.images[0]}
                  alt={post.description}
                  width={250}
                  height={250}
                ></Image>
              </a>

              <div className={styles["card-body"]}>
                <Link href={`/clother/${post.id}`}>{post.title}</Link>
              </div>

              <div className={styles["card-footer"]}>
                <div>{post.price} ₽</div>
                <button>В Корзину</button>
              </div>

              <div className={styles["card-favorite"]}>
                <span className={styles["heart-icon"]}></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Catalog), { ssr: false });
