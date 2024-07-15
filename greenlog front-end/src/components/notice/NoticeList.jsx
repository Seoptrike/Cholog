import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { Row, Col, InputGroup, Button, Table, Form } from 'react-bootstrap';
import axios from 'axios';
import HeaderTabs from '../../common/useful/HeaderTabs';

const NoticeList = () => {
  const [allList, setAllList] = useState([]); // 모든 데이터를 저장하는 상태
  const [list, setList] = useState([]); // 필터링된 데이터를 저장하는 상태
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [key, setKey] = useState('notice_title');
  const [word, setWord] = useState('');
  const [category, setCategory] = useState('전체');

  const adminIds = ['admin', 'seop', 'hanna', 'gr001231', 'laonmiku', 'ne4102'];
  const currentUser = sessionStorage.getItem('uid');

  const callAPI = async () => {
    const res = await axios.get(`/notice/list.json?key=${key}&word=${word}&page=${page}&size=${size}`);
    setAllList(res.data.documents); 
    filterList(res.data.documents, category, 1); 
  };

  useEffect(() => {
    callAPI();
  }, []);

  const onClickSearch = async (e) => {
    e.preventDefault();
    setPage(1);
    callAPI();
  };

  const filterList = (data, category, page) => {
    let filtered = data;
    if (category !== '전체') {
      filtered = data.filter(item => item.notice_type === parseInt(category));
    }
    setList(filtered.slice((page - 1) * size, page * size));
    setCount(filtered.length);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
    filterList(allList, newCategory, 1);
  };

  useEffect(() => {
    filterList(allList, category, page);
  }, [page, category, allList]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    filterList(allList, category, pageNumber);
  };

  useEffect(() => {
    console.log("Count:", count, "Size:", size, "Page:", page);
  }, [count, size, page]);

  return (
    <div>
      <HeaderTabs />
      <Row className="mb-3 align-items-center">
        <Col md={10}>
          <InputGroup>
            <Form.Control placeholder='검색어' value={word} onChange={(e) => setWord(e.target.value)} />
            <Button onClick={(e) => onClickSearch(e)} type='submit'>검색</Button>
          </InputGroup>
        </Col>
        <Col md={2} className='text-end'>
          {adminIds.includes(currentUser) && (
            <Link to="/community/notice/insert">
              <Button size='sm'>글쓰기</Button>
            </Link>
          )}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className="text-center">
          <Button variant={category === '전체' ? 'primary' : 'outline-primary'} onClick={() => handleCategoryChange('전체')}>전체</Button>
          <Button variant={category === '0' ? 'primary' : 'outline-primary'} onClick={() => handleCategoryChange('0')}>일반</Button>
          <Button variant={category === '1' ? 'primary' : 'outline-primary'} onClick={() => handleCategoryChange('1')}>포인트</Button>
          <Button variant={category === '2' ? 'primary' : 'outline-primary'} onClick={() => handleCategoryChange('2')}>이벤트</Button>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <NoticeTabContent list={list} />
        </Col>
      </Row>
      {count > size && (
        <Pagination
          activePage={page}
          itemsCountPerPage={size}
          totalItemsCount={count}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
};

const NoticeTabContent = ({ list }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>번호</th>
          <th>카테고리</th>
          <th>제목</th>
          <th>작성일</th>
          <th>조회수</th>
        </tr>
      </thead>
      <tbody>
        {list.map((post, index) => (
          <tr key={post.notice_key}>
            <td>{list.length - index}</td>
            <td>{post.notice_type === 0 ? '일반' : post.notice_type === 1 ? '포인트' : post.notice_type === 2 ? '이벤트' : ''}</td>
            <td>
              <Link to={`/community/notice/read/${post.notice_key}`}>{post.notice_title}</Link>
            </td>
            <td>{post.notice_regDate}</td>
            <td>{post.notice_vcnt}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default NoticeList;
