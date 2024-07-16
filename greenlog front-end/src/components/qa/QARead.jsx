import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import AList from '../answers/AList';
import AInsert from '../answers/AInsert';

const QARead = () => {
  const { qa_key } = useParams();
  const [form, setForm] = useState({
    qa_key: '',
    qa_title: '',
    qa_contents: '',
    qa_writer: '',
    qa_regDate: '',
    qa_udate: '',
    qid: ''
  });

  const { qa_contents, qa_title, qa_writer, qa_regDate } = form;

  // 관리자 아이디 목록
  const adminIds = ['admin', 'seop', 'hanna', 'gr001231', 'laonmiku', 'ne4102'];
  const currentUser = sessionStorage.getItem('uid');

  const callAPI = async () => {
    try {
      const res = await axios.get(`/qa/read/${qa_key}`);
      setForm(res.data);
      console.log(res.data);
    } catch (error) {
      console.error('There was an error fetching the post data!', error);
      alert('게시물 데이터를 가져오는 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    callAPI();
  }, [qa_key]);

  const onDelete = async () => {
    if (!window.confirm(`${qa_key}번 게시글을 삭제하실래요?`)) return;
    try {
      await axios.post(`/qa/delete/${qa_key}`);
      alert("게시글 삭제 완료!");
      window.location.href = '/community/qa/list.json';
    } catch (error) {
      console.error('There was an error deleting the post!', error);
      alert('게시물 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Card>
            <Card.Body>
              <Card.Title>{qa_title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">작성자: {qa_writer}</Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">작성일: {qa_regDate}</Card.Subtitle>
              <Card.Text>{qa_contents}</Card.Text>
              {adminIds.includes(currentUser) && (
                <>
                  <Link to={`/community/qa/update/${qa_key}`}>
                    <Button className='me-2'>수정</Button>
                  </Link>
                  <Button onClick={onDelete} className='me-2'>삭제</Button>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col xs={12} md={10} lg={8}>
          <AList qa_key={qa_key} />
        </Col>
      </Row>
    </Container>
  );
};

export default QARead;
