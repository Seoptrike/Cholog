import { ChatSharp } from '@mui/icons-material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Row, Col, Table,Button } from 'react-bootstrap'
const AdminAskList = () => {
    const [list,setList]=useState([]);
    const callAPI= async()=>{
        const res= await axios.get("/chat/list")
        console.log(res.data)
    }
    useEffect(()=>{callAPI()},[])
  return (
    <div>
        <Row>
            <Col>
                <h3>대기중인 1대1 문의</h3>
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <td>Chat_key</td>
                                <td>요청자</td>
                                <td>요청시간</td>
                                <td>채팅방입장</td>
                                <td>해결완료</td>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map(chat=>
                                <tr key={chat.chat_key}>
                                    <td>{chat.chat_key}</td>
                                    <td>{chat.chat_sender}</td>
                                    <td>{chat.chat_sendTime}</td>
                                    <td><Button>채팅방입장</Button></td>
                                    <td><Button>처리완료</Button></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </Col>
        </Row>


    </div>
  )
}

export default AdminAskList