import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { Row, Col, Button, Badge, ListGroup } from 'react-bootstrap'
import PieChart from '../../common/useful/PieChart'
import axios from 'axios'
import ReportPage from './ReportPage'
import FiberNewIcon from '@mui/icons-material/FiberNew';

//전체데이터필요, 차트출력 및 뱃지데이터 출력
//오늘의 할일을 버튼대신 listGroup을 사용할지 고민(넣어놓기만 함)
//차트 컴포넌트 추가
const Dashboard = () => {
    const [reportCount, setReportCount] = useState('');
    const [askCount, setaskCount] = useState('');
    const [qaCount, setQaCount] = useState('');
    const callAPI = async () => {
        const res = await axios.get("/report/count")
        const res1= await axios.get("/chat/listCount")
        const res2= await axios.get("/qa/qaListCount")
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
                    <h2 className='text-center my-5'>관리자 000님 오늘도 초록데이</h2>
                    <div className='mb-3'><h4>오늘의 할일</h4></div>
                    <div className='today mb-5'>
                        <Button className='px-5 me-5'>
                            {reportCount > 0 ? <FiberNewIcon style={{ color: "yellow" }} /> : null}
                            신고접수
                            <Badge bg="secondary">{reportCount}</Badge>
                        </Button>
                        <Button className='px-5 me-5'>포인트관리 <Badge bg="secondary">9</Badge></Button>
                        <Button className='px-5 me-5'>{askCount > 0 ? <FiberNewIcon style={{ color: "yellow" }} /> : null}
                            1:1 문의
                            <Badge bg="secondary">{qaCount}</Badge></Button>
                            <Button className='px-5 me-5'>{qaCount > 0 ? <FiberNewIcon style={{ color: "yellow" }} /> : null}
                            Q&A 답변하기
                            <Badge bg="secondary">{qaCount}</Badge></Button>
                    </div>
                    <div className='chart text-center mb-5'>
                        <Row>
                            <Col><PieChart /></Col>
                            <Col><PieChart /></Col>
                            <Col><PieChart /></Col>
                        </Row>
                    </div>
                    <div>
                        <Row>
                            <Col>포인트관리
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
                                <div>신고접수내용</div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard