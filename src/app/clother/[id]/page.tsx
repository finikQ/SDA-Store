import Image from "next/image";
import styles from "./page.module.css";

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

  return (
    <div>
      <div>Breadcrumb</div>

      <div className={styles.container}>
        <div>
          <Image
            src={product.images[0]}
            alt={product.description}
            width={550}
            height={550}
          />
          <div>
            {product.images.map((image) => (
              <Image
                key={image}
                src={image}
                alt="image"
                width={100}
                height={100}
              />
            ))}
          </div>
        </div>

        <div className={styles.info}>
          <h1>{product.title}</h1>
          <div className={styles.price}>
            <div>{product.price} $</div>
            <s>
              {Math.round(
                product.price / (1 - product.discountPercentage / 100)
              )}{" "}
              $
            </s>
          </div>

          <div className={styles.buttons}>
            <button className={styles.toCart}>В Корзину</button>
            <button>
              <Image src="/heart.svg" alt="favorites" width={20} height={20} />
            </button>
          </div>

          <div className={styles.description}>
            <div>Бренд: {product.brand}</div>
            <div>Описание: {product.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
