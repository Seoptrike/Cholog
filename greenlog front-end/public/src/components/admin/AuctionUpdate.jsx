import React from 'react'
import { Row, Col, Button, Badge, InputGroup, Form, Card, Table } from 'react-bootstrap'
import Sidebar from './Sidebar'

//셀렉트 박스로 처리상태 변경
//구매자 설정 input상자로 변경 map으로 돌릴예정
//상품명 클릭 시, read페이지로 등록
//수정 후, auctionpage로 돌아감

const AuctionUpdate = () => {
  return (
    <Row>
      <Col lg={2}>
        <Sidebar />
      </Col>
      <Col>
        <h5 className='mb-5'> 000 관리자님 환영합니다.</h5>
        <Table>
          <thead>
            <tr>
              <td><input type="checkbox"/></td>
              <td>경매번호</td>
              <td>상품번호</td>
              <td>상품명</td>
              <td>판매자</td>
              <td>구매자</td>
              <td>등록일</td>
              <td>처리상태</td>
            </tr>
          </thead>
        </Table>
        <div className='text-center'>
          <Button className='me-3'>수정</Button>
          <Button>취소</Button>
        </div>
      </Col>
    </Row>
  )
}

export default AuctionUpdate