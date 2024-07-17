

import { color } from 'echarts';
import SlidePage from '../../../common/useful/SlidePage'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Table, Dropdown, Row, Col, InputGroup, Button, Form } from 'react-bootstrap'
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';

const ListPage = () => {
    const [loading, setLoading] = useState(false);
    const uid = sessionStorage.getItem("uid");
    const [count, setCount] = useState(0);
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(8);
    const [key, setKey] = useState('mall_title');
    const [word, setWord] = useState('');
    const [orderBy, setOrderBy] = useState('desc');
    const [stateKey, setStateKey] = useState('mall_tstate');
    const [stateWord, setStateWord] = useState(0);
    const [trueList, setTrueList] = useState([]); // isEnd:true 안보이면좋겟음
    const [falseList, setFalseList] = useState([]); // isEnd: false 아직날짜안지남
    
    const photoST = {
        width: "100px",
        height: "100px",
        border: "solid gray 5px"
    }

    const countST = {
        width: "100%",
        textAlign: "left",
        color: "gray"
    }

    const today = new Date(); // 오늘 날짜
    const filterData = (documents) => {
        const filterData = documents.map(doc => {
            const endDate = new Date(doc.mall_endDate); // 데이터에서 endDate 필드로 변경
            const isEndTrue = (today >= endDate); // true: 오늘 날짜가 endDate 이후인 경우
            return { ...doc, isEnd: isEndTrue };
        });
    
        // isEnd가 true와 false에 따라 분류하여 반환
        const trueData = filterData.filter(item => item.isEnd);
        const falseData = filterData.filter(item => !item.isEnd);
        console.log("true : "+ JSON.stringify(trueData)); //나오는지확인해야함 enddate당일부터 트루처리
        console.log("false : "+ JSON.stringify(falseData)); //이건나옴
    
        return { data:filterData, trueData, falseData };
    };

    const callAPI = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                `/mall/list?key=${key}&word=${word}&page=${page}&size=${size}
                    &orderBy=${orderBy}&stateKey=${stateKey}&stateWord=${stateWord}`
            );
    
            // 데이터 가공 함수 호출
            const { data, trueData, falseData } = filterData(res.data.documents);
            //console.log("console : "+ JSON.stringify(data)); //나옴
            // 상태 업데이트
           
            setTrueList(trueData); // isEnd: true인 데이터
            setFalseList(falseData); // isEnd: false인 데이터
            setList(data); // 전체 목록 업데이트
            setCount(res.data.total);
           
            console.log("ListPage : "+ JSON.stringify(list));
            //console.log("trueList : "+ JSON.stringify(trueList)); //나옴
            //console.log("falseList : "+ JSON.stringify(falseList));//나옴 
        
            setLoading(false);
            
        } catch (error) {
            console.error("Error fetching mall list:", error);
            return;
        }
    }
    

    const onClickSearch = async (e) => {
        setLoading(true);
        //console.log(key,word,list);
        e.preventDefault();
        setPage(1);
        callAPI();
        setLoading(false);
    }

    useEffect(() => {
        callAPI();
    }, [page, orderBy, stateKey,stateWord])

    if (loading) return <h1 className='text-center'>로딩중...</h1>
    return (
        <div className='justify-content-center text-center'>
            <h1 className='my-5'>피망마켓</h1>
            <div className='my-2'>♻환경을지킵시다 권장배너깔기이벤트이미지도좋음♻</div>
            <div>슬라이드페이지</div>
            <div>
                <Row>
                    <Col>
                    {word===''?
                        <div style={countST}>총 게시글 : {count}건</div>
                        :
                        <div style={countST}>검색수 : {count}건</div>
                    }
                    </Col>
                    <Col>
                        {uid ?
                            <div className='text-end'><Link to="/mall/insert">♻마켓에 올리기♻</Link> </div>
                            :
                            <div className='text-end'><Link to="/user/login">♻로그인 하기♻</Link> </div>
                        }

                    </Col>
                </Row> 
                <div style={{ border: "1px solid #ccc", borderRadius: "5px" }} >
                <Row className='my-2'>
               
                    <Col xs={3} ms={3} lg={2}>
                        <Dropdown className="bg-secondary mt-1">
                            <Dropdown.Toggle variant="">정렬</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setOrderBy("desc")} value="desc" >최신순</Dropdown.Item>
                                <Dropdown.Item onClick={() => setOrderBy("asc")} value="asc">오래된순</Dropdown.Item>
                                <Dropdown.Item onClick={() => { setStateKey("mall_pstate"); setStateWord(0); }}  >중고물품</Dropdown.Item>
                                <Dropdown.Item onClick={() => { setStateKey("mall_pstate"); setStateWord(1); }}  >새상품</Dropdown.Item>
                                <Dropdown.Item onClick={() => { setStateKey("mall_tstate"); setStateWord(0); }}  >일반나눔</Dropdown.Item>
                                <Dropdown.Item onClick={() => { setStateKey("mall_tstate"); setStateWord(1); }}  >무료나눔</Dropdown.Item>
                                <Dropdown.Item onClick={() => { setStateKey("mall_tstate"); setStateWord(2); }}  >구매글</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col className='text-start bg-secondary'  xs={9} ms={9} lg={10}>
                       
                            <InputGroup>
                                <Form.Select className='w-25' value={key} onChange={(e) => setKey(e.target.value)} style={{ border: "none", borderRight: "1px solid #ccc" }} >
                                    <option value="mall_seller">아이디</option>
                                    <option value="mall_title">제목</option>
                                    <option value="mall_info">내용</option>
                                </Form.Select>
                                <Form.Control style={{ border: "none" }} value={word} onChange={(e) => setWord(e.target.value)} placeholder="검색어" className='w-50' />
                                <img src='/images/searchImg.png' onClick={(e) => onClickSearch(e)} width="50px" style={{ cursor: "pointer" }} />
                            </InputGroup>
                        
                    </Col>
                
                </Row></div>

            </div>
            <Row >
                {list &&
                    list.map(card => (
                        <Col key={card.mall_key} xs={3} md={3} lg={3} >
                            <Card className="mb-3"  
                                style={{
                                    backgroundColor: card.isEnd ? 'lightgray' : 'white',
                                    padding: '10px',
                                    margin: '5px',
                                    color: 'white',
                                    fontWeight: 'bold'}}>
                                <Card.Body>
                                    <Card.Title><img src={card.mall_photo ? card.mall_photo : "http://via.placeholder.com/100x100"} style={photoST} /></Card.Title>
                                    <Card.Text>
                                        <Link to={`/mall/read/${card.mall_key}`} className='ellipsis'>[{card.mall_pstate}][{card.mall_key}]{card.mall_title}</Link>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }

                {count === 0 &&
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
                    onChange={(e) => setPage(e)} />
            }

        </div>
    )
}

export default ListPage