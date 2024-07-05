import React from 'react'
import { Card, Row, Col, InputGroup, Form, Button, Badge } from 'react-bootstrap'
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";

//맵으로 돌려서 카드바디생성 
//페이징생성
//검색기능생성 
const DiaryListPage = () => {
  return (
    <div>
        <h1 className='my-5 text-center'>000님의 행운일기</h1>
        <Row>
          <Col lg={3}>
            <Card>
              <Card.Header>
                <Badge className='me-3'>카테고리</Badge>
                <span>Title</span>
              </Card.Header>
              <Card.Body>
                <img src="http://via.placeholder.com/100x100" width="100%"/>
                <hr/>
                <Col>
                  <span>내용입니다</span>
                </Col>
                <Col>
                <div className='text-end'>
                    <FaRegThumbsUp style={{fontSize:"20px"}}/>
                    <FaThumbsUp style={{fontSize:"20px"}}/>
                </div>
                </Col>
                <hr/>
                  <span>regDate/uDate</span>
              </Card.Body>
            </Card>
          </Col>
        </Row>
    </div>
  )
}

export default DiaryListPage