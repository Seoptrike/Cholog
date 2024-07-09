import React, { useState, useEffect } from 'react';
const ChatRoom = () => {
    const uid = sessionStorage.getItem("uid")
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    useEffect(() => {
        const newSocket = new WebSocket('ws://localhost:8080/ws/chat'); // Replace with your WebSocket server URL
        setSocket(newSocket);

        newSocket.onopen = () => {
            console.log('WebSocket connected');
        };

        newSocket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log('Message received:', message);
            setMessages(prevMessages => [...prevMessages, message]);
        };

        newSocket.onclose = () => {
            console.log('WebSocket closed');
        };

        return () => {
            newSocket.close();
        };
    }, []);

    const sendMessage = () => {
        if (socket && messageInput.trim() !== '') {
            const message = {
                sender: uid,
                content: messageInput.trim(),
                timestamp: new Date().toLocaleString()
            };
            socket.send('/app/chat.sendMessage', {}, JSON.stringify(message));
            setMessageInput('');
        }
    };
    return (
        <div className="chat-container">
        <div className="chat-messages">
            {messages.map((msg, index) => (
                <div key={index} className="message">
                    <span className="message-sender">{msg.sender}</span>
                    <span className="message-content">{msg.content}</span>
                    <span className="message-timestamp">{msg.timestamp}</span>
                </div>
            ))}
        </div>
        <div className="chat-input">
            <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    </div>
    )
}

export default ChatRoom