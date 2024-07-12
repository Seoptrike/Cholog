import React, { useState } from 'react';
import { Row, Col, Form, Button, FormControl, InputGroup } from 'react-bootstrap';
import { SlLock, SlLockOpen } from "react-icons/sl";
import axios from 'axios';

const InsertPage = ({ bbs_key, onNewReply }) => {
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
        console.log(form);
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
            if (onNewReply) {
                onNewReply();
            }
        } catch (error) {
            console.error('댓글 등록 에러:', error);
        }
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
        <div>
            <h5 className='text-center'></h5>
            <Row className='justify-content-center'>
                <Col xs={9}>
                    <div>
                        <form onSubmit={onSubmit} onReset={onClickCancel}>
                            <FormControl
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
            <hr />
        </div>
    )
}

export default InsertPage;
