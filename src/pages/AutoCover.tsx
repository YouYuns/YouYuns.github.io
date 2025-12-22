import React, { useEffect, useState } from "react";
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
    가을 하늘처럼 맑고 깊은
    <br /> 사랑으로 함께하겠습니다.
  </>,
  <>
    <br /> 소중한 분들을 초대합니다.
  </>,
  <>
    살아온 환경
    <br />
    좋아하는 것
    <br />
    취미, 성격도 다른 우리가
  </>,
  <>
    이제는 같은 곳을 바라보며
    <br />
    나란히 걸어가려 합니다.
  </>,
  <>
    추웠던 겨울, 햇살 가득 선물처럼 찾아온
    <br />
    소중한 사람과 함께
    <br />
    행복하게 살겠습니다.
  </>,
  <>
    기쁨과 설렘 가득한
    <br />그 시작을 함께 축복해 주세요.
  </>,
];

const AutoCover: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="autocover-container"
      style={{
        position: "relative", // 부모는 relative
        width: "100%",
        maxWidth: "480px",
        margin: "0 auto",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {images.map((img, i) => (
        <div
          key={i}
          className={`autocover-item ${i === index ? "active" : ""}`}
          style={{
            position: "absolute", // 겹치게
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            maxWidth: "480px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: i === index ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        >
          <div
            className="caption"
            style={{
              fontFamily: "KimNamyun, sans-serif",
              fontSize: "1.8rem",
              lineHeight: "40px",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            {imageTexts[i]}
          </div>
          <img
            src={img}
            alt={`auto-${i}`}
            style={{
              width: "100%",
              maxWidth: "480px",
              borderRadius: "16px",
              display: "block",
              height: "auto",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default AutoCover;
