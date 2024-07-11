import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Badge, InputGroup, Form, Card } from 'react-bootstrap'
import Sidebar from './Sidebar'
import axios from 'axios';
import { MdOutlineSettings } from "react-icons/md";


//검색기능, 페이징기능 , 회원정보 수정기능, 권한설정 
//이미지 클릭 시 관리자용 회원정보읽기페이지로 이동
//설정아이콘 클릭 시 관리자용 회원정보수정페이지로 이동 

const UserListPage = () => {
    const [list, setList] = useState([]);
    const styleRed = "danger"
    const styleBlue = "primary"
    const callAPI = async () => {
        const res = await axios.get("/user/admin/list")
        console.log(res.data)
        setList(res.data)
    }
    useEffect(() => {
        callAPI()
    }, []);


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
                {list.map((user, index) => (
                    <Row className='justify-content-center'>
                        <Col xs={12} sm={11} md={10} lg={9} key={index} className='mb-3'>
                            <Card className='text-center' border={user.user_gender === "남자" ? styleBlue : styleRed}>
                                <Card.Body>
                                    <Row>
                                        <Col lg={5}>
                                            <a href={`/user/admin/read/${user.user_uid}`}><Card.Img variant="top" src="/images/woman.jpg" width="100%" /></a>
                                            <Card.Title className='mt-2'>{user.user_uname} 님의 정보</Card.Title>
                                        </Col>
                                        <Col lg={6}>
                                            <Card.Text>
                                                <div className='text-start'>
                                                    <br />
                                                    <p>아이디: {user.user_uid}</p>
                                                    <p>이름: {user.user_uname}</p>
                                                    <p>닉네임: {user.user_nickname}</p>
                                                    <p>생년월일: {user.user_birth}</p>
                                                    <p>성별: {user.user_gender}</p>
                                                    <p>전화번호: {user.user_phone}</p>
                                                    <p>이메일: {user.user_email}</p>
                                                    <p>주소: {user.user_address1 ? `${user.user_address1} (${user.user_address2})` : "-"}</p>
                                                    <p>권한: {user.user_auth}</p>
                                                </div>
                                            </Card.Text>
                                        </Col>
                                        <Col lg={1}>
                                            <a href={`/user/admin/update/${user.user_uid}`}>
                                                <MdOutlineSettings style={{ fontSize: "20px" }} />
                                            </a>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                ))}
            </Col>
        </Row>
    )
}

export default UserListPage