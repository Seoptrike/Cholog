import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, InputGroup, Form } from 'react-bootstrap';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import { TbBrandSnapseed } from "react-icons/tb";
const AdminSeedPage = () => {
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
        setPage(1);
        callAPI();
    }

    useEffect(() => {
        callAPI();
    }, [page]);
    return (
        <div>
            <Row className='justify-content-center mt-3'>
                <Col lg={3}>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Control name="word" value={word} onChange={(e) => setWord(e.target.value)} />
                            <Button type="submit" size="sm">검색</Button>
                        </InputGroup>
                    </form>
                </Col>
            </Row>
            <Row className='justify-content-center mt-5'>
                <Col lg={8}>
                {list.map(seed=>
                    <Card>
                        <Row>
                            <Col lg={2}>
                                <img src={seed.user_img||"http://via.placeholder.com/30x30"} width="100%" style={{ padding: "5px" }} />
                            </Col>
                            <Col lg={5}>
                                <div>아이디:{seed.seed_uid}</div>
                                <div>닉네임:{seed.user_nickname }</div>
                                <div>시드계좌:{seed.seed_number}</div>
                            </Col>
                            <Col lg={5}>
                                <div>잔액:{seed.seed_point } <span style={{ fontSize: '15px', color:"brown" }}><TbBrandSnapseed /></span>  </div>
                                <div><Button>거래내역</Button></div>
                            </Col>
                        </Row>
                    </Card>
                )}
                </Col>
            </Row>
              {count > size &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={count}
                    pageRangeDisplayed={5}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={(e) => setPage(e)}
                />
            }
        </div>
    )
}

export default AdminSeedPage