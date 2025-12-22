import React, { useEffect, useState } from "react";
import "../css/AutoCover.css"; // CSS 파일 임포트
import p1 from "../images/1.jpg";
import p2 from "../images/2.jpg";
import p3 from "../images/3.jpg";
import p4 from "../images/4.jpg";
import p5 from "../images/5.jpg";
import p6 from "../images/6.jpg";
import p7 from "../images/7.jpg";
import p8 from "../images/8.jpg";

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
    살아온 환경, 좋아하는 것<br />
    취미, 성격도 다른 우리가
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
    가을 하늘처럼 맑고 깊은
    <br />
    사랑으로 함께하겠습니다.
  </>,
  <>
    추웠던 겨울, 햇살 가득 선물처럼 찾아온
    <br />
    소중한 사람과 함께 행복하게 살겠습니다.
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
  useEffect(() => {
    // 3초 후에 시작 (예: Cover 애니메이션 끝난 후)
    const timer = setTimeout(() => {
      setStart(true);
    }, 3000); // 3000ms = 3초
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!start) return; // start가 false면 타이머 실행 안함
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [start]);

  // 스크롤 감지
  useEffect(() => {
    const onScroll = () => {
      if (!hasScrolled && window.scrollY > 5) {
        setHasScrolled(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasScrolled]);

  return (
    <>
      <div className="autocover-container">
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
