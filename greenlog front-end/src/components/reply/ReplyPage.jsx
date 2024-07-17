import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Card, Dropdown } from 'react-bootstrap';
import { SlLock, SlLockOpen } from "react-icons/sl";
import Pagination from 'react-js-pagination';
import { BsChevronDown, BsHandThumbsUp, BsHandThumbsUpFill, BsHandThumbsDown, BsHandThumbsDownFill, BsThreeDotsVertical } from "react-icons/bs";
import ReplyInsertPage from './ReplyInsertPage';
import axios from 'axios';
import RereplyPage from '../rereply/RereplyPage';

const ReplyPage = ({ bbs_key, bbs_writer }) => {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(3);
    const [key, setKey] = useState('reply_regdate desc');
    const [count, setCount] = useState(0);
    const [total, setTotal] = useState(0);
    const [reply, setReply] = useState([]);
    const uid = sessionStorage.getItem('uid');
    const [showReply, setShowReply] = useState(false);
    const [showRep, setShowRep] = useState({});
    const [rereplyParent, setRereplyParent] = useState(null); // 대댓글 부모 댓글을 저장할 상태

    const callAPI = async () => {
        const res = await axios.get(`/reply/plist/${bbs_key}?key=${key}&page=${page}&size=${size}`);
        if (res.data.total === 0) {
            setCount(0);
            setReply([]);
        } else {
            const data = res.data.documents.map(doc => ({ ...doc, isEdit: false, text: doc.reply_contents, lock: doc.reply_lock, reaction: doc.reply_reaction }));
            setReply(data);
            setCount(res.data.total);
            setTotal(res.data.total);
            const last = Math.ceil(res.data.total / size);
            if (page > last) setPage(page - 1);
        }
    };

    useEffect(() => {
        callAPI();
    }, [key, page, size]);

    const onKey = (key) => {
        setKey(key);
        setPage(1);
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
        const data = reply.map(reply => reply.reply_key === reply_key ? { ...reply, isEdit: true } : reply);
        setReply(data);
    };

    // 수정할 때 내용 바꾸기
    const onChangeContents = (reply_key, reply_contents) => {
        const data = reply.map(reply => reply.reply_key === reply_key ? { ...reply, text: reply_contents } : reply);
        setReply(data);
    };

    // 수정할 때 비밀 댓글 바꾸기
    const onChangeLock = async (reply_key, reply_lock) => {
        const lockState = reply_lock === 'unlock' ? 'lock' : 'unlock';
        if (window.confirm(`댓글의 상태를 ${lockState === 'unlock' ? '공개 댓글' : '비밀 댓글'}로 변경하시겠습니까?`)) {
            const lock = reply.map(reply => reply.reply_key === reply_key ? { ...reply, lock: lockState } : reply);
            setReply(lock);
        }
    };

    // 좋아요/싫어요 기능
    const onChangeReaction = async (reply_key, reply_reaction, newReaction) => {
        let reactionState;
        if (reply_reaction === newReaction) {
            reactionState = 'none';
        } else {
            reactionState = newReaction; 
        }
        try {
            await axios.post(`/reply/update/replyLike`, {
                reply_key: reply_key,
                reply_reaction: reactionState
            });
            const reaction = reply.map(reply => reply.reply_key === reply_key ? { ...reply, reaction: reactionState } : reply);
            setReply(reaction);
            callAPI();
        } catch (error) {
            console.error('리액션 변경 오류:', error);
        }
    };

    // 저장하기
    const onSave = async (reply) => {
        if (!window.confirm(`${reply.reply_key}번 댓글을 수정하실래요?`)) return;

        try {
            await axios.post(`/reply/update/lock`, { reply_key: reply.reply_key, reply_lock: reply.lock });
            await axios.post('/reply/update', {
                reply_key: reply.reply_key,
                reply_contents: reply.text,
            });
            alert("댓글 수정 완료!");
            callAPI();
        } catch (error) {
            console.error('댓글 수정 에러:', error);
        }
    };

    // 취소하기
    const onCancel = (reply_key) => {
        const data = reply.map(reply => reply.reply_key === reply_key ? { ...reply, isEdit: false, text: reply.reply_contents, lock: reply.reply_lock } : reply);
        setReply(data);
    };

    // 대댓글 토글하기
    const toggleRep = (reply_key) => {
        setShowRep({ ...showRep, [reply_key]: !showRep[reply_key] });
        if (showRep[reply_key]) {
            setRereplyParent(null); // 대댓글 닫을 때 부모 댓글 상태 초기화
        } else {
            setRereplyParent(reply_key); // 대댓글 열 때 부모 댓글 상태 업데이트
        }
    };

    return (
        <Row className='justify-content-center mt-3'>
            <Col xs={8}>
                <h5 className='mt-5 text-center'></h5>
                <Row className='justify-content-center mt-5'>
                    <Col>
                        <Button type='button' variant="" onClick={() => setShowReply(!showReply)}>댓글 {total} <BsChevronDown /></Button>
                    </Col>
                </Row>
                <hr />
                {showReply && (
                    <Card className='mt-3'>
                        <ReplyInsertPage bbs_key={bbs_key} callAPI={callAPI} />
                        <Row className='justify-content-center mt-3'>
                            <Col xs={12} className='text-end'>
                                <Dropdown>
                                    <Dropdown.Toggle variant="" id="dropdown-basic">
                                        <BsThreeDotsVertical />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => onKey('reply_regdate desc')}>최신순</Dropdown.Item>
                                        <Dropdown.Item onClick={() => onKey('reply_regdate asc')}>오래된순</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>

                        {reply.map(reply => (
                            <Row key={reply.reply_key} className='justify-content-center mt-2'>
                                <Col xs={10}>
                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                        <div className="d-flex align-items-center">
                                            <img src={reply.user_img || "http://via.placeholder.com/20x20"} width="50" className='me-3 rounded-circle' alt="profile" />
                                            <div className="d-flex flex-column">
                                                <div className="d-flex align-items-center">
                                                    <span>{reply.user_nickname} ({reply.reply_writer})</span>
                                                    {!reply.isEdit && (
                                                        <>
                                                            {(uid === reply.reply_writer || uid === bbs_writer) && reply.reply_lock === 'lock' && (
                                                                <span style={{ marginLeft: '8px', marginRight: '8px' }}>
                                                                    <SlLock style={{ color: 'green' }} />
                                                                </span>
                                                            )}
                                                            {(uid === reply.reply_writer || uid === bbs_writer) && reply.reply_lock !== 'lock' && (
                                                                <span style={{ marginLeft: '8px', marginRight: '8px' }}>
                                                                    <SlLockOpen style={{ color: 'black' }} />
                                                                </span>
                                                            )}
                                                        </>
                                                    )}

                                                    {reply.isEdit && (uid === reply.reply_writer || uid === bbs_writer) && reply.lock === 'lock' && (
                                                        <span onClick={() => onChangeLock(reply.reply_key, reply.lock)} style={{ cursor: 'pointer', marginLeft: '8px' }}>
                                                            <SlLock style={{ color: 'green' }} />
                                                        </span>
                                                    )}

                                                    {reply.isEdit && (uid === reply.reply_writer || uid === bbs_writer) && reply.lock !== 'lock' && (
                                                        <span onClick={() => onChangeLock(reply.reply_key, reply.lock)} style={{ cursor: 'pointer', marginLeft: '8px' }}>
                                                            <SlLockOpen style={{ color: 'black' }} />
                                                        </span>
                                                    )}
                                                </div>
                                                <div>
                                                    <span>{reply.reply_udate ? `${reply.reply_udate}` : `${reply.reply_regdate}`} </span>
                                                </div>
                                            </div>
                                        </div>
                                        <Dropdown className="text-end">
                                            <Dropdown.Toggle variant="" id={`dropdown-basic-${reply.reply_key}`}>
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
                                                            <Dropdown.Item onClick={() => onCancel(reply.reply_key)} eventKey="cancel">취소</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    )}
                                                </>
                                            ) : (
                                                <Dropdown.Menu>
                                                    <Dropdown.Item eventKey="warning">댓글 신고하기</Dropdown.Item>
                                                </Dropdown.Menu>
                                            )}
                                        </Dropdown>
                                    </div>
                                    <div className='my-3' style={{ whiteSpace: 'pre-wrap' }}>
                                        <Row className='align-items-center my-2'>
                                            <Col>
                                                {reply.isEdit ? (
                                                    <textarea
                                                        name='contents'
                                                        value={reply.text}
                                                        onChange={(e) => onChangeContents(reply.reply_key, e.target.value)}
                                                    />
                                                ) : (
                                                    reply.lock === 'lock' && (uid !== reply.reply_writer && uid !== bbs_writer) ? "비밀댓글입니다." : reply.reply_contents
                                                )}
                                            </Col>
                                        </Row>
                                    </div>
                                    <div>
                                        <span style={{ cursor: 'pointer' }}>
                                            {reply.reaction === 'like' ? (
                                                <BsHandThumbsUpFill
                                                    onClick={() => onChangeReaction(reply.reply_key, reply.reaction, 'like')}
                                                    className='me-4'
                                                />
                                            ) : (
                                                <BsHandThumbsUp
                                                    onClick={() => onChangeReaction(reply.reply_key, reply.reaction, 'like')}
                                                    className='me-4'
                                                />
                                            )}
                                        </span>
                                        <span style={{ cursor: 'pointer' }}>
                                            {reply.reaction === 'dislike' ? (
                                                <BsHandThumbsDownFill
                                                    onClick={() => onChangeReaction(reply.reply_key, reply.reaction, 'dislike')}
                                                    className='me-4'
                                                />
                                            ) : (
                                                <BsHandThumbsDown
                                                    onClick={() => onChangeReaction(reply.reply_key, reply.reaction, 'dislike')}
                                                    className='me-4'
                                                />
                                            )}
                                        </span>
                                        <Button type='button' onClick={() => toggleRep(reply.reply_key)} variant='' size="sm">댓글 {reply.rereply_count}</Button>
                                    </div>
                                    <hr />
                                    {showRep[reply.reply_key] && (
                                        <Row className='justify-content-center mt-3'>
                                            <Col xs={12}>
                                                <RereplyPage reply_key={reply.reply_key} bbs_writer={bbs_writer} />
                                            </Col>
                                        </Row>
                                    )}
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
