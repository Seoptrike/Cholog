import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import '../../common/useful/Slick.css';

const DiarySlickSlider = () => {
 
    useEffect(()=>{
      
    },[]);
    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        waitForAnimate: false
      };

  return (
    <Slider {...settings}>
    {/* {thumb.map(img=>
        <img src={img.filename} key={img.aid} className="slider-image"/>
    )} */}
        
    </Slider>
  )
}

export default DiarySlickSlider