import Image from "next/image";
import Link from "next/link";
import styles from "./theheader.module.css";
import { CartCount } from "@/utils/cartCount";
import { FavoriteCount } from "@/utils/favoriteCount";
import { Search } from "./search/Search";

const TheHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.logo}>
          <Link href="/">
            <Image src="/vercel.svg" alt="asd" width={130} height={22} />
          </Link>
        </div>
        <nav className={styles.menu}>
          <Link href="/new">Новинки</Link>
          <Link href="/catalog">Каталог</Link>
          <Link href="/brands">Бренды</Link>
          <Link href="/media">Медиа</Link>
        </nav>
        <Search />

        <div className={styles.toolbar}>
          <Link href="/account">
            <Image
              src="/account/Person.svg"
              alt="profile"
              width={20}
              height={20}
            />
          </Link>
          <Link href="/account/wishlist">
            <Image
              src="/blackHollowHeart.svg"
              alt="wishlist"
              width={20}
              height={20}
            />
            <span>
              <FavoriteCount />
            </span>
          </Link>
          <Link href="/cart">
            <Image src="/Cart.svg" alt="cart" width={20} height={20} />
            <span>
              <CartCount />
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export { TheHeader };
