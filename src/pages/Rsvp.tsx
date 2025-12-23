// import React, { useEffect, useState } from "react";
// import RscvModal from "../components/RscvModal";

// interface RsvpProps {
//   showModal?: boolean;
// }

// const Rsvp: React.FC<RsvpProps> = ({ showModal }) => {
//   const [open, setOpen] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);

//   useEffect(() => {
//     if (showModal) {
//       // 비동기적으로 상태 변경
//       const timer = setTimeout(() => {
//         setModalOpen(true);
//       }, 0);

//       return () => clearTimeout(timer);
//     }
//   }, [showModal]);

//   return (
//     <div className="container between_space">
//       <div className="rsvp__sub_title">RSVP</div>
//       <div className="rsvp__title">참석 여부</div>

//       <div>축하의 마음으로 참석해주시는 한 분 한 분</div>
//       <div>귀한 마음으로 모실 수 있도록</div>
//       <div>부담없이 알려주시면 정성을 다해 준비 하겠습니다.</div>

//       <button className="rsvp-button" onClick={() => setOpen(true)}>
//         참석 여부 전달하기
//       </button>

//       {open && <RscvModal closeModal={() => setOpen(false)} />}
//       {modalOpen && <RscvModal closeModal={() => setModalOpen(false)} />}
//     </div>
//   );
// };

// export default Rsvp;
