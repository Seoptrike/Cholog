import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { Pagination as MuiPagination } from '@mui/material';
import { styled, Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, Chip } from '@mui/material';
import Slider from "react-slick";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import '../user/MypageSlider.css';
import { Row, Col, Button } from 'react-bootstrap';

const MypageSlick = ({ diary, setDiary,callAPI }) => {
    console.log(diary);

    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "0px",
      slidesToShow: 3,
      slidesToScroll: 1,
      speed: 500,
      adaptiveHeight: true
    };
    const chipColors = {
      "개인컵/텀블러": "#FF6F61", // Coral
      "리필스테이션/개인용기": "#6B5B95", // Slate Blue
      "리사이클링 제작": "#88B04B", // Olive Green
      "전자영수증": "#F7CAC9", // Light Pink
      "친환경 제품구매": "#92A8D1", // Light Blue
      "재활용품 배출": "#F0B27A", // Light Orange
      "전기차 대여": "#E5E8E8", // Light Gray
      "봉사활동/개인 환경활동": "#D5AAFF", // Light Purple
    };
    const LikePress = async (diary_key) => {
      try {
        await axios.post(`/diary/like`, { user_uid: sessionStorage.getItem("uid"), diary_key });
        alert("좋아요를 눌렀습니다!");
        callAPI();
      } catch (error) {
        console.error('Error liking diary:', error);
        alert("이미 좋아요를 누른 일기입니다.");
      }
    };
  
    const LikeCancel = async (diary_key) => {
      try {
        await axios.post(`/diary/cancel`, { user_uid: sessionStorage.getItem("uid"), diary_key });
        alert("좋아요가 취소되었습니다");
        callAPI();
      } catch (error) {
        console.error('Error canceling like:', error);
        alert("좋아요를 이미 취소한 상태입니다.");
      }
    };
    
    const StyledCard = styled(Card)(({ theme }) => ({
      width: '100%', 
      maxWidth: '25rem', 
      height: 'auto',  
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'scale(1.03)',
        boxShadow: theme.shadows[10],
      },
    }));

    const StyledCol = styled(Col)(({ theme }) => ({
      marginBottom: theme.spacing(3),  
    }));

    const DiaryRead = (diary_key) => {
        window.location.href = `/diary/read/${diary_key}`;
    };

    return (
      <div className="slider-container">
        <Slider {...settings}>
        {diary.map(d =>
          <StyledCol lg={3} key={d.diary_key}>
            <StyledCard>
              <CardHeader
                avatar={
                  <Avatar src={d.user_img} aria-label="recipe" sx={{ width: 40, height: 40 }} />
                }
 
                title={<Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                  <a href={`/user/read/${d.diary_writer}`} style={{ textDecoration: 'none', color: 'inherit' }}>{d.diary_writer}</a>
                </Typography>}
                subheader={d.fmtUdate ? `${d.fmtDdate}` : `${d.fmtUdate}[수정됨]`}
              />
              <CardMedia
                component="img"
                height="194"
                src={d.diary_thumbnail || "http://via.placeholder.com/100x100"}
                alt={d.diary_title}
                onClick={DiaryRead}
              />
              <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Chip
                  label={d.diary_state}
                  style={{ backgroundColor: chipColors[d.diary_state] || "#6B5B95", color: "#fff" }}
                />
                <div>
                  <IconButton
                    aria-label={d.ucnt === 0 ? "like" : "unlike"}
                    onClick={() => d.ucnt === 0 ? LikePress(d.diary_key) : LikeCancel(d.diary_key)}
                    sx={{ fontSize: 18 }}
                  >
                    {d.ucnt === 0 ? <FaRegThumbsUp /> : <FaThumbsUp />}
                  </IconButton>
                </div>
              </CardActions>
              <CardContent sx={{ paddingBottom: 1, paddingTop: 0 }}>
                <Typography variant="h6" sx={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: 1 }}>
                  {d.diary_title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ overflow: "hidden" }}>
                  <div className='ellipsis'>{d.diary_contents}</div>
                </Typography>
              </CardContent>
            </StyledCard>
          </StyledCol>
        )}
        </Slider>
      </div>
    )
  
  }

export default MypageSlick