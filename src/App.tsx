import React, { useRef, useEffect, useMemo, useState } from "react";

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

import myMusic from "./media/JOY_Je-Taime.m4a";
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
  const [isMuted, setIsMuted] = useState(true);
  const [mode, setMode] = useState<"scroll" | "auto">("auto");
  const [coverDone, setCoverDone] = useState(false);

  /* =========================
     🩷 하트 눈송이 (캔버스에 직접 그려서 비동기 로딩 없이 즉시 사용)
  ============================ */
  const snowflakeImages = useMemo(() => {
    // 머티리얼 아이콘 favorite 하트와 동일한, 검증된 매끈한 하트 실루엣 (24x24 기준)
    const heartPath = new Path2D(
      "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    );

    const drawHeart = (color: string) => {
      const size = 56;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;

      ctx.save();
      ctx.scale(size / 24, size / 24);
      ctx.fillStyle = color;
      ctx.fill(heartPath);
      ctx.restore();

      return canvas;
    };

    return ["#f7a8bd", "#f38ba9", "#fbd0da"].map(drawHeart);
  }, []);

  /* =========================
     🔥 음악 자동재생 (막히면 첫 상호작용에서 조용히 재생)
  ============================ */
  useEffect(() => {
    const audio = new Audio(myMusic);
    const START_TIME = 4; // 앞 4초는 건너뛰고 시작 (반복 시에도 동일하게 적용)
    audio.loop = false;
    audio.muted = false;
    audioRef.current = audio;

    const seekToStart = () => {
      try {
        audio.currentTime = START_TIME;
      } catch {}
    };

    seekToStart();
    audio.addEventListener("loadedmetadata", seekToStart);

    const handleEnded = () => {
      seekToStart();
      audio.play().catch(() => {});
    };
    audio.addEventListener("ended", handleEnded);

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
      audio.removeEventListener("loadedmetadata", seekToStart);
      audio.removeEventListener("ended", handleEnded);
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
      {/* 하트 눈 효과 */}
      <Snowfall
        images={snowflakeImages}
        snowflakeCount={6}
        radius={[5, 9]}
        speed={[0.5, 1.5]}
        wind={[-0.3, 0.5]}
        rotationSpeed={[-1, 1]}
        opacity={[0.6, 1]}
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
