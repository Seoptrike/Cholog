import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useParams } from 'react-router-dom';

const AdminChat = () => {
    const { user_uid } = useParams();  // useParams 훅으로 경로 파라미터 추출
    const path = user_uid;
    const uid= sessionStorage.getItem("uid")

    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const stomp = Stomp.over(socket);
        stomp.connect({}, frame => {
            console.log('Connected: ' + frame);
            setStompClient(stomp);

             // 구독 설정
             stomp.subscribe(`/topic/${path}`, message => {
                const receivedMessage = JSON.parse(message.body);
                console.log('Received message:', receivedMessage); // 메시지 객체 콘솔 확인

                setMessages(prevMessages => {
                    const updatedMessages = [...prevMessages, receivedMessage];
                    console.log('Updated messages:', updatedMessages);
                    return updatedMessages;
                });
            });
        });

        return () => {
            if (stompClient) stompClient.disconnect();
        };
    }, [path]);
    const sendMessage = () => {
        if (stompClient && messageInput) {
            const messageData = {
                chat_content: messageInput,
                chat_sender: "admin", // 사용자 이름 설정
                chat_path: path
            };

            console.log('Sending message:', messageData);
            stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(messageData));
            setMessageInput('');
        } else {
            console.log('stompClient is not connected or messageInput is empty');
        }
    };

    const handleChange = (event) => {
        setMessageInput(event.target.value);
    };
    return (
        <div>
        <div>
            {messages.map((message, index) => (
                <div key={index}>
                    <strong>{message.chat_sender}</strong>: {message.chat_content}
                </div>
            ))}
        </div>
        <div>
            <input type="text" value={messageInput} onChange={handleChange} />
            <button onClick={sendMessage}>Send</button>
        </div>
    </div>
    )
}

export default AdminChat