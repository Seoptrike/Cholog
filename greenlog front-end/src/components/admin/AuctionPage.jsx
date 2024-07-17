import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Badge, InputGroup, Form, Card, Table } from 'react-bootstrap'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../../common/useful/Paging.css';
import Pagination from 'react-js-pagination'


//경매번호를 눌렀을 때 updatepage로 이동
//상품명을 눌렀을 때 readpage로 이동



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
  }, [])

  const onSubmit = (e) => {
    e.preventDefault();
    callAPI();
    setWord("");
  }
  const onChangeForm = (e) => {
    setList({ ...list, [e.target.name]: e.target.value })
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
                  </Form.Select>
                  <Form.Control value={word} name="word" onChange={(e) => setWord(e.target.value)} />
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
                <td>상품명</td>
                <td>판매자</td>
                <td>구매자</td>
                <td>등록일</td>
                <td>거래씨드</td>
              </tr>
            </thead>
            <tbody>
              {list.map(auc =>
                <tr key={auc.auction_key}>
                  <td><input type="checkbox" /></td>
                  <td>{auc.auction_key}</td>
                  <td>{auc.auction_mall_key}</td>
                  <td>{auc.mall_title}
                  <Link to={`/mall/read/${auc.mall_key}`}>
                    <img src={auc.mall_photo}  style={{ width: "100%", height: "10rem", objectFit: "contain" }} />
                  </Link>
                  </td>
                  <td>{auc.auction_seller}</td>
                  <td>{auc.auction_buyer}</td>
                  <td>{auc.fmtdate}</td>
                  <td>{auc.auction_amount}씨드</td>
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