import React, { useEffect, useState } from 'react'
import { Row, Col, Button, FormControl, InputGroup } from 'react-bootstrap'
import { FiLock } from "react-icons/fi";
import { Rating } from '@mui/material';
import Spa from '@mui/icons-material/Spa';


const InsertPage = () => {
    const [rating, setRating] = useState(0);
    const [review_contents, setReview_contents] = useState('');
    const [wordCount, setWordCount] = useState(0);
    const wordlimit = 1000;
    const [onCancel, setOnCancel] = useState(false);


    const callAPI = async () => {

    }

    useEffect(() => {
        callAPI();
    }, []);

    useEffect(()=> {
        setWordCount(review_contents.length);
    },[review_contents]);

    const onClickInsert = () => {
        if (review_contents === '') {
            alert('리뷰 내용을 입력하세요!');
            return;
        }
        else if (wordCount > wordlimit) {
            alert('허용되는 글자 수가 초과되었습니다.')
        }
        else {
            alert('리뷰 등록');
            setRating(0);
            setReview_contents('');
            setOnCancel(false);
            callAPI();
        }
    }

    const onClickCancel = () => {
        setRating(0);
        setReview_contents('');
        setOnCancel(false);
    }

    return (
        <div>
            <h5 className='mt-5 text-center'>리뷰 인서트 페이지</h5>
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
                                    value={rating}
                                    precision={1}
                                    max={10}
                                    size='large'
                                    onChange={(e, newValue) => { setRating(newValue); setOnCancel(true);}}
                                    icon={<Spa style={{color:"green"}}/>}
                                    emptyIcon={<Spa/>}    
                                    />
                                    <Button variant='' 
                                        size="sm" className='me-2' type='lock'><FiLock />비밀댓글</Button>
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
