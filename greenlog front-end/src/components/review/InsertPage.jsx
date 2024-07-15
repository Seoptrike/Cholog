import React, { useEffect, useState } from 'react'
import { Row, Col, Button, FormControl, InputGroup } from 'react-bootstrap'
import { Rating } from '@mui/material';
import axios from 'axios';
import { TbBrandSnapseed } from "react-icons/tb";

const InsertPage = ({mall_key, mall_seller}) => {
    const uid = sessionStorage.getItem('uid');

    useEffect(()=> {
        if(uid === mall_seller) {
            alert('자신의 게시글에는 댓글을 달 수 없습니다.')
        }
    },[uid, mall_seller])

    const [form, setForm] = useState({
        review_mall_key: mall_key, 
        review_writer : sessionStorage.getItem('uid'),
        review_rating : 0,
        review_contents:'',
        
    })
    const { review_mall_key, review_writer, review_rating, review_contents }=form;
    const [onCancel, setOnCancel] = useState(false);

    const onChangeForm = (e) => { 
        setForm({...form, [e.target.name] : e.target.value});
        setOnCancel(true);
    }

    const onClickCancel = () => {
        setForm({...form, review_rating : '', review_contents : ''});
        setOnCancel(false);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (review_contents === '' && review_rating === 0) {
            alert("리뷰나 포인트를 클릭하세요");
            return;
        }
        if (!window.confirm("리뷰를 등록하실래요?")) return;
        try {
            await axios.post('/review/insert', form);
            alert('리뷰가 등록되었습니다.');
            setForm({
                review_mall_key: mall_key, 
                review_writer: sessionStorage.getItem('uid'),
                review_rating: 0,
                review_contents: ''
            });
            setOnCancel(false);
        } catch (error) {
            alert('이미 리뷰를 등록하셨습니다.')
            //현재 입찰 내역으로 이동
            setForm({
                review_mall_key: mall_key, 
                review_writer: sessionStorage.getItem('uid'),
                review_rating: 0,
                review_contents: ''
            });
            setOnCancel(false);
        }
    };

    return (
        <div>
            <h5 className='mt-5 text-center'>리뷰 인서트 페이지 (리뷰 쓰는거 보단 포인트가 메인이면 좋겠다.) {mall_key}</h5>
            <Row className='justify-content-center mt-5'>
                <Col xs={6}>
                    <div>
                        <form onSubmit={onSubmit} onReset={onClickCancel}>
                            <InputGroup.Text> 
                                <Rating
                                    name='review_rating'
                                    value={review_rating}
                                    precision={1}
                                    max={10}
                                    size='small'
                                    onChange={onChangeForm} 
                                    icon={<TbBrandSnapseed style={{color:"brown"}}/>}
                                    emptyIcon={<TbBrandSnapseed/>}    
                                />
                            </InputGroup.Text>
                            <FormControl
                                name='review_contents' 
                                value={review_contents} 
                                as='textarea' rows={1} 
                                placeholder='내용을 입력해주세요.' 
                                onChange={onChangeForm}
                                onFocus={()=>setOnCancel(true)}/>
                        <div className='text-end mt-3'>
                            <Button variant='' size="sm" className='text-end me-2' type='submit' disabled={uid === mall_seller}>등록</Button>
                            <Button onReset={onClickCancel}
                                variant='' size="sm" className='text-end' type='reset' disabled={!onCancel}>취소</Button>
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
