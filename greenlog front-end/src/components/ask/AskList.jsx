import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'

const AskList = () => {
    const [chk, setchk] = useState('');
    const uid = sessionStorage.getItem("uid");
    const onClickAsk = async () => {
        if (chk) {
            window.location.href = `/user/chat`
        } else {
            await axios.post("/chat/insert", { chat_sender: uid })
            window.location.href = `/user/chat`
        }

    }
    const callAPI = async () => {
        const res = await axios.get(`/chat/searchChatkey/${uid}`);
        console.log(res.data);
        setchk(res.data)
    }
    useEffect(() => { callAPI() }, [])

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