import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import styles from "./mainblog.module.css";

const blogItems = [
  {
    title: "Bag Trends for Summer",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    type: "Мода",
    date: "25.05.2022",
    img: "/main/blog/1.png",
    alt: "bag",
  },
  {
    title: "The 13 Best Vintage Brands To Look For In 2023",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    type: "История",
    date: "26.05.2022",
    img: "/main/blog/2.png",
    alt: "sneaners",
  },
];

export const MainBlog: React.FC<{}> = () => {
  return (
    <section className={styles.blog__container}>
      <div className={styles.blog__container__info}>
        <h2>Блог</h2>
        <div>
          <Link href={"#"}>
            <button>Посмотреть блог</button>
          </Link>
        </div>
      </div>
      <div className={styles.blog__items_list}>
        {blogItems.map((item: any) => {
          return (
            <div className={styles.blog__item} key={item.title}>
              <Link href={"#"}>
                <Image src={item.img} alt={item.alt} width={600} height={306} />
              </Link>
              <div className={styles.blog__item__info_container}>
                <Link href={"#"}>
                  <h3 className={styles.blog__item__title}>{item.title}</h3>
                </Link>
                <div className={styles.blog__item__info}>
                  <Link href={"#"} className={styles.blog__item__info__type}>
                    {item.type}
                  </Link>
                  <div className={styles.blog__item__info__date}>
                    {item.date}
                  </div>
                </div>
                <div className={styles.blog__item__text}>{item.text}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default dynamic(() => Promise.resolve(MainBlog), { ssr: false });
