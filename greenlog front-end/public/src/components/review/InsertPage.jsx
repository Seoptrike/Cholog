import React, { useEffect, useState } from 'react'
import { Row, Col, Button, FormControl, InputGroup } from 'react-bootstrap'
import { SlLock, SlLockOpen } from "react-icons/sl";
import { Rating } from '@mui/material';
import Spa from '@mui/icons-material/Spa';
import axios from 'axios';

const InsertPage = ({review_mall_key}) => {
    const uid = sessionStorage.getItem('uid');
    //const [review_writer, setReview_writer] = useState('');
    const [review_rating, setReview_rating] = useState(0);
    const [review_contents, setReview_contents] = useState('');
    //const [review_lock, setReview_lock] = useState(0);
    const [wordCount, setWordCount] = useState(0);
    const wordlimit = 1000;
    const [onCancel, setOnCancel] = useState(false);
    const [secret, setSecret] = useState(false);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [list, setList] = useState([]);


    const callAPI = async () => {
        const res = await axios.get(`/review/list?page=${page}&size=${size}`);
        console.log(res.data);
        const data = res.data.map(review=>review && {...review, isEdit:false, text:review.contents});
        setList(data);
    }

    useEffect(() => {
        callAPI();
    }, []);

    useEffect(()=> {
        setWordCount(review_contents.length);
    },[review_contents]);

    const onClickInsert = async() => {
        if (review_contents === '') {
            alert('리뷰 내용을 입력하세요!');
            return;
        }
        else if (wordCount > wordlimit) {
            alert('허용되는 글자 수가 초과되었습니다.')
        }
        else {
            await axios.post('/review/insert', {review_contents})
            alert('리뷰 등록');
            setReview_contents('');
            setOnCancel(false);
            setSecret(false);
            callAPI();
        }
    }

    const onClickCancel = () => {
        setReview_rating(0);
        setReview_contents('');
        setSecret(false);
        setOnCancel(false);
    }

    return (
        <div>
            <h5 className='mt-5 text-center'>리뷰 인서트 페이지 (리뷰 쓰는거 보단 포인트가 메인이면 좋겠다.)</h5>
            <Row className='justify-content-center mt-5'>
                <Col xs={6}>
                    <div>
                        {sessionStorage.getItem('uid') ?
                            <div>
                                <FormControl value={review_contents} onChange={(e) => setReview_contents(e.target.value)}
                                    as='textarea' rows={5} placeholder='내용을 입력해주세요.' onFocus={()=>setOnCancel(true)} />
                                <InputGroup.Text> 
                                <Rating
                                    name='point'
                                    value={review_rating}
                                    precision={1}
                                    max={10}
                                    size='large'
                                    onChange={(e, newValue) => { review_rating(newValue); setOnCancel(true);}}
                                    icon={<Spa style={{color:"green"}}/>}
                                    emptyIcon={<Spa/>}    
                                    />
                                    <Button 
                                        onClick={() => {setSecret(!secret); setOnCancel(true);}} 
                                        variant='' 
                                        size="sm" 
                                        className='me-2' 
                                        style={{ color: secret ? 'green' : 'inherit' }} 
                                        type='lock'
                                    >
                                        {secret ? <SlLock /> : <SlLockOpen />} {secret ? '비공개' : '공개'}
                                    </Button>
                                    <InputGroup.Text className='ms-auto'>
                                        <span>{wordCount} / {wordlimit}</span>
                                    </InputGroup.Text>
                                </InputGroup.Text>
                                <div className='text-end mt-3'>
                                    <Button onClick={onClickCancel} variant='' 
                                        size="sm" className='text-end me-2' type='cancel' disabled={!onCancel}>취소</Button>
                                    <Button onClick={onClickInsert} variant=''
                                        size="sm" className='text-end' type='submit' disabled={review_contents === ''}>등록</Button>
                                </div>
                            </div>
                            :
                            <div>
                                <Button>리뷰 작성</Button>
                            </div>
                        }
                    </div>
                </Col>
            </Row>
            <hr />
        </div>

    )
}

export default InsertPage
