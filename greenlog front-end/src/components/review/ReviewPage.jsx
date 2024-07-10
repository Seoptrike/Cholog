import React, { useEffect, useState } from 'react'
import { Row, Col, Dropdown, Card } from 'react-bootstrap'
import Pagination from 'react-js-pagination';
import { FiLock } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Rating } from '@mui/material';
import Spa from '@mui/icons-material/Spa';
import axios from 'axios';
import '../../common/useful/Paging.css'

const ReviewPage = () => {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(4);
    const [count, setCount] = useState(0);
    const [sort, setSort] = useState('latest');
    const [review_mall_key, setReview_mall_key] = useState(24);

    // const callAPI = async () => {
    //     const res = await axios.get(`/review/plist/${review_mall_key}?page=${page}&size=${size}`);
    //     console.log(res.data);
    //     setList(res.data.documents);
    //     setCount(res.data.total);
    // };

    // useEffect(() => {
    //     callAPI();
    // }, [page, sort, review_mall_key]);

    // const handleSelectSort = (eventKey) => {
    //     setSort(eventKey);
    //     setPage(1);
    // };

    // const onDelete = async(review_key) => {
    //     if(!window.confirm(`${review_key}번 댓글을 삭제하실래요?`)) return;
    //     const res = await axios.post(`/review/delete/${review_key}`);
    //     if(res.data.result===1) {
    //         callAPI();
    //     }
    // }

    return (
        <div>
            <h1 className='text-center my-2'>리뷰 목록 페이지입니다.</h1>
            <Row className='justify-content-center'>
                <Col xs={12} md={8} lg={6}>
                    {list.map(review => (
                        <Card key={review.review_key} className='my-3'>
                            <Card.Body>
                                {review.review_lock === 1 ? (
                                    <div className='mb-2'>비밀 댓글입니다.</div>
                                ) 
                                : 
                                (
                                <Row className='align-items-center'>
                                    <Col xs="auto">
                                        <img src="http://via.placeholder.com/30x30" width="70" height="70" className='rounded-circle' alt="profile" />
                                    </Col>
                                    <Col className="ps-2">
                                        <Row className='align-items-center'>
                                            <Col>{review.review_writer}</Col>
                                            <Col>
                                                {review.review_lock === 1 && (
                                                    <Col xs="auto">
                                                        <FiLock style={{ color: "green" }} />
                                                    </Col>
                                                )}
                                            </Col>
                                            <Col xs="auto">
                                                <Dropdown align="end">
                                                    <Dropdown.Toggle variant="" id="dropdown-basic">
                                                        <BsThreeDotsVertical />
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item eventKey="update">수정하기</Dropdown.Item>
                                                        <Dropdown.Item 
                                                            eventKey="delete">삭제하기</Dropdown.Item>
                                                        <Dropdown.Item eventKey="warning">신고하기</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Col>
                                        </Row>
                                        <Row className='align-items-center my-2'>
                                            <Col>
                                                <Rating
                                                    name='point'
                                                    value={review.review_rating}
                                                    precision={1}
                                                    max={10}
                                                    size='large'
                                                    readOnly
                                                    icon={<Spa style={{ color: "green" }} />}
                                                    emptyIcon={<Spa />}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>{review.review_contents}</Col>
                                        </Row>
                                    </Col>
                                </Row>
                                 )}
                            </Card.Body>
                        </Card>
                    ))}
                    <hr />
                </Col>
            </Row>
            {count > size && 
            <Pagination
                activePage={page}
                itemsCountPerPage={size}
                totalItemsCount={count}
                pageRangeDisplayed={5}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={ (e)=>setPage(e) }/>
            }
        </div>
    )
}

export default ReviewPage;
