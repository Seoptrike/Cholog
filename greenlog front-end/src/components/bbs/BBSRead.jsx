import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import ReplyPage from '../reply/ReplyPage';

const BBSRead = () => {
  const { bbs_key } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  const callAPI = async () => {
    try {
      const res = await axios.get(`/bbs/read/${bbs_key}`);
      if (res.status === 200) {
        console.log('Fetched data:', res.data);
        setForm(res.data);
      } else {
        console.error('Failed to fetch data:', res.data);
      }
    } catch (error) {
      console.error('There was an error fetching the post data!', error);
    }
  };

  useEffect(() => {
    callAPI();
  }, [bbs_key]);

  const onDelete = async () => {
    if (!window.confirm(`${bbs_key}번 게시글을 삭제하실래요?`)) return;
    try {
      const res = await axios.post(`/bbs/delete/${bbs_key}`);
      if (res.status === 200) {
        alert("게시글 삭제 완료!");
        window.location.href='/community/bbs/list.json';
      } else {
        console.error('Failed to delete post:', res.data);
      }
    } catch (error) {
      console.error('There was an error deleting the post!', error);
      alert('게시물 삭제 중 오류가 발생했습니다.');
    }
  };

  if (!form) {
    return <div>Loading...</div>; // 데이터가 로드될 때까지 로딩 상태를 표시합니다.
  }

  const { bbs_contents, bbs_title, bbs_writer, bbs_regDate,bbs_uDate } = form;

  return (
    <div className='my-5'>
      <h1 className='text-center mb-5'>{bbs_key} 게시글 정보</h1>
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
              {bbs_writer} <br />
              {bbs_regDate}<br/>
              {bbs_uDate}
            </Card.Footer>
          </Card>
          <div className='text-center my-3'>
            <Link to={`/community/bbs/update/${bbs_key}`}>
              <Button className='me-2'>수정</Button>
            </Link>
            <Button onClick={onDelete}>삭제</Button>
          </div>
        </Col>
        <ReplyPage/>
      </Row>
    </div>
  );
};

export default BBSRead;
