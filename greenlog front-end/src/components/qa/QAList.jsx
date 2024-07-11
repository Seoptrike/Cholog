import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { Row, Col, InputGroup, Button, Table, Form } from 'react-bootstrap';
import axios from 'axios';
import HeaderTabs from '../../common/useful/HeaderTabs';

const QAList = () => {
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [key, setKey] = useState('qa_title');
  const [word, setWord] = useState('');

  const callAPI = async () => {
    const res = await axios.get(`/qa/list.json?key=${key}&word=${word}&page=${page}&size=${size}`);
    console.log(res.data);
    setList(res.data.documents);
    setCount(res.data.total);
  }

  useEffect(() => {
    callAPI();
  }, [page]);

  const onSubmit = (e) => {
    e.preventDefault();
    callAPI();
  }

  const onClickSearch = async (e) => {
    e.preventDefault();
    setPage(1);
    callAPI();
  }

  return (
    <div>
      <HeaderTabs />
      <h1 className="text-center my-5">Q&A</h1>
      <Row className="mb-3">
        <Col md={10}>
          <InputGroup onSubmit={onSubmit}>
            <Form.Select className='me-2' value={key} onChange={(e) => setKey(e.target.value)}>
              <option value="qa_title">제목</option>
              <option value="qa_contents">내용</option>
              <option value="qa_writer">글쓴이</option>
            </Form.Select>
            <Form.Control placeholder='검색어' value={word} onChange={(e) => setWord(e.target.value)} />
            <Button onClick={(e) => onClickSearch(e)} type='submit'>검색</Button>
          </InputGroup>
        </Col>
        <Col>
          검색수: {count}건
        </Col>
        {sessionStorage.getItem('uid') &&
          <Col className='text-end'>
            <Link to="/community/qa/insert">
              <Button size='sm'>글쓰기</Button>
            </Link>
          </Col>
        }
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
            <tr key={post.qa_key}>
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

export default QAList;
