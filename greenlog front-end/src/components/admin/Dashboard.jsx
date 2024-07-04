import React from 'react'
import Sidebar from './Sidebar'
import {Row, Col, Button, Badge} from 'react-bootstrap'

//전체데이터필요, 차트출력 및 뱃지데이터 출력
const Dashboard = () => {
  return (
    <div>
        <Row>
            <Col lg={2}>   
                <Sidebar/>
            </Col>
            <Col>    
                <h2 className='text-center my-5'>관리자 000님 오늘도 초록데이</h2>
                <div className='mb-3'><h4>오늘의 할일</h4></div>
                <div className='today mb-5'>
                    <Button className='px-5 me-5'>신고접수 <Badge bg="secondary">9</Badge></Button>
                    <Button className='px-5 me-5'>포인트관리 <Badge bg="secondary">9</Badge></Button>
                    <Button className='px-5 me-5'>1:1 <Badge bg="secondary">9</Badge></Button>
                    <Button className='px-5 me-5'>Q&A <Badge bg="secondary">9</Badge></Button>
                </div>
                <div className='chart text-center mb-5'>
                <Row>
                    <Col>차트</Col>
                    <Col>차트</Col>
                    <Col>차트</Col>
                </Row>
                </div>
                <div>
                    <Row>
                        <Col>포인트관리</Col>
                        <Col>신고접수내용</Col>
                    </Row>
                </div>
            </Col> 
        </Row>
    </div>
  )
}

export default Dashboard