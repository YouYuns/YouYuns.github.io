import React, { useRef } from 'react';


import './App.css';
import './css/Cover.css';
import './css/Gallery.css';
import './css/Invitation.css';
import './css/Location.css';
import './css/Modal.css';
import './css/Footer.css';
import './css/Calendar.css';
import './css/Contact.css';
import './css/Navigator.css';
import './css/Scroll.css';
import './css/Account.css';
import './css/Modal.css';
import './css/SurveryModal.css';


import Invitation from './pages/Invitation';
import Calendar from './pages/Calendar';
import Account from './pages/Account';
import Contact from './pages/Contact';
import Location from './pages/Location';
// import ImgGallery from './pages/ImgGallery';
import Scroll from './pages/Scroll';
import Footer from './components/Footer';
import Navigator from './components/Navigator';
// import SurveyModal from './components/SurveyModal';
// import Submit from './pages/Submit';
// import Comment from './pages/Comment';
// import Quiz from './pages/Quiz';

function App() {

  const galleryTopRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // 모달 상태 타입 지정

  // const closeModal = () => setIsModalOpen(false);
  // const openModal = () => setIsModalOpen(true);

  return (
    <div className="App">
      {/* {isModalOpen && <SurveyModal closeModal={closeModal} />} */}
      <Navigator
          scrollToGalleryTop={() => scrollTo(galleryTopRef)}
          scrollToLocation={() => scrollTo(locationRef)}
          scrollToGallery={() => scrollTo(galleryRef)}
          scrollToContact={() => scrollTo(contactRef)}
        />
      <div ref={galleryTopRef} className="section">
          <Scroll />
      </div>
      {/* <Cover /> */}
          <Invitation />
      {/* <div ref={galleryRef} className="section">
         <ImgGallery />
      </div> */}
      <Calendar />
      <div ref={locationRef} className="section">
        <Location />
      </div>
      {/* <Submit openModal={openModal} /> */}
      {/* <Quiz />
      <Comment />}*/}
       <div ref={contactRef} className="section">
        <Contact />
      </div>
      <Account />
      <Footer />
    </div>
  );
}

export default App;
