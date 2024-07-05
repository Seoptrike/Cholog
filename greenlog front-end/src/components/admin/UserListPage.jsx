import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Badge, InputGroup, Form, Card } from 'react-bootstrap'
import Sidebar from './Sidebar'
import axios from 'axios';

//유저자료가 필요

const UserListPage = () => {
    const [list, setList] = useState([]);
    const [gender, setGender] = useState("")
    const callAPI = async () => {
        const res = await axios.get("/user/admin/list")
        console.log(res.data)
        setList(res.data)
    }
    useEffect(() => {
        callAPI()
    }, [])
    return (
        <Row>
            <Col lg={2}>
                <Sidebar />
            </Col>
            <Col>
                <h5 className='mb-5'> 000 관리자님 환영합니다.</h5>

                <Row className='justify-content-center mb-5'>
                    <Col lg={5}>
                        <form>
                            <InputGroup>
                                <Form.Control placeholder='검색어' />
                                <Button type='submit'>검색</Button>
                            </InputGroup>
                        </form>
                    </Col>
                </Row>
                <Row className='justify-content-center'>
                    {list.map((user, index) => (
                        <Col xs={12} sm={6} md={4} lg={3} key={index} className='mb-3'>
                            <Card className='text-center'>
                                <Card.Img variant="top" src="/images/woman.jpg" width="100%" />
                                <Card.Body>
                                    <Card.Title>{user.user_uname} 님의 정보</Card.Title>
                                    <Card.Text>
                                        <div className='text-start'>
                                            <br />
                                            <p>아이디: {user.user_uid}</p>
                                            <p>이름: {user.user_uname}</p>
                                            <p>닉네임: {user.user_nickname}</p>
                                            <p>생년월일: {user.user_birth}</p>
                                            <p>성별: {user.user_gender === 1 ? "남자" : "여자"}</p>
                                            <p>전화번호: {user.user_phone}</p>
                                            <p>이메일: {user.user_email}</p>
                                            <p>주소: {user.user_address1} ({user.user_address2})</p>
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
    )
}

export default UserListPage