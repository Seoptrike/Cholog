import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, InputGroup, Form } from 'react-bootstrap';
import axios from 'axios';


//거래내역 버튼 눌렀을 시, 개인거래내역페이지로 이동
//돌릴 데이터 필요, 페이징 필요
const SeedPage = () => {
    const [list, setList] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [key, setKey] = useState('id');
    const [word, setWord] = useState("");

    const callAPI = async () => {
        const res = await axios.get(`/seed/list?key=${key}&word=${word}&page=${page}&size=${size}`)
        setList(res.data.doc);
        setCount(res.data.total);
        console.log(res.data.doc)
    }
    const onSubmit = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        callAPI();
    }, [page]);

    return (
        <div>
            <Row>
                <Col>
                    <h5 className='my-3'>000관리자님 환영합니다</h5>
                    <h2 className='text-center'>초록 회원 씨앗지갑목록</h2>

                    <Row className='justify-content-center mt-3'>
                        <Col lg={3}>
                            <form onSubmit={onSubmit}>
                                <InputGroup>
                                    <Form.Control value={word} name="word" />
                                    <Button type="submit" size="sm">검색</Button>
                                </InputGroup>
                            </form>
                        </Col>
                    </Row>

                    <Row className='justify-content-center mt-5'>
                        <Col lg={8}>
                            <Card>
                                <Row>
                                    <Col lg={2}>
                                        <img src="http://via.placeholder.com/30x30" width="100%" style={{ padding: "5px" }} />
                                    </Col>
                                    <Col lg={5}>
                                        <div>아이디:{ }</div>
                                        <div>닉네임:{ }</div>
                                        <div>생년월일:{ }</div>
                                    </Col>
                                    <Col lg={5}>
                                        <div>잔액:{ }</div>
                                        <div><Button>거래내역</Button></div>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default SeedPage