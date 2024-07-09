import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';

const QARead = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState({
    title: '',
    contents: '',
    writer: '',
    date: ''
  });

  useEffect(() => {
    // 백엔드 없이 더미 데이터로 테스트
    const fetchPost = () => {
      // 여기에서 실제로는 axios.get()을 사용해 백엔드에서 데이터를 가져옵니다.
      const dummyPost = {
        id: id,
        title: `문의 제목 ${id}`,
        contents: `문의 내용 ${id}`,
        writer: `작성자 ${id}`,
        date: '2024-07-04'
      };
      setPost(dummyPost);
    };
    fetchPost();
  }, [id]);

  const handleUpdateClick = () => {
    navigate(`/community/qa/update/${id}`, { state: { post } });
  };

  return (
    <div className="d-flex justify-content-center">
      <Card style={{ width: '50rem' }} className="mt-5">
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card className="mb-2 text-muted">작성자: {post.writer}</Card>
          <Card className="mb-2 text-muted">작성일: {post.date}</Card>
          <Card>{post.contents}</Card>
          <Button onClick={handleUpdateClick} className='me-2'>수정</Button>
          <Button>삭제</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default QARead;
