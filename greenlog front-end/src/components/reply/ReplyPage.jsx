import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Card, Form, InputGroup } from 'react-bootstrap';
import { BsChevronDown } from 'react-icons/bs';
import ReplyInsertPage from './ReplyInsertPage';
import ReplyReadPage from './ReplyReadPage';
import axios from 'axios';
import { SlLock, SlLockOpen } from "react-icons/sl";
const ReplyPage = ({ bbs_key, bbs_writer }) => {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(3);
    const [key, setKey] = useState('reply_regdate desc');
    const [count, setCount] = useState(0);
    const [reply, setReply] = useState([]);
    const [showRep, setShowRep] = useState(true);
    const [showReply, setShowReply] = useState(false);
    const [replyCount, setReplyCount] = useState("")
    let reply_bbs_key = bbs_key;

    const callCount = async () => {
        const res = await axios.get(`/reply/count/${bbs_key}`)
        console.log(res.data)
        setReplyCount(res.data)
    };

    const callList = async () => {
        const res = await axios.get(`/reply/plist/${bbs_key}?key=${key}&page=1&size=3`);
        if (res.data.total === 0) {
            setCount(0);
            setReply([]);
        } else {
            const data = res.data.documents.map(doc => ({ ...doc, isEdit: false, text: doc.reply_contents, lock: doc.reply_lock, reaction: doc.reply_reaction }));
            setReply(data);
            setCount(res.data.total);
            const last = Math.ceil(res.data.total / size);
            if (page > last) setPage(page - 1);
        }
    };

    useEffect(() => {
        callCount();
        callList();
    }, []);

    const toggleRep = () => {
        setShowRep(!showRep);
    };

    const [form, setForm] = useState({
        reply_bbs_key: bbs_key,
        reply_writer: sessionStorage.getItem('uid'),
        reply_contents: '',
        reply_lock: 'unlock',
        reply_reaction: 'none'
    });

    const { reply_contents, reply_lock } = form;

    const onChangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setOnCancel(true);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (reply_contents === '') {
            alert("댓글 내용을 입력해주세요!");
            return;
        }
        if (!window.confirm("댓글을 등록하실래요?")) return;

        try {
            await axios.post('/reply/insert', form);
            alert('댓글 등록 완료');
            setForm({
                reply_bbs_key: bbs_key,
                reply_writer: sessionStorage.getItem('uid') || '',
                reply_contents: '',
                reply_lock: 'unlock',
                reply_reaction: 'none'
            });
            setOnCancel(false);
        } catch (error) {
            console.error('댓글 등록 에러:', error);
        }
        callList();
        callCount();
    }

    const [onCancel, setOnCancel] = useState(false);

    const onClickCancel = () => {
        setForm({ ...form, reply_contents: '' });
        setOnCancel(false);
    }

    const onClickLock = () => {
        const lockState = reply_lock === 'unlock' ? 'lock' : 'unlock';
        setForm({ ...form, reply_lock: lockState });
    }

    return (
        <Row className='justify-content-center mt-3'>
            <Col xs={8}>
                <h5 className='mt-5 text-center'></h5>
                <Row className='justify-content-center mt-5'>
                    <Col>
                        <Button type='button' variant="" onClick={() => setShowReply(!showReply)}>
                            댓글 {replyCount} <BsChevronDown />
                        </Button>
                    </Col>
                </Row>
                <hr />
                {showReply && (
                    <Card className='mt-3'>
                        <Row className='justify-content-center mt-3'>
                            <Col xs={9}>
                                <div>
                                    <form onSubmit={onSubmit} onReset={onClickCancel}>
                                        <Form.Control
                                            name='reply_contents'
                                            value={reply_contents}
                                            as='textarea' rows={5}
                                            placeholder='내용을 입력해주세요.'
                                            onChange={onChangeForm}
                                            onFocus={() => setOnCancel(true)} />
                                        <InputGroup.Text>
                                            <Button
                                                onClick={onClickLock}
                                                variant=''
                                                size="sm"
                                                className='me-2'
                                                type='button'
                                                style={{ color: reply_lock === 'lock' ? 'green' : 'inherit' }}>
                                                {reply_lock === 'lock' ? <SlLock /> : <SlLockOpen />} {reply_lock === 'lock' ? '비공개' : '공개'}
                                            </Button>
                                            <Button variant='' size="sm" className='text-end me-2' type='submit'>등록</Button>
                                            <Button onClick={onClickCancel} variant='' size="sm" className='text-end' type='reset' disabled={!onCancel}>취소</Button>
                                        </InputGroup.Text>
                                    </form>
                                </div>
                            </Col>
                        </Row>
                        <ReplyReadPage reply={reply} setReply={setReply} bbs_writer={bbs_writer} callCount={callCount} callList={callList}/>
                    </Card>
                )}
            </Col>
        </Row>
    );
};

export default ReplyPage;
