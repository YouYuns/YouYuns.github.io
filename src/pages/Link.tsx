import React, { useEffect } from "react";
import "../css/Link.css";
import linkIcon from "../images/link-icon.png";

interface KakaoShareContent {
  title: string;
  description: string;
  imageUrl: string;
  link: {
    webUrl: string;
    mobileWebUrl: string;
  };
}

interface KakaoButton {
  title: string;
  link: {
    webUrl: string;
    mobileWebUrl: string;
  };
}

interface KakaoShareStatic {
  sendDefault: (params: {
    objectType: "feed" | "text" | "list";
    content: KakaoShareContent;
    buttons?: KakaoButton[];
  }) => void;
}

interface KakaoStatic {
  isInitialized: () => boolean;
  init: (key: string) => void;
  Share: KakaoShareStatic;
}

declare global {
  interface Window {
    Kakao: KakaoStatic;
  }
}

const LinkShare: React.FC = () => {
  const JS_KEY = "6bbdbe14cfee86bf2c09a3d16aa9bc79"; // 본인 JS 키

  // 🔹 현재 URL + 쿼리 포함 공유 링크
  const shareUrl = `${window.location.origin}${window.location.pathname}${window.location.search}`;

  useEffect(() => {
    // Kakao SDK 로드
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) kakao.init(JS_KEY);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const shareKakao = () => {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) kakao.init(JS_KEY);

    kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "성호&소리, 결혼합니다",
        description: "우리 결혼식에 초대합니다! 함께 축복해주세요.",
        imageUrl: "https://youyuns.github.io/main.webp",
        link: { webUrl: shareUrl, mobileWebUrl: shareUrl }, // 파라미터 포함 URL
      },
      buttons: [
        {
          title: "청첩장 확인",
          link: { webUrl: shareUrl, mobileWebUrl: shareUrl },
        },
      ],
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(shareUrl) // 파라미터 포함 URL 복사
      .then(() => alert("청첩장 링크가 복사되었습니다!"))
      .catch(() => alert("복사에 실패했습니다."));
  };

  return (
    <div className="link-share-container">
      <div className="link-share-buttons">
        <div className="share-btn-wrapper">
          <button className="share-btn" onClick={shareKakao}>
            <img
              src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
              alt="카카오톡 공유"
            />
          </button>
          <span className="share-label">카카오톡 공유하기</span>
        </div>

        <div className="share-btn-wrapper">
          <button className="share-btn" onClick={copyToClipboard}>
            <img src={linkIcon} alt="링크 복사" />
          </button>
          <span className="share-label">청첩장 링크 복사하기</span>
        </div>
      </div>
    </div>
  );
};

export default LinkShare;
