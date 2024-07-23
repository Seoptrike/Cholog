import { Avatar, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';

const PopularPage = () => {
    const [form, setForm] = useState([]);

    const callAPI=async()=>{
        const res=await axios.get("/mall/reviewCount");
        setForm(res.data);
        console.log(res.data);
    }

    useEffect(()=>{
        callAPI();
    },[])

    return (
        <div>
            <h1>인기 피망</h1>
            <Row className='justify-content-center text-center' style={{ height: "15rem" }}>
                <Col xs={4} md={4} lg={3}>
                    <Avatar size={100} icon={<UserOutlined />} />
                </Col>
                <Col className='me-5 bg-primary'>
                    <Row className='m-3'>
                        <Col xs={4} md={4} lg={4}>
                            <img src="http://via.placeholder.com/100x100" style={{ height: "10rem" }} />
                        </Col>
                        <Col>
                            <div className='bg-secondary' style={{ height: "10rem" }}>
                                <div>title</div>
                                <div>title</div>
                                <div>title</div>
                            </div>
                        </Col>
                    </Row>

                </Col>
            </Row>

        </div>
    )
}

export default PopularPage