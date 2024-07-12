import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Badge, InputGroup, Form, Card, Table } from 'react-bootstrap'
import { TbBrandSnapseed } from "react-icons/tb";
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import Pagination from 'react-js-pagination';

const AuctionList = () => {
  //상품명과 이미지 넣기
  //처리상태 영구삭제요청 넣기(관리자에서 직접 해줄수있게끔)
  const uid= sessionStorage.getItem("uid")
  const [count, setCount] = useState(0);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const callAPI= async()=>{
    const res = await axios.get(`/auction/list/${uid}?page=${page}&size=${size}`)
    setList(res.data.documents)
    setCount(res.data.total)
    console.log(res)
  }
  useEffect(()=>{callAPI()},[page])
  return (
    <Row>
      <Col>
        <h1 className='text-center my-5'>개인경매목록</h1>
        <Row className='justify-content-center mt-3'>
          <Col lg={5}>
            <form>
              <InputGroup className="mb-5">
              <Col lg={3}>
              <Form.Select>
                <option></option>
              </Form.Select>
              </Col>
                <Form.Control />
                <Button type="submit" size="sm">검색</Button>
              </InputGroup>
            </form>
          </Col>
          <Table>
            <thead>
              {list.map(a=>
              <tr key={a.auction_key}>
                <td><input type="checkbox"/></td>
                <td>{a.auction_key}</td>
                <td colSpan={2}>{a.mall_title}</td>
                <td>{a.auction_seller} <SyncAltIcon/> {a.auction_buyer} </td>
                <td>{a.auction_amount} <span style={{ fontSize: '15px', color:"brown" }}><TbBrandSnapseed /></span>  </td>
                <td>{a.fmtdate}</td>
              </tr>
              )}
            </thead>
          </Table>
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

      </Col>
    </Row>
    
  )
}

export default AuctionList