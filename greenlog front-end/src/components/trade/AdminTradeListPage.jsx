import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Row, Col, InputGroup, Button, Table, Form, Badge } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import { TbBrandSnapseed } from "react-icons/tb";

const AdminTradeListPage = () => {
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [key, setKey] = useState('from');
    const [word, setWord] = useState("");
    const [list, setList] = useState([]);
    const callAPI = async () => {
        const res = await axios.get(`/trade/adminList?key=${key}&word=${word}&page=${page}&size=${size}`)
        console.log(res.data.doc)
        setList(res.data.doc)
        setCount(res.data.total)
    }
    const onClickSearch = async (e) => {
        e.preventDefault();
        setPage(1);
        callAPI();
    };
    useEffect(() => { callAPI() }, [page])
    return (
        <div>
            <Row>
                <Col>
                    <h1>전체 거래내역</h1>
                    <Row className="mb-3">
                        <Col md={10}>
                            <InputGroup >
                                <Form.Select className='me-2' value={key} onChange={(e) => setKey(e.target.value)}>
                                    <option value="from">보내는 사람</option>
                                    <option value="to">받는 사람</option>

                                </Form.Select>
                                <Form.Control placeholder='검색어' value={word} onChange={(e) => setWord(e.target.value)} />
                                <Button onClick={(e) => onClickSearch(e)} >검색</Button>
                            </InputGroup>
                        </Col>
                        <Col>
                            검색수: {count}건
                        </Col>
                    </Row>
                    <Table>
                        <thead>
                            <tr>
                                <td>거래번호</td>
                                <td>거래날짜</td>
                                <td>보내는 사람</td>
                                <td>받는 사람</td>
                                <td>씨앗 <span style={{ fontSize: '15px', color:"brown" }}><TbBrandSnapseed /></span>  </td>
                                <td>내용</td>
                                <td>삭제</td>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map(trade =>
                                <tr key={trade.trade_key}>
                                    <td>{trade.trade_key}</td>
                                    <td>{trade.trade_date}</td>
                                    <td>{trade.from_user_uid === "admin" ? <Badge bg='dark'>관리자</Badge> : `${trade.from_user_uid} (${trade.from_user_nickname})`}</td>
                                    <td>{trade.to_user_uid} ( {trade.to_user_nickname} )</td>
                                    <td>{trade.trade_amount} <span style={{ fontSize: '15px', color:"brown" }}><TbBrandSnapseed /></span>  </td>
                                    <td>{trade.trade_info}</td>
                                    <td><Button>삭제</Button></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
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

export default AdminTradeListPage