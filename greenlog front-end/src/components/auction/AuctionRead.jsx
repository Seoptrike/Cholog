import React from 'react'
import { Row, Col, Button, Badge, InputGroup, Form, Card, Table } from 'react-bootstrap'


const AuctionRead = () => {
  return (
    <Row>
      <Col>
        <h1 className='text-center my-5'>경매거래내역</h1>
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
                <td>거래포인트</td>
                <td>구매자</td>
                <td>거래일</td>
                <td>처리상태</td>
              </tr>
            </thead>
          </Table>
        </Row>
      </Col>
    </Row>
  )
}

export default AuctionRead