import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Card, Dropdown } from 'react-bootstrap';
import { SlLock, SlLockOpen } from "react-icons/sl";
import Pagination from 'react-js-pagination';
import { BsChevronDown, BsHandThumbsUp, BsHandThumbsDown, BsThreeDotsVertical } from "react-icons/bs";
import InsertPage from './InsertPage';
import axios from 'axios';

const ReplyPage = ({ bbs_key, bbs_writer }) => {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(3);
    const [count, setCount] = useState(0);
    const [total, setTotal] = useState(0);
    const [replyContents, setReplyContents] = useState('');
    const [showReply, setShowReply] = useState(false);
    const [showRep, setShowRep] = useState(false);
    const [onCancel, setOnCancel] = useState(false);
    const uid = sessionStorage.getItem('uid');
    const [key, setKey] = useState('reply_regdate asc')

    const callAPI = async () => {
        const res = await axios.get(`/reply/plist/${bbs_key}?key=${key}&page=${page}&size=${size}`);
        const data = res.data.documents.map(doc => ({ ...doc, isEdit: false, text: doc.reply_contents }));
        setList(data);
        setCount(res.data.total);
        setTotal(res.data.total);
    };

    useEffect(() => {
        callAPI();
    }, [key, page, size]);

    const onKey = (eventKey) => {
        setKey(eventKey);
        setPage(1);
    };

    const onClickCancel = () => {
        setReplyContents('');
        setOnCancel(false);
    };

    const toggleReply = () => {
        setShowReply(!showReply);
    };

    const toggleRep = (reply_key) => {
        setShowRep(!showRep);
        setOnCancel(false);
    };

    // 삭제하기
    const onDelete = async (reply_key) => {
        if (!window.confirm(`${reply_key}번 댓글을 삭제하실래요?`)) return;
        await axios.post(`/reply/delete/${reply_key}`);
        alert('댓글 삭제 완료!');
        callAPI();
    };

    // 수정하기
    const onUpdate = (reply_key) => {
        const data = list.map(reply => (reply.reply_key === reply_key) ? { ...reply, isEdit: true } : reply);
        setList(data);
    };

    // 등록하기 (저장)
    const onSave = async (reply) => {
        if (reply.isEdit && (reply.text !== reply.reply_contents)) {
            if (!window.confirm("댓글을 수정하시겠습니까?")) return;
            await axios.post(`/reply/update`, { reply_key: reply.reply_key, reply_contents: reply.text });
            alert("댓글 수정 완료!");
            callAPI();
        } else {
            callAPI();
        }
    };

    // 수정할 때 내용 바꾸기
    const changeContents = (reply_key, newContents) => {
        const data = list.map(reply => (reply.reply_key === reply_key) ? { ...reply, text: newContents } : reply);
        setList(data);
    };

    //취소하기
    const onCancelClick = (reply) => {
        if (reply.text !== reply.reply_contents) {
            if (!window.confirm(`${reply.reply_key}번 댓글 수정을 취소하시겠습니까?`)) return;
        }
        const data = list.map(item => item.reply_key === reply.reply_key ? { ...item, isEdit: false } : item);
        setList(data);
        callAPI();
    }

    // 비밀댓글 수정하기
    const onClickUpdate = async(reply) => {
        if (!(uid === reply.reply_writer || uid === bbs_writer)) return; // 작성자가 아니면 실행하지 않음

        const updatedLockState = reply.reply_lock === 'unlock' ? 'lock' : 'unlock';
        const updatedReply = { ...reply, reply_lock: updatedLockState };
        try {
            await axios.post('/update/lock', updatedReply);
            onUpdate(updatedReply);
        } catch (error) {
            console.error('Error updating lock status:', error);
        }
    }
    
    return (
        <Row className='justify-content-center mt-3'>
            <Col xs={8}>
                <h5 className='mt-5 text-center'></h5>
                <Row className='justify-content-center mt-5'>
                    <Col>
                        <Button type='button' variant="" onClick={toggleReply}>댓글 {total} <BsChevronDown /></Button>
                    </Col>
                </Row>
                <hr />
                {showReply && (
                    <Card className='mt-3'>
                        <InsertPage bbs_key={bbs_key} onNewReply={callAPI} />
                        <Row className='justify-content-center mt-3'>
                            <Col xs={12} className='text-end'>
                                <Dropdown onKey={onKey}>
                                    <Dropdown.Toggle variant="" id="dropdown-basic">
                                        <BsThreeDotsVertical />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => onKey('reply_regDate desc')}>최신순</Dropdown.Item>
                                        <Dropdown.Item onClick={() => onKey('reply_regDate asc')}>오래된순</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>
                        {list.map(reply => (
                            <Row key={reply.reply_key} className='justify-content-center mt-2'>
                                <Col xs={9}>
                                    <div className="d-flex align-items-center mb-2">
                                        <img src="http://via.placeholder.com/20x20" width="50" className='me-3 rounded-circle' alt="profile" />
                                        <div className="d-flex align-items-center">
                                            <span>{reply.reply_writer}</span>
                                            {(uid === reply.reply_writer || uid === bbs_writer) && reply.reply_lock === 'lock' && (
                                                <span onClick={() => onClickUpdate(reply)} style={{ cursor: 'pointer', marginLeft: '8px' }}>
                                                    {reply.reply_lock === 'lock' ? <SlLock style={{ color: 'green' }} /> : <SlLockOpen />}
                                                </span>
                                            )}
                                            <span>{reply.reply_regdate}</span>
                                        </div>
                                        <Row className='justify-content-center'>
                                            <Col className='text-end'>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="" id="dropdown-basic">
                                                        <BsThreeDotsVertical />
                                                    </Dropdown.Toggle>
                                                    {uid === reply.reply_writer || uid === bbs_writer ? (
                                                        <>
                                                            {!reply.isEdit ? (
                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item onClick={() => onUpdate(reply.reply_key)} eventKey="update">수정하기</Dropdown.Item>
                                                                    <Dropdown.Item onClick={() => onDelete(reply.reply_key)} eventKey="delete">삭제하기</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            ) : (
                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item onClick={() => onSave(reply)} eventKey="save">등록</Dropdown.Item>
                                                                    <Dropdown.Item onClick={() => onCancelClick(reply)} eventKey="cancel">취소</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item eventKey="warning">댓글 신고하기</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    )}
                                                </Dropdown>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className='my-3' style={{ whiteSpace: 'pre-wrap' }}>
                                        <Row className='align-items-center my-2'>
                                            <Col>
                                                {reply.isEdit ? (
                                                    <textarea
                                                        name='contents'
                                                        value={reply.text}
                                                        onChange={(e) => changeContents(reply.reply_key, e.target.value)}
                                                    />
                                                ) : (
                                                    reply.reply_lock === 'lock' && (uid !== reply.reply_writer && uid !== bbs_writer) ? "비밀댓글입니다." : reply.reply_contents
                                                )}
                                            </Col>
                                        </Row>
                                    </div>
                                    <div>
                                        <BsHandThumbsUp className='me-4' />
                                        <BsHandThumbsDown className='me-4' />
                                        <Button type='button' onClick={() => toggleRep(reply.reply_key)} variant='' size="sm">댓글 + 1</Button>
                                    </div>
                                    <hr />
                                </Col>
                            </Row>
                        ))}
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
