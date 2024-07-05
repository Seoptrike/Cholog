import React from 'react'
import { Card, Row, Col, Button, Table } from 'react-bootstrap'

const TradeListPage = () => {
    return (
        <Row>
            <Col>
                <Table>
                    <thead>
                        <tr>
                            <td>No</td>
                            <td>Date</td>
                            <td>from</td>
                            <td>to</td>
                            <td>amount</td>
                            <td>내용</td>
                        </tr>
                    </thead>
                    <tbody>
                        <td>데이터반복</td>
                        <td>데이터반복</td>
                        <td>데이터반복</td>
                        <td>데이터반복</td>
                        <td>데이터반복</td>
                        <td><Button>수정</Button></td>
                    </tbody>
                </Table>
            </Col>
        </Row>
    )
}

export default TradeListPage