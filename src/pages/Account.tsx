import React, { useState, useRef } from 'react';
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
    setIsOpen(!isOpen);

    if (!isOpen && dropdownRef.current) {
      const topPos = dropdownRef.current.offsetTop - 50; // 상단 여유 공간
      window.scrollTo({ top: topPos, behavior: 'smooth' });
    }
  };
  const copyToClipboard = (text: string) => {
      navigator.clipboard.writeText(text)
        .then(() => {
          alert(`클립보드에 계좌가 복사되었습니다.`);
        })
        .catch(() => {
          alert(`클립보드에 계좌가 복사가 실패 되었습니다.`);
        });
    };

   const renderContact = (contact: Contact) => (
    <div key={contact.person} className="contact__item">
      <span>{contact.person}: {contact.account}</span>
      <button
        className="copy-button"
        onClick={() => copyToClipboard(contact.account)}
      >
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

      {/* 버튼 한 개 */}
      <button className="contact-button" onClick={toggleDropdown}>
        계좌번호 확인하기
      </button>

      {/* 드롭다운 전체 */}
      {isOpen && (
        <div className="contact__dropdown" ref={dropdownRef}>
          <div className="contact__section">
            <h4>신랑 측</h4>
             {groom_contact.map(renderContact)}
          </div>
          <div className="contact__section">
            <h4>신부 측</h4>
            {bride_contact.map(renderContact)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
