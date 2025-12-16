import React, { useState } from 'react';
import flower from '../images/flower.png';
// import { MdOutlinePhoneIphone } from "react-icons/md";
import { FaMoneyCheck } from "react-icons/fa6";
import Modal from '../components/Modal';
import '../css/Modal.css';

// ContactButton Props 타입 정의
interface ContactButtonProps {
  person: string;
  account: string;
  kakaopay: string;
}

const ContactButton: React.FC<ContactButtonProps> = ({ person, account, kakaopay }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="contact__box">
        <span>{person}</span>
        <div className="contact__icons">
          <button onClick={openModal} className="contact__btn">
            <FaMoneyCheck size="1.5em"/>
          </button>
        </div>
      </div>
      {isModalOpen && (
        <Modal closeModal={closeModal} who={person} account={account} kakaopay={kakaopay}/>
      )}
    </>
  );
};

interface Contact {
  person: string;
  account: string;
  kakaopay: string;
}

const Account: React.FC = () => {
  const groom_contact: Contact[] = [
    { person: "신랑 윤성호", account: "농협은행 040-12-262997", kakaopay: "" },
    { person: "아버지 윤원근", account: "농협은행 040-12-262997", kakaopay: "" },
    { person: "어머니 김경하", account: "농협은행 040-12-262997", kakaopay: "" },
  ];

  const bride_contact: Contact[] = [
    { person: "신부 최소리", account: "농협은행 040-12-262997", kakaopay: "" },
    { person: "어머니 김남선", account: "농협은행 040-12-262997", kakaopay: "" },
  ];

  return (
    <div className="container">
      <img src={flower} className="flower" alt="flower"/>
      <div className='contact__title'>마음 전하는 곳</div>
      <div className="contact__boxes">
        {groom_contact.map((contact, index) => (
          <ContactButton key={index} {...contact} />
        ))}
      </div>
      <div className="contact__boxes">
        {bride_contact.map((contact, index) => (
          <ContactButton key={index} {...contact} />
        ))}
      </div>
      <div className="contact__guide-text">
        아이콘을 클릭하시면 계좌번호를 확인할 수 있습니다.
      </div>
    </div>
  );
};

export default Account;
