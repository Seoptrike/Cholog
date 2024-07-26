import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import './DiarySlickSlider.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DiarySlickSlider = ({diary, setDiary}) => {
    console.log(diary);
    const {diary_key}=useParams();


    //현재저장된 사진 가져오기
  const [photo, setPhoto] = useState([]);

  const callAttach = async () => {
    const res2 = await axios.get(`/diary/attach/${diary_key}`);
    console.log(res2.data);
    setPhoto(res2.data);
  }

    useEffect(()=>{
      callAttach();
    },[]);

    const settings = {
        dots: false,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false
      };

  return (
    <Slider {...settings}>
    {photo.map(p=>
        <img src={p.diaryPhoto_filename} key={p.diaryPhoto_key} className="slider-image"/>
    )}
        
    </Slider>
  )
}

export default DiarySlickSlider