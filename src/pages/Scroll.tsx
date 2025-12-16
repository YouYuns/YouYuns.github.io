import React, { useRef, useEffect, useState } from 'react';
import p1 from '../images/1.jpg';
import p2 from '../images/2.jpg';
import p3 from '../images/3.jpg';
import p4 from '../images/4.jpg';
import p5 from '../images/5.jpg';
import '../css/Gallery.css';

const images = [p1, p2, p3, p4, p5];
const MAX_SCALE = 1.3;
const IMAGE_SCROLL_RATIO = 1.0;

const imageTexts = [
  "",
   <>성호 그리고 소리<br />저희 결혼합니다.</>,
  <>살아온 환경<br />좋아하는 것<br />취미, 성격도 다른 우리가</>,
  <>이제는 같은 곳을 바라보며<br />나란히 걸어가려 합니다.</>,
  <>추웠던 겨울, 햇살 가득 선물처럼 찾아온<br />소중한 사람과 함께 하루하루 최선을 다해 <br /> 행복하게 살겠습니다.</>,
  <>기쁨과 설렘 가득한<br />그 시작을 함께 축복해 주세요.</>,
];


const ImgGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scales, setScales] = useState<number[]>(
    images.map((_, i) => (i === 0 ? 1 : 0.3))
  );

  const [opacities, setOpacities] = useState<number[]>(
    images.map((_, i) => (i === 0 ? 1 : 0))
  );

  useEffect(() => {
   const handleScroll = () => {
  if (!containerRef.current) return;

  const galleryTop = containerRef.current.offsetTop;
  const scrollTop = window.scrollY - galleryTop;
  const screenHeight = window.innerHeight;
  const IMAGE_SCROLL = screenHeight * IMAGE_SCROLL_RATIO;
  const newScales: number[] = [];
  const newOpacities: number[] = [];


  
    images.forEach((_, index) => {
        const start = index * IMAGE_SCROLL;
      const end = start + IMAGE_SCROLL;

      let scale = index === 0 ? 1 : 0.3;
      let opacity = 0;
      if (index === 0) {
        if (scrollTop <= 0) {
          newScales.push(1);
          newOpacities.push(1);
          return;
        }
      }
      // 🔴 갤러리 시작 전 → 전부 숨김
      if (scrollTop < 0) {
        newScales.push(scale);
        newOpacities.push(0);
        return;
      }

      // ❌ 아직 해당 이미지 차례 아님
      if (scrollTop < start) {
        newScales.push(scale);
        newOpacities.push(0);
        return;
      }

      // ❌ 해당 이미지 끝남
      if (scrollTop > end) {
        newScales.push(MAX_SCALE);
        newOpacities.push(0);
        return;
      }

      // ✅ 활성 구간
      let progress = (scrollTop - start) / IMAGE_SCROLL;
      progress = Math.min(Math.max(progress, 0), 1);

      if (index === 0) {
        scale = 1 + progress * (MAX_SCALE - 1);
      } else {
        scale = 0.3 + progress * (MAX_SCALE - 0.3);
      }

      scale = Math.min(scale, MAX_SCALE);

      opacity = 1;
      if (progress > 0.85) {
        opacity = 1 - (progress - 0.85) / 0.15;
      }

      newScales.push(scale);
      newOpacities.push(opacity);
    });

    setScales(newScales);
    setOpacities(newOpacities);
  };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기값 적용
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
 const galleryScrollHeight =
  images.length * window.innerHeight * IMAGE_SCROLL_RATIO;
  const spacerHeight = window.innerHeight; // ⭐ 이게 핵심

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      
      {/* 🔥 이미지 연출 구간 */}
     <div style={{ height: galleryScrollHeight }}>
          {images.map((img, index) => (
            <div
              key={index}
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) scale(${scales[index]})`,
                opacity: opacities[index],
                transition: 'transform 0.1s linear, opacity 0.1s linear',
                width: '80%',
                display: 'flex',
                flexDirection: 'column', // 세로 정렬
                alignItems: 'center',    // 가운데 정렬
                pointerEvents: 'none',
              }}
            >
              {/* 이미지 */}
              <img
                src={img}
                alt={`gallery-${index}`}
                style={{ width: '100%', height: 'auto', borderRadius: '16px' }}
              />

              {/* 이미지 바로 아래 글자 */}
              <div
                style={{
                  marginTop: '15px',                   // 이미지와 띄움
                  fontFamily: 'KimNamyun, sans-serif', // 원하는 폰트
                  fontSize: '1.2rem',
                  lineHeight: '25px',
                  color: '#333',
                  textAlign: 'center',
                  opacity: opacities[index],           // 이미지와 함께 나타나도록
                  transition: 'opacity 0.1s linear',
                }}
              >
                {imageTexts[index]}
              </div>
            </div>
          ))}
        </div>

      {/* 🔥 다음 컴포넌트 밀어내는 스페이서 */}
      <div style={{ height: spacerHeight }} />
    </div>
  );
};

export default ImgGallery;
