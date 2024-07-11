import React, { useEffect, useState } from 'react';
import { Row, Col, Dropdown, Card, Button } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import { Rating } from '@mui/material';
import Spa from '@mui/icons-material/Spa';
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from 'axios';
import '../../common/useful/Paging.css';

const ReviewPage = ({ mall_key, mall_seller, seller_number }) => {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(3);
    const [count, setCount] = useState(0);
    const [key, setKey] = useState('review_regDate desc');
    console.log(key)
    const uid = sessionStorage.getItem('uid');

    const callAPI = async () => {
        const res = await axios.get(`/review/plist/${mall_key}?key=${key}&page=${page}&size=${size}`);
        const data = res.data.documents.map(doc => ({ ...doc, isEdit: false, text: doc.review_contents, num: doc.review_rating }));
        setList(data);
        console.log(data);
        setCount(res.data.total);
    };

    useEffect(() => {
        callAPI();
    }, [key, page, size]);

    const handleSelectKey = (eventKey) => {
        setKey(eventKey);
        setPage(1);
    };

    // 삭제하기
    const onDelete = async (review_key) => {
        if (!window.confirm(`${review_key}번 댓글을 삭제하실래요?`)) return;
        await axios.post(`/review/delete/${review_key}`);
        alert('댓글 삭제 완료!');
        callAPI();
    };

    // 수정하기
    const onUpdate = (review_key) => {
        const data = list.map(review => (review.review_key === review_key) ? { ...review, isEdit: true } : review);
        setList(data);
    };

    // 등록하기 (저장)
    const onSave = async (review) => {
        if (review.isEdit && (review.num !== review.review_rating || review.text !== review.review_contents)) {
            if (!window.confirm("댓글을 수정하시겠습니까?")) return;
            await axios.post(`/review/update`, { review_key: review.review_key, review_contents: review.text, review_rating: review.num });
            alert("댓글 수정 완료!");
            callAPI();
        } else {
            callAPI();
        }
    };

    // 취소하기
    const onCancel = (review) => {
        if (review.num !== review.review_rating || review.text !== review.review_contents) {
            if (!window.confirm(`${review.review_key}번 댓글 수정을 취소하시겠습니까?`)) return;
        }
        const data = list.map(item => item.review_key === review.review_key ? { ...item, isEdit: false } : item);
        setList(data);
        callAPI();
    };

    // 수정할 때 내용 바꾸기
    const changeContents = (review_key, newContents) => {
        const data = list.map(review => (review.review_key === review_key) ? { ...review, text: newContents } : review);
        setList(data);
    };

    // 수정할 때 별점 바꾸기
    const changeRating = (review_key, newRating) => {
        const data = list.map(review => {
            if (review.review_key === review_key && review.isEdit) {
                return { ...review, num: newRating };
            }
            return review;
        });
        setList(data);
    };
    //낙찰하기
    const onClickBuy = async (review_writer, review_rating, mall_seller) => {
        alert(review_writer, review_rating, mall_seller)
        await axios.post('/auction/insert', {
            auction_mall_key: mall_key,
            auction_seller: mall_seller,
            auction_buyer: review_writer,
            auction_amount: review_rating
        })
        //경매시스템 위해서 넣어놓음 -인섭
        const res2 = await axios.get(`/seed/read/${review_writer}`)
        if (res2.data) {
            await axios.post('/trade/insert', {
                trade_to: seller_number,
                trade_from: res2.data.seed_number,
                amount: review_rating,
                seed_number: seller_number,
                trade_state:1,
                trade_info:"경매"
              })
        }

    }
    return (
        <div>
            <h1 className='text-center my-2'>리뷰 목록 페이지입니다.</h1>
            <Row className='justify-content-center'>
                <Col xs={12} md={8} lg={6}>
                    <Dropdown className="my-3">
                <Dropdown.Toggle variant="" id="dropdown-basic">
                    <BsThreeDotsVertical />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onSelect={() => handleSelectKey('review_regDate desc')} eventKey="latest">최신순</Dropdown.Item>
                    <Dropdown.Item onSelect={() => handleSelectKey('review_regDate asc')} eventKey="oldest">오래된순</Dropdown.Item>
                    <Dropdown.Item onSelect={() => handleSelectKey('review_rating desc')} eventKey="highest">평점 높은순</Dropdown.Item>
                    <Dropdown.Item onSelect={() => handleSelectKey('review_rating asc')} eventKey="lowest">평점 낮은순</Dropdown.Item>
                </Dropdown.Menu>
                <Row className='justify-content-center'>
                <Col xs={12}>
                    {list.map(review => (
                        <Card key={review.review_key} className='my-3'>
                            <Card.Body>
                                <Row className='align-items-center'>
                                    <Col xs="auto">
                                        <img src="http://via.placeholder.com/30x30" width="70" height="70" className='rounded-circle' alt="profile" />
                                        <div className='mt-2'>{review.review_writer}</div>
                                    </Col>
                                    <Col className="ps-2">
                                        <Row className='align-items-center'>
                                            <Col>
                                                <Rating
                                                    name='point'
                                                    value={review.num || review.review_rating}
                                                    precision={1}
                                                    max={10}
                                                    size='large'
                                                    onChange={(e, newValue) => changeRating(review.review_key, newValue)}
                                                    icon={<Spa style={{ color: "green" }} />}
                                                    emptyIcon={<Spa />}
                                                    readOnly={!review.isEdit}
                                                />
                                            </Col>
                                            <Col xs="auto">
                                                <Dropdown align="end">
                                                    <Dropdown.Toggle variant="" id="dropdown-basic">
                                                        <BsThreeDotsVertical />
                                                    </Dropdown.Toggle>
                                                    {uid === review.review_writer ? (
                                                        !review.isEdit ? (
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item onClick={() => onUpdate(review.review_key)} eventKey="update">수정하기</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => onDelete(review.review_key)} eventKey="delete">삭제하기</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        ) : (
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item onClick={() => onSave(review)} eventKey="save">등록</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => onCancel(review)} eventKey="cancel">취소</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        )
                                                    ) : (
                                                        uid === mall_seller ? (
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item onClick={() => onClickBuy(review.review_writer, review.review_rating, mall_seller)} eventKey="buy">낙찰하기</Dropdown.Item>
                                                                <Dropdown.Item eventKey="warning">댓글 신고하기</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        ) : (
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item eventKey="warning">댓글 신고하기</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        )
                                                    )}
                                                </Dropdown>
                                            </Col>
                                        </Row>
                                        <Col>
                                            <div>{review.review_regDate}</div>
                                        </Col>
                                        <Row className='align-items-center my-2'>
                                            <Col>
                                                {review.isEdit ?
                                                    <textarea
                                                        name='contents'
                                                        value={review.text}
                                                        onChange={(e) => changeContents(review.review_key, e.target.value)}
                                                    />
                                                    :
                                                    review.review_contents
                                                }
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    ))}
                    <hr />
                    </Col>
                    </Row>
            </Dropdown>
            
     
            </Col>
            </Row>
            {count > size &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={count}
                    pageRangeDisplayed={5}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={(e) => setPage(e)}
                />
            }
        </div>
    )
}

export default ReviewPage;
