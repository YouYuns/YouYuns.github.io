import { useState, useMemo } from "react";
import queryString from "query-string";
import "../css/Cover.css";
import mainImg from "../images/main.webp";
import main1Img from "../images/main1.webp";

interface CoverProps {
  onDone?: () => void;
}

// CSS의 coverFadeOut animation-delay(3s)와 맞춰야 함
const FADE_OUT_DELAY = 3000;

function Cover({ onDone }: CoverProps) {
  const [loaded, setLoaded] = useState(false);

  const { coverImg, isH1Mode } = useMemo(() => {
    const parsed = queryString.parse(window.location.search);
    const h1 = parsed.mode === "h1";
    return { coverImg: h1 ? main1Img : mainImg, isH1Mode: h1 };
  }, []);

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
        className={`cover-bg-img${isH1Mode ? " h1-mode" : ""}`}
        src={coverImg}
        alt=""
        loading="eager"
        decoding="async"
        fetchPriority="high"
        onLoad={handleImageLoad}
      />

      <div className="cover-overlay" />

      {/* 🔄 로딩 인디케이터 */}
      {!loaded && <div className="cover-loader" />}

      <div className={`cover-texts${isH1Mode ? " h1-mode" : ""}`}>
        {isH1Mode ? (
          <>
            <div className="center-text">
              <span className="text-love">애들아</span>
            </div>
            <div className="text-bottom">
              <span className="text-life h1-text">나 장가간다</span>
            </div>
          </>
        ) : (
          <>
            <div className="center-text">
              <span className="text-love">LOVE</span>
              <span className="text-is">OF</span>
            </div>
            <div className="text-bottom">
              <span className="text-life">LIFE</span>
              <span className="line"></span>
            </div>
          </>
        )}
      </div>

      <div className="cover-footer">
        <span className="footer-left">wedding</span>
        <span className="footer-right">invitation</span>
      </div>
    </div>
  );
}

export default Cover;
