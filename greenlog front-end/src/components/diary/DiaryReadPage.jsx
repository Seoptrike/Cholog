import React, { useEffect, useState } from 'react'
import { Card, Row, Col, InputGroup, Form, Button, Badge } from 'react-bootstrap'
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import SlidePage from '../../common/useful/SlidePage';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';


//클릭여부에 따라 좋아요 색 바꾸기
//슬릭슬라이더로 인스타처럼 사진 넘기기
//설정누르면 일기수정페이지로 이동 
//span에 ellipsis
//다이어리 카테고리별 뱃지 바뀌기
//좋아요기능만들기

const DiaryReadPage = () => {
  const [diary, setDiary] = useState({
    diary_contents:"",
    diary_title:"",
    diary_regDate:"",
    diary_state:"",
    user_nickname:""
  });
  const {diary_key} =useParams();

  const callAPI =async()=>{
    const res= await axios.get(`/diary/read/${diary_key}`)
    console.log(res.data);
    setDiary(res.data);
  }

  const {diary_contents, diary_title, diary_regDate, diary_state, user_nickname}=diary;

  useEffect(()=>{
    //callAPI();
  },[]);

  return (
    <div>
      <Row className='justify-content-center my-5'>
      <div className='my-3 mb-2 text-center'>
        <h3>{user_nickname}님의 {diary_key}번 일기입니다.</h3>
      </div>
        <Col lg={6}>
          <Card>
            <Card.Body>
              <Row>
                <Col lg={8}>
                  <h2>{diary_title}</h2>
                </Col>
                <Col lg={4}>
                <div className='text-end'>
                  <Link to={`/diary/update/${diary_key}`}><IoSettingsOutline style={{fontSize:"35px"}}/></Link>
                  </div>
                </Col>
                <hr />
                <div className='text-center mb-3'>
                  <SlidePage />
                </div>
                <hr />
                <Col>
                  <Row>
                    <Col>
                      <Badge>{diary_state}</Badge>
                    </Col>
                    <Col>
                    <div className='text-end'>
                    <FaRegThumbsUp style={{fontSize:"20px"}}/>
                    <FaThumbsUp style={{fontSize:"20px"}}/>
                    </div>
                    </Col>
                  </Row>
                  <div>
                    <span>{diary_contents}</span>
                  </div>
                </Col>
                <hr />
                <span>{diary_regDate}</span>
                <span>udate</span>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default DiaryReadPage