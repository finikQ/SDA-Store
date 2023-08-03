"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
//import Link from "next/link";

import { typeCartItem } from "@/redux/features/cart-slice";
import styles from "./images_gallery.module.css";

export const Image_Gallery: React.FC<{ product: typeCartItem }> = ({
  product,
}) => {
  const [pictureIndex, setPictureIndex] = useState(0);

  const changeMainPicture = (index: number) => {
    setPictureIndex(index);
  };

  return (
    <div className={styles.product__gallery}>
      <Image
        className={styles.product__gallery__photo}
        src={product.images[pictureIndex]}
        alt={product.description}
        width={600}
        height={600}
      />
      <div className={styles.product__gallery__preview}>
        {product.images.map((image: string, index: number) => (
          <div key={image} onClick={() => changeMainPicture(index)}>
            <Image
              className={styles.product__gallery__photo}
              src={image}
              alt="image"
              width={104}
              height={104}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Image_Gallery), { ssr: false });
