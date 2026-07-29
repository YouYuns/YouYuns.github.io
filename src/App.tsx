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
// import "./css/Rscvp.css";
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
// import Rsvp from "./pages/Rsvp";
import Link from "./pages/Link";

import Footer from "./components/Footer";
import Navigator from "./components/Navigator";
import Snowfall from "react-snowfall";

import myMusic from "./media/JOY_Je-Taime.mp3";
import queryString from "query-string";

function App() {
  /* ===========================
     이미지 저장 방지 (우클릭 / 롱프레스 메뉴)
  ============================ */
  useEffect(() => {
    const preventImageContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("img")) {
        e.preventDefault();
      }
    };
    // 캡처 단계에서 막아야 라이트박스 등 하위 라이브러리가
    // 이벤트 전파를 막아도(stopPropagation) 확실히 차단됨
    document.addEventListener("contextmenu", preventImageContextMenu, {
      capture: true,
    });
    return () =>
      document.removeEventListener("contextmenu", preventImageContextMenu, {
        capture: true,
      });
  }, []);

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
  // const [showRsvpModal, setShowRsvpModal] = useState(false);

  const galleryTopRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  // const rsvpRef = useRef<HTMLDivElement>(null);

  /* ===========================
     🔥 음악 관련 (추가)
  ============================ */
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [mode, setMode] = useState<"scroll" | "auto">("auto");
  const [coverDone, setCoverDone] = useState(false);

  /* =========================
     🔥 음악 자동재생 (막히면 첫 상호작용에서 조용히 재생)
  ============================ */
  useEffect(() => {
    const audio = new Audio(myMusic);
    audio.loop = true;
    audio.muted = false;
    audioRef.current = audio;

    const startPlayback = () => {
      audio
        .play()
        .then(() => setIsMuted(false))
        .catch(() => {});
    };

    startPlayback();

    const resumeOnInteraction = () => startPlayback();
    window.addEventListener("pointerdown", resumeOnInteraction, { once: true });
    window.addEventListener("keydown", resumeOnInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", resumeOnInteraction);
      window.removeEventListener("keydown", resumeOnInteraction);
      audio.pause();
    };
  }, []);

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
  // useEffect(() => {
  //   if (!rsvpRef.current) return;

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           setShowRsvpModal(true);
  //         }
  //       });
  //     },
  //     { threshold: 1 }
  //   );

  //   observer.observe(rsvpRef.current);
  //   return () => observer.disconnect();
  // }, []);

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
      {/* 눈 효과 */}
      <Snowfall
        color="white"
        snowflakeCount={15}
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 9999,
          pointerEvents: "none",
        }}
      />

      <Cover onDone={() => setCoverDone(true)} />

      <Navigator
        showNav={coverDone}
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
          margin: "0 auto",
     height: mode === "auto" ? "700px" : "8700px",
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

      {/* <div ref={rsvpRef}>
        <Rsvp showModal={showRsvpModal} />
      </div> */}

      <Account />
      <Link />
      <Footer />
    </div>
  );
}

export default App;
