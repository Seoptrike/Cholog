import React from 'react'
import { Card, Row, Col, Button, Table } from 'react-bootstrap'

const SeedWallet = () => {
    return (
        <div>
            <Row className='justify-content-center mt-5'>
                <Col xs={10}>
                    <Card>
                        <Row>
                            <Col>
                                <img src="/images/wallet1.png" />
                            </Col>
                            <Col>
                                <img src="/images/wallet2.png" />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Row className='justify-content-center mt-5'>
                <Col xs={10}>
                    <h4>씨앗 기록</h4>
                    <Table>
                        <thead>
                            <tr>
                                <td>거래번호</td>
                                <td>from</td>
                                <td>to</td>
                                <td>amount</td>
                                <td>획득날짜</td>
                            </tr>
                        </thead>
                        <tbody>
                            <td>데이터반복</td>
                            <td>데이터반복</td>
                            <td>데이터반복</td>
                            <td>데이터반복</td>
                            <td>데이터반복</td>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </div>
    )
}

export default SeedWallet