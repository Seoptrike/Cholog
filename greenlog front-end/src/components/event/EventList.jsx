import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { Row, Col, InputGroup, FormControl, Button, Card, Form } from 'react-bootstrap';
import axios from 'axios';

const EventList = () => {
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(6);
  const [key, setKey] = useState('event_title');
  const [word, setWord] = useState('');
  const [category, setCategory] = useState('');

  // 관리자 아이디 목록
  const adminIds = ['admin', 'seop', 'hanna', 'gr001231', 'laonmiku', 'ne4102'];
  const currentUser = sessionStorage.getItem('uid');

  const callAPI = async () => {
    const res1 = await axios.get('/crawl/gihoo')
    setList(res1.data)
    console.log(res1.data)
  };

  useEffect(() => {
    callAPI();
  }, []);

  return (
    <div>
      <h1 className="text-center my-5">캠페인 소개 페이지</h1>
      <Row>
        {list.map((e, index) => (
          <Col md={3} key={index} className="mb-4">
            <Card style={{ width: '18rem' }}>
              <a href={e.href}>
                <Card.Img variant="top" src={e.img} />
              </a>
              <Card.Body>
                <a href={e.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Card.Title>{e.title}</Card.Title>
                  <hr />
                  <Card.Text>작성일: {e.date}</Card.Text>
                </a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

    </div>
  );
};

export default EventList;
