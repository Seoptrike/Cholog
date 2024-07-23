import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './QARead.css'; // CSS 파일 추가

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

  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingComment, setEditingComment] = useState(false);

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
      setComment('');
      setEditingComment(false);
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
    <div className="qa-read-container">
      <h2 className="qa-title">{form.qa_title}</h2>
      <div className="qa-subtitle">
        <span>작성자: {form.qa_writer}</span>
        <span>작성일: {form.qa_regDate}</span>
      </div>
      <hr />
      <p>{form.qa_contents}</p>
      {adminIds.includes(currentUser) && (
        <div className="qa-buttons">
          <Link to={`/community/qa/update/${qa_key}`}>
            <button className='qa-button'>수정</button>
          </Link>
          <button onClick={handleDeletePost} className='qa-button'>삭제</button>
        </div>
      )}

      {adminIds.includes(currentUser) && !form.comments && (
        <div className="qa-comment-section">
          <form onSubmit={handleSubmitComment}>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="답변을 입력하세요."
            />
            <button type="submit" className="qa-button" disabled={loading}>
              {loading ? '등록 중...' : '답변 등록'}
            </button>
          </form>
        </div>
      )}

      {form.comments && (
        <div className="qa-comment-section">
          <h3>답변</h3>
          {!editingComment ? (
            <p>{form.comments}</p>
          ) : (
            <form onSubmit={handleEditComment}>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="답변을 수정하세요."
              />
              <button type="submit" className="qa-button" disabled={loading}>
                {loading ? '수정 중...' : '답변 수정'}
              </button>
            </form>
          )}
          {adminIds.includes(currentUser) && !editingComment && (
            <div className="qa-buttons">
              <button onClick={() => { setEditingComment(true); setComment(form.comments); }} className='qa-button'>답변 수정</button>
              <button onClick={handleDeleteComment} className='qa-button'>답변 삭제</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QARead;
