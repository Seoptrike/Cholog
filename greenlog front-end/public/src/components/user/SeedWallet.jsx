import React from 'react'
import { Card, Row, Col, Button, Table } from 'react-bootstrap'
import TradeListPage from '../trade/TradeListPage'

const SeedWallet = () => {
    return (
        <div>
            <Row className='justify-content-center mt-5'>
                <Col xs={10}>
                    <Card>
                        <Row>
                            <Col>
                                <img src="/images/wallet1.png" />
                                회원정보
                            </Col>
                            <Col>
                                <img src="/images/wallet2.png" />
                                잔액
                            </Col>
                        </Row>
                    </Card>
                    <TradeListPage/>
                </Col>
            </Row>
        </div>
    )
}

export default SeedWallet