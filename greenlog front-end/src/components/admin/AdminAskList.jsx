import { ChatSharp } from '@mui/icons-material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Row, Col, Table, Button } from 'react-bootstrap'
const AdminAskList = () => {
    const [list, setList] = useState([]);
    const [alist,setAlist]=useState([]);
    const callAPI = async () => {
        const res = await axios.get("/chat/list")
        console.log(res.data);
        setList(res.data);

        const res1= await axios.get("/chat/alist")
        setAlist(res1.data);
    }
    useEffect(() => { callAPI() }, [])

    const onClickAdminChat = (sender) => {
        window.location.href = `/user/chat/${sender}`
    }

    const onClickClear = async (key) => {
        await axios.post("/chat/delete", { chat_key: key })
        alert("처리완료되었습니다")
        window.location.reload();
    }
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
                                    <td>상태</td>
                                    <td>채팅방입장</td>
                                    <td>해결완료</td>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map(chat =>
                                    <tr key={chat.chat_key}>
                                        <td>{chat.chat_key}</td>
                                        <td>{chat.chat_sender}</td>
                                        <td>{chat.chat_sendTime}</td>
                                        <td>{chat.chat_state}</td>
                                        <td><Button onClick={() => onClickAdminChat(chat.chat_sender)}>채팅방입장</Button></td>
                                        <td><Button onClick={() => onClickClear(chat.chat_key)}>처리완료</Button></td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                    <h3>완료된 1대1 문의</h3>
                    <div>
                        <Table>
                            <thead>
                                <tr>
                                    <td>Chat_key</td>
                                    <td>요청자</td>
                                    <td>요청시간</td>
                                    <td>완료시간</td>
                                    <td>상태</td>
                                </tr>
                            </thead>
                            <tbody>
                                {alist.map(chat =>
                                    <tr key={chat.chat_key}>
                                        <td>{chat.chat_key}</td>
                                        <td>{chat.chat_sender}</td>
                                        <td>{chat.chat_sendTime}</td>
                                        <td>{chat.chat_endTime}</td>
                                        <td>{chat.chat_state}</td>
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