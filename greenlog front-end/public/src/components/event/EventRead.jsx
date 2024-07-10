import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';

const EventRead = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState({
    title: '',
    contents: '',
    writer: '',
    date: '',
    views: '',
    imageUrl: ''
  });

  useEffect(() => {
    // 백엔드 없이 더미 데이터로 테스트
    const fetchEvent = () => {
      // 여기에서 실제로는 axios.get()을 사용해 백엔드에서 데이터를 가져옵니다.
      const dummyEvent = {
        id: id,
        title: `이벤트 제목 ${id}`,
        contents: `이벤트 내용 ${id}`,
        writer: `작성자 ${id}`,
        date: '2024-07-04',
        views: 34249,
        imageUrl: 'https://via.placeholder.com/150',
      };
      setEvent(dummyEvent);
    };
    fetchEvent();
  }, [id]);

  const handleUpdateClick = () => {
    navigate(`/community/event/update/${id}`, { state: { event } });
  };

  return (
    <div className="d-flex justify-content-center">
      <Card style={{ width: '50rem' }} className="mt-5">
        <Card.Img variant="top" src={event.imageUrl} />
        <Card.Body>
          <Card.Title>{event.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">작성자: {event.writer}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">작성일: {event.date}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">조회수: {event.views}</Card.Subtitle>
          <Card.Text>{event.contents}</Card.Text>
          <Button onClick={handleUpdateClick} className='me-2'>수정</Button>
          <Button>삭제</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EventRead;
