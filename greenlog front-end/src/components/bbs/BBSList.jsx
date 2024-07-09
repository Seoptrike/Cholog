import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Row, Col, InputGroup, FormControl, Button, Table, Image } from 'react-bootstrap';
import axios from 'axios';

const BBSList = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('전체');
  const [search, setSearch] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [list, setList]=useState([]);

  const callAPI =async()=>{
    const res = await axios.get('/bbs/list');
    console.log(res.data);
    setList(res.data);
  }

  useEffect(() => {
    callAPI();
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
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
            <Button>검색</Button>
          </InputGroup>
        </Col>
        <Col md={2}>
          <Button>글쓰기</Button>
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
          {list.map(post => (
            <tr key={post.bbs_key}>
              <td>{post.bbs_type === 0 ? "꿀팁" : "자유"}</td>
              <td>
                <Link to={`/community/bbs/read/${post.bbs_key}`}>{post.bbs_title}</Link>
              </td>
              <td>{post.bbs_writer}</td>
              <td>{post.bbs_regDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BBSList;
