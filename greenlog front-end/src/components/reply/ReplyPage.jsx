import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Card, FormControl, Dropdown, Form, InputGroup } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import { BsChevronDown, BsHandThumbsUp, BsHandThumbsDown, BsList, BsThreeDotsVertical, BsArrowReturnRight } from "react-icons/bs";
import InsertPage from './InsertPage';
import axios from 'axios';

const ReplyPage = ({ bbs_key }) => {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(3);
    const [count, setCount] = useState(0);
    const [total, setTotal] = useState(0);
    const [replyContents, setReplyContents] = useState('');
    const [showReply, setShowReply] = useState(false);
    const [showRep, setShowRep] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const [onCancel, setOnCancel] = useState(false);
    const wordLimit = 1000;

    const callAPI = async () => {
        const res = await axios.get(`/reply/plist/${bbs_key}?page=${page}&size=${size}`);
        const data = res.data.documents.map(doc => ({ ...doc, isEdit: false, text: doc.reply_contents }));
        setList(data);
        setCount(res.data.total);
        setTotal(res.data.total);
        console.log(res.data);
    };

    useEffect(() => {
        callAPI();
    }, [page]);

    const onClickCancel = () => {
        setReplyContents('');
        setOnCancel(false);
    };

    const toggleReply = () => {
        setShowReply(!showReply);
    };

    const toggleRep = () => {
        setShowRep(!showRep);
        setOnCancel(false);
    };

    return (
        <Row className='justify-content-center mt-3'>
            <Col xs={8}>
                <h5 className='mt-5 text-center'>게시글 댓글 페이지</h5>
                <Row className='justify-content-center mt-5'>
                    <Col>
                        <Button type='button' variant="" onClick={toggleReply}>댓글 {total} <BsChevronDown /></Button>
                    </Col>
                </Row>
                <hr />
                {showReply && (
                    <Card className='mt-3'>
                        <InsertPage bbs_key={bbs_key} onNewReply={callAPI} />
                        <div>
                            {list.map(reply => (
                                <Row key={reply.reply_key} className='justify-content-center mt-2'>
                                    <Col xs={9}>
                                        <div className="d-flex align-items-center mb-2">
                                            <img src="http://via.placeholder.com/20x20" width="50" className='me-3 rounded-circle' alt="profile" />
                                            <div>
                                                <span>{reply.reply_writer}</span>
                                                <br />
                                                <span>{reply.reply_regdate}</span>
                                            </div>
                                        </div>
                                        <div className='my-3' style={{ whiteSpace: 'pre-wrap' }}>{reply.reply_contents}</div>
                                        <div>
                                            <BsHandThumbsUp className='me-4' />
                                            <BsHandThumbsDown className='me-4' />
                                            <Button type='button' onClick={toggleRep} variant='' size="sm">댓글 + 1</Button>
                                        </div>
                                        <hr />
                                    </Col>
                                </Row>
                            ))}
                        </div>
                        <div>
                            {count > size &&
                                <Pagination
                                    activePage={page}
                                    itemsCountPerPage={size}
                                    totalItemsCount={count}
                                    pageRangeDisplayed={5}
                                    prevPageText={"‹"}
                                    nextPageText={"›"}
                                    onChange={(e) => setPage(e)}
                                />
                            }
                        </div>
                    </Card>
                )}
            </Col>
        </Row>
    );
};

export default ReplyPage;
