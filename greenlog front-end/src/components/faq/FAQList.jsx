import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { Row, Col, InputGroup, Button, Table, Form } from 'react-bootstrap';
import axios from 'axios';
import HeaderTabs from '../../common/useful/HeaderTabs';

const FAQList = () => {
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [key, setKey] = useState('faq_question');
  const [word, setWord] = useState('');
  const [openIndex, setOpenIndex] = useState(null);
  const [category, setCategory] = useState('all');

  const callAPI = async () => {
    const res = await axios.get(`/faq/list.json?key=${key}&word=${word}&page=${page}&size=${size}&category=${category}`);
    console.log(res.data);
    setList(res.data.documents);
    setCount(res.data.total);
  }

  useEffect(() => {
    callAPI();
  }, [page, category]);

  const onSubmit = (e) => {
    e.preventDefault();
    callAPI();
  }

  const onClickSearch = async (e) => {
    e.preventDefault();
    setPage(1);
    callAPI();
  }

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleWriteClick = () => {
    window.location.href = '/community/faq/insert';
  };

  const handleUpdateClick = (faq_key) => {
    window.location.href = `/community/faq/update/${faq_key}`;
  };

  const handleDeleteClick = async (faq_key) => {
    if (!window.confirm('정말로 이 FAQ를 삭제하시겠습니까?')) return;
    try {
      await axios.post(`/faq/delete/${faq_key}`);
      setList(list.filter(faq => faq.FAQ_key !== faq_key));
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      alert('FAQ 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <HeaderTabs />
      <h1 className="text-center my-5">FAQ</h1>
      <Row className="mb-3">
        <Col md={10}>
          <InputGroup onSubmit={onSubmit}>
            <Form.Select className='me-2' value={key} onChange={(e) => setKey(e.target.value)}>
              <option value="faq_question">질문</option>
              <option value="faq_answer">답변</option>
              <option value="faq_writer">글쓴이</option>
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
            <Button size='sm' onClick={handleWriteClick}>글쓰기</Button>
          </Col>
        }
      </Row>
      <Table>
        <thead>
          <tr>
            <th>카테고리</th>
            <th>질문</th>
          </tr>
        </thead>
        <tbody>
          {list.map((faq, index) => (
            <React.Fragment key={faq.FAQ_key}>
              <tr onClick={() => handleToggle(index)}>
                <td>{faq.FAQ_category}</td>
                <td>{faq.FAQ_question}</td>
              </tr>
              {openIndex === index && (
                <tr key={`${faq.FAQ_key}-content`}>
                  <td colSpan="2">
                    <div style={{ padding: '10px' }}>
                      {faq.FAQ_answer}
                    </div>
                    <Button onClick={() => handleUpdateClick(faq.FAQ_key)} className='me-2'>수정</Button>
                    <Button onClick={() => handleDeleteClick(faq.FAQ_key)}>삭제</Button>
                  </td>
                </tr>
              )}
            </React.Fragment>
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

export default FAQList;
