import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';

const NoticeRead = () => {
  const { notice_key } = useParams();
  const [form, setForm] = useState({
    notice_key: '',
    notice_title: '',
    notice_contents: '',
    notice_writer: '',
    notice_regDate: '',
    notice_vcnt: 0
  });

  const { notice_title, notice_contents, notice_writer, notice_regDate, notice_vcnt } = form;

  // 관리자 아이디 목록
  const adminIds = ['admin', 'seop', 'hanna', 'gr001231', 'laonmiku', 'ne4102'];
  const currentUser = sessionStorage.getItem('uid');

  const callAPI = async () => {
    try {
      const res = await axios.get(`/notice/read/${notice_key}`);
      setForm(res.data);
      console.log(res.data);
    } catch (error) {
      console.error('There was an error fetching the notice data!', error);
      alert('공지사항 데이터를 가져오는 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    callAPI();
  }, [notice_key]);

  const onDelete = async () => {
    if (!window.confirm(`${notice_key}번 공지사항을 삭제하실래요?`)) return;
    try {
      await axios.post(`/notice/delete/${notice_key}`);
      alert("공지사항 삭제 완료!");
      window.location.href = '/community/notice/list.json';
    } catch (error) {
      console.error('There was an error deleting the notice!', error);
      alert('공지사항 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Card style={{ width: '50rem' }} className="mt-5">
        <Card.Body>
          <Card.Title>{notice_title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">작성자: {notice_writer}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">작성일: {notice_regDate}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">조회수: {notice_vcnt}</Card.Subtitle>
          <Card.Text>{notice_contents}</Card.Text>
          {adminIds.includes(currentUser) && (
            <>
              <Link to={`/community/notice/update/${notice_key}`}>
                <Button className='me-2'>수정</Button>
              </Link>
              <Button onClick={onDelete}>삭제</Button>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default NoticeRead;
