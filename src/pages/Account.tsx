import React, { useState, useRef } from "react";
import "../css/Modal.css";
import { useFadeUp } from "../hooks/useFadeUp";
interface Contact {
  person: string;
  account: string;
  kakaopay: string;
}

const Account: React.FC = () => {
  const { ref: titleRef, show: titleShow } = useFadeUp();
  const { ref: accountRef, show: accountShow } = useFadeUp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const groom_contact: Contact[] = [
    { person: "윤성호", account: "농협은행 040-12-262997", kakaopay: "" },
    { person: "윤원근", account: "농협은행 040-12-262997", kakaopay: "" },
    { person: "김경하", account: "농협은행 040-12-262997", kakaopay: "" },
  ];

  const bride_contact: Contact[] = [
    { person: "최소리", account: "농협은행 040-12-262997", kakaopay: "" },
    { person: "김남선", account: "농협은행 040-12-262997", kakaopay: "" },
  ];

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then().catch();
  };
  const handleTransitionEnd = () => {
    if (!isOpen) return;

    dropdownRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const renderContact = (contact: Contact, index: number, type: string) => (
    <div key={`${type}-${index}`} className="contact__item">
      <span>
        {contact.person}: {contact.account}
      </span>
      <button
        className="copy-button"
        onClick={() => copyToClipboard(contact.account)}
      >
        복사하기
      </button>
    </div>
  );

  return (
    <div className="container between_space">
      <div ref={titleRef} className={`fade-up ${titleShow ? "show" : ""}`}>
        <div className="contact__sub_title">Gift Love</div>
        <div className="contact__title">마음 전하는 곳</div>
      </div>

      <div ref={accountRef} className={`fade-up ${accountShow ? "show" : ""}`}>
        <div className="contact__content1">참석이 어려우신 분들은</div>
        <div className="contact__content2">축하의 마음을 전달해 주세요.</div>

        <button
          className={`contact-button ${isOpen ? "open" : ""}`}
          onClick={toggleDropdown}
        >
          계좌번호 확인하기
        </button>
      </div>

      {/* 항상 렌더링, maxHeight와 padding으로 슬라이드 */}
      <div
        ref={dropdownRef}
        className={`contact__dropdown ${isOpen ? "open" : ""}`}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className="contact__section">
          <h4>신랑 측</h4>
          {groom_contact.map((c, i) => renderContact(c, i, "groom"))}
        </div>
        <div className="contact__section">
          <h4>신부 측</h4>
          {bride_contact.map((c, i) => renderContact(c, i, "bride"))}
        </div>
      </div>
    </div>
  );
};

export default Account;
