import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Badge, InputGroup, Form, Card, Table } from 'react-bootstrap'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../../common/useful/Paging.css';
import Pagination from 'react-js-pagination'



const AuctionPage = () => {
  const [list, setList] = useState([]);
  const [key, setKey] = useState("auction_seller");
  const [word, setWord] = useState("");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [count, setCount] = useState(0);

  const callAPI = async () => {
    const res = await axios.get(`/auction/admin/list?key=${key}&word=${word}&page=${page}&size=${size}`)
    console.log(res.data);
    setCount(res.data.total);
    setList(res.data.documents);
  }

  useEffect(() => {
    callAPI();
  }, [page])

  const onSubmit = (e) => {
    e.preventDefault();
    callAPI();
  }
  
  return (
    <div>
      <Row>
        <Col md={3} lg={2}>
          <Sidebar />
        </Col>
        <Col>
          <h5 className='mb-5'> 000 관리자님 환영합니다.</h5>
          <Row className='justify-content-center mt-3'>
            <Col xs={10} md={8} lg={6}>
              <form onSubmit={onSubmit}>
                <InputGroup className="mb-5">
                  <Form.Select value={key} name="key" onChange={(e) => setKey(e.target.value)}>
                    <option value="auction_seller">판매자</option>
                    <option value="auction_buyer">구매자</option>
                    <option value="auction_regDate">거래일</option>
                    <option value="auction_state">삭제상태</option>
                  </Form.Select>
                  {key==="auction_regDate" ?
                  <Form.Control type="date"  value={word} name="word" onChange={(e) => setWord(e.target.value)}/> :
                  <Form.Control value={word} name="word" onChange={(e) => setWord(e.target.value)} />
                 }
                  <Button type="submit" size="sm" className="me-3">검색</Button>
                  <span> 총: {count}건</span>
                </InputGroup>
              </form>
            </Col>
          </Row>
          <Table>
            <thead>
              <tr>
                <td><input type="checkbox" /></td>
                <td>경매번호</td>
                <td>상품번호</td>
                <td colSpan={2}>상품명</td>
                <td>판매자</td>
                <td>구매자</td>
                <td>등록일</td>
                <td>거래씨드</td>
                <td>상태</td>
              </tr>
            </thead>
            <tbody>
              {list.map(auc =>
                <tr key={auc.auction_key}>
                  <td><input type="checkbox" /></td>
                  <td>{auc.auction_key}</td>
                  <td>{auc.auction_mall_key}</td>
                  <td>{auc.mall_title}</td>
                  <td><Link to={`/mall/read/${auc.mall_key}`}>
                    <img src={auc.mall_photo || "http://via.placeholder.com/200x200"}  style={{ width: "40%", height: "4rem", objectFit: "contain" }} />
                  </Link>
                  </td>
                  <td>{auc.auction_seller}</td>
                  <td>{auc.auction_buyer}</td>
                  <td>{auc.fmtdate}</td>
                  <td>{auc.auction_amount}씨드</td>
                  <td>{auc.auction_state===1 ? "삭제" : ""}</td>
                </tr>
              )}
            </tbody>
          </Table>
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

export default AuctionPage