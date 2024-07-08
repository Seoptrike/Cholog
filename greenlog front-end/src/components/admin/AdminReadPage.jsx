import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Badge, InputGroup, Form, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { MdOutlineSettings } from "react-icons/md";
import axios from 'axios';


//설정 아이콘 누를 시 회원수정페이지로 이동 

const AdminReadPage = () => {
    const {user_uid} =useParams();
    const [form, setForm]=useState("");
    const styleRed = "danger"
    const styleBlue = "primary"

    const callAPI=async()=>{
        const res = await axios.get(`/user/read/${user_uid}`);
        setForm(res.data);
    }

    

    useEffect(()=>{
        callAPI();
    },[]);



  return (
    <div>
        <h1 className='text-center my-5'>{form.user_uid}({form.user_uname})님 회원정보</h1>
        <Row className='justify-content-center'>
                        <Col xs={12} sm={11} md={10} lg={9}  className='mb-3'>
                            <Card className='text-center' border={form.user_gender === 0 ? styleBlue : styleRed}>
                                <Card.Body>
                                    <Row>
                                        <Col lg={5}>
                                            <Card.Img variant="top" src="/images/woman.jpg" width="100%" />
                                            <Card.Title className='mt-2'>{form.user_uname} 님의 정보</Card.Title>
                                        </Col>
                                        <Col lg={6}>
                                            <Card.Text>
                                                <div className='text-start'>
                                                    <br />
                                                    <p>아이디: {form.user_uid}</p>
                                                    <p>이름: {form.user_uname}</p>
                                                    <p>닉네임: {form.user_nickname}</p>
                                                    <p>생년월일: {form.user_birth}</p>
                                                    <p>성별: {form.user_gender === 0 ? "남자" : "여자"}</p>
                                                    <p>전화번호: {form.user_phone}</p>
                                                    <p>이메일: {form.user_email}</p>
                                                    <p>주소: {form.user_address1} ({form.user_address2})</p>
                                                    <p>권한: {form.user_auth}</p>
                                                </div>
                                            </Card.Text>
                                        </Col>
                                        <Col lg={1}>
                                            <a href={`/user/admin/update/${form.user_uid}`}>
                                                <MdOutlineSettings style={{ fontSize: "20px" }} />
                                            </a>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
    </div>
  )
}

export default AdminReadPage