import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';

const BBSRead = () => {
  const { bbs_key } = useParams();
  const [form, setForm] = useState({
    bbs_key: '',
    bbs_title: '',
    bbs_contents: '',
    bbs_writer: '',
    bid: ''
  });
  const { bbs_contents, bbs_title, bbs_writer,bid } = form;

  const callAPI = async () => {
      const res = await axios.get(`/bbs/read/${bbs_key}`);
      setForm(res.data);
      console.log(res.data);
    }

  useEffect(() => {
    callAPI();
  }, []);

  const onDelete = async () => {
    if (!window.confirm(`${bbs_key}번 게시글을 삭제하실래요?`)) return;
    try {
      await axios.post(`/bbs/delete/${bbs_key}`);
      alert("게시글삭제완료!");
      window.location.href = '/community/bbs/list.json';
    } catch (error) {
      console.error('There was an error deleting the post!', error);
      alert('게시물 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className='my-5'>
      <h1 className='text-center mb-5'>{bbs_key} 게시글정보</h1>
      <Row className='justify-content-center'>
        <Col xs={12} md={10} lg={8}>
          <Card>
            <Card.Header>
              <Row>
                <Col>
                  <h5>{bbs_title}</h5>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body style={{ whiteSpace: 'pre-wrap' }}>
              {bbs_contents}
            </Card.Body>
            <Card.Footer className='text-muted'>
              {bbs_writer}
            </Card.Footer>
          </Card>
            <div className='text-center my-3'>
              <Link to={`/community/bbs/update/${bbs_key}`}>
                <Button className='me-2'>수정</Button>
              </Link>
              <Button onClick={onDelete}>삭제</Button>
            </div>
        </Col>
      </Row>
    </div>
  );
};

export default BBSRead;
