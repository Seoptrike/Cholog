import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Card, Dropdown } from 'react-bootstrap';
import { SlLock, SlLockOpen } from "react-icons/sl";
import { BsArrowReturnRight, BsThreeDotsVertical } from "react-icons/bs";
import axios from 'axios';
import { Link } from 'react-router-dom';
import RereplyReaction from './RereplyReaction';
import ReportInsert from '../report/ReportInsert';

const RereplyListPage = ({ reply_key, reply_writer, callList, rereply, setRereply, callCount, bbs_writer }) => {
    const uid = sessionStorage.getItem('uid');
    const root = "rereply"

    // 삭제하기
    const onDelete = async (rereply_key) => {
        if (!window.confirm(`${rereply_key}번 대댓글을 삭제하실래요?`)) return;
        await axios.post(`/rereply/delete/${rereply_key}`);
        callCount();
        callList();
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
            callCount();
            callList();
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
                {rereply.map(rereply => (
                    <Row key={rereply.rereply_key} className='mb-3'>
                        <Col className="d-flex justify-content-end align-items-start" xs={2}>
                            <BsArrowReturnRight className='me-2' style={{ color: 'gray', fontSize: '1.5em' }} />
                        </Col>
                        <Col xs={10}>
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <Link to={`/user/read/${uid}`}><img src={rereply.user_img || "http://via.placeholder.com/20x20"} width="50" className='me-3 rounded-circle' /></Link>
                                    <div className="d-flex flex-column">
                                        <div className="d-flex align-items-center">
                                            <Link to={`/user/read/${uid}`}><span>{rereply.user_nickname} ({rereply.rereply_writer})</span></Link>
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
                                    {uid === rereply.rereply_writer || uid === reply_writer ? (
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
                                            <Dropdown.Item eventKey="warning"><ReportInsert uid={uid} writer={rereply.rereply_writer} root={root} origin={rereply.rereply_key} /></Dropdown.Item>
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
                                    <Col className='text-end'>
                                        <RereplyReaction rereply_key={rereply.rereply_key} uid={uid} />
                                    </Col>
                                </Row>
                            </div>
                            <hr />
                        </Col>
                    </Row>
                ))}
            </Col>
        </Row>
    );
};

export default RereplyListPage