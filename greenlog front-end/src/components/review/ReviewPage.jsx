import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Row, Col, Form, Button, FormControl} from 'react-bootstrap'
import Pagination from 'react-js-pagination';

const ReviewPage = () => {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [count, setCount] = useState(0);
    const [review_contents, setReview_contents] = useState('');

    const callAPI = async() => {
    }

    useEffect(()=>{
        callAPI();
    },[page]);

    const onInsert = () => {
        if(review_contents==='') {
            alert("리뷰 내용을 입력해주세요!")
        }
    }


    return (
        <div className='text-center'>
            <h5 className='mt-5'>사용 상품 후기</h5>
            <Row className='justify-content-center mt-5'>
                <Col xs={6}>
                    <Form>
                        <FormControl value={review_contents} onChange={(e)=>setReview_contents(e.target.value)}
                            as='textarea' rows={5} placeholder='내용을 입력하세요.'/>
                        <div className='text-end mt-2'>
                            <Button className='text-end me-2' type='cancel'>취소</Button>
                            <Button onClick={onInsert}
                                className='text-end' type='submit'>등록</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
            <div>
                {count > size &&
                    <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={count}
                    pageRangeDisplayed={5}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={ (e)=>setPage(e) }/>
                }
            </div>
        </div>
    )
}

export default ReviewPage