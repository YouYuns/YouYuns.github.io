import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/thumbs";

import p1 from "../images/1.jpg";
import p2 from "../images/2.jpg";
import p3 from "../images/3.jpg";
import p5 from "../images/5.jpg";
import p6 from "../images/6.jpg";
import p7 from "../images/7.jpg";
import p8 from "../images/8.jpg";
const ImgGallery: React.FC = () => {
  const images = [p1, p2, p3, p5, p6, p7, p8];
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

  return (
    <div className="container between_space">
    <div className="contact__sub_title">Photo Album</div>
      <div className="contact__title">사진첩</div>

    <div className= '' style={{ width: "100%", maxWidth: "360px", margin: "0 auto" }}>
      {/* Main Swiper */}
      <Swiper
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[Thumbs]} 
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={img}
              alt={`slide-${idx}`}
              style={{ width: "100%", borderRadius: "16px" }}
               onClick={() => {
                  setIndex(idx);   
                  setOpen(true);    
                }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={5}
        freeMode
        watchSlidesProgress
        modules={[Thumbs, Navigation]}      
        navigation
        style={{ marginTop: "10px" }}
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={img}
              alt={`thumb-${idx}`}
              style={{ width: "100%", cursor: "pointer" }}
              
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

     <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={images.map((img) => ({ src: img }))}
      />
    </div>
  );
};

export default ImgGallery;
