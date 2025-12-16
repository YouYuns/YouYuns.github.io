import React from 'react';
import '../css/Modal.css';
import sDad from '../images/1.jpg';
import sMom from '../images/1.jpg';
import sMain from '../images/1.jpg';
import eMain from '../images/1.jpg';
import eMom from '../images/1.jpg';

const Account: React.FC = () => {
const groom = {
  main: { name: "신랑 이성욱", src: sMain },
  family: [
    { name: "아버지 이경식", src: sDad },
    { name: "어머니 최경숙", src: sMom },
  ],
};

const bride = {
  main: { name: "신부 임은진", src: eMain },
  family: [
    { name: "어머니 김정숙", src: eMom },
  ],
};
const renderPerson = (person: { name: string; src: string }) => (
  <div className="css-z9wtaq">
    <img
      src={person.src}
      alt={person.name}
      style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        objectFit: 'cover',
        display: 'block',
        margin: '0 auto 5px auto'
      }}
    />
    <p className="css-11lk4wt">{person.name}</p>
  </div>
);


  return (
    <div className="css-1wk23ob">
      {/* 신랑 측 */}
      <div className="css-1ar4t03">
        <div className="css-wbwlph">
          {renderPerson(groom.main)}
        </div>
        <div className="css-1sxnyrq">
          {groom.family.map((person) => renderPerson(person))}
        </div>
      </div>

      {/* 신부 측 */}
      <div className="css-1ar4t03">
        <div className="css-wbwlph">
          {renderPerson(bride.main)}
        </div>
        <div className="css-1sxnyrq">
          {bride.family.map((person) => renderPerson(person))}
        </div>
      </div>
    </div>
  );
};

export default Account;
