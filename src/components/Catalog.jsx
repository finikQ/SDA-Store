"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Catalog = (props) => {
  return (
    <>
      {props.props.map((post) => (
        <div key={post.id}>
          <a href={`/clother/${post.id}`}>
            <Image
              src={post.images[0]}
              alt={post.description}
              width={250}
              height={250}
            ></Image>
          </a>
          <div>
            <Link href={`/clother/${post.id}`}>{post.title}</Link>
            <div>{post.price}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default dynamic(() => Promise.resolve(Catalog), { ssr: false });
