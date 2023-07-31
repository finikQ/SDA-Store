import styles from "./page.module.css";

import MainSlider from "@/components/main/slider/MainSlider";
import MainCarousel from "@/components/main/carousel/MainCarousel";
import MainTopCategories from "@/components/main/top_categories/MainTopCategories";
import MainBlog from "@/components/main/blog/MainBlog";

async function getProducts() {
  const response = await fetch("https://dummyjson.com/products");
  return response.json();
}
export type typeSlides = {
  title: string;
  subtitle: string;
  bg_img: string;
  bg_img_alt: string;
  btn_main: string;
  btn_sub: string;
};

const slides: typeSlides[] = [
  {
    title: "Заголовок 1",
    subtitle: "Подзаголовок 1",
    bg_img: "/main/slider/1.jpg",
    bg_img_alt: "Изображение инф",
    btn_main: "Осн кнопка1",
    btn_sub: "Доп кнопка1",
  },
  {
    title: "Заголовок 2",
    subtitle: "Подзаголовок 2",
    bg_img: "/main/slider/2.jpg",
    bg_img_alt: "Изображение инф",
    btn_main: "Осн кнопка2",
    btn_sub: "Доп кнопка2",
  },
  {
    title: "Заголовок 3",
    subtitle: "Подзаголовок 3",
    bg_img: "/main/slider/3.jpg",
    bg_img_alt: "Изображение инф",
    btn_main: "Осн кнопка3",
    btn_sub: "Доп кнопка3",
  },
];

export default async function Home() {
  let clothersList = await getProducts();
  return (
    <div className={styles.container}>
      <MainSlider slides={slides} interval={5} />
      <MainTopCategories />
      <MainCarousel props={clothersList.products} />
      <MainBlog />
    </div>
  );
}
