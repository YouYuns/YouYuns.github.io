import React from 'react';

interface NavigatorProps {
  scrollToGalleryTop: () => void;
  scrollToContact: () => void;
  scrollToLocation: () => void;
  scrollToGallery: () => void;
}

const Navigator: React.FC<NavigatorProps> = ({ scrollToGalleryTop, scrollToContact, scrollToGallery,  scrollToLocation }) => {
  return (
    <nav className="top-nav">
        <div onClick={scrollToGalleryTop}>성호♥소리</div>
        <div onClick={scrollToLocation}>오시는길</div>
        <div onClick={scrollToGallery}>사진첩</div>
        <div onClick={scrollToContact}>연락처</div>
    </nav>
  );
};

export default Navigator;
