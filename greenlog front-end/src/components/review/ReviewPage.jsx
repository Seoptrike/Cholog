import React, { useEffect, useState } from 'react'
import { Row, Col, Dropdown, Card } from 'react-bootstrap'
import Pagination from 'react-js-pagination';
import { FiLock } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Rating } from '@mui/material';
import Spa from '@mui/icons-material/Spa';

const ReviewPage = () => {
    const [rating, setRating] = useState(0);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [count, setCount] = useState(0);
    const [sort, setSort] = useState('latest')

    const callAPI = async () => {

    }

    useEffect(() => {
        callAPI();
    }, [page, sort]);

    const handleSelectSort = (eventKey) => {
        setSort(eventKey);
        setPage(1);
    };

    return (
        <div>
            <h1 className='text-center my-2'>리뷰 목록 페이지입니다.</h1>
            <Row className='justify-content-center'>
                <Col xs={12} md={8} lg={6}>
                    <Card>
                        <Card.Body>
                            <Row className='align-items-center'>
                                <Col xs="auto">
                                    <img src="http://via.placeholder.com/30x30" width="70" height="70" className='rounded-circle' />
                                </Col>
                                <Col className="ps-2">
                                    <Row className='align-items-center'>
                                        <Col><span>김상균 (gr001231) 2024.07.08 17:27 <FiLock/></span></Col>
                                            <Col xs="auto">
                                                <Dropdown align="end" onSelect={handleSelectSort}>
                                                    <Dropdown.Toggle variant="" id="dropdown-basic">
                                                        <BsThreeDotsVertical />
                                                    </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item eventKey="update">수정하기</Dropdown.Item>
                                                    <Dropdown.Item eventKey="delete">삭제하기</Dropdown.Item>
                                                    <Dropdown.Item eventKey="warning">신고하기</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                    </Row>
                                    <Row>                
                                        <Rating
                                            name='point'
                                            value={rating}
                                            precision={1}
                                            max={10}
                                            size='large'
                                            onChange={(e, newValue) => setRating(newValue)}
                                            icon={<Spa style={{ color: "green" }} />}
                                            emptyIcon={<Spa />}/>                       
                                    </Row>
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <Col>
                                    난 10포인트 걸었어 드루와
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <hr />
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col xs={12} md={8} lg={6}>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col>
                                <div className='mb-2'>비밀 댓글입니다.</div>
                                <div>
                                    <span>2024.07.05 10:22:30</span>
                                </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <hr />
                </Col>
            </Row>
            
        </div>
    )
}

export default ReviewPage