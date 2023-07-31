"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

import styles from "./mainslider.module.css";
import { typeSlides } from "@/app/page";

export const Image_Gallery: React.FC<{
  slides: typeSlides[];
  interval: number;
}> = ({ slides, interval }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [percentDuration, setPercentDuration] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (percentDuration === 100) {
        if (currentSlideIndex === slides.length - 1) {
          setCurrentSlideIndex(0);
        } else {
          setCurrentSlideIndex((prev) => prev + 1);
        }
        setPercentDuration(0);
      } else {
        setPercentDuration((prev) => prev + 1);
      }
    }, interval * 10);
    return () => clearInterval(timer);
  }),
    [percentDuration, currentSlideIndex];

  const previousSlide = () => {
    const previous =
      currentSlideIndex === 0 ? slides.length - 1 : currentSlideIndex - 1;
    setCurrentSlideIndex(previous);
    setPercentDuration(0);
  };

  const nextSlide = () => {
    const next =
      currentSlideIndex === slides.length - 1 ? 0 : currentSlideIndex + 1;
    setCurrentSlideIndex(next);
    setPercentDuration(0);
  };

  const changeSlide = (index: number) => {
    setCurrentSlideIndex(index);
    setPercentDuration(0);
  };

  return (
    <section className={styles.top_slider_container}>
      <ul className={styles.top_slider_list}>
        {slides.map((slide, index) => {
          const isActive = index === currentSlideIndex;
          const isPrevious =
            index ===
            (currentSlideIndex === 0
              ? slides.length - 1
              : currentSlideIndex - 1);
          const isNext =
            index ===
            (currentSlideIndex === slides.length - 1
              ? 0
              : currentSlideIndex + 1);
          return (
            <li
              className={`${styles.top_slider_item} ${
                isActive ? styles.active : ""
              }${isPrevious ? styles.previous : ""}${
                isNext ? styles.next : ""
              }`}
              key={index}
            >
              <Image
                src={slide.bg_img}
                alt={slide.bg_img_alt}
                fill={true}
                priority={true}
              />
              <div className={styles.top_slider__info__wrapper}>
                <div className={styles.top_slider__info}>
                  <div>
                    <div className={styles.top_slider__info__subtitle}>
                      {slide.subtitle}
                    </div>
                    <h2 className={styles.top_slider__info__title}>
                      {slide.title}
                    </h2>
                  </div>
                  <div className={styles.top_slider_buttons}>
                    <button className={styles.top_slider_buttons__sub}>
                      <span>{slide.btn_sub}</span>
                    </button>
                    <button className={styles.top_slider_buttons__main}>
                      <span>{slide.btn_main}</span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.top_slider__btn__wrapper}>
        <div className={styles.top_slider__btn}>
          <button
            className={styles.top_slider__btn__shape}
            onClick={previousSlide}
          >
            <Image
              className={styles.top_slider__btn__image}
              src="/main/slider/Left.svg"
              alt="На главную"
              width={24}
              height={24}
            />
          </button>
          <button className={styles.top_slider__btn__shape} onClick={nextSlide}>
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

      <div className={styles.top_slider__pager__wrapper}>
        <ul className={styles.top_slider__pager}>
          {slides.map((_, index) => (
            <li
              key={index}
              className={styles.top_slider__pager__item}
              onClick={() => changeSlide(index)}
            >
              <div className={styles.top_slider__pager__id}>0{index + 1}</div>
              <div>
                {currentSlideIndex === index && (
                  <div
                    className={`${styles.top_slider__pager__progress_line_active}`}
                    style={{ width: `${percentDuration}%` }}
                  />
                )}
                <div className={styles.top_slider__pager__progress_line} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default dynamic(() => Promise.resolve(Image_Gallery), { ssr: false });
