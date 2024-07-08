import React from 'react'
import { Row, Col, Button, Badge, InputGroup, Form, Card, Table } from 'react-bootstrap'

const AuctionList = () => {
  //상품명과 이미지 넣기
  //처리상태 영구삭제요청 넣기(관리자에서 직접 해줄수있게끔)
  
  return (
    <Row>
      <Col>
        <h1 className='text-center my-5'>개인경매목록</h1>
        <Row className='justify-content-center mt-3'>
          <Col lg={5}>
            <form>
              <InputGroup className="mb-5">
              <Col lg={3}>
              <Form.Select>
                <option></option>
              </Form.Select>
              </Col>
                <Form.Control />
                <Button type="submit" size="sm">검색</Button>
              </InputGroup>
            </form>
          </Col>
          <Table>
            <thead>
              <tr>
                <td><input type="checkbox"/></td>
                <td>경매번호</td>
                <td colSpan={2}>상품명</td>
                <td>구매자</td>
                <td>등록일</td>
                <td>처리상태</td>
              </tr>
            </thead>
          </Table>
        </Row>
      </Col>
    </Row>
  )
}

export default AuctionList