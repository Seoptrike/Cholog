import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import Pagination from 'react-js-pagination';
import '../../common/useful/Paging.css';

const MallList = () => {
    const uid = sessionStorage.getItem("uid");
    const now = new Date(); // 오늘 날짜
    const today = moment(now).format('YYYY-MM-DD'); 
    //셀러
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    //리뷰
    const [list2, setList2] = useState([]);
    const [total2, setTotal2] = useState(0);
    const [page2, setPage2] = useState(1);
    const [size2, setSize2] = useState(5);
    const [view, setView] = useState('seller');

    const callAPI = async () => {
        //셀러
        const res = await axios.get(`/mall/list/${uid}?page=${page}&size=${size}`);
        setTotal(res.data.total);
        const formattedData = res.data.documents.map(item => ({
            ...item,
            mall_endDate: moment(item.mall_endDate).format('YYYY-MM-DD'),
            mall_regDate: moment(item.mall_regDate).format('yyyy년 MM월 DD일 HH시mm분')
        }));
        const res2 = formattedData.map(item => axios.get(`/mall/reviewCount/${item.mall_key}`));
        const responses = await Promise.all(res2);// 모든 요청 병렬 실행 및 결과 대기
        const updatedData = formattedData.map((item, index) => ({ // formattedData와 responses를 조합하여 업데이트된 데이터 생성
            ...item,
            reviewCount: responses[index].data.count // 리뷰 카운트 추가
        }));
        setList(updatedData);
        //리뷰
        const res3 = await axios.get(`/mall/review/${uid}?page=${page2}&size=${size2}`);
        const formattedData2 = res3.data.documents.map(item => ({
            ...item,
            mall_endDate: moment(item.mall_endDate).format('YYYY-MM-DD')
        }));
        setTotal2(res3.data.total);
        setList2(formattedData2);
    }

    useEffect(() => {
        callAPI();
    }, [page, size,page2, size2])

    const onClickseller = () => {
        setView('seller');
    }

    const onClickreview = () => {
        setView('review');
    }

    return (
        <>
            <h1 className='text-center my-5'>피망이용목록</h1>
            <div className='text-end'  >
                <Button onClick={onClickseller} className='me-3'>판매 내역</Button>
                <Button onClick={onClickreview}>입찰 내역</Button>
            </div>
            {view === 'seller' && (
                <>
                    <Table className='sellerList'>
                        <thead>
                            <tr>
                                <td>글번호</td>
                                <td colSpan={2}>상품명</td>
                                <td>반응수</td>
                                <td>마감일</td>
                                <td>작성일</td>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map(list =>
                                <tr key={list.mall_key}>
                                    <td>[{list.mall_key}]</td>
                                    <td ><a href={`/mall/read/${list.mall_key}`}>{list.mall_title}</a></td>
                                    <td >
                                        <img src={list.mall_photo || "http://via.placeholder.com/200x200"}
                                            style={{ width: "40%", height: "4rem", objectFit: "contain" }} />
                                    </td>
                                    <td>{list.reviewCount}개</td>
                                    <td>{list.mall_endDate}</td>
                                    <td>{list.mall_regDate}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    {total > size &&
                        <Pagination
                            activePage={page}
                            itemsCountPerPage={size}
                            totalItemsCount={total}
                            pageRangeDisplayed={5}
                            prevPageText={"‹"}
                            nextPageText={"›"}
                            onChange={(e) => setPage(e)} />
                    }
                </>
            )}
            {view === 'review' && (
                <>
                    <Table className='reviewList'>
                        <thead>
                            <tr>
                                <td>글번호</td>
                                <td colSpan={2}>상품명</td>
                                <td>나의 반응</td>
                                <td>마감일</td>
                                <td>글쓴이</td>
                            </tr>
                        </thead>
                        <tbody>
                            {list2.map(list =>
                                <tr key={list.mall_key}>
                                    <td>[{list.mall_key}]</td>
                                    <td ><a href={`/mall/read/${list.mall_key}`}>{list.mall_title}</a></td>
                                    <td >
                                        <img src={list.mall_photo || "http://via.placeholder.com/200x200"}
                                            style={{ width: "40%", height: "4rem", objectFit: "contain" }} />
                                    </td>
                                    <td>{list.review_rating}씨드</td>
                                    <td>{list.mall_endDate > today ? list.mall_endDate : `[마감]`}</td>
                                    <td>{list.mall_seller}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    {total2 > size2 &&
                        <Pagination
                            activePage={page2}
                            itemsCountPerPage={size2}
                            totalItemsCount={total2}
                            pageRangeDisplayed={5}
                            prevPageText={"‹"}
                            nextPageText={"›"}
                            onChange={(e) => setPage2(e)} />
                    }
                </>
            )}
            <hr className='my-5'/>
        </>
    )
}

export default MallList