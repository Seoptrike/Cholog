import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Button, Table } from 'react-bootstrap'
import TradeListPage from '../trade/TradeListPage'
import axios from 'axios'
import { TbBrandSnapseed } from "react-icons/tb";

const SeedWallet = () => {
    const uid = sessionStorage.getItem("uid");
    const [form, setForm] = useState({
        seed_point: '',
        seed_uid: '',
        user_img: '',
        user_nickname: '',
        user_uid: '',
        user_uname: '',
        seed_number: ''
    })
    const { seed_number, seed_point, seed_uid, user_img, user_nickname, user_uid, user_uname } = form;
    const callAPI = async () => {
        const res = await axios.get(`/seed/read/${uid}`)
        console.log(res.data);
        setForm(res.data);
    }
    useEffect(() => { callAPI() }, [])
    
      
    return (
        <div>
            <Row className='justify-content-center mt-5'>
                <Col xs={10}>
                    <Card>
                        <Row>
                            <Col>
                                <div>
                                    <Row>
                                        <Col>
                                            <img src={user_img || "http://via.placeholder.com/30x30"} width="70" height="70" className='rounded-circle' alt="profile" />
                                        </Col>
                                        <Col>
                                            ID:{user_uid}
                                            <br />
                                            {user_uname} ({user_nickname})
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col>
                                <div>
                                    시드넘버 : {seed_number}
                                    <br />
                                    현재잔액 : {seed_point}  <span style={{ fontSize: '15px', color:"brown" }}><TbBrandSnapseed /></span> 
                                </div>
                            </Col>
                        </Row>
                    </Card>
                    <TradeListPage seed_number={seed_number} />
                </Col>
            </Row>
        </div>
    )
}

export default SeedWallet