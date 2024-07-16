import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Pagination from 'react-js-pagination';

const AList = ({ qa_key }) => {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(3);
  const [total, setTotal] = useState(0);
  const uid = sessionStorage.getItem("uid");
  const adminIds = ['admin', 'seop', 'hanna', 'gr001231', 'laonmiku', 'ne4102'];
  const [form, setForm] = useState({
    answers_answer: uid,
    content: ''
  });

  const callAPI = async () => {
      const res = await axios.get(`/answers/list.json?QA_key=${qa_key}&page=${page}&size=${size}`);
      setAnswers(res.data.documents || []);
      setTotal(res.data.total || 0);
  };

  useEffect(() => {
    callAPI();
  }, []);

  const onChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.content === "") {
      alert("내용을 입력하세요!");
      return;
    }
    if (!window.confirm("답변을 등록하실래요?")) return;
    setLoading(true);

    try {
      const response = await axios.post("/answers/insert", { ...form, QA_key: qa_key });
      setLoading(false);

      if (response.status === 200) {
        alert('답변이 등록되었습니다.');
        setForm({ ...form, content: '' });  // 폼 초기화
        callAPI();  // 답변 목록 갱신
      } else {
        alert('답변 등록에 실패했습니다.');
      }
    } catch (error) {
      setLoading(false);
      console.error('There was an error posting the answer!', error.response || error.message);
      alert('답변 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <h2>답변 목록</h2>
      {answers.length === 0 ? (
        <p>등록된 답변이 없습니다.</p>
      ) : (
        answers.map((answer) => (
          <Card key={answer.answers_key} className="mb-3">
            <Card.Body>
              <Card.Title>{answer.answers_answer}</Card.Title>
              <Card.Text>{answer.content}</Card.Text>
              <Card.Footer className="text-muted">{answer.answer_regDate}</Card.Footer>
            </Card.Body>
          </Card>
        ))
      )}
      {adminIds.includes(uid) && (
        <Form onSubmit={onSubmit} className="mt-3">
          <Form.Group controlId="content">
            <Form.Label>내용</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="content"
              value={form.content}
              onChange={onChangeForm}
            />
          </Form.Group>
          <Button type="submit" className="mt-3" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : '등록'}
          </Button>
        </Form>
      )}
    </div>
  );
};

export default AList;
