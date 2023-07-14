import Link from "next/link";

const TheHeader = () => {
  return (
    <header>
      <Link href="/new">Новинки</Link>
      <Link href="/clother">Одежда</Link>
      <Link href="/accessories">Аксессуары</Link>
      <Link href="/brands">Бренды</Link>
      <Link href="/media">Медиа</Link>
    </header>
  );
};

export { TheHeader };
