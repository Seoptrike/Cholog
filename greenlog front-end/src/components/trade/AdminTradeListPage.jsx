import React from 'react'
import { Card, Row, Col, Button, Table } from 'react-bootstrap'

const AdminTradeListPage = () => {
    return (
        <Row>
            <Col>
                <h1>전체 거래내역</h1>
                <Table>
                    <thead>
                        <tr>
                            <td>거래번호</td>
                            <td>거래날짜</td>
                            <td>from</td>
                            <td>to</td>
                            <td>amount</td>
                            <td>내용</td>
                            <td>삭제</td>
                        </tr>
                    </thead>
                    <tbody>
                        <td>데이터반복</td>
                        <td>데이터반복</td>
                        <td>데이터반복</td>
                        <td>데이터반복</td>
                        <td>얼마</td>
                        <td><Button>수정</Button></td>
                        <td><Button>삭제</Button></td>
                    </tbody>
                </Table>
            </Col>
        </Row>
    )
}

export default AdminTradeListPage