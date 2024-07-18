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
  const [key, setKey] = useState('notice_title');
  const [word, setWord] = useState('');
  const [category, setCategory] = useState('');

  const adminIds = ['admin', 'seop', 'hanna', 'gr001231', 'laonmiku', 'ne4102'];
  const currentUser = sessionStorage.getItem('uid');

  const callAPI = async () => {
    const res = await axios.get(`/notice/list.json?key=${key}&word=${word}&category=${category}&page=${page}&size=${size}`);
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
  }, [page, category, size]);

  const onClickSearch = (e) => {
    e.preventDefault();
    setPage(1);
    callAPI();
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setPage(1);

    // 카테고리별 size 설정
    if (selectedCategory === '0') {
      setSize(10); // 일반 카테고리
    } else if (selectedCategory === '1') {
      setSize(15); // 회원 카테고리
    } else if (selectedCategory === '2') {
      setSize(20); // 이벤트 카테고리
    } else {
      setSize(5); // 전체 또는 기타 카테고리
    }
  };

  const filterList = () => {
    if (category === '') {
      return list;
    }
    return list.filter(notice => notice.notice_type === parseInt(category));
  };

  const filteredList = filterList();

  return (
    <div>
      <HeaderTabs />
      <h1 className="text-center my-5">공지사항</h1>
      <Row className="mb-3">
        <Col md={10}>
          <InputGroup>
            <Form.Select className='me-2' value={category} onChange={handleCategoryChange}>
              <option value="">전체</option>
              <option value="0">일반</option>
              <option value="1">회원</option>
              <option value="2">이벤트</option>
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
          {filteredList.map((item, index) => (
            <tr key={item.notice_key}>
              <td>{(page - 1) * size + index + 1}</td>
              <td>{item.notice_type === 0 ? '일반' : item.notice_type === 1 ? '회원' : '이벤트'}</td>
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
          onChange={(pageNumber) => setPage(pageNumber)}
        />
      )}
    </div>
  );
};

export default NoticeList;
