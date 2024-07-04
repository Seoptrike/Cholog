import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Row, Col, Form, Button, FormControl, Dropdown, Card, Table} from 'react-bootstrap'
import Pagination from 'react-js-pagination';
import { BsList, BsHandThumbsUp, BsHandThumbsDown } from "react-icons/bs";


const ReplyPage = () => {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [count, setCount] = useState(0);
    const [reply_contents, setReply_contents] = useState('');
    const [sort, setSort] = useState('latest')

    const callAPI = async() => {

    }

    useEffect(()=>{
        callAPI();
    },[page, sort]);

    const onInsert = () => {
        if(reply_contents==='') {
            alert("댓글 내용을 입력해주세요!")
        }
    }

    const handleSelectSort = (eventKey) => {
        setSort(eventKey);
        setPage(1); // 새로운 정렬 기준을 선택했을 때 페이지를 초기화
    };

    return (
        <div>
            <h5 className='mt-5 text-center'>게시글 댓글 페이지</h5>
            <Row className='justify-content-center mt-3'>
                <Col xs={8} className='text-end'>
                    <Dropdown onSelect={handleSelectSort}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            <BsList />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="latest">최신순</Dropdown.Item>
                            <Dropdown.Item eventKey="rating">평점순</Dropdown.Item>
                            <Dropdown.Item eventKey="oldest">오래된순</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <Row className='justify-content-center mt-5'>
                <Col xs={6}>
                    <Form>
                        <FormControl value={reply_contents} onChange={(e)=>setReply_contents(e.target.value)}
                            as='textarea' rows={5} placeholder='내용을 입력하세요.'/>
                        <div className='text-end mt-2'>
                            <Button variant='outline-success'
                                size="sm" className='text-end me-2' type='cancel' disabled={reply_contents === '' }>취소</Button>
                            <Button onClick={onInsert} variant='outline-success'
                                size="sm" className='text-end' type='submit' disabled={reply_contents === '' }>등록</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
            <Row className='justify-content-center mt-5'>
                <Col xs={6}>
                    <Card className='mb-3'>
                        <Card.Header>
                            <div>
                                <img src="http://via.placeholder.com/20x20" width="50" className='me-3'/>
                                <span>이름 (아이디)</span>
                            </div>
                            <span>날짜</span>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>{reply_contents}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <div>
                                <BsHandThumbsUp className='me-4'/>
                                <BsHandThumbsDown className='me-4'/>
                                <Button variant='outline-success' size="sm">댓글</Button>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
            <Row className='justify-content-center mt-5'>
                <Col xs={6}>
                    <div>
                        <img src="http://via.placeholder.com/20x20" width="50" className='me-3'/>
                        <span>이름 (아이디)</span>
                    </div>
                    <span>날짜</span>
                </Col>
                <Row className='justify-content-center'>
                    <Col xs={6}>
                        {reply_contents}
                    </Col>
                </Row>
                <Row className='justify-content-center'>
                    <Col xs={6}>
                        <BsHandThumbsUp className='me-4'/>
                        <BsHandThumbsDown className='me-4'/>
                        <Button variant='outline-success' size="sm">댓글</Button>
                    </Col>
                </Row>

            </Row>
            <div>
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
        </div>
    )
}

export default ReplyPage