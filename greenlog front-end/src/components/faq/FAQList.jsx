import React, { useState, useEffect } from 'react';
import Pagination from 'react-js-pagination';
import axios from 'axios';
import HeaderTabs from '../../common/useful/HeaderTabs';
import './FAQList.css'; // CSS 파일 추가
import '@fortawesome/fontawesome-free/css/all.min.css'; // FontAwesome 아이콘 사용

const FAQList = () => {
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [key, setKey] = useState('all');
  const [word, setWord] = useState('');
  const [activeIndex, setActiveIndex] = useState(null); // 활성화된 아코디언 인덱스를 저장

  // 관리자 아이디 목록
  const adminIds = ['admin', 'seop', 'hanna', 'gr001231', 'laonmiku', 'ne4102'];
  const currentUser = sessionStorage.getItem('uid');

  const callAPI = async () => {
    try {
      const res = await axios.get('/faq/list.json', {
        params: {
          key: key,
          word: word || '%', // 검색어가 없을 경우 기본 값 설정
          page: page,
          size: size
        }
      });
      console.log(res.data);
      setList(res.data.documents);
      setCount(res.data.total);
      const last = Math.ceil(res.data.total / size);
      if (page > last) setPage(last);

      if (res.data.total === 0) {
        alert('검색 결과가 없습니다.');
      }
    } catch (error) {
      console.error('Error fetching FAQ list:', error);
    }
  };

  useEffect(() => {
    callAPI();
  }, [page, size, key]);

  const onClickSearch = async (e) => {
    e.preventDefault();
    setPage(1);
    callAPI();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onClickSearch(e); // e를 전달
    }
  };

  const WriteClick = () => {
    window.location.href = '/community/faq/insert';
  };

  const UpdateClick = (faq_key) => {
    window.location.href = `/community/faq/update/${faq_key}`;
  };

  const DeleteClick = async (faq_key) => {
    if (!window.confirm('정말로 이 FAQ를 삭제하시겠습니까?')) return;
    try {
      await axios.post(`/faq/delete/${faq_key}`);
      setList(list.filter(faq => faq.FAQ_key !== faq_key));
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      alert('FAQ 삭제 중 오류가 발생했습니다.');
    }
  };

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-list-container">
      <HeaderTabs />
      <h1 className="text-center my-5">FAQ</h1>
      <div className="faq-search-container">
        <div className="faq-search-input-group">
          <select className='me-2' value={key} onChange={(e) => setKey(e.target.value)}>
            <option value="all">전체</option>
            <option value="member">회원</option>
            <option value="point">포인트</option>
            <option value="how">참여방법</option>
          </select>
          <input 
            type="text" 
            placeholder='검색어를 입력하세요' 
            value={word} 
            onChange={(e) => setWord(e.target.value)} 
            onKeyDown={handleKeyDown} 
          />
          <button className="faq-search-button" onClick={onClickSearch} >
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
      <div className="search-info">
        <span className="me-3">검색수: {count}건</span>
        {adminIds.includes(currentUser) && (
          <button className="write-button" onClick={WriteClick}>글쓰기</button>
        )}
      </div>
      <div className="accordion">
        {list.map((faq, index) => (
          <div 
            className={`accordion-item ${activeIndex === index ? 'active' : ''}`} 
            key={faq.FAQ_key}
          >
            <div 
              className="accordion-header" 
              onClick={() => toggleAccordion(index)}
            >
              <span className={`badge badge-${faq.FAQ_type === 0 ? 'member' : faq.FAQ_type === 2 ? 'point' : 'how'}`}>
                {faq.FAQ_type === 0 ? '회원' : faq.FAQ_type === 2 ? '포인트' : '참여방법'}
              </span> 
              <span className="faq-question">{faq.FAQ_question}</span>
              <i className={`fas fa-chevron-${activeIndex === index ? 'up' : 'down'}`}></i>
            </div>
            <div className="accordion-body">
              {faq.FAQ_answer}
              {adminIds.includes(currentUser) && (
                <div className='mt-3'>
                  <button className="btn" onClick={() => UpdateClick(faq.FAQ_key)}>수정</button>
                  <button className="btn" onClick={() => DeleteClick(faq.FAQ_key)}>삭제</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {count > size && (
        <Pagination
          activePage={page}
          itemsCountPerPage={size}
          totalItemsCount={count}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={(e) => setPage(e)}
        />
      )}
    </div>
  );
};

export default FAQList;
