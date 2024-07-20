

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Table, Dropdown, Row, Col, InputGroup, Button, Form } from 'react-bootstrap'
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';

const ListPage = () => {
    const [loading, setLoading] = useState(false);
    const uid = sessionStorage.getItem("uid");
    const [tarray, setTarray] = useState([]); // tarray 상태 초기화 0,1,2
    const [parray, setParray] = useState([]); // parray 상태 초기화 0,1
    const [isChecked, setIsChecked] = useState(false); // 체크박스 상태
    const [count, setCount] = useState(0);
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(8);
    const [dropDown, setDropDown] = useState('');
    //패스로보낼값
    const [key, setKey] = useState('mall_title');
    const [word, setWord] = useState('');
    const [orderBy, setOrderBy] = useState('desc');
    const [pstateWord, setPstateWord] = useState(parray.join(', '));
    const [tstateWord, setTstateWord] = useState(tarray.join(', '));
    const [itisEnd, setItisEnd] = useState('');
    //체크
    const [form,setForm] = useState({
        checkT0:false,
        checkT1:false,
        checkT2:false,
        checkP0:false,
        checkP1:false
    });

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
    const badgeST = {
        position: 'absolute',
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        color: 'rgba(71, 123, 93, 0.74)',
        textAlign: "center",
        fontSize: "5rem",
        borderRadius: '5px',
        top: '0',      // 상단 여백
        right: '0',    // 오른쪽 여백 기본이 오른쪽아래로 쳐져잇어서 줘야댐..
    }
    const stateBox = {
        width: "15rem",
        margin: "2rem "
    }

    const today = new Date(); // 오늘 날짜
    const filterData = (documents) => {
        const filterData = documents.map(doc => {
            const endDate = new Date(doc.mall_endDate); // 데이터에서 endDate 필드로 변경
            const isEndTrue = (today >= endDate); // true: 오늘 날짜가 endDate 이후인 경우
            return { ...doc, isEnd: isEndTrue };
        });
        return { data: filterData };
    };

    const callAPI = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                `/mall/list?key=${key}&word=${word}&page=${page}&size=${size}
                    &orderBy=${orderBy}&pstateWord=${pstateWord}&tstateWord=${tstateWord}&itisEnd=${itisEnd}`
            );

            // 데이터 가공 함수 호출
            const { data } = filterData(res.data.documents);
            setList(data); // 전체 목록 업데이트
            setCount(res.data.total);
            console.log("ListPage : " + JSON.stringify(list));
            setLoading(false);
        } catch (error) {
            console.error("Error fetching mall list:", error);
            return;
        }
    }

    const onChangeCheck = (e) => {
        setForm({...form, [e.target.name]:e.target.checked});
    }

    const onChangeTstateCheckBox = (e) => {
        if (e.target.checked) {
            setTarray([...tarray, e.target.value]);
        }
        setTstateWord(tarray.join(','));
        console.log("t: " + tstateWord);
    };

    const onChangePstateCheckBox = (e) => {
        if (e.target.checked) {
            setParray([...parray, e.target.value]);
        }
        setPstateWord(parray.join(','));
        console.log("p: " + pstateWord);
    };

    const onClickSearch = () => {
        setLoading(true);
        setPage(1);
        setWord("");
        setKey("mall_title");
        setOrderBy('desc');
        const tArray=[]
        const pArray=[]
        if(form.checkT0) tArray.push(0);
        if(form.checkT1) tArray.push(1);
        if(form.checkT2) tArray.push(2);
        if(form.checkP0) pArray.push(0);
        if(form.checkP0) pArray.push(1);   
        setTstateWord(tArray.join(','));
        setPstateWord(pArray.join(','));
        console.log('.................',tArray);
        setIsChecked(false);
        callAPI();
        // setForm({
        //     checkT0:false,
        //     checkT1:false,
        //     checkT2:false,
        //     checkP0:false,
        //     checkP1:false}
        // );

        setLoading(false);
    }

    useEffect(() => {
        // array가 변경될 때마다 stateWord를 업데이트
        setTstateWord(tarray.join(', '));
        setPstateWord(parray.join(', '));
    }, [tarray, parray]);

    useEffect(() => {
        callAPI();
        console.log(page, orderBy, itisEnd, pstateWord, tstateWord, count);
    }, [page, orderBy, itisEnd]);



    const onChangeChecked = (e) => {
        setForm({...form, [e.target.name]:e.target.checked})
    }

    if (loading) return <h1 className='text-center'>로딩중...</h1>
    return (
        <div className='justify-content-center text-center'>
            <h1 className='my-5'>피망마켓</h1>
            <div className='my-2'>♻환경을지킵시다 권장배너깔기이벤트이미지도좋음♻</div>
            <div>슬라이드페이지</div>
            <div>
                <Row>
                    <Col>
                        {word === '' ?
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
                <div style={{ border: "1px solid #ccc", borderRadius: "5px" }}  >
                    <Row className='my-2'>
                        <Col xs={3} ms={3} lg={2} style={{ borderRight: "1px solid #ccc" }}>
                            <Dropdown className="mt-1" style={{ width: "100%" }}>
                                <Dropdown.Toggle variant="">{dropDown}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => { setDropDown("최신순"); setOrderBy("desc"); }} value="desc" >최신순</Dropdown.Item>
                                    <Dropdown.Item onClick={() => { setDropDown("오래된순"); setOrderBy("asc"); }} value="asc">오래된순</Dropdown.Item>
                                    <Dropdown.Item onClick={() => { setDropDown("피망마켓"); setItisEnd("false"); }}  >진행중</Dropdown.Item>
                                    <Dropdown.Item onClick={() => { setDropDown("마감"); setItisEnd("true"); }}  >마감</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col className='text-start ' xs={9} ms={9} lg={10}>
                            <InputGroup>
                                <Form.Select value={key} onChange={(e) => setKey(e.target.value)} style={{ border: "none", borderRight: "1px solid #ccc" }} >
                                    <option value="mall_seller">아이디</option>
                                    <option value="mall_title">제목</option>
                                    <option value="mall_info">내용</option>
                                </Form.Select>
                                <Form.Control style={{ border: "none" }} value={word} onChange={(e) => setWord(e.target.value)} placeholder="검색어" className='w-50' />
                                <img src='/images/searchImg.png' onClick={(e) => onClickSearch(e)} width="50px" style={{ cursor: "pointer" }} />
                            </InputGroup>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <div className='my-0 '>
                        <Row className='justify-content-center'>
                            <InputGroup className=" " style={stateBox}>
                                <InputGroup.Checkbox onChange={onChangeChecked} name="checkT0" checked={form.checkT0} />
                                <Form.Control type="text" value="일반나눔t0" readOnly />
                            </InputGroup>
                            <InputGroup className="" style={stateBox}>
                                <InputGroup.Checkbox onChange={onChangeChecked} name="checkT1" checked={form.checkT1} />
                                <Form.Control type="text" value="무료나눔t1" readOnly />
                            </InputGroup>
                            <InputGroup className="" style={stateBox}>
                                <InputGroup.Checkbox onChange={onChangeChecked} name="checkT2" checked={form.checkT2} />
                                <Form.Control type="text" value="구매글t2" readOnly />
                            </InputGroup>
                            <InputGroup className=" " style={stateBox}>
                                <InputGroup.Checkbox onChange={onChangeChecked} name="checkP0" checked={form.checkP0} />
                                <Form.Control type="text" value="중고물품p0" readOnly />
                            </InputGroup>
                            <InputGroup className=" " style={stateBox}>
                                <InputGroup.Checkbox onChange={onChangeChecked} name="checkP1" checked={form.checkP1} />
                                <Form.Control type="text" value="새상품p1" readOnly />
                            </InputGroup>
                        </Row>
                    </div>
                </Row>
            </div>
            <Row className='my-3'>
                {count === 0 &&
                    <h1 className='my-5 text-muted'>해당하는 글이 없습니다.</h1>
                }
                {list &&
                    list.map(card => (
                        <Col key={card.mall_key} xs={3} md={3} lg={3} className='' >
                            <Card className="mb-3 mall_card_parent" style={{padding: '10px'}}>
                                {card.isEnd && (
                                    <div className="badge mall_card_child" style={badgeST}>
                                        마감
                                    </div>
                                )}
                                <Card.Body >
                                    <Card.Title><img src={card.mall_photo ? card.mall_photo : "http://via.placeholder.com/100x100"} style={photoST} /></Card.Title>
                                    <Card.Text>
                                        <Link to={`/mall/read/${card.mall_key}`} className='ellipsis'>[p:{card.mall_pstate}][t:{card.mall_tstate}][{card.mall_key}]{card.mall_title}</Link>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
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