import axios from 'axios'
import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'

const AskList = () => {
    const uid= sessionStorage.getItem("uid");
    const onClickAsk = async()=>{
        await axios.post("/chat/insert",{chat_sender:uid})
        window.location.href="/user/chat"
    }
    return (
        <div className='my-5'>
            <Row>
                <Col className='text-center'>
                <h1>1대1 문의</h1>
                    <Button onClick={onClickAsk}>문의하러가기</Button>
                </Col>
            </Row>
        </div>
    )
}

export default AskList