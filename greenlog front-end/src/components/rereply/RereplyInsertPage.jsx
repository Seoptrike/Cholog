import React, { useState } from 'react';
import { Row, Col, Button, FormControl } from 'react-bootstrap';
import { BsArrowReturnRight } from "react-icons/bs";
import axios from 'axios';

const RereplyInsertPage = ({ reply_key, callAPI }) => {
    const [form, setForm] = useState({
        reply_key: reply_key,
        rereply_writer: sessionStorage.getItem('uid'),
        rereply_contents: '',
        rereply_lock: 'unlock',
        rereply_reaction: 'none'
    });

    const { rereply_contents } = form;

    const onChangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (rereply_contents === '') {
            alert("대댓글 내용을 입력해주세요!");
            return;
        }
        if (!window.confirm("대댓글을 등록하실래요?")) return;

        try {
            const res = await axios.post('/rereply/insert', form);
            alert('댓글 등록 완료');
            
            setForm({
                reply_key: reply_key,
                rereply_writer: sessionStorage.getItem('uid'),
                rereply_contents: '',
                rereply_lock: 'unlock',
                rereply_reaction: 'none'
            });

            callAPI();
        } catch (error) {
            console.error('댓글 등록 에러:', error);
        }
    }

    const onClickCancel = () => {
        setForm({ ...form, rereply_contents: '' });
    }

    const [showRep, setShowRep] = useState(false);

    const toggleRep = () => {
        setShowRep(!showRep);
    };

    return (
        <Row className='justify-content-center'>
            <Col xs={12}>
                <form onSubmit={onSubmit} onReset={onClickCancel}>
                    <div className="d-flex align-items-center mb-2">
                        <BsArrowReturnRight className='me-2' />
                        <img src="http://via.placeholder.com/20x20" width="50" className='me-3 rounded-circle' />
                        <FormControl
                            name='rereply_contents'
                            value={rereply_contents}
                            as='textarea'
                            rows={3}
                            placeholder='내용을 입력해주세요.'
                            onChange={onChangeForm}
                        />
                    </div>
                    <div className='text-end mt-2'>
                        <Button variant='' onClick={toggleRep} size="sm" className='text-end me-2'>답글 접기</Button>
                        <Button variant='' size="sm" className='text-end me-2' type='submit'>등록</Button>
                        <Button onClick={onClickCancel} variant='' size="sm" className='text-end' type='reset'>취소</Button>
                    </div>
                </form>
                <hr />
            </Col>
        </Row>
    );
}

export default RereplyInsertPage;
