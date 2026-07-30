import React, { useEffect, useState, useRef } from "react";
import "../css/AutoCover.css"; // CSS 파일 임포트
import p1 from "../images/1.webp";
import p2 from "../images/2.webp";
import p3 from "../images/3.webp";
import p4 from "../images/4.webp";
import p5 from "../images/5.webp";
import p6 from "../images/6.webp";
import p7 from "../images/7.webp";
import p8 from "../images/8.webp";

const images = [p1, p2, p3, p4, p5, p6, p7, p8];

const imageTexts = [
  <>
    2026년 11월 14일
    <br />
    왕십리 디노체 컨벤션
  </>,
  <>
    성호 그리고 소리
    <br />
    저희 결혼합니다.
  </>,
  <>
    첫눈에 반한 설렘은,
    <br />
    서로 닮은 가치관을 만나 확신이 되어
  </>,
  <>
    이제는 같은 곳을 바라보며
    <br />
    나란히 걸어가려 합니다.
  </>,
  <>
    그 이야기가 시작되는 순간에
    <br />
    함께 축하해 주시길 바랍니다.
  </>,
  <>
    더웠던 여름, 소나기 뒤 무지개처럼 찾아온
    <br />
    소중한 사람과 함께 행복하게 살겠습니다.
  </>,
  <>
    겨울 햇살처럼 잔잔하고 따뜻한
    <br />
    사랑으로 함께하겠습니다.
  </>,
  <>
    기쁨과 설렘 가득한
    <br />그 시작을 함께 축복해 주세요.
  </>,
];

const AutoCover: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [start, setStart] = useState(false);

  const intervalRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  /* =========================
     시작 타이머
  ========================= */
  useEffect(() => {
    const timer = setTimeout(() => setStart(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  /* =========================
     자동 슬라이드
  ========================= */
  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5500);
  };

  useEffect(() => {
    if (!start) return;

    startAutoSlide();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [start]);

  /* =========================
     스크롤 감지
  ========================= */
  useEffect(() => {
    const onScroll = () => {
      if (!hasScrolled && window.scrollY > 5) setHasScrolled(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasScrolled]);

  /* =========================
     터치 슬라이드 (스와이프로 수동 이동, 자동 슬라이드는 계속 진행)
  ========================= */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    }
  };

  const handleTouchEnd = () => {
    if (touchDeltaX.current > 50) {
      // 오른쪽으로 스와이프 -> 이전 이미지
      setIndex((prev) => (prev - 1 + images.length) % images.length);
    } else if (touchDeltaX.current < -50) {
      // 왼쪽으로 스와이프 -> 다음 이미지
      setIndex((prev) => (prev + 1) % images.length);
    }

    // 터치 상태 초기화
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  return (
    <>
      <div
        className="autocover-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className={`autocover-item ${i === index ? "active" : ""}`}
          >
            <div className="caption">{imageTexts[i]}</div>
            <img src={img} alt={`auto-${i}`} />
          </div>
        ))}
      </div>

      {!hasScrolled && (
        <div className="scroll-guide">
          <div className="arrow">
            <img src="https://i.ibb.co/BTbSmBS/1.png" alt="scroll" />
          </div>
          <div className="arrow">
            <img src="https://i.ibb.co/BTbSmBS/1.png" alt="scroll" />
          </div>
        </div>
      )}
    </>
  );
};

export default AutoCover;
