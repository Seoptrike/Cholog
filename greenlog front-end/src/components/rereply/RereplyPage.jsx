import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { BsArrowReturnRight } from "react-icons/bs";
import { SlLock, SlLockOpen } from "react-icons/sl";
import RereplyListPage from './RereplyListPage';
import axios from 'axios';
import { BsChevronDown } from "react-icons/bs";

const RereplyPage = ({ reply_key, reply_writer, bbs_writer }) => {
    const [count, setCount] = useState(0);
    const [rereply, setRereply] = useState([]);
    const [showRep, setShowRep] = useState({});
    const [rereplyCount, setRereplyCount] = useState("")

    const callCount = async () => {
        const res = await axios.get(`/rereply/count/${reply_key}`);
        setRereplyCount(res.data);
    };

    const callList = async () => {
        const res = await axios.get(`/rereply/plist/${reply_key}`);
        if (res.data.total === 0) {
            setCount(0);
            setRereply([]);
        } else {
            const data = res.data.documents.map(doc => ({ ...doc, isEdit: false, text: doc.rereply_contents, lock: doc.rereply_lock, reaction: doc.rereply_reaction }));
            setRereply(data);
            setCount(res.data.total);
        }
    }

    useEffect(() => {
        callCount();
        callList();
    }, []);

    const toggleRep = (key) => {
        setShowRep(prevShowRep => ({
            ...prevShowRep,
            [key]: !prevShowRep[key]
        }));
    };

    const [form, setForm] = useState({
        reply_key: reply_key,
        rereply_writer: sessionStorage.getItem('uid'),
        rereply_contents: '',
        rereply_lock: 'unlock',
        rereply_reaction: 'none'
    });

    const { rereply_contents, rereply_lock } = form;

    const onChangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setOnCancel(true);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const uid = sessionStorage.getItem('uid');
        if (!uid) {
            alert("로그인이 필요합니다.");
            return;
        }
        
        if (rereply_contents === '') {
            alert("대댓글 내용을 입력해주세요!");
            return;
        }
        if (!window.confirm("대댓글을 등록하실래요?")) return;

        await axios.post('/rereply/insert', form);
        alert('대댓글 등록 완료');

        setForm({
            reply_key: reply_key,
            rereply_writer: sessionStorage.getItem('uid'),
            rereply_contents: '',
            rereply_lock: 'unlock',
            rereply_reaction: 'none'
        });
        setOnCancel(false);
        callCount();
        callList();  
    }

    const [onCancel, setOnCancel] = useState(false);

    const onClickCancel = () => {
        setForm({ ...form, rereply_contents: '' });
        setOnCancel(false);
    }

    const onClickLock = () => {
        const lockState = rereply_lock === 'unlock' ? 'lock' : 'unlock';
        setForm({ ...form, rereply_lock: lockState });
    }

    return (
        <Row className='justify-content-center'>
            <Col xs={12}>
            
                <Button type='button' variant="" onClick={() => toggleRep(reply_key)}>
                    댓글 {rereplyCount} <BsChevronDown />
                </Button>
                <hr />
                {showRep[reply_key] && (
                    <>
                        <RereplyListPage reply_key={reply_key} reply_writer={reply_writer} rereply={rereply} setRereply={setRereply} callList={callList} callCount={callCount} bbs_writer={bbs_writer} />
                        <Row className='text-end'>
                            <Col xs={12}>
                                <form onSubmit={onSubmit} onReset={onClickCancel}>
                                    <div className="d-flex align-items-center mb-2">
                                        <BsArrowReturnRight className='me-2' />
                                        <img src="http://via.placeholder.com/20x20" width="50" className='me-3 rounded-circle' />
                                        <Form.Control
                                            name='rereply_contents'
                                            value={rereply_contents}
                                            as='textarea' rows={3}
                                            placeholder='내용을 입력해주세요.'
                                            onChange={onChangeForm}
                                            onFocus={() => setOnCancel(true)} />
                                    </div>
                                    <div className='text-end mt-2'>
                                        <Button
                                            onClick={onClickLock}
                                            variant=''
                                            size="sm"
                                            className='me-2'
                                            type='button'
                                            style={{ color: rereply_lock === 'lock' ? 'green' : 'inherit' }}>
                                            {rereply_lock === 'lock' ? <SlLock /> : <SlLockOpen />} {rereply_lock === 'lock' ? '비공개' : '공개'}
                                        </Button>
                                        <Button variant='' size="sm" className='text-end me-2' type='submit'>등록</Button>
                                        <Button onClick={onClickCancel} variant='' size="sm" className='text-end' type='reset' disabled={!onCancel}>취소</Button>
                                    </div>
                                </form>
                            </Col>
                        </Row>
                        <Button variant='' onClick={() => toggleRep(reply_key)} size="sm" className='text-end me-2'>답글 접기</Button>
                    </>
                )}
            </Col>
        </Row>
    );
};

export default RereplyPage;
