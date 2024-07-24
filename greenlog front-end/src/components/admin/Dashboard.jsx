import React, { useContext, useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { Row, Col, Button, Badge, ListGroup } from 'react-bootstrap'
import PieChart from '../../common/useful/PieChart'
import axios from 'axios'
import ReportPage from './ReportPage'
import FiberNewIcon from '@mui/icons-material/FiberNew';
import { Link, useLocation } from 'react-router-dom'
import { UserContext } from '../user/UserContext';
import DiaryChart from './DiaryChart'
import DiaryPieChart from './DiaryPieChart'

//전체데이터필요, 차트출력 및 뱃지데이터 출력
//오늘의 할일을 버튼대신 listGroup을 사용할지 고민(넣어놓기만 함)
//차트 컴포넌트 추가
const Dashboard = () => {
    const [reportCount, setReportCount] = useState('');
    const [askCount, setaskCount] = useState('');
    const [qaCount, setQaCount] = useState('');
    const {userData, setUserData} = useContext(UserContext);


    const callAPI = async () => {
        const res = await axios.get("/report/count")
        const res1 = await axios.get("/chat/listCount")
        const res2 = await axios.get("/qa/qaListCount")
        setaskCount(res1.data)
        setReportCount(res.data)
        setQaCount(res2.data)
    }
    useEffect(() => { callAPI() }, [])
    return (
        <div>
            <Row>
                <Col lg={2}>
                    <Sidebar />
                </Col>
                <Col>
                    <h2 className='text-center my-5'>{userData.nickname}님 오늘도 초록데이</h2>
                    <div className='mb-3'><h4>오늘의 할일</h4></div>
                    <div className='today text-center mb-5'>
                        <Link to="/admin/question#notice">
                            <Button className='px-5 me-5'>
                                {reportCount > 0 ? <FiberNewIcon style={{ color: "yellow" }} /> : null}
                                신고접수
                                <Badge bg="secondary">{reportCount}</Badge>
                            </Button>
                        </Link>
                        <Link to="/admin/question#1:1">
                            <Button className='px-5 me-5'>{askCount > 0 ? <FiberNewIcon style={{ color: "yellow" }} /> : null}
                                1:1 문의
                                <Badge bg="secondary">{qaCount}</Badge>
                            </Button>
                        </Link>
                        <Link to="/admin/question#qa">
                            <Button className='px-5 me-5'>{qaCount > 0 ? <FiberNewIcon style={{ color: "yellow" }} /> : null}
                                Q&A 답변하기
                                <Badge bg="secondary">{qaCount}</Badge>
                            </Button>
                        </Link>
                    </div>
                    <div className='chart text-center mb-5'>
                        <Row>
                            <Col><DiaryChart/></Col>
                            <Col><DiaryPieChart/></Col>
                        </Row>
                    </div>
                    <div>
                        <Row>
                            <Col>오늘올라온물건
                                <ListGroup as="ol" numbered>
                                    <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                    >
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">Subheading</div>
                                            Cras justo odio
                                        </div>
                                        <Badge bg="primary" pill>
                                            14
                                        </Badge>
                                    </ListGroup.Item>
                                    <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                    >
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">Subheading</div>
                                            Cras justo odio
                                        </div>
                                        <Badge bg="primary" pill>
                                            14
                                        </Badge>
                                    </ListGroup.Item>
                                    <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                    >
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">Subheading</div>
                                            Cras justo odio
                                        </div>
                                        <Badge bg="primary" pill>
                                            14
                                        </Badge>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col>
                                <div>오늘올라온일기</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div>이번달랭크(관리자 제외, 일반회원 씨드포인트 대량 or 좋아요를 가장 많이 받은 일기/게시물)</div>
                            </Col>
                            <Col>
                                <div>이번달이벤트</div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard