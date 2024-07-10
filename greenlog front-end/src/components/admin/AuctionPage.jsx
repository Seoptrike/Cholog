import React, { useState } from 'react'
import { Row, Col, Button, Badge, InputGroup, Form, Card, Table } from 'react-bootstrap'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'

//auction_key임시로 넣음
//경매번호를 눌렀을 때 updatepage로 이동
//상품명을 눌렀을 때 readpage로 이동

const AuctionPage = () => {
  const [auction_key] = useState(1);
  const [mall_key]=useState(1);
  return (
    <Row>
      <Col lg={2}>
        <Sidebar />
      </Col>
      <Col>
        <h5 className='mb-5'> 000 관리자님 환영합니다.</h5>
        <Row className='justify-content-center mt-3'>
          <Col lg={4}>
            <form>
              <InputGroup className="mb-5">
                <Form.Control />
                <Button type="submit" size="sm">검색</Button>
              </InputGroup>
            </form>
          </Col>
        </Row>
        <Table>
          <thead>
            <tr>
            <td><input type="checkbox"/></td>
            <Link to={`/auction/update/${auction_key}`}><td>경매번호</td></Link>
              <td>상품번호</td>
            <Link to={`/mall/read/${mall_key}`}><td>상품명</td></Link>
              <td>판매자</td>
              <td>구매자</td>
              <td>등록일</td>
              <td>처리상태</td>
            </tr>
          </thead>
        </Table>
      </Col>
    </Row>
  )
}

export default AuctionPage