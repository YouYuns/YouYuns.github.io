import React, { useEffect, useState } from "react";
import playIcon from "../images/play-icon.png";
import stopIcon from "../images/play-stop-icon.png";

interface NavigatorProps {
  showNav: boolean;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;

  scrollToGalleryTop: () => void;
  scrollToContact: () => void;
  scrollToLocation: () => void;
  scrollToGallery: () => void;
}

type NavMode = "hidden" | "nav";

const Navigator: React.FC<NavigatorProps> = ({
  showNav,
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
     Cover 종료 신호를 받아 표시 (타이밍 동기화)
  ========================= */
  useEffect(() => {
    if (!showNav) return;
    setNavTexts(["성호♥소리", "사진첩", "오시는길", "연락처"]);
    setNavMode("nav");
  }, [showNav]);

  /* =========================
     화면 활성화 상태에 따른 음악 제어
  ========================= */
  useEffect(() => {
    const handleVisibilityChange = () => {
      const audio = audioRef.current;
      if (!audio) return;

      if (document.visibilityState === "visible") {
        // 화면이 활성화되어 있고 음소거가 아니면 재생
        if (!isMuted && audio.paused) {
          audio.play().catch(() => {});
        }
      } else {
        // 화면 비활성화 시 일시정지
        if (!audio.paused) {
          audio.pause();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [audioRef, isMuted]);

  /* =========================
     음악 버튼 클릭 / 터치
  ========================= */
  const handleMusicClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (!isMuted) {
      // 현재 재생 중 -> 즉시 음소거 (실패할 일이 없는 동작)
      audio.muted = true;
      setIsMuted(true);
      return;
    }

    // 현재 음소거 상태 -> 재생을 실제로 성공했을 때만 "재생 중"으로 표시
    audio.muted = false;
    audio
      .play()
      .then(() => setIsMuted(false))
      .catch(() => {
        audio.muted = true;
      });
  };

  return (
    <div className="container-nav">
      <nav className="top-nav">
        {/* ===== 네비 ===== */}
        {navMode === "nav" && (
          <div className="nav-items">
            <div className="nav-item" onClick={scrollToGalleryTop}>
              {navTexts[0]}
            </div>
            <div className="nav-item" onClick={scrollToGallery}>
              {navTexts[1]}
            </div>
            <div className="nav-item" onClick={scrollToLocation}>
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
            className={`music-btn ${isMuted ? "" : "playing"} ${
              clicked ? "clicked" : ""
            }`}
            alt="music"
          />
        </div>
      </nav>
    </div>
  );
};

export default Navigator;
