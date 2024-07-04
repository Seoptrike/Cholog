import React from 'react'
import { Row, Card, Col, Button, InputGroup, Form } from 'react-bootstrap'

const AboutClover = () => {
    return (
        <Row className='justify-content-center my-5'>
            <Col xs={10}>
            <div className='justify-content-center'>
                <h1 className='text-center'>About Clover</h1>
                <Row className='justify-content-center'>
                    <Col xs={4}>
                        <Card>
                            <img src="/images/seop.png" />
                        </Card>
                    </Col>
                </Row>
                <Row className='justify-content-center mt-3'>
                    <Col xs={4}>
                        <Card>
                            <img src="/images/seop.png" />
                        </Card>
                    </Col>
                    <Col xs={4}>
                        <Card>
                            <img src="/images/seop.png" />
                        </Card>
                    </Col>
                </Row>
                <Row className='justify-content-center my-3'>
                    <Col xs={4}>
                        <Card>
                            <img src="/images/seop.png" />
                        </Card>
                    </Col>
                    <Col xs={4}>
                        <Card>
                            <img src="/images/seop.png" />
                        </Card>
                    </Col>
                </Row>
                </div>
            </Col>
        </Row>

    )
}

export default AboutClover