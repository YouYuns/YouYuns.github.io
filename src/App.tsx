import React, { useRef, useEffect, useState } from "react";

import "./App.css";
import "./css/Cover.css";
import "./css/Gallery.css";
import "./css/Invitation.css";
import "./css/Location.css";
import "./css/Modal.css";
import "./css/Footer.css";
import "./css/Calendar.css";
import "./css/Contact.css";
import "./css/Navigator.css";
import "./css/Scroll.css";
import "./css/Account.css";
import "./css/SurveryModal.css";
import "./css/Rscvp.css";
import "./css/Link.css";
import "./css/Account.css";

import Cover from "./pages/Cover";
import Invitation from "./pages/Invitation";
import Calendar from "./pages/Calendar";
import Account from "./pages/Account";
import Contact from "./pages/Contact";
import Location from "./pages/Location";
import ImgGallery from "./pages/ImgGallery";
import Scroll from "./pages/Scroll";
import AutoCover from "./pages/AutoCover";
import Rsvp from "./pages/Rsvp";
import Link from "./pages/Link";

import Footer from "./components/Footer";
import Navigator from "./components/Navigator";
import Snowfall from "react-snowfall";

import myMusic from "./media/JOY_Je-Taime.mp3";
import queryString from "query-string";

function App() {
  /* ===========================
     vh 계산 (기존)
  ============================ */
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };

    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  /* ===========================
     기존 상태
  ============================ */
  const [showRsvpModal, setShowRsvpModal] = useState(false);

  const galleryTopRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const rsvpRef = useRef<HTMLDivElement>(null);

  /* ===========================
     🔥 음악 관련 (추가)
  ============================ */
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showMusicOverlay, setShowMusicOverlay] = useState(true);
  const [mode, setMode] = useState<"scroll" | "auto">("auto");
  const handleFirstInteraction = () => {
    if (!audioRef.current) {
      const audio = new Audio(myMusic);
      audio.loop = true;
      audio.muted = false;
      audio.play().catch(() => {});
      audioRef.current = audio;
    } else {
      audioRef.current.muted = false;
      audioRef.current.play().catch(() => {});
    }

    setIsMuted(false); // 🔊 아이콘 변경
    setShowMusicOverlay(false); // 🔥 오버레이 제거
  };

  /* ===========================
     스크롤 유틸 (기존)
  ============================ */
  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return;

    const offset = 80;
    const top =
      ref.current.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  /* ===========================
     RSVP 옵저버 (기존)
  ============================ */
  useEffect(() => {
    if (!rsvpRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowRsvpModal(true);
          }
        });
      },
      { threshold: 1 }
    );

    observer.observe(rsvpRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const parsed = queryString.parse(window.location.search);
    if (parsed.mode === "scroll" || parsed.mode === "auto") {
      // 다음 tick에서 상태 변경
      setTimeout(() => {
        setMode(parsed.mode as "scroll" | "auto");
      }, 0);
    }
  }, []);

  return (
    <div className="App">
      {/* 🔥 전체 화면 음악 오버레이 */}
      {showMusicOverlay && (
        <div
          className="music-overlay"
          onTouchStart={handleFirstInteraction}
          onClick={handleFirstInteraction}
        />
      )}

      {/* 눈 효과 */}
      <Snowfall
        color="pink"
        snowflakeCount={15}
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 9999,
          pointerEvents: "none",
        }}
      />

      <Cover />

      <Navigator
        audioRef={audioRef}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        scrollToGalleryTop={() => scrollTo(galleryTopRef)}
        scrollToLocation={() => scrollTo(locationRef)}
        scrollToGallery={() => scrollTo(galleryRef)}
        scrollToContact={() => scrollTo(contactRef)}
      />

      <div
        ref={galleryTopRef}
        style={{
          position: "relative",
          maxWidth: "480px",
          width: "100%",
          height: mode === "auto" ? "100vh" : "8700px",
        }}
      >
        {mode === "scroll" ? <Scroll /> : <AutoCover />}
      </div>

      <Invitation />
      <Calendar />

      <div ref={galleryRef} className="section">
        <ImgGallery />
      </div>

      <div ref={locationRef} className="section">
        <Location />
      </div>

      <div ref={contactRef} className="section">
        <Contact />
      </div>

      <div ref={rsvpRef}>
        <Rsvp showModal={showRsvpModal} />
      </div>

      <Account />
      <Link />
      <Footer />
    </div>
  );
}

export default App;
