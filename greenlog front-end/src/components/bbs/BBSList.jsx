import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { Col, InputGroup, FormControl, Button, Table } from 'react-bootstrap';
import axios from 'axios';

const BBSList = () => {
  const [list, setList] = useState([]);
  const [topList, setTopList] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [key, setKey] = useState('bbs_title');
  const [word, setWord] = useState('');
  const [category, setCategory] = useState('');
  const [isAlertShown, setIsAlertShown] = useState(false);

  const callAPI = async (pageNum = page) => {
    const res = await axios.get(`/bbs/list.json?key=${key}&word=${word}&page=${pageNum}&size=${size}`);
    const documents = res.data.documents;

    let filteredDocuments = documents;
    if (category !== '') {
      filteredDocuments = documents.filter(post => post.bbs_type === parseInt(category));
    }

    if (pageNum === 1) {
      // 조회수 상위 2개 추출
      const sortedByViews = [...filteredDocuments].sort((a, b) => b.bbs_vcnt - a.bbs_vcnt);
      const topTwo = sortedByViews.slice(0, 2);
      setTopList(topTwo);

      // 상위 2개를 제외한 나머지 게시글
      const remainingPosts = filteredDocuments.filter(doc => !topTwo.includes(doc));
      setList(remainingPosts.slice(0, size));
      setCount(res.data.total - topTwo.length); // 전체 게시글 수에서 상위 2개 제외
    } else {
      setList(filteredDocuments);
      setCount(res.data.total);
    }

    if (res.data.total === 0 && !isAlertShown) {
      setIsAlertShown(true);
      alert('검색어가 없습니다');
    }
  };

  useEffect(() => {
    callAPI();
    setIsAlertShown(false);
  }, [page]);

  useEffect(() => {
    setPage(1);
    callAPI(1);
  }, [category]);

  const handleSearchChange = (e) => {
    setWord(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setIsAlertShown(false);
    callAPI(1);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div>
      <h1 className="text-center my-5">자유게시판</h1>
      <InputGroup className="mb-3">
        <FormControl as="select" value={category} onChange={handleCategoryChange}>
          <option value="">전체</option>
          <option value="0">꿀팁</option>
          <option value="1">자유</option>
        </FormControl>
        <FormControl
          placeholder="검색어를 입력하세요"
          value={word}
          onChange={handleSearchChange}
        />
        <Button onClick={handleSearch}>검색</Button>
      </InputGroup>
      <div className='text-end mb-3'>
        <Col>
          검색수: {count + (page === 1 ? topList.length : 0)}건
        </Col>
        {sessionStorage.getItem('uid') && (
          <Col className='text-end'>
            <Link to="/community/bbs/insert">
              <Button size='sm'>글쓰기</Button>
            </Link>
          </Col>
        )}
      </div>
      <Table>
        <thead>
          <tr>
            <th>카테고리</th>
            <th>제목</th>
            <th>글쓴이</th>
            <th>등록일</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {page === 1 && topList.map(post => (
            <tr key={post.bbs_key}>
              <td>{post.bbs_type === 0 ? "꿀팁" : "자유"}</td>
              <td>
                <Link to={`/community/bbs/read/${post.bbs_key}?isCnt=true`}>{post.bbs_title}</Link>
              </td>
              <td>{post.bbs_writer}</td>
              <td>{post.bbs_regDate}</td>
              <td>{post.bbs_vcnt}</td>
            </tr>
          ))}
          {list.map(post => (
            <tr key={post.bbs_key}>
              <td>{post.bbs_type === 0 ? "꿀팁" : "자유"}</td>
              <td>
                <Link to={`/community/bbs/read/${post.bbs_key}?isCnt=true`}>{post.bbs_title}</Link>
              </td>
              <td>{post.bbs_writer}</td>
              <td>{post.bbs_regDate}</td>
              <td>{post.bbs_vcnt}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {count > 0 &&
        <Pagination
          activePage={page}
          itemsCountPerPage={size}
          totalItemsCount={count}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={(e) => setPage(e)}
        />
      }
    </div>
  );
};

export default BBSList;
