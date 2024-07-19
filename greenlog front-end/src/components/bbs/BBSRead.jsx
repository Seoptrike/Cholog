import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import ReplyReadPage from '../reply/ReplyReadPage';
import ReplyPage from '../reply/ReplyPage';

const BBSRead = () => {
  const { bbs_key } = useParams();
  const [form, setForm] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const callAPI = async (isCnt) => {
    const res = await axios.get(`/bbs/read/${bbs_key}`, {
      params: { isCnt }
    });
    setForm(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    const user = sessionStorage.getItem('uid'); // 로그인한 사용자의 ID를 세션 스토리지에서 가져옴
    setLoggedInUser(user);

    const viewedPosts = JSON.parse(sessionStorage.getItem('viewedPosts')) || [];
    if (!viewedPosts.includes(bbs_key)) {
      callAPI(true); // 처음 조회 시 조회수 증가
      viewedPosts.push(bbs_key);
      sessionStorage.setItem('viewedPosts', JSON.stringify(viewedPosts));
    } else {
      callAPI(false); // 이후 조회 시 조회수 증가하지 않음
    }
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

  const { bbs_contents, bbs_title, bbs_writer, bbs_regDate, bbs_uDate, bbs_vcnt } = form;

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
