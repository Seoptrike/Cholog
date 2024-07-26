import React, { useEffect, useState } from 'react'
import { Row, Col, InputGroup, Form, Button } from 'react-bootstrap'
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { BsTrash } from "react-icons/bs";
import DiarySlickSlider from './DiarySlickSlider';
import { styled, CardContent, Card, Chip } from '@mui/material';


//슬릭슬라이더로 인스타처럼 사진 넘기기
//설정누르면 일기수정페이지로 이동 
//다이어리 카테고리별 뱃지 바뀌기

const DiaryReadPage = () => {
  const [loading, setLoading] = useState(false);
  const [diary, setDiary] = useState({
    diary_contents: "",
    diary_title: "",
    diary_regDate: "",
    diary_state: "",
    diary_uDate: ""
  });
  const { diary_key } = useParams();
  const uid = sessionStorage.getItem("uid");

  const callAPI = async () => {
    const res = await axios.get(`/diary/read/${diary_key}?user_uid=${uid}`)
    console.log(res.data);
    setDiary(res.data);
  }

  const { diary_contents, diary_title, fmtDdate, fmtUdate, ucnt, fcnt, diary_state, diary_writer } = diary;

  useEffect(() => {
    callAPI();
  }, []);

  const LikePress = async (diary_key) => {
    await axios.post(`/diary/like`, { user_uid: sessionStorage.getItem("uid"), diary_key });
    if (ucnt === 1) {
      alert("이미 좋아요를 누른 일기입니다.")
    } else {
      alert("좋아요를 눌렀습니다!");
      callAPI();
      setLoading(false);
    }
  }

  const LikeCancel = async (diary_key) => {
    if (diary_key === "") {
      setLoading(true);
    } else {
      await axios.post(`/diary/cancel`, { user_uid: sessionStorage.getItem("uid"), diary_key });
      if (ucnt === 0) {
        alert("좋아요를 이미 취소한 상태입니다.");
      } else {
        alert("좋아요가 취소되었습니다");
        callAPI();
        setLoading(false);
      }
    }
  }

  const onClickDelete = async (diary_key) => {
    if (!window.confirm("선택하신 일기를 삭제하시겠습니까?")) return;
    await axios.post(`/diary/delete/${diary_key}`);
    alert("일기삭제완료")
  }

  //뱃지색바꾸기 (list, read필요... bg에 먹지 않아 mui Badge를 써봤지만 다시시도해야할듯 )
  // const ChangeBadge =(diary_state,e)=>{
  //   e.preventDefault();
  //   switch (diary_state){
  //     case "리필스테이션/개인용기":
  //     return "info"

  //     default :
  //     return "primary"
  //   }
  // }
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

  if (loading) return <h1>로딩중</h1>
  return (
    <div>
      <Row className='justify-content-center my-5'>
        <Col lg={6}>
          <Card>
            <CardContent>
              <Row>
                <Col className='mb-2' lg={8} style={{ whiteSpace: "pre-line" }}>
                  <h3>{diary_title}</h3>
                </Col>
                <Col lg={4}>
                  {uid === diary_writer &&
                    <div className='text-end'>
                      <Link to={`/diary/update/${diary_key}`}><IoSettingsOutline style={{ fontSize: "35px" }} className='me-3' /></Link>
                      <BsTrash style={{ fontSize: "35px", cursor: "pointer" }} onClick={() => onClickDelete(diary_key)} />
                    </div>}
                </Col>
                <hr />
                <div className='text-center mb-3'>
                  <DiarySlickSlider diary={diary} setDiary={setDiary} />
                </div>
                <hr />
                <Col>
                  <Row>
                    <Col>
                      <Chip
                        label={diary_state}
                        style={{ backgroundColor: chipColors[diary_state] || "#6B5B95", color: "#fff" }}
                      />
                    </Col>
                    <Col>
                      <div className='text-end' style={{ cursor: "pointer" }}>
                        {ucnt === 0 ? <FaRegThumbsUp style={{ fontSize: "20px" }} onClick={() => LikePress(diary_key)} /> :
                          <FaThumbsUp style={{ fontSize: "20px" }} onClick={() => LikeCancel(diary_key)} />}
                        {fcnt}
                      </div>
                    </Col>
                  </Row>
                  <div className='mb-3' style={{ whiteSpace: "pre" }}>
                    <span>{diary_contents}</span>
                  </div>
                </Col>
                <hr />
                <span>등록일: {fmtDdate}</span>
                <span>수정일: {fmtUdate}</span>
              </Row>
            </CardContent>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default DiaryReadPage