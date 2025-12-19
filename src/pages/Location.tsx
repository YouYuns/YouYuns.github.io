import React, { useRef, useEffect, useState } from "react";
import kakaoMapIcon from "../images/kakao.png";
import naverMapIcon from "../images/naver.webp";
import upArrow from "../images/up-arrow-button.png";
import downArrow from "../images/down-arrow-button.png";
import { useFadeUp } from "../hooks/useFadeUp";
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

const Location: React.FC = () => {
  const { ref: titleRef, show: titleShow } = useFadeUp();
  const { ref: locationrRef, show: locationShow } = useFadeUp();
  const { ref: dropdownRef, show: dropdownShow } = useFadeUp();

  const mapRef = useRef<HTMLDivElement | null>(null);
  const [openTransport, setOpenTransport] = useState(false);
  const [openCar, setOpenCar] = useState(false);
  // 정확한 디노체컨벤션 좌표
  const lat = 37.5614417528647;
  const lng = 127.038394194396;

  useEffect(() => {
    const container = mapRef.current;
    if (!container) return; // container 없으면 종료
    const kakao = window.kakao; // 변수에 저장
    if (!kakao?.maps) return; // Kakao Map 로드 확인

    kakao.maps.load(() => {
      const center = new kakao.maps.LatLng(lat, lng);

      const map = new kakao.maps.Map(container, {
        center,
        level: 4,
        draggable: false,
        scrollwheel: false,
        disableDoubleClick: true,
      });

      const marker = new kakao.maps.Marker({ position: center });
      marker.setMap(map);
    });
  }, []);

  const gotoKakaoMap = (): void => {
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
          <div>서울 성동구 왕십리광장로 17 6~7층</div>
        </div>
        {/* 🗺 카카오 지도 */}
        <div ref={mapRef} className="location__map">
          <div className="location__map" ref={mapRef}>
            <div
              className="map-overlay"
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 10,
                pointerEvents: "none", // 이벤트 투과
              }}
            />
          </div>
        </div>

        {/* 📍 카카오 지도 앱 / 웹 이동 */}
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

      <div
        ref={dropdownRef}
        className={`fade-up ${dropdownShow ? "show" : ""}`}
      >
        <div className="location__info">
          {/* 🚍 대중교통 안내 */}
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
              className={`location__dropdown-content ${
                openTransport ? "open" : ""
              }`}
            >
              <div>• 지하철</div>
              <div> 2호선, 5호선 왕십리역 6-1번 출구 맞은편 롯데리아 옆 EV</div>
              <div>분당선, 중앙선 왕십리역 12번 출구 좌측 안쪽 EV</div>
              <div> &nbsp;</div>
              <div>• 버스</div>
              <div>성동구청, 성동경찰서 하차</div>
              <div>110A, 141, 145, 148, 421, 2015, 2222</div>
            </div>
          </div>

          {/* 🚗 자차 안내 */}
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
              className={`location__dropdown-content ${openCar ? "open" : ""}`}
            >
              <div>• 주차</div>
              <div>왕십리 민자역사 비트플렉스 5F</div>
              <div>1,200대 주차 가능 / 2시간 무료</div>
            </div>
          </div>

          <div style={{ marginTop: "8px" }}>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
