import React from 'react';
import { Row, Col, InputGroup, FormControl, Button, Card } from 'react-bootstrap';

const EventList = () => {
  const events = [
    {
      id: 1,
      title: '탄소포인트제 가입하고 리조트 할인 받자!',
      contents: '탄소포인트제에 가입하고 리조트 할인도 받아보세요!',
      regDate: '2022-11-04',
      views: 34249,
      imageUrl: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <div>
      <h1 className="text-center my-5">이벤트, 봉사 페이지</h1>
      <InputGroup className="mb-3">
        <FormControl as="select">
          <option>전체</option>
          <option>이벤트</option>
          <option>봉사</option>
        </FormControl>
        <FormControl
          placeholder="검색어를 입력하세요"
        />
        <Button variant="primary">검색</Button>
      </InputGroup>
      <div className='text-end'>
        <Button className='me-2' size='lg'>진행중</Button>
        <Button size='lg'>종료</Button>
      </div>
      <hr/>
      <Row>
        {events.map(event => (
          <Col md={4} key={event.id}>
            <Card>
              <Card.Img src={event.imageUrl} alt="Event Image" />
              <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Text>
                  {event.contents}
                </Card.Text>
                <div>
                  <span>작성일: {event.regDate}</span>
                  <span>조회수: {event.views}</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default EventList;
