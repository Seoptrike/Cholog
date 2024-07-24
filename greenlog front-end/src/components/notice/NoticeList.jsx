import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HeaderTabs from '../../common/useful/HeaderTabs';
import './NoticeList.css';  // 추가적인 CSS 스타일링 파일
import '@fortawesome/fontawesome-free/css/all.min.css';

const NoticeList = () => {
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [key, setKey] = useState('all');
  const [word, setWord] = useState('');
  const [searchClicked, setSearchClicked] = useState(false); // 검색 버튼 클릭 여부 상태 추가

  const adminIds = ['admin', 'seop', 'hanna', 'gr001231', 'laonmiku', 'ne4102'];
  const currentUser = sessionStorage.getItem('uid');

  const callAPI = async () => {
    const res = await axios.get(`/notice/list.json?key=${key}&word=${word}&page=${page}&size=${size}`);
    console.log(res.data);
    setList(res.data.documents);
    setCount(res.data.total);

    if (searchClicked && res.data.total === 0) {
      alert('검색 결과가 없습니다');
      setSearchClicked(false); // 검색 클릭 상태 초기화
    }
  };

  useEffect(() => {
    callAPI();
  }, [page, key, size]);

  const onClickSearch = async (e) => {
    e.preventDefault();
    setPage(1);
    setSearchClicked(true); // 검색 버튼 클릭 상태 설정 후 API 호출
    callAPI();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onClickSearch(e); // e를 전달
    }
  };

  const handleKeyClick = (newKey) => {
    setKey(newKey);
    setPage(1);
    setSearchClicked(true);
    callAPI();
  };

  const getBadge = (type) => {
    switch(type) {
      case 1:
        return <span className="badge badge-normal">일반</span>;
      case 2:
        return <span className="badge badge-member">회원</span>;
      case 3:
        return <span className="badge badge-event">이벤트</span>;
      default:
        return null;
    }
  };

  return (
    <div>
      <HeaderTabs />
      <h1 className=" notice-list-container text-center my-5">공지사항</h1>
      <div className="search-container">
        <div className="button-group">
          <button className={key === 'all' ? 'active' : ''} onClick={() => handleKeyClick('all')}>전체</button>
          <button className={key === 'normal' ? 'active' : ''} onClick={() => handleKeyClick('normal')}>일반</button>
          <button className={key === 'member' ? 'active' : ''} onClick={() => handleKeyClick('member')}>회원</button>
          <button className={`event-button ${key === 'event' ? 'active' : ''}`} onClick={() => handleKeyClick('event')}>이벤트</button>
        </div>
        <div className="search-input-group">
          <input 
            type="text" 
            placeholder='검색어를 입력하세요' 
            value={word} 
            onChange={(e) => setWord(e.target.value)} 
            onKeyDown={handleKeyDown} 
          />
          <button className="search-button" onClick={(e) => onClickSearch(e)}>
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
      <div className="actions-row">
        <div className="search-count">
          검색수: {count}건
        </div>
        {adminIds.includes(currentUser) && (
          <div>
            <Link to="/community/notice/insert" className="write-button">글쓰기</Link>
          </div>
        )}
      </div>
      <table className="notice-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>등록일</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <tr key={item.notice_key}>
              <td>{(page - 1) * size + index + 1}</td>
              <td className="title-cell">
                {getBadge(item.notice_type)}{" "}
                <Link to={`/community/notice/read/${item.notice_key}`} className="notice-link">{item.notice_title}</Link>
              </td>
              <td>{item.fmtdate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {count > size && (
        <Pagination
          activePage={page}
          itemsCountPerPage={size}
          totalItemsCount={count}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={(pageNumber) => setPage(pageNumber)}
        />
      )}
    </div>
  );
};

export default NoticeList;
