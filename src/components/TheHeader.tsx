import Image from "next/image";
import Link from "next/link";
import styles from "./theheader.module.css";

const TheHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <a>
          <Image src="/vercel.svg" alt="asd" width={130} height={22} />
        </a>
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
          <Image src="/Profile.svg" alt="favorites" width={20} height={20} />
        </div>
        <a>
          <Image src="/heart.svg" alt="favorites" width={20} height={20} />
          <div>2</div>
        </a>
        <a>
          <Image src="/Cart.svg" alt="cart" width={20} height={20} />
          <div>4</div>
        </a>
      </div>
    </header>
  );
};

export { TheHeader };
