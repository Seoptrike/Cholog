import React, { useState, useEffect } from 'react';
import Pagination from 'react-js-pagination';
import { Row, Col, InputGroup, Button, Form, Accordion } from 'react-bootstrap';
import axios from 'axios';
import HeaderTabs from '../../common/useful/HeaderTabs';

const FAQList = () => {
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [key, setKey] = useState('faq_question');
  const [word, setWord] = useState('');
  const [category, setCategory] = useState('all');

  // 관리자 아이디 목록
  const adminIds = ['admin', 'seop', 'hanna', 'gr001231', 'laonmiku', 'ne4102'];
  const currentUser = sessionStorage.getItem('uid');

  const callAPI = async () => {
    const res = await axios.get(`/faq/list.json?key=${key}&word=${word}&category=${category}&page=${page}&size=${size}`);
    setList(res.data.documents);
    setCount(res.data.total);
    const last = Math.ceil(res.data.total / size);
    if (page > last) setPage(last);

    if (res.data.total === 0) {
      alert('검색어가 없습니다');
    }
  }

  useEffect(() => {
    callAPI();
  }, [page, size, category]);

  const onClickSearch = async (e) => {
    e.preventDefault();
    setPage(1);
    callAPI();
  };

  const WriteClick = () => {
    window.location.href = '/community/faq/insert';
  };

  const UpdateClick = (faq_key) => {
    window.location.href = `/community/faq/update/${faq_key}`;
  };

  const DeleteClick = async (faq_key) => {
    if (!window.confirm('정말로 이 FAQ를 삭제하시겠습니까?')) return;
    try {
      await axios.post(`/faq/delete/${faq_key}`);
      setList(list.filter(faq => faq.FAQ_key !== faq_key));
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      alert('FAQ 삭제 중 오류가 발생했습니다.');
    }
  };

  const CategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setPage(1);
    // 카테고리별 size 설정
    if (selectedCategory === '회원') {
      setSize(10);
    } else if (selectedCategory === '포인트') {
      setSize(15);
    } else if (selectedCategory === '참여방법') {
      setSize(15);
    } else {
      setSize(5);
    }
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const filteredList = list.filter(faq => category === 'all' || faq.FAQ_category === category);

  return (
    <div>
      <HeaderTabs />
      <h1 className="text-center my-5">FAQ</h1>
      <Row className="mb-3 align-items-center">
        <Col md={8}>
          <InputGroup>
            <Form.Select className='me-2' value={category} onChange={CategoryChange}>
              <option value="all">전체</option>
              <option value="회원">회원</option>
              <option value="포인트">포인트</option>
              <option value="참여방법">참여방법</option>
            </Form.Select>
            <Form.Control placeholder='검색어' value={word} onChange={(e) => setWord(e.target.value)} />
            <Button onClick={onClickSearch}>검색</Button>
          </InputGroup>
        </Col>
        <Col md={4} className="text-end">
          <span className="me-2">검색수: {count}건</span>
          {adminIds.includes(currentUser) && (
            <Button size='sm' onClick={WriteClick}>글쓰기</Button>
          )}
        </Col>
      </Row>
      <Accordion defaultActiveKey={null}>
        {filteredList.map((faq, index) => (
          <Accordion.Item eventKey={`${index}`} key={faq.FAQ_key}>
            <Accordion.Header>{faq.FAQ_category} - {faq.FAQ_question}</Accordion.Header>
            <Accordion.Body>
              {faq.FAQ_answer}
              {adminIds.includes(currentUser) && (
                <div className='mt-3'>
                  <Button onClick={() => UpdateClick(faq.FAQ_key)} className='me-2'>수정</Button>
                  <Button onClick={() => DeleteClick(faq.FAQ_key)}>삭제</Button>
                </div>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
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

export default FAQList;
