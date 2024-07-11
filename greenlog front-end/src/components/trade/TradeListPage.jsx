import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Button, Table } from 'react-bootstrap'
import { TbBrandSnapseed } from "react-icons/tb";

const TradeListPage = ({ seed_number }) => {
    const [list, setList] = useState([]);
    const callAPI = async () => {
        if (seed_number) {
            const res = await axios.post('/trade/userList', { seed_number })
            setList(res.data)
            console.log(res.data);
        }
    }
    useEffect(() => { callAPI() }, [seed_number])
    return (
        <Row>
            <Col>
                <Table>
                    <thead>
                        <tr>
                            <td>No</td>
                            <td>타입</td>
                            <td>Date</td>
                            <td>from</td>
                            <td>to</td>
                            <td>amount</td>
                            <td>내용</td>
                        </tr>
                    </thead>
                    {list.map(data =>
                        <tbody key={data.trade_key}>
                            <tr className='mt-2'>
                                <td >{data.trade_key}</td>
                                <td>{data.trade_state === 1 ? "입금" : "출금"}</td>
                                <td>{data.fmtdate}</td>
                                <td>{data.trade_from}</td>
                                <td>{data.trade_to}</td>
                                <td>{data.trade_amount} <span style={{ fontSize: '15px', color:"brown" }}><TbBrandSnapseed /></span> </td>
                                <td>{data.trade_info}</td>
                            </tr>
                        </tbody>
                    )}
                </Table>
            </Col>
        </Row>
    )
}

export default TradeListPage