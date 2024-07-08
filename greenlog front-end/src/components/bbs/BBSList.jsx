import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Row, Col, InputGroup, FormControl, Button, Table } from 'react-bootstrap';

const BBSList = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('전체');
  const [search, setSearch] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem('uid') !== null;
    setIsLoggedIn(loggedIn);
  }, []);

  const posts = [
    { id: 1, category: '꿀팁', title: '첫 번째 게시물', writer: '홍길동', date: '2024-07-05', views: 100 },
    { id: 2, category: '자유', title: '두 번째 게시물', writer: '이순신', date: '2024-07-04', views: 200 },
  ];

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredPosts = posts.filter(post => {
    return (category === '전체' || post.category === category) &&
           (search === '' || post.title.includes(search));
  });

  const BBSClick = () => {
    if (isLoggedIn) {
      navigate('/community/bbs/insert'); 
    } else {
      sessionStorage.setItem('target', '/community/bbs/list.json');
      navigate('/user/login');
    }
  };

  return (
    <div>
      <h1 className="text-center my-5">자유게시판</h1>
      <Row className="mb-3">
        <Col md={10}>
          <InputGroup>
            <FormControl as="select" onChange={handleCategoryChange}>
              <option value="전체">전체</option>
              <option value="꿀팁">꿀팁</option>
              <option value="자유">자유</option>
            </FormControl>
            <FormControl 
              placeholder="검색어를 입력하세요"
              value={search}
              onChange={handleSearchChange}
            />
            <Button variant="primary">검색</Button>
          </InputGroup>
        </Col>
        <Col md={2}>
          <Button onClick={BBSClick}>글쓰기</Button>
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
          {filteredPosts.map(post => (
            <tr key={post.id}>
              <td>{post.category}</td>
              <td>
                <Link to={`/community/bbs/read/${post.id}`}>{post.title}</Link>
              </td>
              <td>{post.writer}</td>
              <td>{post.date}</td>
              <td>{post.views}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BBSList;
