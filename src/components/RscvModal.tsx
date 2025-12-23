// import React, { useState, useEffect } from "react";
// import { db } from "../firebase";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import checkedIcon from "../images/check-box.png";
// import emptyIcon from "../images/empty-check-box.png";
// import "../css/RscvModal.css";
// import groomIcon from "../images/groom-icon.png";
// import brideIcon from "../images/bride-icon.png";
// import closeIcon from "../images/close-icon.png";

// type Side = "groom" | "bride";
// type Attendance = "yes" | "no";

// interface RscvModalProps {
//   closeModal: () => void;
// }

// const RscvModal: React.FC<RscvModalProps> = ({ closeModal }) => {
//   const [step, setStep] = useState(1);
//   const [show, setShow] = useState(false);
//   const [side, setSide] = useState<Side>("groom");
//   const [attendance, setAttendance] = useState<Attendance>("yes");
//   const [errors, setErrors] = useState<{
//     name?: string;
//     phone?: string;
//     people?: string;
//   }>({});

//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [message, setMessage] = useState("");
//   const [people, setPeople] = useState<number>();
//   const [meal, setMeal] = useState<"yes" | "no">("yes");
//   const [agree, setAgree] = useState(true);

//   const [loading, setLoading] = useState(false);
//   const [vh, setVh] = useState<number | null>(null);

//   const modalHeight = step === 3 && vh ? `${vh * 0.9}px` : "80dvh";

//   useEffect(() => {
//     const timeout = setTimeout(() => setShow(true), 10);
//     return () => clearTimeout(timeout);
//   }, []);
//   useEffect(() => {
//     // 모달 열리면 스크롤 막기
//     document.body.style.overflow = "hidden";
//     document.documentElement.style.overflow = "hidden"; // html도 막기

//     return () => {
//       document.body.style.overflow = "auto";
//       document.documentElement.style.overflow = "auto";
//     };
//   }, []);

//   useEffect(() => {
//     if (!window.visualViewport) return;

//     const handleResize = () => {
//       const viewportHeight = window.visualViewport!.height;
//       setVh(viewportHeight);
//     };

//     window.visualViewport.addEventListener("resize", handleResize);
//     handleResize(); // 초기 1회

//     return () => {
//       window.visualViewport?.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const submitAttendance = async () => {
//     const newErrors: { name?: string; phone?: string; people?: string } = {};

//     if (!agree) {
//       alert("개인정보 수집 및 이용에 동의해 주세요."); // 동의는 alert 유지
//       return;
//     }

//     if (!name) newErrors.name = "성함을 입력해주세요.";
//     if (!phone) newErrors.phone = "연락처를 입력해주세요.";
//     if (!people || people <= 0) newErrors.people = "인원을 입력해주세요.";

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return; // 에러 있으면 전송 중단
//     }

//     try {
//       setLoading(true);
//       await addDoc(collection(db, "attendance"), {
//         side,
//         attendance,
//         name,
//         phone,
//         people,
//         meal,
//         message,
//         agree,
//         createdAt: serverTimestamp(),
//       });

//       alert("참석 여부가 전달되었습니다. 감사합니다 💐");
//       closeModal();
//     } catch (error) {
//       console.error("Firestore error:", error);
//       alert("전송 중 오류가 발생했습니다.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     let input = e.target.value.replace(/\D/g, ""); // 숫자만 남기기
//     if (input.length > 11) input = input.slice(0, 11); // 최대 11자리
//     if (input.length > 3 && input.length <= 7) {
//       input = `${input.slice(0, 3)}-${input.slice(3)}`;
//     } else if (input.length > 7) {
//       input = `${input.slice(0, 3)}-${input.slice(3, 7)}-${input.slice(7)}`;
//     }
//     setPhone(input);
//   };
//   return (
//     <div
//       className={`rscv-modal-overlay ${show ? "show" : ""}`}
//       onClick={closeModal}
//     >
//       <div
//         className="rscv-modal-content"
//         style={
//           step === 3
//             ? {
//                 height: modalHeight,
//                 maxHeight: modalHeight,
//               }
//             : undefined
//         }
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="rscv-close-btn {">
//           <img
//             src={closeIcon}
//             alt="close"
//             className="rscv-modal-close"
//             onClick={closeModal}
//           />
//         </div>
//         {/* 🔹 진행 바 */}
//         <div className="step-bar">
//           <div className={`step ${step >= 1 ? "active" : ""}`} />
//           <div className={`step ${step >= 2 ? "active" : ""}`} />
//           <div className={`step ${step >= 3 ? "active" : ""}`} />
//         </div>

//         <div className={`rscv-modal-body ${step === 3 ? "step3" : ""}`}>
//           {/* STEP 1 */}
//           {step === 1 && (
//             <>
//               <p className="step-title">
//                 참석여부를 전달하실 곳을 선택해주세요
//               </p>

//               <div className="icon-select-row">
//                 <div
//                   className="icon-card"
//                   onClick={() => {
//                     setSide("groom");
//                     setStep(2);
//                   }}
//                 >
//                   <img src={groomIcon} alt="groom" />
//                   <span>신랑측</span>
//                 </div>

//                 <div
//                   className="icon-card"
//                   onClick={() => {
//                     setSide("bride");
//                     setStep(2);
//                   }}
//                 >
//                   <img src={brideIcon} alt="bride" />
//                   <span>신부측</span>
//                 </div>
//               </div>
//             </>
//           )}
//           <div className={`step-content ${step === 2 ? "show" : ""}`}>
//             {/* STEP 2 */}
//             {step === 2 && (
//               <>
//                 <p className="step-title">결혼식에 참석하시나요?</p>

