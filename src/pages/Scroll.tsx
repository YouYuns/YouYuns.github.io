import React, { useEffect, useState } from 'react';
import p1 from '../images/1.jpg';
import p2 from '../images/2.jpg';
import p3 from '../images/3.jpg';
import p4 from '../images/4.jpg';
import p5 from '../images/5.jpg';
import p6 from '../images/6.jpg';
import p7 from '../images/7.jpg';
import p8 from '../images/8.jpg';

const images = [p1, p2, p3, p4, p5, p6, p7, p8];

const IMAGE_UNIT = 1150;        // 이미지당 스크롤 길이
const START_Z = -5000;         // 시작 깊이
const END_Z = 0;
const START_Z_FIRST = -500; // 첫 번째 이미지 시작 깊이
const START_Z_OTHERS = START_Z; // 나머지는 기존 START_Z
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

const Scroll: React.FC = () => {
  const [zs, setZs] = useState<number[]>(
    images.map((_, i) => (i === 0 ? 0 : START_Z))
  );
  const [opacities, setOpacities] = useState<number[]>(
    images.map((_, i) => (i === 0 ? 1 : 0))
  );

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;

      const newZs: number[] = [];
      const newOpacities: number[] = [];

  images.forEach((_, index) => {
          const start = index * IMAGE_UNIT;
          const end = start + IMAGE_UNIT;

          const baseZ = index === 0 ? START_Z_FIRST : START_Z_OTHERS;
          let z = baseZ;
          let opacity = 0;

          if (scrollY < start) {
            newZs.push(baseZ);
            newOpacities.push(index === 0 ? 1 : 0);
            return;
          }

          if (scrollY > end) {
            newZs.push(END_Z);
            newOpacities.push(0);
            return;
          }

         const progress = Math.min(Math.max((scrollY - start) / IMAGE_UNIT, 0), 1);
        const easedProgress = index === 0 ? Math.pow(progress, 0.5) : progress;
        z = baseZ + easedProgress * (END_Z - baseZ);

          // 🔹 opacity 계산
          opacity = progress > 1 ? 1 - (progress - 1) / 0.15 : 1;

          newZs.push(z);
          newOpacities.push(opacity);
        });

      setZs(newZs);
      setOpacities(newOpacities);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        perspective: '1200px',
      }}
    >
      {images.map((img, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate3d(-50%, -50%, ${zs[index]}px)`,
            opacity: opacities[index],
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            src={img}
            alt={`gallery-${index}`}
            style={{ width: '100%', borderRadius: '16px' }}
          />

          <div
            style={{
              marginTop: '15px',
              fontFamily: 'KimNamyun, sans-serif',
              fontSize: '1.2rem',
              lineHeight: '25px',
              textAlign: 'center',
              opacity: 1,
            }}
          >
            {imageTexts[index]}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Scroll;
