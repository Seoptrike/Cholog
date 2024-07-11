import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Row, Col, InputGroup, Button, Table, Form, Tab, Tabs } from 'react-bootstrap';
import axios from 'axios';
import HeaderTabs from '../../common/useful/HeaderTabs';
import Pagination from 'react-js-pagination';

const NoticeList = () => {
  const [activeKey, setActiveKey] = useState('전체');
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [key, setKey] = useState('notice_title');
  const [word, setWord] = useState('');

  const fetchNoticeList = async () => {
    try {
      const response = await axios.get(`/notice/list.json?key=${key}&word=${word}&page=${page}&size=${size}`);
      const allNotices = response.data;

      setList(allNotices.documents);
      setCount(allNotices.total);
    } catch (error) {
      console.error('Error fetching notice list:', error);
    }
  };

  useEffect(() => {
    fetchNoticeList();
  }, [page, activeKey]);

  const onSubmit = (e) => {
    e.preventDefault();
    fetchNoticeList();
  };

  const onClickSearch = async (e) => {
    e.preventDefault();
    setPage(1);
    fetchNoticeList();
  };

  const filterNoticesByCategory = (category) => {
    return list.filter(notice => category === '전체' || notice.notice_category === category);
  };

  return (
    <div>
      <HeaderTabs />
      <Row className="mb-3">
        <Col md={10}>
          <InputGroup>
            <Form.Select className='me-2' value={key} onChange={(e) => setKey(e.target.value)}>
              <option value="notice_title">제목</option>
              <option value="notice_contents">내용</option>
              <option value="notice_writer">글쓴이</option>
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
            <Link to="/community/notice/insert">
              <Button size='sm'>글쓰기</Button>
            </Link>
          </Col>
        }
      </Row>
      <Row className="mb-3">
        <Col>
          <Tabs activeKey={activeKey} onSelect={k => setActiveKey(k)} className="mb-3" fill>
            <Tab eventKey="전체" title="전체">
              <NoticeTabContent list={filterNoticesByCategory('전체')} />
            </Tab>
            <Tab eventKey="일반" title="일반">
              <NoticeTabContent list={filterNoticesByCategory('일반')} />
            </Tab>
            <Tab eventKey="포인트" title="포인트">
              <NoticeTabContent list={filterNoticesByCategory('포인트')} />
            </Tab>
            <Tab eventKey="이벤트" title="이벤트">
              <NoticeTabContent list={filterNoticesByCategory('이벤트')} />
            </Tab>
          </Tabs>
        </Col>
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

const NoticeTabContent = ({ list }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>카테고리</th>
          <th>작성일</th>
          <th>조회수</th>
        </tr>
      </thead>
      <tbody>
        {list.map((post, index) => (
          <tr key={post.notice_key}>
            <td>{list.length - index}</td>
            <td>
              <Link to={`/community/notice/read/${post.notice_key}`}>{post.notice_title}</Link>
            </td>
            <td>{post.notice_category}</td>
            <td>{post.notice_regDate}</td>
            <td>{post.notice_views}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default NoticeList;
