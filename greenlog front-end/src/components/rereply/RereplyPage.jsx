import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Card, Dropdown, Form } from 'react-bootstrap';
import { BsThreeDotsVertical, BsArrowReturnRight } from "react-icons/bs";
import axios from 'axios';
import RereplyInsertPage from './RereplyInsertPage';

const RereplyPage = ({ reply_key, bbs_writer }) => {
    const [rereply, setRereply] = useState([]);
    const uid = sessionStorage.getItem('uid');

    const callAPI = async () => {
        const res = await axios.get(`/rereply/list/${reply_key}`);
        //console.log(res.data);
        const data = res.data.map(rereply => rereply && { ...rereply, isEdit: false, text: rereply.rereply_contents });
        setRereply(data);
    }

    useEffect(() => {
        callAPI();
    }, []);

    // 삭제하기
    const onDelete = async (rereply_key) => {
        if (!window.confirm(`${rereply_key}번 대댓글을 삭제하실래요?`)) return;
        await axios.post(`/rereply/delete/${rereply_key}`);
        callAPI();
    }

    // 수정하기
    const onUpdate = (rereply_key) => {
        const data = rereply.map(rereply => rereply.rereply_key === rereply_key ? { ...rereply, isEdit: true } : rereply);
        setRereply(data);
    }

    // 수정할 때 내용 바꾸기
    const onChangeContents = (rereply_key, newContents) => {
        const data = rereply.map(rereply => rereply.rereply_key === rereply_key ? { ...rereply, text: newContents } : rereply);
        setRereply(data);
    }

    // 저장하기
    const onSave = async (rereply) => {
        if (!window.confirm(`${rereply.rereply_key}번 대댓글을 수정하실래요?`)) return;

        try {
            await axios.post('/rereply/update', {
                rereply_key: rereply.rereply_key,
                rereply_contents: rereply.text,
            });
            alert("대댓글 수정 완료!");
            callAPI();
        } catch (error) {
            console.error('대댓글 수정 에러:', error);
        }
    }

    // 취소하기
    const onCancel = (rereply_key) => {
        const data = rereply.map(rereply => rereply.rereply_key === rereply_key ? { ...rereply, isEdit: false, text: rereply.rereply_contents } : rereply);
        setRereply(data);
    }

    return (
        <Row className='justify-content-center'>
            <Col xs={12}>
                {rereply.map(rereply =>
                    <Row key={rereply.rereply_key}>
                        <Col xs={12}>
                            <div className="d-flex align-items-center">
                                <BsArrowReturnRight className='me-2' />
                                <img src={rereply.user_img || "http://via.placeholder.com/20x20"} width="50" className='me-3 rounded-circle' />
                                <div>
                                    <div className="d-flex align-items-center">
                                        <span>{rereply.user_nickname} ({rereply.rereply_writer})</span>
                                        <span className="ms-2">{rereply.rereply_udate ? rereply.rereply_udate : rereply.rereply_regdate}</span>
                                        <Dropdown className='me-auto'>
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
                                    <div>
                                        {rereply.isEdit ? (
                                            <Form.Control
                                                as="textarea"
                                                rows={2}
                                                value={rereply.text}
                                                onChange={(e) => onChangeContents(rereply.rereply_key, e.target.value)}
                                            />
                                        ) : (
                                            <span>{rereply.rereply_contents}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </Col>
                    </Row>
                )}
                <RereplyInsertPage reply_key={reply_key} callAPI={callAPI} />
            </Col>
        </Row>
    )
}

export default RereplyPage;
