import React, { useState, useRef, useEffect } from 'react';
import '../css/Modal.css';

interface Contact {
  person: string;
  account: string;
  kakaopay: string;
}

const Account: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState('0px');
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
    setIsOpen(prev => !prev);
  };

  // isOpen 상태가 바뀌면 maxHeight를 계산
 useEffect(() => {
  if (dropdownRef.current) {
    // 다음 렌더 사이클에 상태 업데이트
    const scrollHeight = dropdownRef.current.scrollHeight;
    const timer = setTimeout(() => {
      setMaxHeight(isOpen ? `${scrollHeight}px` : '0px');
    }, 0);

    // 드롭다운 열릴 때 스크롤 이동
    if (isOpen) {
      const topPos = dropdownRef.current.offsetTop - 50;
      window.scrollTo({ top: topPos, behavior: 'smooth' });
    }

    return () => clearTimeout(timer);
  }
}, [isOpen]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => alert('클립보드에 계좌가 복사되었습니다.'))
      .catch(() => alert('클립보드 복사가 실패했습니다.'));
  };

  const renderContact = (contact: Contact) => (
    <div key={contact.person} className="contact__item">
      <span>{contact.person}: {contact.account}</span>
      <button className="copy-button" onClick={() => copyToClipboard(contact.account)}>
        복사하기
      </button>
    </div>
  );

  return (
    <div className="container">
      <div className='contact__sub_title'>Gift Love</div>
      <div className='contact__title'>마음 전하는 곳</div>

      <div className='contact__content1'>참석이 어려우신 분들은</div>
      <div className='contact__content2'>축하의 마음을 전달해 주세요.</div>

      <button className="contact-button" onClick={toggleDropdown}>
        계좌번호 확인하기
      </button>

      {/* 항상 렌더링, maxHeight와 padding으로 슬라이드 */}
      <div
        className="contact__dropdown"
        ref={dropdownRef}
        style={{
          maxHeight: maxHeight,
          padding: isOpen ? '10px 0' : '0px 0',
          overflow: 'hidden',
          transition: 'max-height 0.5s ease, padding 0.5s ease',
        }}
      >
        <div className="contact__section">
          <h4>신랑 측</h4>
          {groom_contact.map(renderContact)}
        </div>
        <div className="contact__section">
          <h4>신부 측</h4>
          {bride_contact.map(renderContact)}
        </div>
      </div>
    </div>
  );
};

export default Account;
