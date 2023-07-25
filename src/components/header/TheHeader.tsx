import Image from "next/image";
import Link from "next/link";
import styles from "./theheader.module.css";
import { CartCount } from "./cartCount";

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
          <Link href="/clother">Одежда</Link>
          <Link href="/accessories">Аксессуары</Link>
          <Link href="/brands">Бренды</Link>
          <Link href="/media">Медиа</Link>
        </nav>
        <div className={styles.search}>
          <form>
            <input placeholder="Найти"></input>
          </form>
        </div>

        <div className={styles.toolbar}>
          <Link href="#">
            <Image src="/Profile.svg" alt="profile" width={20} height={20} />
          </Link>
          <Link href="#">
            <Image src="/heart.svg" alt="wishlist" width={20} height={20} />
            <span>2</span>
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
