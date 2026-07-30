import { useState } from "react";
import "../css/Cover.css";
import mainImg from "../images/main.webp";

interface CoverProps {
  onDone?: () => void;
}

// CSS의 coverFadeOut animation-delay(3s)와 맞춰야 함
const FADE_OUT_DELAY = 3000;

function Cover({ onDone }: CoverProps) {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    // 이미지 로딩 완료 후 1초 딜레이 후 loaded 상태 변경
    setTimeout(() => {
      setLoaded(true);
      // 사진이 사라지기 시작하는 시점에 맞춰 네비게이션도 같이 나타나도록 알림
      setTimeout(() => {
        onDone?.();
      }, FADE_OUT_DELAY);
    }, 1000);
  };

  return (
    <div className={`cover-container ${loaded ? "loaded" : ""}`}>
      {/* 배경 이미지 */}
      <img
        className="cover-bg-img"
        src={mainImg}
        alt=""
        loading="eager"
        decoding="async"
        fetchPriority="high"
        onLoad={handleImageLoad}
      />

      <div className="cover-overlay" />

      {/* 🔄 로딩 인디케이터 */}
      {!loaded && <div className="cover-loader" />}

      <div className="cover-texts">
        <div className="center-text">
          <span className="text-love">LOVE</span>
          <span className="text-is">OF</span>
        </div>

        <div className="text-bottom">
          <span className="text-life">LIFE</span>
          <span className="line"></span>
        </div>
      </div>

      <div className="cover-footer">
        <span className="footer-left">wedding</span>
        <span className="footer-right">invitation</span>
      </div>
    </div>
  );
}

export default Cover;
