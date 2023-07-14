import Image from "next/image";

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
    <>
      <div>
        <Image
          src={product.images[0]}
          alt={product.description}
          width={250}
          height={250}
        ></Image>
      </div>
      <div>
        <h1>{product.title}</h1>
        <div>
          <div>{product.price} $</div>
          <div>{product.rating} *</div>
        </div>
        <div>
          <button>
            <span>Добавить в корзину</span>
          </button>
          <span>{"<3"}</span>
        </div>
      </div>
    </>
  );
}
