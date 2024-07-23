import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import axios from 'axios';
import HeaderTabs from '../../common/useful/HeaderTabs';
import './QAList.css'; // CSS 파일 추가
import '@fortawesome/fontawesome-free/css/all.min.css'; // FontAwesome 아이콘 사용

const QAList = () => {
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(8);
  const [key, setKey] = useState('qa_title');
  const [word, setWord] = useState('');

  const adminIds = ['admin', 'seop', 'hanna', 'gr001231', 'laonmiku', 'ne4102'];
  const currentUser = sessionStorage.getItem('uid');

  const callAPI = async () => {
    const res = await axios.get(`/qa/list.json?key=${key}&word=${word}&page=${page}&size=${size}`);
    setList(res.data.documents);
    setCount(res.data.total);

    if (res.data.total === 0) {
      alert('검색어가 없습니다');
    }
  };

  useEffect(() => {
    callAPI();
  }, [page, key, word]);

  const onClickSearch = async (e) => {
    e.preventDefault();
    setPage(1);
    callAPI();
  };

  return (
    <div className="qa-list-container">
      <HeaderTabs />
      <h1 className="text-center my-5">Q&A</h1>
      <div className="search-container">
        <div className="search-input-group">
          <select className='me-2' value={key} onChange={(e) => setKey(e.target.value)}>
            <option value="qa_title">제목</option>
            <option value="qa_contents">내용</option>
            <option value="qa_writer">글쓴이</option>
          </select>
          <input type="text" placeholder='검색어' value={word} onChange={(e) => setWord(e.target.value)} />
          <button className="search-button" onClick={(e) => onClickSearch(e)}>
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className="search-info">
          {currentUser && (
            <Link to="/community/qa/insert">
              <button className="write-button">글쓰기</button>
            </Link>
          )}
        </div>
      </div>
      <div className="search-count">
        <span>검색수: {count}건</span>
      </div>
      <table className="qa-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>글쓴이</th>
            <th>등록일</th>
          </tr>
        </thead>
        <tbody>
          {list.map((post, index) => (
            <tr key={post.QA_key}>
              <td>{count - ((page - 1) * size + index)}</td>
              <td>
                {post.QA_lock === 1 && !adminIds.includes(currentUser) && currentUser !== post.QA_writer ? (
                  <span>🔒 비밀글</span>
                ) : (
                  <Link to={`/community/qa/read/${post.QA_key}`} className="link-no-style">{post.QA_title}</Link>
                )}
              </td>
              <td>{post.QA_writer}</td>
              <td>{post.fmtdate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {count > size &&
        <Pagination
          activePage={page}
          itemsCountPerPage={size}
          totalItemsCount={count}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={(pageNumber) => setPage(pageNumber)}
        />
      }
    </div>
  );
};

export default QAList;
