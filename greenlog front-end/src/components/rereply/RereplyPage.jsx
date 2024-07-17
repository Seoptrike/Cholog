import React, { useEffect, useState } from 'react';
import { Row, Col, Dropdown } from 'react-bootstrap';
import { SlLock, SlLockOpen } from "react-icons/sl";
import { BsArrowReturnRight, BsChevronDown, BsHandThumbsUp, BsHandThumbsUpFill, BsHandThumbsDown, BsHandThumbsDownFill, BsThreeDotsVertical } from "react-icons/bs";
import axios from 'axios';
import RereplyInsertPage from './RereplyInsertPage';

const RereplyPage = ({ reply_key, bbs_writer }) => {
    const [rereply, setRereply] = useState([]);
    const [count, setCount] = useState(0);
    const [total, setTotal] = useState(0);
    const uid = sessionStorage.getItem('uid');

    const callAPI = async () => {
        const res = await axios.get(`/rereply/plist/${reply_key}`);
        if (res.data.total === 0) {
            setCount(0);
            setRereply([]);
        } else {
            const data = res.data.documents.map(doc => ({ ...doc, isEdit: false, text: doc.rereply_contents, lock: doc.rereply_lock, reaction: doc.rereply_reaction }));
            setRereply(data);
            setCount(res.data.total);
            setTotal(res.data.total);
            console.log(data);
        }
    };

    useEffect(() => {
        callAPI();
    }, []);

    // 삭제하기
    const onDelete = async (rereply_key) => {
        if (!window.confirm(`${rereply_key}번 대댓글을 삭제하실래요?`)) return;
        await axios.post(`/rereply/delete/${rereply_key}`);
        callAPI();
    };

    // 수정하기
    const onUpdate = (rereply_key) => {
        const data = rereply.map(rereply => rereply.rereply_key === rereply_key ? { ...rereply, isEdit: true } : rereply);
        setRereply(data);
    };

    // 수정할 때 내용 바꾸기
    const onChangeContents = (rereply_key, newContents) => {
        const data = rereply.map(rereply => rereply.rereply_key === rereply_key ? { ...rereply, text: newContents } : rereply);
        setRereply(data);
    };

    // 수정할 때 비밀 대댓글 바꾸기
    const onChangeLock = async (rereply_key, rereply_lock) => {
        const lockState = rereply_lock === 'unlock' ? 'lock' : 'unlock';
        if (window.confirm(`대댓글의 상태를 ${lockState === 'unlock' ? '공개 대댓글' : '비밀 대댓글'}로 변경하시겠습니까?`)) {
            const lock = rereply.map(rereply => rereply.rereply_key === rereply_key ? { ...rereply, lock: lockState } : rereply);
            setRereply(lock);
        }
    };

    //좋아요/싫어요 기능
    const onChangeReaction = async (rereply_key, rereply_reaction, newReaction) => {
        let reactionState;
        if (rereply_reaction === newReaction) {
            reactionState = 'none';
        } else {
            reactionState = newReaction;
        }
        try {
            await axios.post(`/rereply/update/rereplyLike`, {
                rereply_key: rereply_key,
                rereply_reaction: reactionState
            });
            const reaction = rereply.map(rereply => rereply.rereply_key === rereply_key ? { ...rereply, reaction: reactionState } : rereply);
            setRereply(reaction);
            callAPI();
        } catch (error) {
            console.error('리액션 변경 오류:', error);
        }
    };

    // 저장하기
    const onSave = async (rereply) => {
        if (!window.confirm(`${rereply.rereply_key}번 대댓글을 수정하실래요?`)) return;

        try {
            await axios.post(`/rereply/update/lock`, { rereply_key: rereply.rereply_key, rereply_lock: rereply.lock });
            await axios.post('/rereply/update', {
                rereply_key: rereply.rereply_key,
                rereply_contents: rereply.text,
            });
            alert("대댓글 수정 완료!");
            callAPI();
        } catch (error) {
            console.error('대댓글 수정 에러:', error);
        }
    };

    // 취소하기
    const onCancel = (rereply_key) => {
        const data = rereply.map(rereply => rereply.rereply_key === rereply_key ? { ...rereply, isEdit: false, text: rereply.rereply_contents, lock: rereply.rereply_lock } : rereply);
        setRereply(data);
    };

    return (
        <Row className='justify-content-center'>
            <Col xs={12}>
                {rereply.map(rereply =>
                    <Row key={rereply.rereply_key} className='mb-3'>
                        <Col xs={12}>
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <Row>
                                <Col className="d-flex justify-content-end align-items-start">
                                    <BsArrowReturnRight className='me-2' style={{ color: 'gray', fontSize: '1.5em' }} />
                                </Col>
                                </Row>
                                    <img src={rereply.user_img || "http://via.placeholder.com/20x20"} width="50" className='me-3 rounded-circle' alt="profile" />
                                    <div className="d-flex flex-column">
                                        <div className="d-flex align-items-center">
                                            <span>{rereply.user_nickname} ({rereply.rereply_writer})</span>
                                            {!rereply.isEdit && (
                                                <>
                                                    {(uid === rereply.rereply_writer || uid === bbs_writer) && rereply.rereply_lock === 'lock' && (
                                                        <span style={{ marginLeft: '8px', marginRight: '8px' }}>
                                                            <SlLock style={{ color: 'green' }} />
                                                        </span>
                                                    )}
                                                    {(uid === rereply.rereply_writer || uid === bbs_writer) && rereply.rereply_lock !== 'lock' && (
                                                        <span style={{ marginLeft: '8px', marginRight: '8px' }}>
                                                            <SlLockOpen style={{ color: 'black' }} />
                                                        </span>
                                                    )}
                                                </>
                                            )}

                                            {rereply.isEdit && (uid === rereply.rereply_writer || uid === bbs_writer) && rereply.lock === 'lock' && (
                                                <span onClick={() => onChangeLock(rereply.rereply_key, rereply.lock)} style={{ cursor: 'pointer', marginLeft: '8px' }}>
                                                    <SlLock style={{ color: 'green' }} />
                                                </span>
                                            )}

                                            {rereply.isEdit && (uid === rereply.rereply_writer || uid === bbs_writer) && rereply.lock !== 'lock' && (
                                                <span onClick={() => onChangeLock(rereply.rereply_key, rereply.lock)} style={{ cursor: 'pointer', marginLeft: '8px' }}>
                                                    <SlLockOpen style={{ color: 'black' }} />
                                                </span>
                                            )}
                                        </div>
                                        <div>
                                            <span>{rereply.rereply_udate ? `${rereply.rereply_udate}` : `${rereply.rereply_regdate}`} </span>
                                        </div>
                                    </div>
                                </div>
                                <Dropdown className="text-end">
                                    <Dropdown.Toggle variant="" id={`dropdown-basic-${rereply.rereply_key}`}>
                                        <BsThreeDotsVertical />
                                    </Dropdown.Toggle>
                                    {uid === rereply.rereply_writer || uid === bbs_writer ? (
                                        <>
                                            {!rereply.isEdit ? (
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => onUpdate(rereply.rereply_key)} eventKey="update">수정하기</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => onDelete(rereply.rereply_key)} eventKey="delete">삭제하기</Dropdown.Item>
                                                </Dropdown.Menu>
                                            ) : (
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => onSave(rereply)} eventKey="save">등록</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => onCancel(rereply.rereply_key)} eventKey="cancel">취소</Dropdown.Item>
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
                                        {rereply.isEdit ? (
                                            <textarea
                                                name='contents'
                                                value={rereply.text}
                                                onChange={(e) => onChangeContents(rereply.rereply_key, e.target.value)}
                                            />
                                        ) : (
                                            rereply.lock === 'lock' && (uid !== rereply.rereply_writer && uid !== bbs_writer) ? "비밀댓글입니다." : rereply.rereply_contents
                                        )}
                                    </Col>
                                </Row>
                            </div>
                            <div>
                                <span style={{ cursor: 'pointer' }}>
                                    {rereply.reaction === 'like' ? (
                                        <BsHandThumbsUpFill
                                            onClick={() => onChangeReaction(rereply.rereply_key, rereply.reaction, 'like')}
                                            className='me-4'
                                        />
                                    ) : (
                                        <BsHandThumbsUp
                                            onClick={() => onChangeReaction(rereply.rereply_key, rereply.reaction, 'like')}
                                            className='me-4'
                                        />
                                    )}
                                </span>
                                <span style={{ cursor: 'pointer' }}>
                                    {rereply.reaction === 'dislike' ? (
                                        <BsHandThumbsDownFill
                                            onClick={() => onChangeReaction(rereply.rereply_key, rereply.reaction, 'dislike')}
                                            className='me-4'
                                        />
                                    ) : (
                                        <BsHandThumbsDown
                                            onClick={() => onChangeReaction(rereply.rereply_key, rereply.reaction, 'dislike')}
                                            className='me-4'
                                        />
                                    )}
                                </span>
                            </div>
                            <hr />
                        </Col>
                    </Row>
                )}
                <RereplyInsertPage reply_key={reply_key} callAPI={callAPI} />
            </Col>
        </Row>
    );
};

export default RereplyPage;
