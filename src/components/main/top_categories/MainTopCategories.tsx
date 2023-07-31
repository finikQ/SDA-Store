import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import styles from "./maintopcategories.module.css";

export const TopCategories: React.FC<{}> = () => {
  return (
    <section>
      <ul className={styles.top_categories}>
        <li className={styles.top_categories__item}>
          <Link href={"#"}>
            <Image
              src="/main/top_categories/1.png"
              alt="woman category"
              width={390}
              height={390}
            />
            <h3>Women&apos;s</h3>
          </Link>
        </li>
        <li className={styles.top_categories__item}>
          <Link href={"#"}>
            <Image
              src="/main/top_categories/2.png"
              alt="man category"
              width={390}
              height={390}
              priority={true}
            />
            <h3>Men&apos;s</h3>
          </Link>
        </li>
        <li className={styles.top_categories__item}>
          <Link href={"#"}>
            <Image
              className=""
              src="/main/top_categories/3.png"
              alt="kids category"
              width={390}
              height={390}
            />
            <h3>Kid&apos;s</h3>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default dynamic(() => Promise.resolve(TopCategories), { ssr: false });
