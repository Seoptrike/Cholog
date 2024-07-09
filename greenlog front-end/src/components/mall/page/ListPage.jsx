

import SlidePage from '../../../common/useful/SlidePage'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Table,Row,Col, InputGroup, Button, Form } from 'react-bootstrap'
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom'; 
//페이지네이션css임포트시키기

const ListPage = () => {
  const mallStyle ={
    width:"400px",
    hight:"70px"
  }
  const [count, setCount] = useState(0);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [key, setKey] = useState('');
  const [word, setWord] = useState('');
  const searchST = {
      backgroundImage: 'url("/images/searchImg.png")',
      backgroundSize: 'cover',width: '40px',borderLeft: 'none',
      cursor:"pointer"

  };
  const photoST ={
    width:"100%",
    border:"solid gray 5px"
}


  const callAPI= async()=>{ 
     const res= await axios.get(`/mall/list?key=${key}&word=${word}&page=${page}&size=${size}`)
      console.log(res.data);
      setList(res.data);
      // setCount(res.data.total);
  }
  useEffect(()=>{
      callAPI();
  },[page])

  return (
    <div className='justify-content-center text-center'>
        <h1 className='my-5'>피망마켓</h1>
        <div className='my-2'>♻환경을지킵시다 권장배너깔기이벤트이미지도좋음♻</div>
        <SlidePage />
        <div>
            <Row className='my-2'>
            <Col className='text-start'>
            <div style={{border:"1px solid #ccc", borderRadius: "5px"}} >
                    <InputGroup>
                    <Form.Select className='w-25' style={{border:"none",borderRight:"1px solid #ccc"}} >
                        <option value="1">아이디</option>
                        <option value="2">제목</option>
                        <option value="3">내용</option>
                    </Form.Select>
                    
                    <Form.Control style={{border:"none"}}  placeholder="검색어,,나도이거 동그랗게하자" className='w-50'/>
                    
                    <img src='/images/searchImg.png' width="50px" style={{cursor:"pointer"}} />
                    
                </InputGroup>
                </div>
            </Col>
            <Col xs={3} ms={3} lg={3}>
                <div className='text-end'><Link to="/mall/insert">♻마켓에 올리기♻</Link> </div>
            </Col>
            </Row>
        </div>
        <Row xs={1} md={2} lg={4}>
                {list.map(card => (
                    <Col key={card.mall_key}>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title><img src={card.mall_photo ? card.mall_photo : "http://via.placeholder.com/100x100"} style={photoST}/></Card.Title>
                                <Card.Text>
                                    <Link to={`/mall/read/${card.mall_key}`}>{card.mall_title}</Link>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
                
            <Pagination
                activePage={page}
                itemsCountPerPage={size}
                totalItemsCount={count}
                pageRangeDisplayed={5}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={ (e)=>setPage(e) }/>
        
    </div>
  )
}

export default ListPage