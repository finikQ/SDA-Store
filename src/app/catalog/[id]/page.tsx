import Image from "next/image";
import styles from "./page.module.css";
import Breadcrumb from "@/utils/Breadcrumb";
import Images_gallery from "@/components/product/images_gallery/Images_gallery";
import RecentlyViewedList from "@/utils/RecentlyViewedList";
import { RecentlyViewed_Carousel } from "@/components/product/recentlyviewed_carousel/RecentlyViewed_Carousel";
import { ProductCardButtons } from "@/components/product/buttons/ProductCardButtons";
import db from "@/../db.json";
import { typeCartItem } from "@/redux/features/cart-slice";

type Props = {
  params: {
    id: number;
  };
};

async function getProduct(id: number) {
  const response = db;
  const findItem: typeCartItem | undefined = response.products.find(
    (item) => item.id == id
  );

  return findItem;
  //const response = await fetch(`https://dummyjson.com/products/${id}`);
  //return response.json();
}

export default async function Clother({ params: { id } }: Props) {
  const product: typeCartItem | undefined = await getProduct(id);

  const breadcrumbs = [
    {
      title: (
        <Image
          src="/breadcrumbs/Home.svg"
          alt="На главную"
          width={16}
          height={16}
        />
      ),
      link: "/",
    },
    { title: "Каталог", link: "/catalog" },
    { title: product?.title, link: product ? `/catalog/${product.id}` : "" },
  ];

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.page_container}>
      <div className={styles.breadcrumbs_container}>
        <div className={styles.breadcrumbs_wrapper}>
          <Breadcrumb breadcrumbs={breadcrumbs} />
        </div>
      </div>

      <div className={styles.product_card__wrapper}>
        <Images_gallery product={product} />
        <div className={styles.product_card__info}>
          <h1 className={styles.product_card__title}>{product.title}</h1>
          <div className={styles.product_card__price}>
            <div>{product.price} ₽</div>
          </div>

          <div className={styles.product__info}>
            {product.brand && (
              <div className={styles.product__info__description}>
                <strong>Бренд: </strong>
                {product.brand}
              </div>
            )}
            {product.color.length > 0 && (
              <div className={styles.product__info__description}>
                <strong>Цвет: </strong>
                {product.color}
              </div>
            )}
            {product.material && (
              <div className={styles.product__info__description}>
                <strong>Материал: </strong>
                {product.material}
              </div>
            )}
            <div className={styles.product__info__description}>
              <strong>Описание: </strong>
              {product.description}
            </div>
            <div className={styles.product__info__description}>
              <strong>Состояние: </strong>
              {product.condition}
            </div>
            {product.productionYear && (
              <div className={styles.product__info__description}>
                <strong>Год производства: </strong>
                {product.productionYear}
              </div>
            )}
            {product.manufacturerCountry && (
              <div className={styles.product__info__description}>
                <strong>Страна производства: </strong>
                {product.manufacturerCountry}
              </div>
            )}
          </div>
          <ProductCardButtons props={product} />
        </div>
      </div>
      <RecentlyViewed_Carousel />
      <RecentlyViewedList props={product} />
    </div>
  );
}
