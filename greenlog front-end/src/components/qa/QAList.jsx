import React, { useState } from 'react';
import { Row, Col, InputGroup, FormControl, Button, Table } from 'react-bootstrap';

const QAList = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  const data = [
    { id: 804, title: "추가문의드립니다.", writer: "지1", date: "2024-07-04", answer: "추가문의 답변입니다." },
    { id: 803, title: "문의", writer: "지1", date: "2024-07-02", answer: "문의 답변입니다." },
    { id: 802, title: "문의드립니다.", writer: "LL", date: "2024-07-04", answer: "문의드립니다에 대한 답변입니다." },
    { id: 801, title: "Re: 문의", writer: "KK", date: "2024-06-08", answer: "Re: 문의에 대한 답변입니다." },
  ];

  return (
    <div>
      <Row className="mb-3">
        <Col md={10}>
          <InputGroup>
            <FormControl placeholder="검색어를 입력하세요" />
            <Button variant="primary">검색</Button>
          </InputGroup>
        </Col>
        <Col md={2}>
          <Button>문의하기</Button>
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
          {data.map((item, index) => (
            <React.Fragment key={item.id}>
              <tr onClick={() => handleToggle(index)}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.writer}</td>
                <td>{item.date}</td>
              </tr>
              {openIndex === index && (
                <tr>
                  <td colSpan="4">
                    <div style={{ padding: '10px' }}>
                      {item.answer}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default QAList;
