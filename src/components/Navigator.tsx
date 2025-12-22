import React, { useEffect, useState } from "react";
import playIcon from "../images/play-icon.png";
import stopIcon from "../images/play-stop-icon.png";

interface NavigatorProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;

  scrollToGalleryTop: () => void;
  scrollToContact: () => void;
  scrollToLocation: () => void;
  scrollToGallery: () => void;
}

type NavMode = "hidden" | "help" | "nav";

const Navigator: React.FC<NavigatorProps> = ({
  audioRef,
  isMuted,
  setIsMuted,
  scrollToGalleryTop,
  scrollToContact,
  scrollToGallery,
  scrollToLocation,
}) => {
  const [clicked, setClicked] = useState(false);
  const [navMode, setNavMode] = useState<NavMode>("hidden");
  const [navTexts, setNavTexts] = useState(["", "", "", ""]);

  /* =========================
     Cover 종료 후 타이밍
  ========================= */
  useEffect(() => {
    const helpTimer = setTimeout(() => {
      setNavMode("help");
    }, 4000);

    const navTimer = setTimeout(() => {
      setNavTexts(["성호♥소리", "오시는길", "사진첩", "연락처"]);
      setNavMode("nav");
    }, 7800);

    return () => {
      clearTimeout(helpTimer);
      clearTimeout(navTimer);
    };
  }, []);

  /* =========================
     음악 버튼 클릭 / 터치
     - 도움말 상태에서도 바로 재생
     - navMode 변경과 독립적으로 음소거 상태 유지
  ========================= */
  const handleMusicClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    // 토글 음소거
    const nextMuted = !isMuted;
    audio.muted = nextMuted;
    setIsMuted(nextMuted);

    // 음소거 해제 시 일시정지 상태면 바로 재생
    if (!nextMuted && audio.paused) {
      audio.play().catch(() => {});
    }
  };

  return (
    <div className="container-nav">
      <nav className="top-nav">
        {/* ===== 도움말 ===== */}
        {navMode === "help" && (
          <div className="nav-help fade-in-out-long">
            화면을 터치하면 배경음악이 재생됩니다.
          </div>
        )}

        {/* ===== 네비 ===== */}
        {navMode === "nav" && (
          <div className="nav-items">
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
        )}

        {/* 🎵 음악 버튼 (항상 표시) */}
        <div
          className="music-control"
          onClick={handleMusicClick}
          onTouchStart={() => setClicked(true)}
          onTouchEnd={() => setClicked(false)}
        >
          <img
            src={isMuted ? stopIcon : playIcon}
            className={`music-btn ${clicked ? "clicked" : ""}`}
            alt="music"
          />
        </div>
      </nav>
    </div>
  );
};

export default Navigator;
