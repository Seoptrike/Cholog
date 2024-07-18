import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { Col, InputGroup, FormControl, Button, Table, Row } from 'react-bootstrap';
import axios from 'axios';

// 게시판 리스트 컴포넌트 정의
const BBSList = () => {
  // 상태 변수 선언
  const [list, setList] = useState([]); // 게시글 목록
  const [topList, setTopList] = useState([]); // 상위 2개의 게시글 목록
  const [count, setCount] = useState(0); // 총 게시글 수
  const [page, setPage] = useState(1); // 현재 페이지
  const [size, setSize] = useState(10); // 페이지 당 게시글 수
  const [key, setKey] = useState('bbs_title'); // 검색 키
  const [word, setWord] = useState(''); // 검색어
  const [category, setCategory] = useState(''); // 선택된 카테고리
  const [isAlertShown, setIsAlertShown] = useState(false); // 알림 표시 여부

  // API 호출 함수
  const callAPI = async () => {
    const res = await axios.get(`/bbs/list.json?key=${key}&word=${word}&page=${page}&size=${size}`);
    console.log(res.data);
    const documents = res.data.documents;

    let filteredDocuments = documents;
    // 카테고리 필터링
    if (category !== '') {
      filteredDocuments = documents.filter(post => post.bbs_type === parseInt(category));
    }

    // 상위 2개의 게시글을 가져오는 API 호출
    const topRes = await axios.get('/bbs/top');
    const topTwo = topRes.data;
    setTopList(topTwo);

    // 상위 게시글을 제외한 나머지 게시글 목록 설정
    const remainingPosts = filteredDocuments.filter(doc => !topTwo.some(top => top.bbs_key === doc.bbs_key));
    setList(remainingPosts.slice((page - 1) * size, page * size));
    setCount(res.data.total); // 전체 게시글 수를 설정

    // 검색 결과가 없을 때 알림 표시
    if (res.data.total === 0) {
      setIsAlertShown(true);
      alert('검색어가 없습니다');
    }
  };

  // 페이지와 카테고리가 변경될 때마다 API 호출
  useEffect(() => {
    if (page === 1 || category !== '') {
      callAPI();
    }
    setIsAlertShown(false);
  }, [page, category]);

  // 검색어 변경 핸들러
  const handleSearchChange = (e) => {
    setWord(e.target.value);
  };

  // 검색 버튼 클릭 핸들러
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setIsAlertShown(false);
    callAPI();
  };

  // 카테고리 변경 핸들러
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1); // 카테고리가 변경될 때 페이지를 1로 설정
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
              <td>
                <Link to={`/user/read/${post.uid}`}>{post.bbs_writer}</Link>
              </td>
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
              <td>
                <Link to={`/user/read/${post.uid}`}>{post.bbs_writer}</Link>
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
