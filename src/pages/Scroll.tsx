import React, { useRef, useEffect, useState } from 'react';
import p1 from '../images/1.jpg';
import p2 from '../images/2.jpg';
import p3 from '../images/3.jpg';
import p4 from '../images/4.jpg';
import p5 from '../images/5.jpg';
import p6 from '../images/6.jpg';
import p7 from '../images/7.jpg';
import p8 from '../images/8.jpg';

const images = [p1, p2, p3, p4, p5, p6, p7, p8];

const MAX_SCALE = 1.3;
const IMAGE_SCROLL_RATIO = 1.0;

const imageTexts = [
  '',
  <>성호 그리고 소리<br />저희 결혼합니다.</>,
  <>살아온 환경<br />좋아하는 것<br />취미, 성격도 다른 우리가</>,
  <>이제는 같은 곳을 바라보며<br />나란히 걸어가려 합니다.</>,
  <>추웠던 겨울, 햇살 가득 선물처럼 찾아온<br />소중한 사람과 함께<br />행복하게 살겠습니다.</>,
  <>기쁨과 설렘 가득한<br />그 시작을 함께 축복해 주세요.</>,
  '',
  '',
];

/* ===============================
   📱 모바일 URL 바 대응용 viewport hook
================================ */
const useViewportHeight = () => {
  const [vh, setVh] = useState<number>(() =>
    window.visualViewport?.height || window.innerHeight
  );

  useEffect(() => {
    const update = () => {
      setVh(window.visualViewport?.height || window.innerHeight);
    };

    window.visualViewport?.addEventListener('resize', update);
    window.addEventListener('resize', update);

    return () => {
      window.visualViewport?.removeEventListener('resize', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return vh;
};

const ImgGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportHeight = useViewportHeight();

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
      const IMAGE_SCROLL = viewportHeight * IMAGE_SCROLL_RATIO;

      const newScales: number[] = [];
      const newOpacities: number[] = [];

      images.forEach((_, index) => {
        const start = index * IMAGE_SCROLL;
        const end = start + IMAGE_SCROLL;

        let scale = index === 0 ? 1 : 0.3;
        let opacity = 0;

        // 갤러리 이전
        if (scrollTop < 0) {
          newScales.push(scale);
          newOpacities.push(0);
          return;
        }

        // 아직 차례 아님
        if (scrollTop < start) {
          newScales.push(scale);
          newOpacities.push(0);
          return;
        }

        // 이미 지나감
        if (scrollTop > end) {
          newScales.push(MAX_SCALE);
          newOpacities.push(0);
          return;
        }

        // 활성 구간
        let progress = (scrollTop - start) / IMAGE_SCROLL;
        progress = Math.min(Math.max(progress, 0), 1);

        scale =
          index === 0
            ? 1 + progress * (MAX_SCALE - 1)
            : 0.3 + progress * (MAX_SCALE - 0.3);

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

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [viewportHeight]);

  const galleryScrollHeight =
    images.length * viewportHeight * IMAGE_SCROLL_RATIO;

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {/* 🔥 스크롤 연출 영역 */}
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
              flexDirection: 'column',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            <img
              src={img}
              alt={`gallery-${index}`}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '16px',
              }}
            />

            <div
              style={{
                marginTop: '15px',
                fontFamily: 'KimNamyun, sans-serif',
                fontSize: '1.2rem',
                lineHeight: '25px',
                color: '#333',
                textAlign: 'center',
                opacity: opacities[index],
                transition: 'opacity 0.1s linear',
              }}
            >
              {imageTexts[index]}
            </div>
          </div>
        ))}
      </div>

      {/* 🔽 다음 섹션 밀어내기 */}
      <div style={{ height: viewportHeight }} />
    </div>
  );
};

export default ImgGallery;
