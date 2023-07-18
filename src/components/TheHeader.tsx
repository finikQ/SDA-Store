import Image from "next/image";
import Link from "next/link";
import styles from "./theheader.module.css";
import { CartCount } from "./header/cartCount";

const TheHeader = () => {
  return (
    <header className={styles.header}>
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
        <div>
          <Image src="/Profile.svg" alt="profile" width={20} height={20} />
        </div>
        <Link href="/wishlist">
          <Image src="/heart.svg" alt="wishlist" width={20} height={20} />
          <div>2</div>
        </Link>s
        <Link href="/cart">
          <Image src="/Cart.svg" alt="cart" width={20} height={20} />
          <div>
            <CartCount />
          </div>
        </Link>
      </div>
    </header>
  );
};

export { TheHeader };
