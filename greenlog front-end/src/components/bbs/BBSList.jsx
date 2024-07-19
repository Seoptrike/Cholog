import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { Col, InputGroup, FormControl, Button, Table, Row } from 'react-bootstrap';
import axios from 'axios';

const BBSList = () => {
  const [list, setList] = useState([]);
  const [topList, setTopList] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [key, setKey] = useState('bbs_title');
  const [word, setWord] = useState('');
  const [category, setCategory] = useState('');
  const [isAlertShown, setIsAlertShown] = useState(false);

  const callAPI = async () => {
    const res = await axios.get(`/bbs/list.json?key=${key}&word=${word}&page=${page}&size=${size}`);
    console.log(res.data);
    const documents = res.data.documents;

    // 카테고리에 따라 게시물 필터링
    let filteredDocuments = documents;
    if (category !== '') {
      filteredDocuments = documents.filter(post => post.bbs_type === parseInt(category));
    }

    // 상위 고정 게시물 API 호출
    const topRes = await axios.get('/bbs/top');
    const topTwo = topRes.data;

    // 상위 고정 게시물을 제외한 나머지 게시물 필터링
    const remainingPosts = filteredDocuments.filter(doc => !topTwo.some(top => top.bbs_key === doc.bbs_key));

    // 검색 결과가 없을 경우 처리
    if (remainingPosts.length === 0) {
      setList([]);
      setTopList([]);
      setIsAlertShown(true);
      alert('검색어가 없습니다');
    } else {
      setList(remainingPosts);
      setTopList(topTwo);
      setIsAlertShown(false);
    }

    // 전체 게시물 수 설정
    setCount(res.data.total - topTwo.length);
  };
  
  useEffect(() => {
    callAPI();
  }, [page, category]);

  const handleSearchChange = (e) => {
    setWord(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    callAPI();
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };

  return (
    <div>
      <h1 className="text-center my-5">자유게시판</h1>
      <Row className="mb-3">
        <Col xs={10}>
          <InputGroup>
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
        </Col>
        <Col xs={2} className="text-end">
          <div>
            검색수: {count}건
          </div>
          {sessionStorage.getItem('uid') && (
            <Link to="/community/bbs/insert">
              <Button>글쓰기</Button>
            </Link>
          )}
        </Col>
      </Row>
      <Table>
        <thead>
          <tr>
            <th>카테고리</th>
            <th>글쓴이</th>
            <th>제목</th>
            <th>등록일</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {page === 1 && topList.map(post => (
            <tr key={post.bbs_key}>
              <td>{post.bbs_type === 0 ? "꿀팁" : "자유"}</td>
              <td>
                <Link to={`/user/read/${post.bbs_writer}`}>{post.bbs_writer}</Link>
              </td>
              <td>
                <Link to={`/community/bbs/read/${post.bbs_key}`}>{post.bbs_title}</Link>
              </td>
              <td>{post.bbs_regDate}</td>
              <td>{post.bbs_vcnt}</td>
            </tr>
          ))}
          {list.map(post => (
            <tr key={post.bbs_key}>
              <td>{post.bbs_type === 0 ? "꿀팁" : "자유"}</td>
              <td>
                <Link to={`/user/read/${post.bbs_writer}`}>{post.bbs_writer}</Link>
              </td>
              <td>
                <Link to={`/community/bbs/read/${post.bbs_key}`}>{post.bbs_title}</Link>
              </td>
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
          onChange={(e) => setPage(e)} />
      }
    </div>
  );
};

export default BBSList;
