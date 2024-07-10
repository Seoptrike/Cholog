import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button, FormControl, Dropdown, Card, InputGroup } from 'react-bootstrap'
import Pagination from 'react-js-pagination';
import { BsList, BsHandThumbsUp, BsHandThumbsDown, BsChevronDown, BsThreeDotsVertical, BsArrowReturnRight } from "react-icons/bs";

const ReplyPage = () => {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [count, setCount] = useState(0);
    const [reply_contents, setReply_contents] = useState('');
    const [sort, setSort] = useState('latest')
    const [showReply, setShowReply] = useState(false);
    const [showRep, setShowRep] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const [onCancel, setOnCancel] = useState(false);
    const wordlimit = 1000;

    const reply = '댓글입니다.'
    const replies = '대댓글입니다.'

    const callAPI = async () => {

    }

    useEffect(() => {
        callAPI();
    }, [page, sort]);

    useEffect(()=> {
        setWordCount(reply_contents.length);
    },[reply_contents])

    const onInsert = () => {
        if (reply_contents === '') {
            alert("댓글 내용을 입력해주세요!")
            return;
        }
        else if (wordCount > wordlimit) {
            alert('허용되는 글자 수가 초과되었습니다.')
        }
        else {
            alert('댓글 등록');
            setReply_contents('');
            setOnCancel(false);
            callAPI();
        }
    }

    const onClickCancel = () => {
        setReply_contents('');
        setOnCancel(false);
    }

    const handleSelectSort = (eventKey) => {
        setSort(eventKey);
        setPage(1);
    };

    const toggleReply = () => {
        setShowReply(!showReply);
    };

    const toggleRep = () => {
        setShowRep(!showRep);
        setOnCancel(false);
    };
    

    return (
        <Row  className='justify-content-center mt-3'>
            <Col xs={8}>
            <h5 className='mt-5 text-center'>게시글 댓글 페이지</h5>
                <Row className='justify-content-center mt-5'>
                    <Col>
                        <Button type='button' variant="" onClick={toggleReply}>댓글 123 <BsChevronDown /></Button>
                    </Col>
                </Row>
                <hr />
            {showReply && (                
                <Card className='mt-3'>
                    <Row className='justify-content-center mt-3'>
                        <Col xs={12} className='text-end'>
                            <Dropdown onSelect={handleSelectSort}>
                                <Dropdown.Toggle variant="" id="dropdown-basic">
                                    <BsList />
                                </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="latest">최신순</Dropdown.Item>
                                <Dropdown.Item eventKey="like">좋아요순</Dropdown.Item>
                                <Dropdown.Item eventKey="oldest">오래된순</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Row className='justify-content-center'>
                            <Col xs={9}>
                                <Form>
                                    <FormControl value={reply_contents} onChange={(e) => setReply_contents(e.target.value)}
                                        onFocus={() => setOnCancel(true)} as='textarea' rows={5} placeholder='내용을 입력해주세요.' />
                                    <InputGroup.Text className='justify-content-end'>
                                        <span>{wordCount} / {wordlimit}</span>
                                    </InputGroup.Text>
                                    <div className='text-end mt-3'>
                                        <Button onClick={onClickCancel} variant=''
                                            size="sm" className='text-end me-2' type='cancel' disabled={!onCancel}>취소</Button>
                                        <Button onClick={onInsert} variant=''
                                            size="sm" className='text-end' type='submit' disabled={reply_contents === ''}>등록</Button>
                                    </div>
                                </Form>
                                <hr />
                            </Col>
                        </Row>
                        </Col>
                    </Row>
                    
                    <Row className='justify-content-center mt-2'>   /* 댓글 */
                        <Row className='justify-content-center'>
                            <Col xs={9} className='text-end'>
                                <Dropdown onSelect={handleSelectSort}>
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
                        <Col xs={9}>
                            <div className="d-flex align-items-center mb-2">
                                <img src="http://via.placeholder.com/20x20" width="50" className='me-3 rounded-circle' />
                                <div>
                                    <span>김상균 (gr001231)</span>
                                    <br />
                                    <span>2024.07.05 10:22:30</span>
                                </div>
                            </div>
                            <div className='my-3' style={{ whiteSpace: 'pre-wrap' }}>{reply}</div>
                            <div>
                                <BsHandThumbsUp className='me-4'/>
                                <BsHandThumbsDown className='me-4' />
                                <Button type='button' onClick={toggleRep}
                                    variant='' size="sm">댓글 + 1</Button>
                            </div>
                            <hr />

                        </Col>
                    </Row>
                    {showRep && (
                        <>
                            <Row className='justify-content-center mt-2'>       /* 대댓글 */
                                <Row className='justify-content-center'>
                                    <Col xs={9} className='text-end'>
                                        <Dropdown onSelect={handleSelectSort}>
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
                                <Col xs={9}>
                                    <div className="d-flex align-items-center mb-2">
                                        <BsArrowReturnRight className='me-2' />
                                        <img src="http://via.placeholder.com/20x20" width="50" className='me-3 rounded-circle' />
                                        <div>
                                            <span>김준호 (001231gr)</span>
                                            <br />
                                            <span>2024.07.05 15:22:30</span>
                                        </div>

                                    </div>
                                    <div className='my-3' style={{ whiteSpace: 'pre-wrap' }}>{replies}</div>
                                    <hr />
                                </Col>
                            </Row>

                            <Row className='justify-content-center mt-3'>
                                <Col xs={9}> /* 내가 대댓글 쓸때 */
                                    <Form>
                                        <div className="d-flex align-items-center mb-2">
                                            <BsArrowReturnRight className='me-2' />
                                            <img src="http://via.placeholder.com/20x20" width="50" className='me-3 rounded-circle' />
                                            <FormControl value={reply_contents} onChange={(e) => setReply_contents(e.target.value)}
                                                onFocus={()=>setOnCancel(true)} as='textarea' rows={5} placeholder='내용을 입력하세요.' />
                                        </div>
                                        <div className='text-end mt-2'>
                                            <Button variant='' onClick={toggleRep}
                                                size="sm" className='text-end me-2' type='cancel' >답글 접기</Button>
                                            <Button onClick={onClickCancel} variant=''
                                                size="sm" className='text-end me-2' type='cancel' disabled={!onCancel}>취소</Button>
                                            <Button onClick={onInsert} variant=''
                                                size="sm" className='text-end' type='submit' disabled={reply_contents === ''}>등록</Button>
                                        </div>
                                    </Form>
                                    <hr />
                                </Col>
                            </Row>
                        </>
                    )}


                    <div>
                        {count > size &&
                            <Pagination
                                activePage={page}
                                itemsCountPerPage={size}
                                totalItemsCount={count}
                                pageRangeDisplayed={5}
                                prevPageText={"‹"}
                                nextPageText={"›"}
                                onChange={(e) => setPage(e)} />
                        }
                    </div>
                </Card>
            )}
            </Col>
        </Row>
    )
}

export default ReplyPage