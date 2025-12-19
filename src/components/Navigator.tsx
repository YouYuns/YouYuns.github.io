import React, { useState, useRef, useEffect } from "react";
import playIcon from "../images/play-icon.png";
import stopIcon from "../images/play-stop-icon.png";
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [navTexts, setNavTexts] = useState(["", "", "", ""]);
  const [showMessage, setShowMessage] = useState(true);
  const [clicked, setClicked] = useState(false);
  const audioRef = useRef(new Audio(myMusic));

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isPlaying]);

  // 처음 메시지 애니메이션 + 글자 변경
  useEffect(() => {
    // 1초 뒤에 글자 바꾸고 메시지 fade-out
    const timer1 = setTimeout(() => {
      setShowMessage(false);
    }, 2000);

    // 메시지 사라진 후 네비게이션 글자 표시
    const timer2 = setTimeout(() => {
      setNavTexts(["성호♥소리", "오시는길", "사진첩", "연락처"]);
    }, 2200);

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

        <div
          className="music-control"
          onClick={togglePlay}
          onTouchStart={() => setClicked(true)}
          onTouchEnd={() => setClicked(false)}
        >
          <img
            src={isPlaying ? playIcon : stopIcon}
            alt={isPlaying ? "Play Music" : "Stop Music"}
            className={`music-btn ${clicked ? "clicked" : ""}`}
          />
        </div>
      </nav>
    </div>
  );
};

export default Navigator;
