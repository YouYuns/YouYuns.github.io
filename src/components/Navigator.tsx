import React from 'react';

interface NavigatorProps {
  scrollToGalleryTop: () => void;
  scrollToContact: () => void;
  scrollToLocation: () => void;
}

const Navigator: React.FC<NavigatorProps> = ({ scrollToGalleryTop, scrollToContact, scrollToLocation }) => {
  return (
    <nav className="top-nav">
        <div onClick={scrollToGalleryTop}>성호□소리</div>
        <div onClick={scrollToLocation}>오시는길</div>
        <div onClick={scrollToContact}>연락처</div>
    </nav>
  );
};

export default Navigator;
