import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { Row, Col, InputGroup, Button, Table,Form } from 'react-bootstrap';
import axios from 'axios';

const BBSList = () => {
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5); 
  const [key, setKey] = useState('bbs_title');
  const [word, setWord] = useState('');

  const callAPI = async() => {
    const res=await axios.get(`/bbs/list.json?key=${key}&word=${word}&page=${page}&size=${size}`);
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

  const onClickSearch=async(e)=>{
    e.preventDefault();
    setPage(1);
    callAPI();
}


  return (
    <div>
      <h1 className="text-center my-5">자유게시판</h1>
      <Row className="mb-3">
        <Col md={10}>
        <InputGroup onSubmit={onSubmit}>
              <Form.Select className='me-2' value={key} onChange={(e)=>setKey(e.target.value)}>
                <option value="bbs_title">제목</option>
                <option value="bbs_contents">꿀팁</option>
                <option value="bbs_writer">자유</option>
              </Form.Select>
              <Form.Control placeholder='검색어' value={word} onChange={(e)=>setWord(e.target.value)}/>
              <Button  onClick={(e)=>onClickSearch(e)} type='submit'>검색</Button>
            </InputGroup>
        </Col>
        <Col>
          검색수: {count}건
        </Col>
        {sessionStorage.getItem('uid') &&
          <Col className='text-end'>
            <Link to="/community/bbs/insert">
              <Button size='sm'>글쓰기</Button>
            </Link>
          </Col>
        }
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
              <td>{post.bbs_views}</td> {/* 조회수 추가 */}
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
