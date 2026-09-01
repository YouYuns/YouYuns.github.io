import React, { useState, useRef } from "react";
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
import p9 from "../images/9.jpg";
import mainImg from "../images/main.webp";
import contact1 from "../images/Contact-1.jpg";
import contact2 from "../images/Contact-2.jpg";

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
    mainImg,
    contact1,
    contact2,
  ];

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // 갤러리 뷰 모드: 'gallery' (가로/세로 매거진 벤토 그리드) | 'slide' (슬라이드형)
  const [viewMode, setViewMode] = useState<"gallery" | "slide">("gallery");
  // 갤러리형 더보기 상태 (기본 6개로 3x3 사각형을 완벽히 채움)
  const [isExpanded, setIsExpanded] = useState(false);

  const firstBlockCenterRef = useRef<HTMLDivElement | null>(null);
  const secondBlockCenterRef = useRef<HTMLDivElement | null>(null);

  const handleToggleExpand = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      // 더보기 클릭 시: 새로 나타난 6장의 사진이 화면 '정중앙'에 오고, 접기 버튼은 그 '밑'에 위치하도록 이동
      setTimeout(() => {
        secondBlockCenterRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }, 200);
    } else {
      setIsExpanded(false);
      // 접기 클릭 시: 기존 첫 번째 사진 묶음이 화면 '정중앙'에 오고, 더보기 버튼은 그 '밑'에 오도록 복귀
      setTimeout(() => {
        firstBlockCenterRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }, 150);
    }
  };

  const displayedImages = isExpanded ? images : images.slice(0, 6);

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
        {/* 모드 전환 아이콘 버튼 (텍스트 없이 심플한 아이콘 2종) */}
        <div className="gallery-mode-toggle">
          {/* 1. 갤러리형 아이콘 (그리드 3x3) */}
          <button
            type="button"
            className={`gallery-mode-btn ${
              viewMode === "gallery" ? "active" : ""
            }`}
            onClick={() => setViewMode("gallery")}
            title="갤러리형 보기"
            aria-label="갤러리형 보기"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h2A1.5 1.5 0 0 1 6 2.5v2A1.5 1.5 0 0 1 4.5 6h-2A1.5 1.5 0 0 1 1 4.5v-2zM2.5 2a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-2zm4.5.5A1.5 1.5 0 0 1 8.5 1h2A1.5 1.5 0 0 1 12 2.5v2A1.5 1.5 0 0 1 10.5 6h-2A1.5 1.5 0 0 1 7 4.5v-2zM8.5 2a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-2zm4.5.5A1.5 1.5 0 0 1 14.5 1h.5a.5.5 0 0 1 .5.5v3.5a1.5 1.5 0 0 1-1.5 1.5h-1a.5.5 0 0 1-.5-.5v-3.5zm-12 5A1.5 1.5 0 0 1 2.5 7h2A1.5 1.5 0 0 1 6 8.5v2A1.5 1.5 0 0 1 4.5 12h-2A1.5 1.5 0 0 1 1 10.5v-2zM2.5 8a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-2zm4.5.5A1.5 1.5 0 0 1 8.5 7h2A1.5 1.5 0 0 1 12 8.5v2a1.5 1.5 0 0 1-1.5 1.5h-2A1.5 1.5 0 0 1 7 10.5v-2zm1.5-.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-2zm-6 6A1.5 1.5 0 0 1 2.5 13h2a1.5 1.5 0 0 1 1.5 1.5v.5a.5.5 0 0 1-.5.5h-3A1.5 1.5 0 0 1 1 14.5v-1a.5.5 0 0 1 .5-.5zm6 0a1.5 1.5 0 0 1 1.5-1.5h2a1.5 1.5 0 0 1 1.5 1.5v.5a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-.5z" />
            </svg>
          </button>

          {/* 2. 슬라이드형 아이콘 */}
          <button
            type="button"
            className={`gallery-mode-btn ${
              viewMode === "slide" ? "active" : ""
            }`}
            onClick={() => setViewMode("slide")}
            title="슬라이드형 보기"
            aria-label="슬라이드형 보기"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-9zM3 4v8h10V4H3z" />
              <path d="M0 5.5a.5.5 0 0 1 .5-.5H1v6H.5a.5.5 0 0 1-.5-.5v-5zm15 0a.5.5 0 0 1 .5-.5h.5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-.5v-6z" />
            </svg>
          </button>
        </div>

        {/* 1. 갤러리형 뷰 (매거진 벤토 콜라주 그리드: 6개 단위 무한 확장 지원) */}
        {viewMode === "gallery" && (
          <div className="gallery-grid-container">
            <div className="gallery-grid-layout">
              {displayedImages.map((img, idx) => (
                <div
                  key={idx}
                  ref={
                    idx === 8
                      ? secondBlockCenterRef
                      : idx === 2
                      ? firstBlockCenterRef
                      : null
                  }
                  className={`gallery-grid-item bento-${idx % 6}`}
                  onClick={() => {
                    setIndex(idx);
                    setOpen(true);
                  }}
                >
                  <img
                    src={img}
                    alt={`wedding-photo-${idx + 1}`}
                  />
                </div>
              ))}
            </div>

            {images.length > 6 && (
              <div className="gallery-more-btn-wrap">
                <button
                  type="button"
                  className="gallery-more-btn"
                  onClick={handleToggleExpand}
                >
                  {isExpanded ? "사진 접기 ▴" : "사진 더보기 ▾"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* 2. 슬라이드형 뷰 (갤러리형 3x3 전체 판 크기와 일치) */}
        {viewMode === "slide" && (
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
                    alt={`slide-${idx}`}
                    className="gallery-main-img"
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
                    alt={`thumb-${idx}`}
                    className="gallery-thumb-img"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>

      {/* 확대/돋보기 제거된 라이트박스 */}
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
