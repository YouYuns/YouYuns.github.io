import React, { useState, useEffect, useRef } from "react";
import { useFadeUp } from "../hooks/useFadeUp";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

import kakaoMapIcon from "../images/kakao.png";
import naverMapIcon from "../images/naver.webp";
import locationGuide from "../images/location-guide.png";
import upArrow from "../images/up-arrow-button.png";
import downArrow from "../images/down-arrow-button.png";

const Location: React.FC = () => {
  const { ref: locationrRef, show: locationShow } = useFadeUp();
  const { ref: titleRef, show: titleShow } = useFadeUp();
  const { ref: dropdownRef, show: dropdownShow } = useFadeUp();

  // const mapRef = useRef<HTMLDivElement>(null);
  const transportRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const atmRef = useRef<HTMLDivElement>(null);

  const [openTransport, setOpenTransport] = useState(false);
  const [openCar, setOpenCar] = useState(false);
  const [openAtm, setOpenAtm] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  // 약도 이미지 인라인 터치 줌 / 팬 상태
  const [mapScale, setMapScale] = useState(1);
  const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 });
  const touchState = useRef<{
    initialDist: number;
    initialScale: number;
    startX: number;
    startY: number;
    startOffsetX: number;
    startOffsetY: number;
  }>({
    initialDist: 0,
    initialScale: 1,
    startX: 0,
    startY: 0,
    startOffsetX: 0,
    startOffsetY: 0,
  });
  const lastTapRef = useRef<number>(0);
  const zoomBoxRef = useRef<HTMLDivElement | null>(null);

  // 확대 중이거나 2손가락 터치 시 전체 페이지 스크롤을 철저히 차단 (화면 흔들림/어지러움 방지)
  useEffect(() => {
    const el = zoomBoxRef.current;
    if (!el) return;

    const onTouchMoveNative = (e: TouchEvent) => {
      if (mapScale > 1.02 || e.touches.length >= 2) {
        if (e.cancelable) {
          e.preventDefault();
        }
      }
    };

    el.addEventListener("touchmove", onTouchMoveNative, { passive: false });
    return () => el.removeEventListener("touchmove", onTouchMoveNative);
  }, [mapScale]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchState.current.initialDist = dist;
      touchState.current.initialScale = mapScale;
    } else if (e.touches.length === 1) {
      touchState.current.startX = e.touches[0].clientX;
      touchState.current.startY = e.touches[0].clientY;
      touchState.current.startOffsetX = mapOffset.x;
      touchState.current.startOffsetY = mapOffset.y;

      // 더블탭 감지 (300ms 이내 2회 탭 시 2.2배 확대/원래 크기 토글)
      const now = Date.now();
      if (now - lastTapRef.current < 300) {
        if (mapScale > 1.1) {
          setMapScale(1);
          setMapOffset({ x: 0, y: 0 });
        } else {
          setMapScale(2.2);
        }
      }
      lastTapRef.current = now;
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2 && touchState.current.initialDist > 0) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const newScale = Math.min(
        Math.max(1, (dist / touchState.current.initialDist) * touchState.current.initialScale),
        4
      );
      setMapScale(newScale);
    } else if (e.touches.length === 1 && mapScale > 1.05) {
      const deltaX = e.touches[0].clientX - touchState.current.startX;
      const deltaY = e.touches[0].clientY - touchState.current.startY;
      setMapOffset({
        x: touchState.current.startOffsetX + deltaX,
        y: touchState.current.startOffsetY + deltaY,
      });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length < 2) {
      touchState.current.initialDist = 0;
      if (mapScale < 1.05) {
        setMapScale(1);
        setMapOffset({ x: 0, y: 0 });
      }
    }
  };

  const resetMapZoom = () => {
    setMapScale(1);
    setMapOffset({ x: 0, y: 0 });
  };

  const gotoKakaoMap = () => {
    window.location.href =
      "https://map.kakao.com/link/search/왕십리%20디노체%20컨벤션";
  };
  const gotoNavermap = () => {
    window.location.href =
      "https://map.naver.com/v5/search/왕십리%20디노체%20컨벤션";
  };

  return (
    <div className="container between_space">
      <div ref={titleRef} className={`fade-up ${titleShow ? "show" : ""}`}>
        <div className="contact__sub_title">Directions Info</div>
        <div className="contact__title">오시는 길</div>
      </div>

      <div
        ref={locationrRef}
        className={`fade-up ${locationShow ? "show" : ""}`}
      >
        <div className="location__details">
          <div>디노체컨벤션</div>
          <div>서울 성동구 왕십리광장로 17</div>
          <div>비트플렉스 6층</div>
        </div>

        {/* 약도 이미지 (확대 및 팬 시 배경 스크롤 완벽 차단) */}
        <div
          className="location__guide-wrapper"
          style={{ touchAction: mapScale > 1.02 ? "none" : "pan-y" }}
        >
          <div
            ref={zoomBoxRef}
            className="location__guide-zoom-box"
            style={{ touchAction: mapScale > 1.02 ? "none" : "pan-y" }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={locationGuide}
              alt="약도"
              className="location__guide-img"
              style={{
                transform: `scale(${mapScale}) translate(${mapOffset.x / mapScale}px, ${mapOffset.y / mapScale}px)`,
                transition: touchState.current.initialDist === 0 ? "transform 0.2s ease" : "none",
                touchAction: mapScale > 1.02 ? "none" : "pan-y",
              }}
              onClick={() => {
                if (mapScale === 1) {
                  setShowGuideModal(true);
                }
              }}
            />
            {mapScale > 1.1 && (
              <button
                type="button"
                className="location__zoom-reset-btn"
                onClick={resetMapZoom}
              >
                원래 크기로 (1x)
              </button>
            )}
          </div>
        </div>

        {/* 지도 앱 / 웹 이동 버튼 (가로 나란히 2열 배치) */}
        <div className="location__map-icon-box">
          <div className="location__map-item" onClick={gotoKakaoMap}>
            <img
              src={kakaoMapIcon}
              className="location__map-icon"
              alt="kakaoMap"
            />
            <span>카카오지도 열기</span>
          </div>
          <div className="location__map-item" onClick={gotoNavermap}>
            <img
              src={naverMapIcon}
              className="location__map-icon"
              alt="naverMap"
            />
            <span>네이버지도 열기</span>
          </div>
        </div>
      </div>

      <Lightbox
        open={showGuideModal}
        close={() => setShowGuideModal(false)}
        slides={[{ src: locationGuide }]}
        plugins={[Zoom]}
        zoom={{
          maxZoomPixelRatio: 5,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          pinchZoomDistanceFactor: 50,
          scrollToZoom: true,
        }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
      />

      <div
        ref={dropdownRef}
        className={`fade-up ${dropdownShow ? "show" : ""}`}
      >
        <div className="location__info">
          {/* 대중교통 안내 */}
          <div className="location__dropdown">
            <div
              className="location__dropdown-header"
              onClick={() => setOpenTransport(!openTransport)}
            >
              <div>
                <span className="icon">🚌</span>
                <span className="location_title">대중교통 안내</span>
              </div>
              <img
                src={openTransport ? upArrow : downArrow}
                alt="arrow"
                className="dropdown-arrow"
              />
            </div>
            <div
              ref={transportRef}
              className={`location__dropdown-content ${
                openTransport ? "open" : ""
              }`}
              onTransitionEnd={(e) => {
                if (e.propertyName === "max-height" && openTransport) {
                  transportRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                  });
                }
              }}
            >
              <div>• 지하철</div>
              <div>2호선, 5호선 왕십리역 6-1번 출구 맞은편</div>
              <div>던킨도너츠 옆 엘리베이터</div>
              <div> &nbsp;</div>
              <div>• 버스</div>
              <div>성동구청, 성동경찰서 하차</div>
              <div>110A, 141, 145, 148, 421, 2015, 2222</div>
            </div>
          </div>

          {/* 자차 안내 */}
          <div className="location__dropdown">
            <div
              className="location__dropdown-header"
              onClick={() => setOpenCar(!openCar)}
            >
              <div>
                <span className="icon">🚗</span>
                <span className="location_title">자차 안내</span>
              </div>
              <img
                src={openCar ? upArrow : downArrow}
                alt="arrow"
                className="dropdown-arrow"
              />
            </div>
            <div
              ref={carRef}
              className={`location__dropdown-content ${openCar ? "open" : ""}`}
              onTransitionEnd={(e) => {
                if (e.propertyName === "max-height" && openCar) {
                  carRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                  });
                }
              }}
            >
              <div>• 주차</div>
              <div>왕십리 민자역사 비트플렉스 5F</div>
              <div>1,200대 주차 가능 / 2시간 무료</div>
              <div>( 5층에 주차해야 찾기 쉬워요 )</div>
            </div>
          </div>

          {/* ATM 안내 */}
          <div className="location__dropdown">
            <div
              className="location__dropdown-header"
              onClick={() => setOpenAtm(!openAtm)}
            >
              <div>
                <span className="icon">🏧</span>
                <span className="location_title">ATM</span>
              </div>
              <img
                src={openAtm ? upArrow : downArrow}
                alt="arrow"
                className="dropdown-arrow"
              />
            </div>
            <div
              ref={atmRef}
              className={`location__dropdown-content ${openAtm ? "open" : ""}`}
              onTransitionEnd={(e) => {
                if (e.propertyName === "max-height" && openAtm) {
                  atmRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                  });
                }
              }}
            >
              <div>
                웨딩홀이 위치한 5, 6층에는 별도의 ATM이 없어,
                비트플렉스 건물에 위치한 ATM을 안내드립니다.
              </div>
              <div> &nbsp;</div>
              <div>
                비트플렉스 건물 3층 이마트 앞에 ATM이 있으나 다소
                찾기 어려우니, 위치를 미리 확인하시고 이용해 주세요.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
