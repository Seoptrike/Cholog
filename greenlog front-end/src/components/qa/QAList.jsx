import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Row, Col, InputGroup, FormControl, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import HeaderTabs from '../../common/useful/HeaderTabs'; 

const QAList = () => {
  const [search, setSearch] = useState('');
  const [list, setList] = useState([]);

  const callAPI = async () => {
    const res = await axios.get('/qa/list');
    console.log(res.data);
    setList(res.data);
  };

  useEffect(() => {
    callAPI();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <HeaderTabs />
      <h1 className="text-center my-5">Q&A</h1>
      <Row className="mb-3">
        <Col md={10}>
          <InputGroup>
            <FormControl 
              placeholder="검색어를 입력하세요"
              value={search}
              onChange={handleSearchChange}
            />
            <Button>검색</Button>
          </InputGroup>
        </Col>
        <Col md={2}>
          <Link to={'/community/qa/insert'}>
            <Button>글쓰기</Button>
          </Link>
        </Col>
      </Row>
      <Table>
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
              <td>{list.length - index}</td>
              <td>
                <Link to={`/community/qa/read/${post.QA_key}`}>{post.QA_title}</Link>
              </td>
              <td>{post.QA_writer}</td>
              <td>{post.QA_regDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default QAList;
