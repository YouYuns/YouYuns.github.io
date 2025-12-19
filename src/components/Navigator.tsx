import React, { useState, useRef, useEffect } from "react";
import playIcon from "../images/play-icon.png"; // 음소거 상태 아이콘
import stopIcon from "../images/play-stop-icon.png"; // 음소거 해제 아이콘
import myMusic from "../media/JOY_Je-Taime.mp3";

interface NavigatorProps {
  scrollToGalleryTop: () => void;
  scrollToContact: () => void;
  scrollToLocation: () => void;
  scrollToGallery: () => void;
}

const Navigator: React.FC<NavigatorProps> = ({
  scrollToGalleryTop,
  scrollToContact,
  scrollToGallery,
  scrollToLocation,
}) => {
  const [isMuted, setIsMuted] = useState(true); // 처음 음소거 상태
  const [navTexts, setNavTexts] = useState(["", "", "", ""]);
  const [showMessage, setShowMessage] = useState(true);
  const [clicked, setClicked] = useState(false);
  const audioRef = useRef(new Audio(myMusic));

  // 음소거 토글
  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    // 첫 클릭 시 음악 시작
    if (audio.paused) {
      audio.loop = true;
      audio.play().catch((err) => console.log("자동재생 실패:", err));
    }

    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  // 처음 메시지 애니메이션 + 네비게이션 글자 표시
  useEffect(() => {
    const timer1 = setTimeout(() => setShowMessage(false), 2000);
    const timer2 = setTimeout(
      () => setNavTexts(["성호♥소리", "오시는길", "사진첩", "연락처"]),
      2200
    );
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="container-nav">
      {/* 처음 메시지 */}
      {showMessage && (
        <div className="music-message fade-in-out">
          음소거 해제 시 배경음악이 재생됩니다.
        </div>
      )}

      <nav className="top-nav">
        <div style={{ display: "flex", gap: "20px" }}>
          <div className="nav-item" onClick={scrollToGalleryTop}>
            {navTexts[0]}
          </div>
          <div className="nav-item" onClick={scrollToLocation}>
            {navTexts[1]}
          </div>
          <div className="nav-item" onClick={scrollToGallery}>
            {navTexts[2]}
          </div>
          <div className="nav-item" onClick={scrollToContact}>
            {navTexts[3]}
          </div>
        </div>

        {/* 음소거 토글 버튼 */}
        <div
          className="music-control"
          onClick={toggleMute}
          onTouchStart={() => setClicked(true)}
          onTouchEnd={() => setClicked(false)}
        >
          <img
            src={isMuted ? stopIcon : playIcon} // 음소거 상태에 따라 아이콘 변경
            alt={isMuted ? "음소거 해제" : "음소거"}
            className={`music-btn ${clicked ? "clicked" : ""}`}
          />
        </div>
      </nav>
    </div>
  );
};

export default Navigator;
