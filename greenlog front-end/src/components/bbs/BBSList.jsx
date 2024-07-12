import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { Row, Col, InputGroup, FormControl, Button, Table, Form } from 'react-bootstrap';
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

  const callAPI = async () => {
    const res = await axios.get(`/bbs/list.json?key=${key}&word=${word}&page=${page}&size=${size}`);
    setList(res.data.documents);
    setCount(res.data.total);
  };

  const callTopAPI = async () => {
    const res = await axios.get(`/bbs/list.json`);
    setTopList(res.data.documents);
  };

  useEffect(() => {
    callAPI();
    callTopAPI();
  }, [page, key, word]);

  const handleSearchChange = (e) => {
    setWord(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const filteredList = list.filter(post => {
    const matchCategory = category === '' || post.bbs_type === parseInt(category);
    return matchCategory;
  });

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
          검색수: {count}건
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
                <Link to={`/community/bbs/read/${post.bbs_key}`}>{post.bbs_title}</Link>
              </td>
              <td>{post.bbs_writer}</td>
              <td>{post.bbs_regDate}</td>
              <td>{post.bbs_vcnt}</td>
            </tr>
          ))}
          {filteredList.map(post => (
            <tr key={post.bbs_key}>
              <td>{post.bbs_type === 0 ? "꿀팁" : "자유"}</td>
              <td>
                <Link to={`/community/bbs/read/${post.bbs_key}`}>{post.bbs_title}</Link>
              </td>
              <td>{post.bbs_writer}</td>
              <td>{post.bbs_regDate}</td>
              <td>{post.bbs_vcnt}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {count > size && 
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