//                 <div
//                   className="attendance-card"
//                   onClick={() => {
//                     setAttendance("yes");
//                     setStep(3);
//                   }}
//                 >
//                   네, 참석합니다.
//                 </div>

//                 <div
//                   className="attendance-card"
//                   onClick={() => {
//                     setAttendance("no");
//                     setStep(3);
//                   }}
//                   style={{ marginTop: "15px" }}
//                 >
//                   아니오, 사정이 있어서 참석하지 못합니다.
//                 </div>
//               </>
//             )}
//           </div>

//           <div className={`step-content ${step === 3 ? "show" : ""}`}>
//             {/* STEP 3 */}
//             {step === 3 && (
//               <div className="step3-content">
//                 <p className="step-title-bold">
//                   신랑신부에게 전달될 정보를 입력해주세요
//                 </p>

//                 {/* 참석자 성함 */}
//                 <div className="input-group">
//                   <label className="input-title">
//                     참석자 성함 <span style={{ color: "#FF2F2F" }}>*</span>
//                   </label>
//                   <input
//                     placeholder="대표자 한 분의 성함을 입력해주세요"
//                     className="rscv-input-content"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                   {errors.name && (
//                     <span style={{ color: "red", fontSize: "12px" }}>
//                       {errors.name}
//                     </span>
//                   )}
//                 </div>

//                 {/* 연락처 */}
//                 <div className="input-group">
//                   <label className="input-title">
//                     연락처 <span style={{ color: "#FF2F2F" }}>*</span>
//                   </label>
//                   <input
//                     placeholder="연락 가능한 번호를 입력해주세요"
//                     className="rscv-input-content"
//                     value={phone}
//                     onChange={handlePhoneChange}
//                   />
//                   {errors.phone && (
//                     <span style={{ color: "red", fontSize: "12px" }}>
//                       {errors.phone}
//                     </span>
//                   )}
//                 </div>

//                 {/* 인원 입력 */}
//                 <div className="input-group input-people">
//                   <label className="input-title">인원</label>
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "5px",
//                     }}
//                   >
//                     <input
//                       type="number"
//                       min={0}
//                       className="rscv-input-content"
//                       style={{ width: "80px" }}
//                       value={people}
//                       onChange={(e) => {
//                         setPeople(Number(e.target.value));
//                         setErrors({ ...errors, people: undefined });
//                       }}
//                     />

//                     <span>명</span>
//                   </div>
//                   {errors.people && (
//                     <span style={{ color: "red", fontSize: "12px" }}>
//                       {errors.people}
//                     </span>
//                   )}
//                 </div>

//                 {/* 식사여부 선택 */}
//                 <div className="input-group">
//                   <label className="input-title">식사 여부</label>
//                   <div className="meal-options">
//                     <div
//                       className="meal-card"
//                       onClick={() => setMeal("yes")}
//                       style={{
//                         borderColor: meal === "yes" ? "#D5A891" : "#E7E7E7",
//                       }}
//                     >
//                       식사합니다
//                     </div>
//                     <div
//                       className="meal-card"
//                       onClick={() => setMeal("no")}
//                       style={{
//                         borderColor: meal === "no" ? "#D5A891" : "#E7E7E7",
//                       }}
//                     >
//                       식사하지 않습니다
//                     </div>
//                   </div>
//                 </div>

//                 {/* 전달 메시지 */}
//                 <p className="input-title">전달 사항 (선택)</p>
//                 <textarea
//                   placeholder="전하고 싶은 메시지를 입력해주세요!"
//                   className="rscv-input-content"
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                 />

//                 {/* 개인정보 동의 */}
//                 <div className="privacy-box">
//                   <p style={{ fontWeight: "bold", marginBottom: "2px" }}>
//                     개인정보 수집 및 이용동의 (필수)
//                   </p>
//                   <p
//                     style={{
//                       fontSize: "13px",
//                       lineHeight: "16px",
//                       marginBottom: "10px",
//                     }}
//                   >
//                     참석여부 전달을 위한
//                     <br />
//                     개인정보 수집 및 이용에 동의해주세요.
//                     <br />
//                     <br />
//                     항목 : 성함, 연락처
//                     <br />
//                     보유기간 : 청첩장 이용 종료 시까지
//                   </p>

//                   <div
//                     className="privacy-checkbox"
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       cursor: "pointer",
//                     }}
//                     onClick={() => setAgree(!agree)}
//                   >
//                     <img
//                       src={agree ? checkedIcon : emptyIcon}
//                       alt={agree ? "checked" : "unchecked"}
//                       style={{ width: "18px", height: "18px" }}
//                     />
//                     <span style={{ marginLeft: "3px" }}>
//                       개인 정보 수집에 동의합니다.
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* 🔹 하단 버튼 */}
//         <div className="rscv-modal-actions">
//           {step === 3 && (
//             <button
//               onClick={submitAttendance}
//               disabled={loading || !agree} // agree 체크 안 되어 있으면 비활성화
//               style={{
//                 backgroundColor: !agree ? "#ccc" : "#D5A891", // 회색 또는 활성색
//                 cursor: !agree ? "not-allowed" : "pointer",
//               }}
//             >
//               {loading ? "전송 중..." : "제출하기"}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RscvModal;
