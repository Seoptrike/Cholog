import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { Row, Col, InputGroup, FormControl, Button, Card, Form } from 'react-bootstrap';
import axios from 'axios';

const EventList = () => {
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5); 
  const [key, setKey] = useState('event_title');
  const [word, setWord] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('all');

  const callAPI = async () => {
    const res = await axios.get(`/event/list.json?key=${key}&word=${word}&page=${page}&size=${size}`);
    setList(res.data.documents);
    setCount(res.data.total);
  }

  useEffect(() => {
    callAPI();
  }, [page, word]);

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
  };

  const filterList = () => {
    return list.filter(item => {
      const matchCategory = category === '' || item.event_type === parseInt(category);
      const matchStatus = status === 'all' || (status === 'ongoing' && item.event_status === 'ongoing') || (status === 'ended' && item.event_status === 'ended');
      return matchCategory && matchStatus;
    });
  };

  const filteredList = filterList();

  return (
    <div>
      <h1 className="text-center my-5">이벤트, 봉사 페이지</h1>
      <InputGroup className="mb-3">
        <FormControl as="select" value={category} onChange={handleCategoryChange}>
          <option value="">전체</option>
          <option value="0">이벤트</option>
          <option value="1">봉사</option>
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
            <Link to="/community/event/insert">
              <Button size='sm'>글쓰기</Button>
            </Link>
          </Col>
        )}
        <Button className='me-2' size='lg' >진행중</Button>
        <Button size='lg'>종료</Button>
      </div>
      <hr />
      <Row>
        {filteredList.map(e => (
          <Col md={4} key={e.event_key} className="mb-4">
            <Card as={Link} to={`/community/event/read/${e.event_key}`}>
              {/* 이미지 넣을 자리 */}
              <Card.Body>
                <Card.Title>{e.event_title}</Card.Title>
                <Card.Text>
                  {e.event_contents}
                </Card.Text>
                <div>
                  <span>작성일: {e.event_regDate} {e.event_type === 0 ? "이벤트" : "봉사"}</span>
                </div>
                <div>
                  조회수:{e.event_vcnt}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
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

export default EventList;
