import React from 'react';
import ImageGallery from 'react-image-gallery';
import type { ReactImageGalleryItem } from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import p1 from '../images/1.jpg';
import p2 from '../images/2.jpg';


const ImgGallery: React.FC = () => {
  const images: ReactImageGalleryItem[] = [
    { original: p1, thumbnail: p1 },
    { original: p2, thumbnail: p2 },
  ];

  return (
    <div className="bc-pink container">
      <ImageGallery items={images} />
    </div>
  );
};

export default ImgGallery;
