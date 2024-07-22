import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';
import { Row, Col, InputGroup, Button, Form, Table } from 'react-bootstrap';
import axios from 'axios';
import HeaderTabs from '../../common/useful/HeaderTabs';

const NoticeList = () => {
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [key, setKey] = useState('all');
  const [word, setWord] = useState('');

  const adminIds = ['admin', 'seop', 'hanna', 'gr001231', 'laonmiku', 'ne4102'];
  const currentUser = sessionStorage.getItem('uid');

  const callAPI = async () => {
    const res = await axios.get(`/notice/list.json?key=${key}&word=${word}&page=${page}&size=${size}`);
    console.log(res.data);
    setList(res.data.documents);
    setCount(res.data.total);
    const last = Math.ceil(res.data.total / size);
    if (page > last) setPage(last);

    if (res.data.total === 0) {
      alert('검색어가 없습니다');
    }
  };

  useEffect(() => {
    callAPI();
  }, [page, key, size,word]);

  const onClickSearch = (e) => {
    e.preventDefault();
    setPage(1);
    callAPI();
  };

  return (
    <div>
      <HeaderTabs />
      <h1 className="text-center my-5">공지사항</h1>
      <Row className="mb-3">
        <Col md={10}>
          <InputGroup>
            <Form.Select className='me-2' value={key} onChange={(e) => setKey(e.target.value)} >
              <option value="all">전체</option>
              <option value="normal">일반</option>
              <option value="member">회원</option>
              <option value="event">이벤트</option>
            </Form.Select>
            <Form.Control placeholder='검색어' value={word} onChange={(e) => setWord(e.target.value)} />
            <Button onClick={onClickSearch}>검색</Button>
          </InputGroup>
        </Col>
        <Col>
          검색수: {count}건
        </Col>
        {adminIds.includes(currentUser) && (
          <Col className='text-end'>
            <Button size='sm' as={Link} to="/community/notice/insert">글쓰기</Button>
          </Col>
        )}
      </Row>
      <Table>
        <thead>
          <tr>
            <th>번호</th>
            <th>카테고리</th>
            <th>제목</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <tr key={item.notice_key}>
              <td>{(page - 1) * size + index + 1}</td>
              <td>{item.notice_type === 1 ? '일반' : item.notice_type === 2 ? '회원' : '이벤트'}</td>
              <td>
                <Link to={`/community/notice/read/${item.notice_key}`}>{item.notice_title}</Link>
              </td>
              <td>{item.notice_regDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {count > size && (
        <Pagination
          activePage={page}
          itemsCountPerPage={size}
          totalItemsCount={count}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={(e) => setPage(e)}
        />
      )}
    </div>
  );
};

export default NoticeList;
