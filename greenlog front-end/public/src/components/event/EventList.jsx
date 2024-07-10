import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Row, Col, InputGroup, FormControl, Button, Card } from 'react-bootstrap';
import axios from 'axios';

const EventList = () => {
  const [search, setSearch] = useState('');
  const [list, setList]=useState([]);
  const navigate = useNavigate();
  
  const callAPI =async()=>{
    const res = await axios.get('/event/list');
    console.log(res.data);
    setList(res.data);
  }

  useEffect(() => {
    callAPI();
  }, []);

  return (
    <div>
      <h1 className="text-center my-5">이벤트, 봉사 페이지</h1>
      <InputGroup className="mb-3">
        <FormControl as="select">
          <option value="2">전체</option>
          <option value="0">이벤트</option>
          <option value="1">봉사</option>
        </FormControl>
        <FormControl
          placeholder="검색어를 입력하세요"
        />
        <Button>검색</Button>
      </InputGroup>
      <div className='text-end'>
        <Link to={'/community/event/insert'}>
        <Button className='me-2'>글쓰기</Button>
        </Link>
        <Button className='me-2' size='lg'>진행중</Button>
        <Button size='lg'>종료</Button>
      </div>
      <hr/>
      <Row>
        {list.map(e => (
          <Col md={4} key={e.event_key}>
            <Card as={Link} to={`/community/event/read/${e.event_key}`}>
              {/*이미지넣을자리 */}
              <Card.Body>
                <Card.Title>{e.event_title}</Card.Title>
                <Card.Text>
                  {e.event_contents}
                </Card.Text>
                <div>
                  <span>작성일: {e.event_regDate} {e.event_type === 0?"이벤트":"봉사"}</span>
                  {/*조회수 */}
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
