import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Badge, InputGroup, Form, Card, Table } from 'react-bootstrap'
import { TbBrandSnapseed } from "react-icons/tb";
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import Pagination from 'react-js-pagination';
import '../../common/useful/Paging.css';
import { Link } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';

const AuctionList = () => {
    //상품명과 이미지 넣기
    //처리상태 영구삭제요청 넣기(관리자에서 직접 해줄수있게끔)
    const uid = sessionStorage.getItem("uid")
    const [count, setCount] = useState(0);
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [key, setKey] = useState("null");
    const [word, setWord] = useState("");
    const [checked, setChecked] = useState(0);
    const [dates, setDates] = useState(null);
    const [date1, setDate1] = useState(null);
    const [date2, setDate2] = useState(null);

    const callAPI = async () => {
        const res = await axios.get(`/auction/list/${uid}?key=${key}&word=${word}&page=${page}&size=${size}&date1=${date1}&date2=${date2}`);
        const data = res.data.documents.map(auction => auction && { ...auction, checked: false })
        setList(data);
        setCount(res.data.total);
        console.log(res.data);
    }

    //console.log(dates[0], dates[1])
    const onSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        setWord("");
        callAPI();
    }

    useEffect(() => {
        callAPI()
    }, [page])

    useEffect(() => {
        let cnt = 0;
        list.forEach(list => list.checked && cnt++);
        setChecked(cnt);
    }, [list])


    const onChangeAll = (e) => {
        const data = list.map(auction => auction && { ...auction, checked: e.target.checked });
        setList(data);
    }

    const onChangeSingle = (e, auction_key) => {
        const data = list.map(auction => auction.auction_key === auction_key ? { ...auction, checked: e.target.checked } : auction);
        setList(data);
    }

    const onClickDelete = () => {
        if (!window.confirm("거래내역은 복구하기 어렵습니다. 삭제하시겠습니까?")) return;
        let cnt = 0;
        list.forEach(async list => {
            if (list.checked) {
                await axios.post(`/auction/delete/${list.auction_key}`);
                cnt++

                if (cnt === checked) {
                    alert(`${cnt}개 거래내역 삭제되었습니다`);
                    callAPI();
                    setPage(1);
                }
            }
        })
    }
    function fmtDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); 
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }

    console.log(fmtDate(date1))
    console.log(fmtDate(date2))

    const onChangedate = (e) => {
        setDates(e.value);
        setDate1(fmtDate(e.value[0]))
        setDate2(fmtDate(e.value[1]))
        //console.log("date1=" + e.value[0] + "......................................." + "date2=" + e.value[1])
    };

    return (
        <Row>
            <Col>
                <h1 className='text-center my-5'>개인경매목록</h1>
                <Row className='justify-content-center mt-3'>
                    <Col lg={8}>
                        <form onSubmit={onSubmit}>
                            <InputGroup className="mb-5">
                                <Col>
                                    <Form.Select value={key} name="key" onChange={(e) => setKey(e.target.value)}>
                                        <option value="null">전체</option>
                                        <option value="auction_seller">판매한거래</option>
                                        <option value="auction_buyer">구매한거래</option>
                                        <option value="auction_regDate">거래일지정</option>
                                    </Form.Select>
                                </Col>
                                {key === "auction_regDate" &&
                                    <Calendar value={dates} onChange={onChangedate} selectionMode="range" dateFormat="yy/mm/dd" readOnlyInput hideOnRangeSelection />
                                }
                                <Button type="submit" size="sm">검색</Button>
                            </InputGroup>
                        </form>
                    </Col>
                    <div className='text-end mb-2'>
                        <Button onClick={onClickDelete} size="sm">선택삭제</Button>
                    </div>
                    <Table>
                        <thead>
                            <tr>
                                <td><input type="checkbox" onClick={onChangeAll} checked={list.length === checked} /></td>
                                <td>번호</td>
                                <td colSpan={2}>상품명</td>
                                <td>거래내역</td>
                                <td>거래씨드</td>
                                <td>거래일</td>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map(a =>
                                <tr key={a.auction_key}>
                                    <td><input type="checkbox" onChange={(e) => onChangeSingle(e, a.auction_key)}
                                        checked={a.checked} /></td>
                                    <td>{a.auction_key}</td>
                                    <td>{a.mall_title} </td>
                                    <td><Link to={`/mall/read/${a.mall_key}`}>
                                        <img src={a.mall_photo || "http://via.placeholder.com/200x200"} style={{ width: "40%", height: "4rem", objectFit: "contain" }} />
                                    </Link>
                                    </td>
                                    <td>{a.auction_seller} <SyncAltIcon /> {a.auction_buyer} </td>
                                    <td>{a.auction_amount} <span style={{ fontSize: '15px', color: "brown" }}><TbBrandSnapseed /></span>  </td>
                                    <td>{a.fmtdate}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Row>
                {count > size &&
                    <Pagination
                        activePage={page}
                        itemsCountPerPage={size}
                        totalItemsCount={count}
                        pageRangeDisplayed={5}
                        prevPageText={"‹"}
                        nextPageText={"›"}
                        onChange={(e) => setPage(e)} />
                }

            </Col>
        </Row>

    )
}

export default AuctionList