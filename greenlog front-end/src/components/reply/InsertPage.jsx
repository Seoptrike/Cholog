import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button, FormControl, Dropdown, Card, InputGroup } from 'react-bootstrap'
import Pagination from 'react-js-pagination';
import { BsList, BsHandThumbsUp, BsHandThumbsDown, BsChevronDown, BsThreeDotsVertical, BsArrowReturnRight } from "react-icons/bs";
import axios from 'axios';

const InsertPage = ({bbs_key}) => {
    const [form, setForm] = useState({
        reply_bbs_key : bbs_key,
        reply_writer : sessionStorage.getItem('uid'),
        reply_contents : '',
        reply_reaction : ''
    });

    const {reply_bbs_key, reply_writer, reply_contents, reply_reaction} = form;

    const onChangeForm = (e) => { 
        setForm({...form, [e.target.name] : e.target.value});
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        if (reply_contents === '') {
            alert("댓글 내용을 입력해주세요!")
            return;
        }
        await axios.post('/reply/insert', form)
            alert('댓글 등록');
        }

    return (
        <div className='mt-5'>
            <h5 className='mt-5 text-center'>게시글 인서트 페이지</h5>
            <Row className='justify-content-center mt-5'>
                <Col xs={6}>
                    <div>
                        <form onSubmit={onSubmit} >
                        <div className='text-end mt-3'>
                            <Button 
                                variant='' size="sm" className='text-end me-2' type='reset'>취소</Button>
                            <Button variant='' size="sm" className='text-end' type='submit'>등록</Button>
                        </div>
                        </form>    
                    </div>
                </Col>
            </Row>
            <hr />
        </div>
    )
}

export default InsertPage