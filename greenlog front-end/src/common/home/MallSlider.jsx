import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
const MallSlider = () => {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(4);
    const [count, setCount] = useState(0);
    const callAPI = async () => {
        const res = await axios.get(`/mall/list?page=${page}&size=${size}`)
        setList(res.data.documents);
        setCount(res.data.total);
    }
    useEffect(() => { callAPI(); }, [])
    return (
        <div className='mt-5'>
            <div className='text-center'>마감 임박한 피망</div>
            <Row>
                {list.map(card => (
                    <Col key={card.mall_key} xs={6}>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title><img src={card.mall_photo ? card.mall_photo : "http://via.placeholder.com/100x100"} /></Card.Title>
                                <Card.Text>
                                    <Link to={`/mall/read/${card.mall_key}`}>[{card.mall_key}]{card.mall_title}</Link>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default MallSlider