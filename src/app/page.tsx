import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <div className={styles.top_slider_container}>
        <ul className={styles.top_slider_list}>
          <li className={styles.top_slider_item}>
            <Image src="/main/slider/1.jpg" alt="На главную" layout="fill" />

            <div className={styles.top_slider__info__wrapper}>
              <div className={styles.top_slider__info}>
                <div>
                  <div className={styles.top_slider__info__subtitle}>
                    Подзаголовок 1234
                  </div>
                  <h2 className={styles.top_slider__info__title}>
                    Заголовок 1234
                  </h2>
                </div>
                <div className={styles.top_slider_buttons}>
                  <button className={styles.top_slider_buttons__sub}>
                    <span>Доп кнопка</span>
                  </button>
                  <button className={styles.top_slider_buttons__main}>
                    <span>Осн кнопка</span>
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.top_slider__pager__wrapper}></div>
          </li>

          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>

        <div className={styles.top_slider__btn__wrapper}>
          <div className={styles.top_slider__btn}>
            <button className={styles.top_slider__btn__shape}>
              <Image
              className={styles.top_slider__btn__image}
                src="/main/slider/Left.svg"
                alt="На главную"
                width={24}
                height={24}
              />
            </button>
            <button className={styles.top_slider__btn__shape}>
              <Image
              className={styles.top_slider__btn__image}
                src="/main/slider/Right.svg"
                alt="На главную"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
