import React, { useState, useRef, useEffect } from 'react';
import '../css/Modal.css';

interface Contact {
  person: string;
  account: string;
  kakaopay: string;
}

const Account: React.FC = () => {
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
    setIsOpen(prev => !prev);
  };

  // ⭐ 드롭다운 열릴 때 scrollTo -> scrollIntoView, maxHeight -> transform scaleY
  useEffect(() => {
    if (dropdownRef.current) {
      if (isOpen) {
        dropdownRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [isOpen]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => alert('클립보드에 계좌가 복사되었습니다.'))
      .catch(() => alert('복사 실패'));
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
    <div className="container" style={{ overflowAnchor: 'none' }}> {/* ⭐ overflow-anchor 추가 */}
      <div className='contact__sub_title'>Gift Love</div>
      <div className='contact__title'>마음 전하는 곳</div>

      <div className='contact__content1'>참석이 어려우신 분들은</div>
      <div className='contact__content2'>축하의 마음을 전달해 주세요.</div>

      <button className="contact-button" onClick={toggleDropdown}>
        계좌번호 확인하기
      </button>

      <div
        ref={dropdownRef}
        className={`contact__dropdown ${isOpen ? 'open' : 'closed'}`} // ⭐ transform으로 열고 닫기
        style={{
          transformOrigin: 'top',
          transform: isOpen ? 'scaleY(1)' : 'scaleY(0)',
          opacity: isOpen ? 1 : 0,
          transition: 'transform 0.5s ease, opacity 0.5s ease',
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
