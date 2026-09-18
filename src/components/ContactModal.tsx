import React, { useEffect } from "react";
import "../css/Modal.css";

interface ContactModalProps {
  name: string;
  phone: string;
  closeModal: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({
  name,
  phone,
  closeModal,
}) => {
  useEffect(() => {
    // 모달 열리면 스크롤 막기
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden"; // html도 막기

    window.history.pushState({ contactModalOpen: true }, "");

    const handlePopState = () => {
      closeModal();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
      window.removeEventListener("popstate", handlePopState);
      if (window.history.state?.contactModalOpen) {
        window.history.back();
      }
    };
  }, [closeModal]);
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{name}</h3>
        <p>{phone}</p>
        <a href={`tel:${phone}`} className="call-button">
          전화걸기
        </a>
        <a href={`sms:${phone}`} className="sms-button">
          문자보내기
        </a>
        <button className="close-button" onClick={closeModal}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default ContactModal;
