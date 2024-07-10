import React from 'react'
import { Card, Row, Col, InputGroup, Form, Button, Badge } from 'react-bootstrap'
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import SlidePage from '../../common/useful/SlidePage';


//클릭여부에 따라 좋아요 색 바꾸기
//슬릭슬라이더로 인스타처럼 사진 넘기기
//설정누르면 일기수정페이지로 이동 

const DiaryReadPage = () => {
  return (
    <div>
      <div className='my-5 text-center'>
        <h1>000님의 0번 행운일기</h1>
      </div>
      <Row className='justify-content-center my-5'>
        <Col lg={6}>
          <Card>
            <Card.Body>
              <Row>
                <Col lg={8}>
                  <h2>Title</h2>
                </Col>
                <Col lg={4}>
                <div className='text-end'>
                  <IoSettingsOutline style={{fontSize:"35px"}}/>
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
                      <Badge>카테고리</Badge>
                    </Col>
                    <Col>
                    <div className='text-end'>
                    <FaRegThumbsUp style={{fontSize:"20px"}}/>
                    <FaThumbsUp style={{fontSize:"20px"}}/>
                    </div>
                    </Col>
                  </Row>
                  <div>
                    <span>내용입니다.<br /> 내용입니다 <br /></span>
                  </div>
                </Col>
                <hr />
                <span>regDate:</span>
                <span>uDate:</span>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default DiaryReadPage