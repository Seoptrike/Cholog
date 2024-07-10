import React, { useEffect, useState } from 'react'
import { Row, Col, Button, FormControl, InputGroup } from 'react-bootstrap'
import { SlLock, SlLockOpen } from "react-icons/sl";
import { Rating } from '@mui/material';
import Spa from '@mui/icons-material/Spa';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const InsertPage = ({mall_key}) => {
    const [form, setForm] = useState({
        review_mall_key: mall_key, 
        review_writer : sessionStorage.getItem('uid'),
        review_rating : 0,
        review_contents:'',
        review_lock: 0
    })
    const { review_mall_key, review_writer, review_rating, review_contents, review_lock }=form;
    const [onCancel, setOnCancel] = useState(false);
    const [secret, setSecret] = useState(false);

    const onChangeForm = (e) => { 
        setForm({...form, [e.target.name] : e.target.value});
    }

    const onClickCancel = () => {
        setForm({...form, review_rating : '', review_contents : ''});
        setOnCancel(false);
    }

    const onClickLock = () => {
        const lockState = review_lock === 0 ? 1 : 0;
        setForm({...form, review_lock : lockState})
        setSecret(lockState === 1);
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        if (review_contents === '') {
            alert('리뷰 내용을 입력하세요!');
            return;
        }
        if(!window.confirm("리뷰를 등록하실래요?")) return;
        console.log(form)
        try {
            await axios.post('/review/insert', form);
            alert('리뷰가 등록되었습니다.');
        } catch (error) {
            console.error('리뷰 등록 실패:', error);
            alert('리뷰 등록에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div>
            <h5 className='mt-5 text-center'>리뷰 인서트 페이지 (리뷰 쓰는거 보단 포인트가 메인이면 좋겠다.) {mall_key}</h5>
            <Row className='justify-content-center mt-5'>
                <Col xs={6}>
                    <div>
                        <form onSubmit={onSubmit} onReset={onClickCancel}>
                            <FormControl
                                name='review_contents' 
                                value={review_contents} 
                                as='textarea' rows={5} 
                                placeholder='내용을 입력해주세요.' 
                                onChange={onChangeForm}
                                onFocus={()=>setOnCancel(true)}/>
                            <InputGroup.Text> 
                                <Rating
                                    name='review_rating'
                                    value={review_rating}
                                    precision={1}
                                    max={10}
                                    size='large'
                                    onChange={onChangeForm} 
                                    icon={<Spa style={{color:"green"}}/>}
                                    emptyIcon={<Spa/>}    
                                />
                                <Button
                                    onClick={onClickLock}
                                    variant='' 
                                    size="sm" 
                                    className='me-2' 
                                    type='button'
                                    style={{ color: secret ? 'green' : 'inherit' }}
                                    >
                                    {secret ? <SlLock /> : <SlLockOpen />} {secret ? '비공개' : '공개'}
                                </Button>
                            </InputGroup.Text>
                        <div className='text-end mt-3'>
                            <Button onReset={onClickCancel}
                                variant='' size="sm" className='text-end me-2' type='reset' disabled={!onCancel}>취소</Button>
                            <Button variant='' size="sm" className='text-end' type='submit' disabled={review_contents === ''}>등록</Button>
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
