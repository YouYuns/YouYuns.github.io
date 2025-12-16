import React, { useRef, useEffect } from 'react';
import kakaoMapIcon from '../images/kakao.png';

declare global {
  interface Window {
    kakao?: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => unknown;
        Map: new (
          container: HTMLElement,
          options: { center: unknown; level: number }
        ) => unknown;
        Marker: new (options: { position: unknown }) => {
          setMap: (map: unknown) => void;
        };
      };
    };
  }
}

const Location: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  // 정확한 디노체컨벤션 좌표
  const lat = 37.5614417528647;
  const lng = 127.038394194396;

  useEffect(() => {
    if (!mapRef.current || !window.kakao?.maps) return;

    window.kakao.maps.load(() => {
      const center = new window.kakao!.maps.LatLng(lat, lng);

      const map = new window.kakao!.maps.Map(mapRef.current!, {
        center,
        level: 4, // 지도 확대 수준
      });

      const marker = new window.kakao!.maps.Marker({
        position: center,
      });

      marker.setMap(map);
    });
  }, []);

  const gotoKakaoMap = (): void => {
    window.location.href =
      'https://map.kakao.com/link/search/왕십리%20디노체%20컨벤션';
  };

  return (
    <div className="container">
      <div className="title">오시는 길</div>

      <div className="location__details">
        <div>디노체컨벤션</div>
        <div>서울 성동구 왕십리광장로 17 6~7층</div>
      </div>

      {/* 🗺 카카오 지도 */}
      <div ref={mapRef} className="location__map" />

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
      </div>

      <div className="location__info">
        <div>지하철 왕십리역 도보 1~2분 거리</div>
      </div>
    </div>
  );
};

export default Location;
