import React, { useState } from "react";
import RscvModal from "../components/RscvModal";

const Rsvp: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="container">
      <div className="contact__sub_title">RSVP</div>
      <div className="contact__title">참석 여부</div>

      <button className="contact-button" onClick={() => setOpen(true)}>
        참석 여부 전달하기
      </button>

      {open && <RscvModal closeModal={() => setOpen(false)} />}
    </div>
  );
};

export default Rsvp;
