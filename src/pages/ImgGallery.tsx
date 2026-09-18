import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/thumbs";

import { useFadeUp } from "../hooks/useFadeUp";

import p1 from "../images/1.webp";
import p2 from "../images/2.webp";
import p3 from "../images/3.webp";
import p4 from "../images/4.webp";
import p5 from "../images/5.webp";
import p6 from "../images/6.webp";
import p7 from "../images/7.webp";
import p8 from "../images/8.webp";
import p9 from "../images/9.webp";
import p10 from "../images/10.webp";
import p11 from "../images/11.webp";
import p12 from "../images/12.webp";
import p13 from "../images/13.webp";
import p14 from "../images/14.webp";
import p15 from "../images/15.webp";
import p16 from "../images/16.webp";
import p17 from "../images/17.webp";
import p18 from "../images/18.webp";
import p19 from "../images/19.webp";
import p20 from "../images/20.webp";
import p21 from "../images/21.webp";
import p22 from "../images/22.webp";
import p23 from "../images/23.webp";
import p24 from "../images/24.webp";
import p25 from "../images/25.webp";
import p26 from "../images/26.webp";

const ImgGallery: React.FC = () => {
  const { ref: titleRef, show: titleShow } = useFadeUp();
  const { ref: ImgGalleryRef, show: ImgGalleryShow } = useFadeUp();

  const images = [
    p1,
    p2,
    p3,
    p4,
    p5,
    p6,
    p7,
    p8,
    p9,
    p10,
    p11,
    p12,
    p13,
    p14,
    p15,
    p16,
    p17,
    p18,
    p19,
    p20,
    p21,
    p22,
    p23,
    p24,
    p25,
    p26,
  ];

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  /* =========================
     모바일 뒤로가기 버튼 / 제스처로 사진 확대창 닫기
  ========================= */
  useEffect(() => {
    if (!open) return;

    window.history.pushState({ lightboxOpen: true }, "");

    const handlePopState = () => {
      setOpen(false);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      if (window.history.state?.lightboxOpen) {
        window.history.back();
      }
    };
  }, [open]);

  return (
    <div className="container between_space">
      <div ref={titleRef} className={`fade-up ${titleShow ? "show" : ""}`}>
        <div className="contact__sub_title">Photo Album</div>
        <div className="contact__title">사진첩</div>
      </div>

      <div
        ref={ImgGalleryRef}
        className={`fade-up ${ImgGalleryShow ? "show" : ""}`}
        style={{ width: "100%" }}
      >
        <div className="gallery-slide-container">
          {/* Main Swiper */}
          <Swiper
            spaceBetween={10}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[Thumbs]}
            className="gallery-main-swiper"
          >
            {images.map((img, idx) => (
              <SwiperSlide
                key={idx}
                onClick={() => {
                  setIndex(idx);
                  setOpen(true);
                }}
                className="gallery-main-slide"
              >
                <img
                  src={img}
                  alt={`wedding-photo-${idx + 1}`}
                  className="gallery-main-img"
                  loading={idx < 4 ? "eager" : "lazy"}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbnail Swiper */}
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={8}
            slidesPerView={5}
            freeMode
            watchSlidesProgress
            modules={[Thumbs, Navigation]}
            navigation
            className="gallery-thumb-swiper"
          >
            {images.map((img, idx) => (
              <SwiperSlide key={idx} className="gallery-thumb-slide">
                <img
                  src={img}
                  alt={`thumb-${idx + 1}`}
                  className="gallery-thumb-img"
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* 라이트박스 전체화면 뷰 */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={images.map((img) => ({ src: img }))}
      />
    </div>
  );
};

export default ImgGallery;
