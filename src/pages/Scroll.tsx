import React, { useEffect, useState } from "react";
import p1 from "../images/1.webp";
import p2 from "../images/2.webp";
import p3 from "../images/3.webp";
import p4 from "../images/4.webp";
import p5 from "../images/5.webp";
import p6 from "../images/6.webp";
import p7 from "../images/7.webp";
import p8 from "../images/8.webp";

const images = [p1, p2, p3, p4, p5, p6, p7, p8];

const IMAGE_UNIT_FIRST = 200; // ✅ Cover 영역
const IMAGE_UNIT_OTHERS = 1150;

const START_Z = -2000;
const END_Z = 0;
const START_Z_FIRST = -500;

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

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

const Scroll: React.FC = () => {
  const [zs, setZs] = useState<number[]>(
    images.map((_, i) => (i === 0 ? 0 : START_Z))
  );
  const [opacities, setOpacities] = useState<number[]>(
    images.map((_, i) => (i === 0 ? 1 : 0))
  );

  const [hasScrolled, setHasScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;

      if (!hasScrolled && scrollY > 5) {
        setHasScrolled(true);
      }

      const newZs: number[] = [];
      const newOpacities: number[] = [];
      let accumulatedScroll = 0;

      images.forEach((_, index) => {
        const unit = index === 0 ? IMAGE_UNIT_FIRST : IMAGE_UNIT_OTHERS;
        const start = accumulatedScroll;
        const end = start + unit;

        const baseZ = index === 0 ? START_Z_FIRST : START_Z;
        let z = baseZ;
        let opacity = 0;

        if (scrollY < start) {
          newZs.push(baseZ);
          newOpacities.push(index === 0 ? 1 : 0);
          accumulatedScroll += unit;
          return;
        }

        if (scrollY > end) {
          newZs.push(END_Z);
          newOpacities.push(0);
          accumulatedScroll += unit;
          return;
        }

        const progress = Math.min(Math.max((scrollY - start) / unit, 0), 1);
        const eased = easeInOut(progress);

        z = baseZ + eased * (END_Z - baseZ);
        opacity = progress > 0.85 ? 1 - (progress - 0.85) / 0.15 : 1;

        newZs.push(z);
        newOpacities.push(opacity);
        accumulatedScroll += unit;
      });

      setZs(newZs);
      setOpacities(newOpacities);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* 🔽 스크롤 유도 (Cover 이후에만) */}
      {!hasScrolled && (
        <div className="scroll-guide">
          <div className="arrow_div">
            <div className="arrow">
              <img src="https://i.ibb.co/BTbSmBS/1.png" alt="scroll" />
            </div>
            <div className="arrow">
              <img src="https://i.ibb.co/BTbSmBS/1.png" alt="scroll" />
            </div>
          </div>
        </div>
      )}

      {/* 🔽 3D 이미지 스크롤 */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          perspective: "1200px",
        }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translate3d(-50%, -50%, ${zs[index]}px)`,
              opacity: opacities[index],
              maxWidth: "480px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontFamily: "KimNamyun, sans-serif",
                fontSize: "1.8rem",
                lineHeight: "40px",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              {imageTexts[index]}
            </div>

            <img
              src={img}
              alt={`gallery-${index}`}
              style={{ width: "100%", borderRadius: "16px" }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Scroll;
