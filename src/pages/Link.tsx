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
  const urlToShare = "https://youyuns.github.io/merry/";
  const JS_KEY = "6bbdbe14cfee86bf2c09a3d16aa9bc79"; // 본인 JS 키

  useEffect(() => {
    // Kakao SDK 로드
    const script = document.createElement("script");

    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.9/kakao.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const kakao = window.Kakao;
      console.log("Kakao JS SDK version:", window.Kakao);
      if (!kakao.isInitialized()) kakao.init(JS_KEY);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // 카카오톡 공유
  const shareKakao = () => {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) kakao.init(JS_KEY);

    kakao.Share.sendDefault?.({
      objectType: "feed",
      content: {
        title: "청첩장 링크입니다!",
        description: "청첩장을 확인해보세요.",
        imageUrl: "https://youyuns.github.io/merry/1.jpg",
        link: {
          webUrl: "https://youyuns.github.io/merry/",
          mobileWebUrl: "https://youyuns.github.io/merry/",
        },
      },
      buttons: [
        {
          title: "청첩장 확인",
          link: {
            webUrl: "https://youyuns.github.io/merry/",
            mobileWebUrl: "https://youyuns.github.io/merry/",
          },
        },
      ],
    });
  };

  // 링크 복사
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(urlToShare)
      .then(() => alert("청첩장 링크가 복사되었습니다!"))
      .catch(() => alert("복사에 실패했습니다."));
  };

  return (
    <div className="link-share-container">
      <div className="link-share-buttons">
        {/* 카카오톡 공유 버튼 */}
        <div className="share-btn-wrapper">
          <button className="share-btn" onClick={shareKakao}>
            <img
              src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
              alt="카카오톡 공유"
            />
          </button>
          <span className="share-label">카카오톡 공유하기</span>
        </div>

        {/* 링크 복사 버튼 */}
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
