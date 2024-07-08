import React, { useState, useEffect } from 'react';
import { Row, Col, InputGroup, FormControl, Button, Table } from 'react-bootstrap';
import HeaderTabs from '../../common/useful/HeaderTabs'; 
import { useNavigate } from 'react-router-dom';

const FAQList = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [isAdmin, setIsAdmin] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const user = { name: 'hanna' }; 
    if (user.name === 'hanna') {
      setIsAdmin(true);
    }
  }, []);

  const handleToggle = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  const handleWriteClick = () => {
    navigate('/community/faq/insert');
  };

  const faqs = [
    { id: 1, category: '포인트', title: '포인트 사용 방법', content: '포인트는 이렇게 사용합니다.' },
    { id: 2, category: '회원', title: '회원 가입 방법', content: '회원 가입은 이렇게 합니다.' },
    { id: 3, category: '참여방법', title: '참여 방법 안내', content: '참여는 이렇게 합니다.' },
  ];

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
            <Button>검색</Button>
          </InputGroup>
        </Col>
        <Col md={2}>
          {isAdmin && (
            <Button onClick={handleWriteClick}>
              글쓰기
            </Button>
          )}
        </Col>
      </Row>
      <Table>
        <tbody>
          {faqs.map((faq, index) => {
            if (
              (category === 'all' || faq.category === category) &&
              (search === '' || faq.title.includes(search))
            ) {
              return (
                <React.Fragment key={faq.id}>
                  <tr onClick={() => handleToggle(index)}>
                    <td>{faq.category}</td>
                    <td>{faq.title}</td>
                  </tr>
                  {openIndex === index && (
                    <tr>
                      <td colSpan="4">
                        <div style={{ padding: '10px' }}>
                          {faq.content}
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
