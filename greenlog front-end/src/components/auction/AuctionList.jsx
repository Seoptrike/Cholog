import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Badge, InputGroup, Form, Card, Table } from 'react-bootstrap'
import { TbBrandSnapseed } from "react-icons/tb";
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import Pagination from 'react-js-pagination';
import '../../common/useful/Paging.css';
import { Link } from 'react-router-dom';
import Calendar from '../../common/useful/Calendar';



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

  const callAPI = async () => {
    const res = await axios.get(`/auction/list/${uid}?key=${key}&word=${word}&page=${page}&size=${size}`);
    const data = res.data.documents.map(auction => auction && { ...auction, checked: false })
    setList(data);
    setCount(res.data.total);
    console.log(res.data);
  }

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


  const formatDate = (dateString, separator = "-") => {
    const date = new Date(dateString);
    if (isNaN(date)) return;

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}${separator}${mm}${separator}${dd}`;
  };

  const PERIOD = [
    { id: "ALL", name: "전체" },
    { id: "1W", name: "1주일" },
    { id: "1M", name: "1개월" },
    { id: "3M", name: "3개월" },
    { id: "6M", name: "6개월" }
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(PERIOD[3].name);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const onClickPeriod = (e) => {
    const { value } = e.target;
    setSelectedPeriod(value);
    setDateRange(value);
    toggleDropdown();
  };

  const setDateRange = (period) => {
    const start = new Date(formatDate(new Date()));

    if (period === "1주일") {
      start.setDate(start.getDate() - 7);
    } else if (period.includes("개월")) {
      start.setMonth(start.getMonth() - Number(period[0]));
    }

    setStartDate(period === "전체" ? new Date("2022-01-01") : start);
    setEndDate(new Date(formatDate(new Date())));
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
                    <option value="auction_3month">3개월거래일</option>
                    <option value="auction_6month">6개월거래일</option>
                    <option value="auction_1year">1년거래일</option>
                    <option value="auction_3year">3년거래일</option>
                  </Form.Select>
                </Col>
                {key === "auction_regDate" ?
                  <Form.Control type="date" value={word} name="word" onChange={(e) => setWord(e.target.value)} />
                  :
                  <Form.Control value={word} name="word" onChange={(e) => setWord(e.target.value)} placeholder='' />
                }

                {(key === "null" || key === "auction_seller" || key === "auction_buyer" || key === "auction_regDate") ? null :
                <>
                <Calendar
                  selectedDate={startDate}
                  setSelectedDate={setStartDate}
                  selectedPeriod={selectedPeriod} />
                  
                <Calendar
                  selectedDate={endDate}
                  setSelectedDate={setEndDate}
                  selectedPeriod={selectedPeriod} />
                </>
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