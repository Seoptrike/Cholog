import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import ReplyReadPage from '../reply/ReplyReadPage';
import axios from 'axios';


const BBSRead = () => {
  const { bbs_key } = useParams();
  const [form, setForm] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const callAPI = async () => {
    try {
      const res = await axios.get(`/bbs/read/${bbs_key}`);
      setForm(res.data);
      console.log(res.data); // 응답 데이터 로그 출력
    } catch (error) {
      console.error('There was an error fetching the post!', error);
    }
  };

  useEffect(() => {
    const user = sessionStorage.getItem('uid'); 
    setLoggedInUser(user);
    callAPI();
  }, [bbs_key]);

  const onDelete = async () => {
    if (!window.confirm(`${bbs_key}번 게시글을 삭제하실래요?`)) return;
    try {
      await axios.post(`/bbs/delete/${bbs_key}`);
      alert("게시글 삭제 완료!");
      window.location.href = '/community/bbs/list.json';
    } catch (error) {
      console.error('There was an error deleting the post!', error);
      alert('게시물 삭제 중 오류가 발생했습니다.');
    }
  };

  if (!form) {
    return <div>Loading...</div>;
  }

  const { bbs_contents, bbs_title, bbs_writer, bbs_regDate, bbs_uDate, bbs_vcnt, bbs_photo } = form;

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
              {bbs_photo && (
                <div className="text-center mb-3">
                  <img src={bbs_photo} alt="첨부 이미지" style={{ maxWidth: '100%' }} />
                </div>
              )}
              <div dangerouslySetInnerHTML={{ __html: bbs_contents }} />
            </Card.Body>
            <Card.Footer className='text-muted'>
              {bbs_writer} <br />
              {bbs_regDate}<br />
              {bbs_uDate}<br />
              조회수: {bbs_vcnt}
            </Card.Footer>
          </Card>
          {loggedInUser === bbs_writer && (
            <div className='text-center my-3'>
              <Link to={`/community/bbs/update/${bbs_key}`}>
                <Button className='me-2'>수정</Button>
              </Link>
              <Button onClick={onDelete}>삭제</Button>
            </div>
          )}
        </Col>
        <ReplyPage bbs_key={bbs_key} bbs_writer={bbs_writer}/>
      </Row>
    </div>
  );
};

export default BBSRead;
