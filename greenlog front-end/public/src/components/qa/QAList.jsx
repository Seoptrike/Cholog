import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Row, Col, InputGroup, FormControl, Button, Table } from 'react-bootstrap';
import HeaderTabs from '../../common/useful/HeaderTabs';

const QAList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const data = [
    { id: 804, title: "추가문의드립니다.", writer: "지1", date: "2024-07-04", answer: "추가문의 답변입니다." },
    { id: 803, title: "문의", writer: "지1", date: "2024-07-02", answer: "문의 답변입니다." },
    { id: 802, title: "문의드립니다.", writer: "LL", date: "2024-07-04", answer: "문의드립니다에 대한 답변입니다." },
    { id: 801, title: "Re: 문의", writer: "KK", date: "2024-06-08", answer: "Re: 문의에 대한 답변입니다." },
  ];

  const qaClick = () => {
    navigate('/community/qa/insert');
  };

  return (
    <div>
      <HeaderTabs />
      <Row className="mb-3">
        <Col md={10}>
          <InputGroup>
            <FormControl
              placeholder="검색어를 입력하세요"
              value={search}
              onChange={e => setSearch(e.target.value)}/>
            <Button variant="primary">검색</Button>
          </InputGroup>
        </Col>
        <Col md={2}>
          <Button onClick={qaClick}>문의하기</Button>
        </Col>
      </Row>
      <Table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>글쓴이</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <React.Fragment key={item.id}>
              <tr>
                <td>{item.id}</td>
                <td>
                  <Link to={`/community/qa/read/${item.id}`}>{item.title}</Link>
                </td>
                <td>{item.writer}</td>
                <td>{item.date}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default QAList;
