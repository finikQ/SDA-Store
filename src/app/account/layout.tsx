import Breadcrumb from "@/utils/Breadcrumb";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { FavoriteCount } from "@/components/header/favoriteCount";

export default function Media({ children }: { children: React.ReactNode }) {
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
    { title: "Профиль", link: "/profile" },
  ];
  return (
    <>
      <div className={styles.breadcrumbs_container}>
        <div className={styles.breadcrumbs_wrapper}>
          <Breadcrumb breadcrumbs={breadcrumbs} />
        </div>
      </div>
      <div className={styles.account__wrapper}>
        <div className={styles.account__container}>
          <div className={styles.menu}>
            <div className={styles.menu__header}>
              <div className={styles.menu__header__name}>Фамилия Имя</div>
            </div>
            <div>
              <Link href={"/account"}>
                <div className={styles.menu__item}>
                  <Image
                    src="/account/Person.svg"
                    alt="favorites"
                    width={20}
                    height={20}
                  />
                  <div>Профиль</div>
                </div>
              </Link>

              <Link href={"/#"}>
                <div className={styles.menu__item}>
                  <Image
                    src="/account/Bag.svg"
                    alt="favorites"
                    width={20}
                    height={20}
                  />
                  <div>Мои Заказы</div>
                </div>
              </Link>

              <Link href={"/account/wishlist"}>
                <div className={styles.menu__item}>
                  <Image
                    src="/blackHollowHeart.svg"
                    alt="favorites"
                    width={20}
                    height={20}
                  />
                  <div>Избранное</div>

                  <div className={styles.favorites__container}>
                    <FavoriteCount />
                  </div>
                </div>
              </Link>

              <Link href={"/#"}>
                <div className={styles.menu__item}>
                  <Image
                    src="/account/Eyes.svg"
                    alt="favorites"
                    width={20}
                    height={20}
                  />
                  <div>Недавно просмотренное</div>
                </div>
              </Link>

              <Link href={"/#"}>
                <div className={styles.menu__item}>
                  <Image
                    src="/account/Logout.svg"
                    alt="favorites"
                    width={20}
                    height={20}
                  />
                  <div>Выйти</div>
                </div>
              </Link>
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
