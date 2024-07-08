import React, { useState } from 'react'
import { Card, Row, Col, InputGroup, Form, Button } from 'react-bootstrap'
import ModalAddress from '../../common/useful/ModalAddress'

//주소 모달 사용
//이미지를 누르면 사진파일 교체
//닉네임, 비밀번호 중복확인 모달 필요
//value값 정해지면 onChangeForm 필요
const UserUpdatePage = () => {
    const [form, setForm]=useState("");

    return (
        <div>
            <Row className='justify-content-center my-5'>
                <Col lg={10}>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col lg={4}>
                                    <img src="http://via.placeholder.com/100x150" width="100%" />
                                </Col>
                                <Col lg={8}>
                                    <Card className='mb-2'>
                                        <Card.Body>
                                            <InputGroup className='mb-2'>
                                                <InputGroup.Text>회원번호</InputGroup.Text>
                                                <Form.Control readOnly />
                                            </InputGroup>
                                            <InputGroup className='mb-2'>
                                                <InputGroup.Text>성함</InputGroup.Text>
                                                <Form.Control />
                                            </InputGroup>
                                            <InputGroup className='mb-2'>
                                                <InputGroup.Text>전화번호</InputGroup.Text>
                                                <Form.Control />
                                            </InputGroup>
                                            <InputGroup className='mb-2'>
                                                <InputGroup.Text>주소</InputGroup.Text>
                                                <Form.Control />
                                            </InputGroup>
                                            <InputGroup className='mb-2'>
                                                <Form.Control />
                                                <ModalAddress form={form} setform={setForm}/>
                                            </InputGroup>
                                            <InputGroup className='mb-2'>
                                                <InputGroup.Text>생년월일/성별</InputGroup.Text>
                                                <Form.Control placeholder='생년월일' />
                                                <Form.Control placeholder='성별' />
                                            </InputGroup>
                                        </Card.Body>
                                    </Card>
                                    <Card className='mb-2'>
                                        <Card.Body>
                                            <InputGroup className='mb-2'>
                                                <InputGroup.Text>아이디</InputGroup.Text>
                                                <Form.Control readOnly />
                                            </InputGroup>
                                            <InputGroup className='mb-2'>
                                                <InputGroup.Text>비밀번호 변경</InputGroup.Text>
                                                <Button className='px-5'>비밀번호 변경</Button>
                                            </InputGroup>
                                            <InputGroup className='mb-2'>
                                                <InputGroup.Text>닉네임</InputGroup.Text>
                                                <Form.Control />
                                                <Button>중복확인</Button>
                                            </InputGroup>
                                            <InputGroup className='mb-2'>
                                                <InputGroup.Text>한줄소개</InputGroup.Text>
                                                <Form.Control />
                                            </InputGroup>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <div className='text-center'>
                <Button className='me-4 px-5'>수정하기</Button>
                <Button className='me-4 px-5'>취소하기</Button>
                <Button className='px-5'>마이페이지로 돌아가기</Button>
            </div>
        </div>
    )
}

export default UserUpdatePage