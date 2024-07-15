


import { Margin } from '@mui/icons-material';
import SlidePage from '../../../common/useful/SlidePage'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Table, Dropdown,Row,Col, InputGroup, Button, Form } from 'react-bootstrap'
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom'; 

const ListPage = () => {
    const [loading, setLoading] = useState(false);
  const mallStyle ={
    width:"400px",
    hight:"70px"
  }
  const [count, setCount] = useState(0);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(12);
  const [key, setKey] = useState('mall_title');
  const [word, setWord] = useState('');
  const [orderBy,setOrderBy] = useState('desc');
  const [trueList, setTrueList] = useState([]); // isEnd:true 안보이면좋겟음
  const [falseList, setFalseList] = useState([]); // isEnd: false 아직날짜안지남
    const photoST ={
        width:"100%",
        border:"solid gray 5px"
    }
    const countST ={
        width:"100%",
        textAlign:"left",
        color:"gray" 
    }


    const callAPI= async()=>{ 
        setLoading(true);
        const res = await axios.get(`/mall/list?key=${key}&word=${word}&page=${page}&size=${size}&orderBy=${orderBy}`);
        //console.log("ListPage : "+ JSON.stringify(res.data));
        setList(res.data.documents);
        setCount(res.data.total);
        setLoading(false);
        console.log("ListPage : "+ list);
        //console.log("trueList : "+ JSON.stringify(trueList));
        //console.log("falseList : "+ JSON.stringify(falseList));
    }
 
 

    const onClickSearch=async(e)=>{
        setLoading(true);
        //console.log(key,word,list);
        e.preventDefault();
        setPage(1);
        callAPI();
        setLoading(false);
    }

    useEffect(()=>{
        callAPI();
    },[page,orderBy])

    



    if(loading) return <h1 className='text-center'>로딩중...</h1>
    return (
    <div className='justify-content-center text-center'>
        <h1 className='my-5'>피망마켓</h1>
        <div className='my-2'>♻환경을지킵시다 권장배너깔기이벤트이미지도좋음♻</div>
        <SlidePage />
        <div>
            <Row>
                <Col>
                    <div style={countST}>검색수 : {count}건</div>
                </Col>
                <Col>
                <div className='text-end'><Link to="/mall/insert">♻마켓에 올리기♻</Link> </div>
                </Col>
            </Row>
            <Row className='my-2'>
                <Col xs={2} ms={2} lg={1}>
                    <Dropdown className="me-1">
                        <Dropdown.Toggle variant="">정렬</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={()=>setOrderBy("desc")} value="desc" >최신순</Dropdown.Item>
                            <Dropdown.Item onClick={()=>setOrderBy("asc")} value="asc">오래된순</Dropdown.Item> 
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col className='text-start'>
                    <div style={{border:"1px solid #ccc", borderRadius: "5px"}} >
                        <InputGroup>
                            <Form.Select className='w-25'  value={key}  onChange={(e) => setKey(e.target.value)} style={{border:"none",borderRight:"1px solid #ccc"}} >
                                <option value="mall_seller">아이디</option>
                                <option value="mall_title">제목</option>
                                <option value="mall_info">내용</option>
                            </Form.Select>
                            <Form.Control style={{border:"none"}} value={word} onChange={(e)=>setWord(e.target.value)}  placeholder="검색어" className='w-50'/>
                            <img src='/images/searchImg.png'  onClick={(e)=>onClickSearch(e)} width="50px" style={{cursor:"pointer"}} />
                        </InputGroup>
                    </div>
                </Col>
               
            </Row>
            
        </div>
        <Row >
            {list && 
                list.map(card => (
                    <Col key={card.mall_key} xs={3} md={3} lg={3}>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title><img src={card.mall_photo ? card.mall_photo : "http://via.placeholder.com/100x100"} style={photoST}/></Card.Title>
                                <Card.Text>
                                    <Link to={`/mall/read/${card.mall_key}`}>[{card.mall_key}]{card.mall_title}</Link>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))
            }

            {count===0 &&
                <h1 className='my-5 text-muted'>해당하는 글이 없습니다.</h1>
            }   
            
                
        </Row>
            
        {count > size && 
            <Pagination
                activePage={page}
                itemsCountPerPage={size}
                totalItemsCount={count}
                pageRangeDisplayed={5}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={ (e)=>setPage(e) }/>
        }

    </div>
    )
}

export default ListPage