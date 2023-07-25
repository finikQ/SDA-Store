import Link from "next/link";
import styles from "./thefooter.module.css";
import Image from "next/image";

const TheFooter = () => {
  const socials = [
    {
      name: "telegram",
      href: "https://t.me/sda_store",
      img_src: "/social/telegram.svg",
    },
    {
      name: "instagram",
      href: "https://www.instagram.com/sda_store/",
      img_src: "/social/instagram.svg",
    },
    {
      name: "tiktok",
      href: "https://www.tiktok.com/@sda_store",
      img_src: "/social/tiktok.svg",
    },
    {
      name: "pinterest",
      href: "https://www.pinterest.com/sda_store",
      img_src: "/social/pinterest.svg",
    },
  ];

  return (
    <footer className={styles.footer}>
      <div>
        <h3>Каталог</h3>
        <Link href="/new">Новинки</Link>
        <Link href="/clother">Одежда</Link>
        <Link href="/accessories">Аксессуары</Link>
        <Link href="/brands">Бренды</Link>
        <Link href="/media">Медиа</Link>
      </div>
      <div>
        <h3>Помощь</h3>
        <Link href="/common/delivery">Доставка</Link>
        <Link href="/common/payment">Оплата</Link>
        <Link href="/common/size">Выбор размера</Link>
        <Link href="/media">Медиа</Link>
      </div>
      <div>
        <h3>Бренды</h3>
        <Link href="/common/brand1">Бренд 1</Link>
        <Link href="/common/brand2">Бренд 2</Link>
        <Link href="/common/brand3">Бренд 3</Link>
        <Link href="/common/brand4">Бренд 4</Link>
        <Link href="/common/brand5">Бренд 5</Link>
      </div>
      <div>
        <h3>Контакты</h3>
        <div>
          <Link href="tel:8-123-456-78-90">8-123-456-78-90</Link>
        </div>
        <div>
          <Link href="mailto:example@example.com">example@example.com</Link>
        </div>
        <div>ул. Примерная, 123</div>
        <div>
          <ul className={styles["social-links"]}>
            {socials.map((item): any => (
              <Link key={item.name} href={item.href} target="_blank">
                <li>
                  <Image
                    src={item.img_src}
                    alt={item.name}
                    width={40}
                    height={40}
                  />
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export { TheFooter };
