import React, { useContext, useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { Row, Col, Button, Badge, ListGroup, } from 'react-bootstrap'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from 'axios'
import FiberNewIcon from '@mui/icons-material/FiberNew';
import { Link, useLocation } from 'react-router-dom'
import { UserContext } from '../user/UserContext';
import DiaryChart from './DiaryChart'
import DiaryPieChart from './DiaryPieChart'
import DiaryDailyChart from './DiaryDailyChart'
import MallChart from './MallChart';

//전체데이터필요, 차트출력 및 뱃지데이터 출력
//오늘의 할일을 버튼대신 listGroup을 사용할지 고민(넣어놓기만 함)
//차트 컴포넌트 추가
const Dashboard = () => {
    const [reportCount, setReportCount] = useState('');
    const [askCount, setaskCount] = useState('');
    const [qaCount, setQaCount] = useState('');
    const { userData, setUserData } = useContext(UserContext);
    const [rank, setRank] = useState([]);


    const callAPI = async () => {
        const res = await axios.get("/report/count")
        const res1 = await axios.get("/chat/listCount")
        const res2 = await axios.get("/qa/qaListCount")
        const res3 = await axios.get("/graph/rank")
        setaskCount(res1.data)
        setReportCount(res.data)
        setQaCount(res2.data)
        setRank(res3.data);
        console.log(res3.data);
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
                                <Badge bg="secondary">{askCount}</Badge>
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
                            <Col lg={4}><DiaryChart /></Col>
                            <Col lg={4}><DiaryDailyChart /></Col>
                            <Col lg={4}><DiaryPieChart /></Col>
                        </Row>
                    </div>
                    <div>
                        <div className='mb-2'>씨드포인트 랭킹</div>
                        <Row>
                            {rank.map(r =>
                                <Col key={r.seed_uid} md={8} lg={7}>
                                    <Card variant="outlined" className='mb-2' size="sm">
                                        <Row>
                                        <Col lg={6}>
                                            <div><b>{r.ranked}위</b></div>
                                            <div className='mb-2'>{r.seed_uid}({r.user_nickname})님</div>
                                            <div>{r.seed_point}씨드</div>
                                        </Col>
                                        <Col lg={1}>
                                        <div className='text-end'>
                                            <Badge color="secondary" overlap="circular">
                                                {r.user_auth}
                                            </Badge>
                                            </div>
                                        </Col>
                                        </Row>
                                    </Card>
                                </Col>
                            )}
                            <Col>
                            <MallChart/>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard