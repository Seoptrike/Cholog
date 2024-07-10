import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import axios from 'axios';
const ChatRoom = () => {
    const uid = sessionStorage.getItem('uid'); // 사용자 ID 또는 식별자
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
             stomp.subscribe(`/topic/${uid}`, message => {
                const receivedMessage = JSON.parse(message.body);
                console.log('Received message:', receivedMessage); // 메시지 객체 콘솔 확인
                setMessages(prevMessages => [...prevMessages, receivedMessage]);
            });
        });

        return () => {
            if (stompClient) stompClient.disconnect();
        };
    }, []);
    const sendMessage = () => {
        if (stompClient && messageInput) {
            stompClient.send('/app/chat.sendMessage', {}, JSON.stringify({
                chat_content: messageInput,
                chat_sender: uid // 사용자 이름 설정
            }));
            setMessageInput('');
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

export default ChatRoom