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

import g1 from "../images/gallery-1.webp";
import g2 from "../images/gallery-2.webp";
import g3 from "../images/gallery-3.webp";
import g4 from "../images/gallery-4.webp";
import g5 from "../images/gallery-5.webp";
import g6 from "../images/gallery-6.webp";
import g7 from "../images/gallery-7.webp";
import g8 from "../images/gallery-8.webp";
import g9 from "../images/gallery-9.webp";
import g10 from "../images/gallery-10.webp";
import g11 from "../images/gallery-11.webp";
import g12 from "../images/gallery-12.webp";
import g13 from "../images/gallery-13.webp";
import g14 from "../images/gallery-14.webp";
import g15 from "../images/gallery-15.webp";
import g16 from "../images/gallery-16.webp";
import g17 from "../images/gallery-17.webp";
import g18 from "../images/gallery-18.webp";
import g19 from "../images/gallery-19.webp";
import g20 from "../images/gallery-20.webp";
import g21 from "../images/gallery-21.webp";

const ImgGallery: React.FC = () => {
  const { ref: titleRef, show: titleShow } = useFadeUp();
  const { ref: ImgGalleryRef, show: ImgGalleryShow } = useFadeUp();

  const images = [
    g1,
    g2,
    g3,
    g4,
    g5,
    g6,
    g7,
    g8,
    g9,
    g10,
    g11,
    g12,
    g13,
    g14,
    g15,
    g16,
    g17,
    g18,
    g19,
    g20,
    g21,
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
            loop={true}
            spaceBetween={10}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[Thumbs]}
            onClick={(swiper) => {
              if (typeof swiper.realIndex === "number") {
                setIndex(swiper.realIndex);
                setOpen(true);
              }
            }}
            className="gallery-main-swiper"
          >
            {images.map((img, idx) => (
              <SwiperSlide
                key={idx}
                className="gallery-main-slide"
              >
                <img
                  src={img}
                  alt={`wedding-photo-${idx + 1}`}
                  className={`gallery-main-img ${img === g5 ? "pos-left" : ""}`}
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
                  className={`gallery-thumb-img ${img === g5 ? "pos-left" : ""}`}
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
        carousel={{ finite: false }}
        slides={images.map((img) => ({ src: img }))}
      />
    </div>
  );
};

export default ImgGallery;
