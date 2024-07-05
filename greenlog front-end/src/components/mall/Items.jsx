import React, { useEffect, useState } from 'react'
import { Card, Table,Row,Col, InputGroup, Button, Form } from 'react-bootstrap'
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom'; 
//페이지네이션css임포트시키기



const Items = () => { 
    
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


    const callAPI= async()=>{
       // const res= await axios.get(`/bbs/list.json?key=${key}&word=${word}&page=${page}&size=${size}`)
        // console.log(res.data);
        // setList(res.data.documents);
        // setCount(res.data.total);
    }
    useEffect(()=>{
        callAPI();
    },[page])

    const onSubmit=(e)=>{
        e.preventDefault();
        callAPI();
        setPage(1);
    }
    return (
    <div>
        
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
        <Table className='justify-content-center'>
            <tbody className='border border-white'>
            <tr>
                <td>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            바디뱅
                        </Card.Title>
                        <Card.Text>
                            <Link to="/mall/read">발을씻자</Link>
                        </Card.Text>
                     </Card.Body>
                    </Card>
                </td>
                <td><Card><Card.Body>바디뱅</Card.Body><Card.Footer> 발을씻자</Card.Footer></Card></td>
                <td><Card><Card.Body>바디뱅</Card.Body><Card.Footer> 발을씻자</Card.Footer></Card></td>
                <td><Card><Card.Body>바디뱅</Card.Body><Card.Footer> 발을씻자</Card.Footer></Card></td>
            </tr>
            <tr >
                <td><Card><Card.Body>바디뱅</Card.Body><Card.Footer> 발을씻자</Card.Footer></Card></td>
                <td><Card><Card.Body>바디뱅</Card.Body><Card.Footer> 발을씻자</Card.Footer></Card></td>
                <td><Card><Card.Body>바디뱅</Card.Body><Card.Footer> 발을씻자</Card.Footer></Card></td>
                <td><Card><Card.Body>바디뱅</Card.Body><Card.Footer> 발을씻자</Card.Footer></Card></td>
            </tr>
            <tr >
                <td><Card><Card.Body>바디뱅</Card.Body><Card.Footer> 발을씻자</Card.Footer></Card></td>
                <td><Card><Card.Body>바디뱅</Card.Body><Card.Footer> 발을씻자</Card.Footer></Card></td>
                <td><Card><Card.Body>바디뱅</Card.Body><Card.Footer> 발을씻자</Card.Footer></Card></td>
                <td><Card><Card.Body>바디뱅</Card.Body><Card.Footer> 발을씻자</Card.Footer></Card></td>
            </tr>
            </tbody>
        </Table> 
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

export default Items
