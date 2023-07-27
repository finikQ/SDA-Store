import Image from "next/image";
import styles from "./page.module.css";
import Breadcrumb from "@/utils/Breadcrumb";
import Images_gallery from "@/components/product/Images_gallery";

type Props = {
  params: {
    id: number;
  };
};

async function getProduct(id: number) {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  return response.json();
}

export default async function Clother({ params: { id } }: Props) {
  const product = await getProduct(id);

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
    { title: "Каталог", link: "/clother" },
    { title: product.title, link: `/clother/${product.id}` },
  ];

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
          <h1>{product.title}</h1>
          <div className={styles.product_card__price}>
            <div>{product.price} ₽</div>
            <s>
              {Math.round(
                product.price / (1 - product.discountPercentage / 100)
              )}{" "}
              ₽
            </s>
          </div>

          <div className={styles.product__info}>
            <div className={styles.product__info__description}>
              <strong>Бренд: </strong>
              {product.brand}
            </div>
            <div className={styles.product__info__description}>
              <strong>Цвет: </strong>
              {<u>цвет</u>}
            </div>
            <div className={styles.product__info__description}>
              <strong>Описание: </strong>
              {product.description}
            </div>
            <div className={styles.product__info__description}>
              <strong>Состояние: </strong>
              {<u>состояние</u>}
            </div>
          </div>

          <div className={styles.product_card__buttons}>
            <button className={styles.product_card__buttons__toCart}>
              <Image
                src="/catalog/product/cart.svg"
                alt="Корзина"
                width={15}
                height={13.667}
              />
              <span>В Корзину</span>
            </button>
            <button className={styles.product_card__buttons__toFavorite}>
              <Image src="/heart.svg" alt="Избранное" width={16} height={16} />

              <span>Избранное</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
