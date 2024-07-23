import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Row, Col, InputGroup, Button, Table, Form, Badge } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import { TbBrandSnapseed } from "react-icons/tb";
import Sidebar from '../admin/Sidebar'

const AdminTradeListPage = () => {
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [key, setKey] = useState('from');
    const [word, setWord] = useState("");
    const [list, setList] = useState([]);
    const [checked, setChecked]=useState(false);
    const callAPI = async () => {
        const res = await axios.get(`/trade/adminList?key=${key}&word=${word}&page=${page}&size=${size}`)
        console.log(res.data.doc)
        const data =res.data.doc.map(t=> t && {...t, checked : false});
        setList(data);
        setCount(res.data.total)
    }
    const onClickSearch = async (e) => {
        e.preventDefault();
        setPage(1);
        callAPI();
    };
    useEffect(() => { callAPI() }, [page])
    useEffect(() => {
        let cnt = 0;
        list.forEach(list => list.checked && cnt++);
        setChecked(cnt);
      }, [list])

      const onChangeAll = (e)=>{
        const data =list.map(t=> t && {...t, checked : e.target.checked});
        setList(data);
      }

      const onChangeSingle = (e, trade_key)=>{
        const data = list.map(t=> t.trade_key === trade_key ? {...t, checked: e.target.checked} : t);
        setList(data);
      }

      const onClickUpdate = () => {
        if (!window.confirm("선택하신 내역을 삭제하시겠습니까?")) return;
        let cnt = 0;
        list.forEach(async list => {
          if (list.checked) {
            await axios.post(`/trade/update/${list.trade_key}`);
            cnt++
    
            if (cnt === checked) {
              alert(`${cnt}개의 거래내역이 삭제되었습니다`);
              callAPI();
              setPage(1);
            }
          }
        })
      }

    return (
        <div>
            <Row>
            <Col lg={2}>
                    <Sidebar />
                </Col>
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
                                <td><input type="checkbox" onClick={onChangeAll} checked={list.length === checked}/></td>
                                <td>거래번호</td>
                                <td>거래날짜</td>
                                <td>보내는 사람</td>
                                <td>받는 사람</td>
                                <td>씨앗 <span style={{ fontSize: '15px', color:"brown" }}><TbBrandSnapseed /></span>  </td>
                                <td>내용</td>
                                <td><Button size="sm" onClick={onClickUpdate}>선택삭제</Button></td>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map(trade =>
                                <tr key={trade.trade_key}>
                                    <td><input type="checkbox" onChange={(e) => onChangeSingle(e, trade.trade_key)} checked={trade.checked}/></td>
                                    <td>{trade.trade_key}</td>
                                    <td>{trade.fmtdate}</td>
                                    <td>{trade.from_user_uid === "admin" ? <Badge bg='dark'>관리자</Badge> : `${trade.from_user_uid} (${trade.from_user_nickname})`}</td>
                                    <td>{trade.to_user_uid} ( {trade.to_user_nickname} )</td>
                                    <td>{trade.trade_amount} <span style={{ fontSize: '15px', color:"brown" }}><TbBrandSnapseed /></span>  </td>
                                    <td>{trade.trade_info}</td>
                                    <td>{trade.trade_status===1 && "삭제"}</td>
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