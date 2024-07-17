import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Card, Container, Row, Col, Form, Spinner } from 'react-bootstrap';
import axios from 'axios';

const QARead = () => {
  const { qa_key } = useParams();
  const [form, setForm] = useState({
    qa_key: '',
    qa_title: '',
    qa_contents: '',
    qa_writer: '',
    qa_regDate: '',
    qa_udate: '',
    comments: ''
  });

  const [comment, setComment] = useState(''); // 별도의 상태로 관리
  const [loading, setLoading] = useState(false);
  const [editingComment, setEditingComment] = useState(false); // 수정 모드 상태

  const adminIds = ['admin', 'seop', 'hanna', 'gr001231', 'laonmiku', 'ne4102'];
  const currentUser = sessionStorage.getItem('uid');

  const callAPI = async () => {
    try {
      const res = await axios.get(`/qa/read/${qa_key}`);
      setForm(res.data);
    } catch (error) {
      alert('게시물 데이터를 가져오는 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    callAPI();
  }, [qa_key]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!comment) return alert("댓글을 입력하세요!");
    setLoading(true);

    try {
      await axios.post(`/qa/update/${qa_key}`, { ...form, comments: comment });
      setLoading(false);
      setComment('');
      callAPI();
    } catch (error) {
      setLoading(false);
      alert('댓글 등록 중 오류가 발생했습니다.');
    }
  };

  const handleEditComment = async (e) => {
    e.preventDefault();
    if (!comment) return alert("댓글을 입력하세요!");
    setLoading(true);

    try {
      await axios.post(`/qa/update/${qa_key}`, { ...form, comments: comment });
      setLoading(false);
      setEditingComment(false);
      callAPI();
    } catch (error) {
      setLoading(false);
      alert('댓글 수정 중 오류가 발생했습니다.');
    }
  };

  const handleDeleteComment = async () => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;
    setLoading(true);

    try {
      await axios.post(`/qa/update/${qa_key}`, { ...form, comments: '' });
      setLoading(false);
      setComment(''); // 댓글 입력 상태 초기화
      setEditingComment(false); // 수정 모드 종료
      callAPI();
    } catch (error) {
      setLoading(false);
      alert('댓글 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm(`${qa_key}번 게시글을 삭제하실래요?`)) return;
    try {
      await axios.post(`/qa/delete/${qa_key}`);
      alert("게시글 삭제 완료!");
      window.location.href = '/community/qa/list.json';
    } catch (error) {
      alert('게시물 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Card>
            <Card.Body>
              <Card.Title>{form.qa_title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">작성자: {form.qa_writer}</Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">작성일: {form.qa_regDate}</Card.Subtitle>
              <Card.Text>{form.qa_contents}</Card.Text>
              {adminIds.includes(currentUser) && (
                <>
                  <Link to={`/community/qa/update/${qa_key}`}>
                    <Button className='me-2'>수정</Button>
                  </Link>
                  <Button onClick={handleDeletePost} className='me-2'>삭제</Button>
                </>
              )}
            </Card.Body>
          </Card>

          {adminIds.includes(currentUser) && !form.comments && (
            <Card className="mt-4">
              <Card.Body>
                <Form onSubmit={handleSubmitComment}>
                  <Form.Group controlId="comments">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </Form.Group>
                  <Button type="submit" className="mt-3" disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : '댓글 등록'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}

          {form.comments && (
            <Card className="mt-4">
              <Card.Body>
                <h5>답변</h5>
                {!editingComment ? (
                  <Card.Text>{form.comments}</Card.Text>
                ) : (
                  <Form onSubmit={handleEditComment}>
                    <Form.Group controlId="editedComment">
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </Form.Group>
                    <Button type="submit" className="mt-3" disabled={loading}>
                      {loading ? <Spinner animation="border" size="sm" /> : '댓글 수정'}
                    </Button>
                  </Form>
                )}
                {adminIds.includes(currentUser) && !editingComment && (
                  <>
                    <Button onClick={() => { setEditingComment(true); setComment(form.comments); }} className='me-2'>댓글 수정</Button>
                    <Button onClick={handleDeleteComment} className='me-2'>댓글 삭제</Button>
                  </>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default QARead;
