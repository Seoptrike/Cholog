import React, { useState, useEffect } from 'react';
import { Row, Col, InputGroup, FormControl, Button, Table } from 'react-bootstrap';
import HeaderTabs from '../../common/useful/HeaderTabs';
import axios from 'axios';

const FAQList = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [isAdmin, setIsAdmin] = useState(false);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const user = { name: 'hanna' };
    if (user.name === 'hanna') {
      setIsAdmin(true);
    }

    const fetchFAQs = async () => {
      try {
        const response = await axios.get('/faq/list');
        const data = response.data;
        console.log('Fetched data:', data);
        if (Array.isArray(data)) {
          setFaqs(data);
        } else {
          console.error('Fetched data is not an array:', data);
          setFaqs([]);
        }
      } catch (error) {
        console.error('Error fetching FAQs:', error);
        setFaqs([]);
      }
    };

    fetchFAQs();
  }, []);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleWriteClick = () => {
    window.location.href = '/community/faq/insert';
  };

  return (
    <div>
      <HeaderTabs />
      <Row className="mb-3">
        <Col md={10}>
          <InputGroup>
            <FormControl as="select" onChange={e => setCategory(e.target.value)}>
              <option value="all">전체</option>
              <option value="회원">회원</option>
              <option value="포인트">포인트</option>
              <option value="참여방법">참여방법</option>
            </FormControl>
            <FormControl
              placeholder="검색어를 입력하세요"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <Button type="button">검색</Button>
          </InputGroup>
        </Col>
        <Col md={2}>
          {isAdmin && (
            <Button type="button" onClick={handleWriteClick}>
              글쓰기
            </Button>
          )}
        </Col>
      </Row>
      <Table>
        <tbody>
          {faqs.length === 0 && (
            <tr>
              <td colSpan="2">FAQ 데이터가 없습니다.</td>
            </tr>
          )}
          {faqs.map((faq, index) => {
            if (
              (category === 'all' || faq.FAQ_category === category) &&
              (search === '' || faq.FAQ_question.includes(search))
            ) {
              return (
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
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            }
            return null;
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default FAQList;
