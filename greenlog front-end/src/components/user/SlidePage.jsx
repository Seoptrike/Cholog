import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";

const SlidePage = ({diary, setDiary}) => {
    console.log(diary);
    
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
           {/* {diary.map((d, index)=>
            <div>{d.diary_title}</div>
      )}     */}
            </Slider>
    );
}

export default SlidePage