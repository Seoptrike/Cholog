import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button, FormControl, Dropdown, Card, InputGroup } from 'react-bootstrap'
import Pagination from 'react-js-pagination';
import { BsList, BsHandThumbsUp, BsHandThumbsDown, BsChevronDown, BsThreeDotsVertical, BsArrowReturnRight } from "react-icons/bs";

const InsertPage = () => {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [count, setCount] = useState(0);
    const [reply_contents, setReply_contents] = useState('');
    const [sort, setSort] = useState('latest')
    const [wordCount, setWordCount] = useState(0);
    const [onCancel, setOnCancel] = useState(false);
    const [showRep, setShowRep] = useState(false);
    const wordlimit = 1000;

    const callAPI = async () => {

    }

    useEffect(() => {
        callAPI();
    }, [page, sort]);

    useEffect(() => {
        setWordCount(reply_contents.length);
    }, [reply_contents])

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

    const handleSelectSort = (eventKey) => {
        setSort(eventKey);
        setPage(1);
    };

    const onClickCancel = () => {
        setReply_contents('');
        setOnCancel(false);
    }

    const toggleRep = () => {
        setShowRep(!showRep);
        setOnCancel(false);
    };

    return (
        <div className='mt-5'>
            <h5 className='mt-5 text-center'>게시글 인서트 페이지</h5>
        <Row className='justify-content-center mt-3'>
            <Col xs={8}>
                <Card className='mt-3'>
                    <Row className='justify-content-center mt-3'>
                        <Col xs={12} className='text-end'>
                            <Dropdown onSelect={handleSelectSort}>
                                <Dropdown.Toggle variant="" id="dropdown-basic">
                                    <BsList />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="latest">최신순</Dropdown.Item>
                                    <Dropdown.Item eventKey="rating">평점순</Dropdown.Item>
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
            </Col>
        </Row>
        </div>
    )
}

export default InsertPage