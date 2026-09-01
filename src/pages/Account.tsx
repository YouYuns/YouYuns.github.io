import React, { useState, useRef } from "react";
import "../css/Modal.css";
import { useFadeUp } from "../hooks/useFadeUp";
import upArrow from "../images/up-arrow-button.png";
import downArrow from "../images/down-arrow-button.png";

interface Contact {
  person: string;
  account: string;
}

interface AccountSection {
  id: string;
  title: string;
  contacts: Contact[];
}

const Account: React.FC = () => {
  const { ref: titleRef, show: titleShow } = useFadeUp();
  const { ref: accountRef, show: accountShow } = useFadeUp();

  const [openId, setOpenId] = useState<string | null>(null);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const accountSections: AccountSection[] = [
    {
      id: "groom",
      title: "신랑측 계좌번호",
      contacts: [
        { person: "윤성호", account: "농협은행 040-12-262997" },
      ],
    },
    {
      id: "bride",
      title: "신부측 계좌번호",
      contacts: [
        { person: "최소리", account: "신한은행 110-464-764462" },
      ],
    },
    {
      id: "groom-parents",
      title: "혼주 계좌번호 (신랑측)",
      contacts: [
        { person: "윤원근", account: "농협은행 040-12-262997" },
        { person: "김경하", account: "농협은행 040-12-262997" },
      ],
    },
    {
      id: "bride-parents",
      title: "혼주 계좌번호 (신부측)",
      contacts: [
        { person: "김남선", account: "농협은행 040-12-262997" },
      ],
    },
  ];

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleTransitionEnd = (e: React.TransitionEvent, id: string) => {
    if (e.propertyName !== "max-height") return;
    if (openId !== id) return;

    contentRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedAccount(text);
        setTimeout(() => {
          setCopiedAccount(null);
        }, 2000);
      })
      .catch(() => {});
  };

  return (
    <div className="container between_space">
      <div ref={titleRef} className={`fade-up ${titleShow ? "show" : ""}`}>
        <div className="contact__sub_title">Gift Love</div>
        <div className="contact__title">마음 전하는 곳</div>
      </div>

      <div
        ref={accountRef}
        className={`fade-up ${accountShow ? "show" : ""}`}
        style={{ width: "100%" }}
      >
        <div className="contact__content1">참석이 어려우신 분들은</div>
        <div className="contact__content2">축하의 마음을 전달해 주세요.</div>

        <div className="account-accordion-wrapper">
          {accountSections.map((section) => {
            const isOpen = openId === section.id;
            return (
              <div key={section.id} className="account-accordion-item">
                <button
                  type="button"
                  className={`account-accordion-btn ${isOpen ? "open" : ""}`}
                  onClick={() => toggleAccordion(section.id)}
                >
                  <span className="account-accordion-title">
                    {section.title}
                  </span>
                  <img
                    src={isOpen ? upArrow : downArrow}
                    alt="arrow"
                    className="account-accordion-arrow"
                  />
                </button>

                <div
                  ref={(el) => {
                    contentRefs.current[section.id] = el;
                  }}
                  className={`account-accordion-content ${
                    isOpen ? "open" : ""
                  }`}
                  onTransitionEnd={(e) => handleTransitionEnd(e, section.id)}
                >
                  {section.contacts.map((contact, idx) => {
                    const isCopied = copiedAccount === contact.account;
                    return (
                      <div
                        key={`${section.id}-${idx}`}
                        className="contact__item"
                      >
                        <span className="account-text">
                          {contact.person} {contact.account}
                        </span>
                        <button
                          type="button"
                          className="copy-button"
                          onClick={() => copyToClipboard(contact.account)}
                        >
                          {isCopied ? "복사완료" : "복사하기"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Account;
