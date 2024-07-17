import React, { useState, useEffect } from 'react';
import Pagination from 'react-js-pagination';
import { Row, Col, InputGroup, Button, Form, Accordion } from 'react-bootstrap';
import axios from 'axios';
import HeaderTabs from '../../common/useful/HeaderTabs';

const FAQList = () => {
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [key, setKey] = useState('faq_question');
  const [word, setWord] = useState('');
  const [category, setCategory] = useState('all');

  // 관리자 아이디 목록
  const adminIds = ['admin', 'seop', 'hanna', 'gr001231', 'laonmiku', 'ne4102'];
  const currentUser = sessionStorage.getItem('uid');

  const callAPI = async () => {
    const res = await axios.get(`/faq/list.json?key=${key}&word=${word}&page=${page}&size=${size}`);
    setList(res.data.documents);
    setCount(res.data.total);

    if (res.data.total === 0) {
      alert('검색어가 없습니다');
    }
  };

  useEffect(() => {
    callAPI();
  }, [page]);

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
    setCategory(e.target.value);
    setPage(1);
  };

  const filterList = () => {
    if (category === 'all') {
      return list;
    }
    return list.filter(faq => faq.FAQ_category === category);
  };

  const filteredList = filterList();

  return (
    <div>
      <HeaderTabs />
      <h1 className="text-center my-5">FAQ</h1>
      <Row className="mb-3">
        <Col md={10}>
          <InputGroup>
            <Form.Select className='me-2' value={category} onChange={CategoryChange}>
              <option value="all">전체</option>
              <option value="회원">회원</option>
              <option value="포인트">포인트</option>
              <option value="참여방법">참여방법</option>
            </Form.Select>
            <Form.Control placeholder='검색어' value={word} onChange={(e) => setWord(e.target.value)} />
            <Button onClick={(e) => onClickSearch(e)}>검색</Button>
          </InputGroup>
        </Col>
        <Col>
          검색수: {count}건
        </Col>
        {adminIds.includes(currentUser) && (
          <Col className='text-end'>
            <Button size='sm' onClick={WriteClick}>글쓰기</Button>
          </Col>
        )}
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
          onChange={(e) => setPage(e)}
        />
      )}
    </div>
  );
};

export default FAQList;
