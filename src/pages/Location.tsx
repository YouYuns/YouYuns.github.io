import React, { useRef, useState } from "react";
import kakaoMapIcon from "../images/kakao.png";
import naverMapIcon from "../images/naver.webp";
import upArrow from "../images/up-arrow-button.png";
import downArrow from "../images/down-arrow-button.png";
import locationGuide from "../images/location-guide.png";
import { useFadeUp } from "../hooks/useFadeUp";

/* 카카오 지도 주석처리 (약도 이미지로 대체)
declare global {
  interface Window {
    kakao?: KakaoStatic;
  }
}

interface KakaoStatic {
  maps: {
    load(callback: () => void): void;
    LatLng: new (lat: number, lng: number) => LatLng;
    Map: new (container: HTMLElement, options: MapOptions) => MapInstance;
    Marker: new (options: MarkerOptions) => MarkerInstance;
  };
}

interface LatLng {
  getLat(): number;
  getLng(): number;
}

interface MapOptions {
  center: LatLng;
  level: number;
  draggable?: boolean;
  scrollwheel?: boolean;
  disableDoubleClick?: boolean;
}

interface MapInstance {
  setCenter(center: LatLng): void;
}

interface MarkerOptions {
  position: LatLng;
}

interface MarkerInstance {
  setMap(map: MapInstance): void;
}
*/

const Location: React.FC = () => {
  const { ref: titleRef, show: titleShow } = useFadeUp();
  const { ref: locationrRef, show: locationShow } = useFadeUp();
  const { ref: dropdownRef, show: dropdownShow } = useFadeUp();

  const [openTransport, setOpenTransport] = useState(false);
  const [openCar, setOpenCar] = useState(false);
  const [openAtm, setOpenAtm] = useState(false);
  const transportRef = useRef<HTMLDivElement | null>(null);
  const carRef = useRef<HTMLDivElement | null>(null);
  const atmRef = useRef<HTMLDivElement | null>(null);

  const handleTransportTransitionEnd = (e: React.TransitionEvent) => {
    if (e.propertyName !== "max-height") return;
    if (!openTransport) return;
    transportRef.current?.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
  };

  const handleCarTransitionEnd = (e: React.TransitionEvent) => {
    if (e.propertyName !== "max-height") return;
    if (!openCar) return;
    carRef.current?.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
  };

  const handleAtmTransitionEnd = (e: React.TransitionEvent) => {
    if (e.propertyName !== "max-height") return;
    if (!openAtm) return;
    atmRef.current?.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
  };

  /* 카카오 지도 초기화 주석처리 (약도 이미지로 대체)
  const lat = 37.5614417528647;
  const lng = 127.038394194396;
  useEffect(() => {
    const container = mapRef.current;
    if (!container) return;

    let cancelled = false;
    let retryTimer: number | null = null;

    const initMap = () => {
      const kakao = window.kakao;
      if (!kakao?.maps) {
        retryTimer = window.setTimeout(initMap, 300);
        return;
      }

      kakao.maps.load(() => {
        if (cancelled) return;

        const center = new kakao.maps.LatLng(lat, lng);

        const map = new kakao.maps.Map(container, {
          center,
          level: 3,
          draggable: false,
          scrollwheel: false,
          disableDoubleClick: true,
        });

        const marker = new kakao.maps.Marker({ position: center });
        marker.setMap(map);

        // 지도 위에서도 페이지 스크롤 가능하게
        container.style.touchAction = "auto"; // touch-action override
        container.style.pointerEvents = "auto"; // 기본 이벤트 허용

        // 내부 지도 div에도 적용
        const mapInnerDivs = container.querySelectorAll("div");
        mapInnerDivs.forEach((div) => {
          (div as HTMLElement).style.pointerEvents = "none"; // 지도 이벤트 무시
          (div as HTMLElement).style.touchAction = "auto"; // 터치 이벤트 허용
        });
      });
    };

    initMap();

    return () => {
      cancelled = true;
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, []);
  */

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

        {/* 카카오 지도 주석처리, 약도 이미지로 대체
        <div ref={mapRef} className="location__map" />
        */}
        <img src={locationGuide} alt="약도" className="location__guide-img" />

        {/* 지도 앱 / 웹 이동 버튼 */}
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

        {/* 약도 이미지를 지도 자리에서 바로 보여주므로 버튼/모달 주석처리
        <button
          type="button"
          className="location__guide-btn"
          onClick={() => setShowGuide(true)}
        >
          🗺️ 약도 이미지 보기
        </button>
        */}
      </div>

      {/*
      {showGuide && (
        <div
          className="location__guide-overlay"
          onClick={() => setShowGuide(false)}
        >
          <div
            className="location__guide-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={locationGuide} alt="약도" />
            <button
              type="button"
              className="location__guide-close"
              onClick={() => setShowGuide(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
      */}

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
              onTransitionEnd={handleTransportTransitionEnd}
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
              onTransitionEnd={handleCarTransitionEnd}
            >
              <div>• 주차</div>
              <div>왕십리 민자역사 비트플렉스 5F</div>
              <div>1,200대 주차 가능 / 2시간 무료</div>
              <div>( 5층에 주차해야 찾기 쉬워요 )</div>
            </div>
          </div>

          {/* ATM / 은행 안내 */}
          <div className="location__dropdown">
            <div
              className="location__dropdown-header"
              onClick={() => setOpenAtm(!openAtm)}
            >
              <div>
                <span className="icon">🏧</span>
                <span className="location_title">ATM / 은행</span>
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
              onTransitionEnd={handleAtmTransitionEnd}
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

          {/* <div style={{ marginTop: "8px" }}>
            <a
              href="https://troubled-muskmelon-9ba.notion.site/ATM-29a0a969db72801aa689e6492a374a28"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "rgba(187, 79, 97, 1)",
                textDecoration: "underline",
                fontSize: "16px",
              }}
            >
              웨딩홀 위치 & ATM 위치 자세히 보기
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Location;
