import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row, Card, Col, Button, InputGroup, Form } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';

const SearchPassPage = () => {
    const location = useLocation();
    const search = new URLSearchParams(location.search)
    const findid = search.get("findid")
    //console.log(findid);
    const [form, setform] = useState({
        user_uid: findid,
        user_uname: '김인섭',
        user_phone: '01041110342',
        user_email: 'dlstjq977@gmail.com'
    })
    const { user_uname, user_phone, user_uid, user_email } = form;

    const onChangeForm = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    //온클릭이벤트
    const onFindPass = async (form) => {
        console.log(form)
        const res = await axios.post('/user/findpass', form)
        if (res.data === "") {
            alert("회원정보가 일치하지 않습니다")
            return;
        } else {
            window.location.href=`/user/updatePass/${form.user_uid}`
        }
    }
    return (
        <div>
            <div className='d-flex justify-content-center'>
                <Card style={{ width: "50rem" }} className='text-center mt-5 o-hidden border-0 shadow-lg'>
                    <Row className='mt-5'>
                        <div>
                            <span>
                                <img src='/images/green.png' style={{ width: "5rem" }} />
                            </span>
                            <span><h5>등록된 정보로 비밀번호 찾기</h5></span>
                        </div>
                    </Row>
                    <Row className='justify-content-center mb-5' >
                        <Col xs={12} md={10} lg={6}>
                            {findid ?
                                <InputGroup>
                                    <InputGroup.Text className='justify-content-center ' >아이디</InputGroup.Text>
                                    <Form.Control name="user_uid" value={findid} readOnly />
                                </InputGroup>
                                :
                                <InputGroup>
                                    <InputGroup.Text className='justify-content-center ' >아이디</InputGroup.Text>
                                    <Form.Control name="user_uid" value={user_uid} onChange={onChangeForm} />
                                </InputGroup>
                            }

                            <InputGroup className='h-25'>
                                <InputGroup.Text className=' justify-content-center '>이름</InputGroup.Text>
                                <Form.Control name="user_uname" value={user_uname} onChange={onChangeForm} />
                            </InputGroup >
                            <InputGroup>
                                <InputGroup.Text className='justify-content-center ' >전화번호</InputGroup.Text>
                                <Form.Control name="user_phone" value={user_phone} onChange={onChangeForm} />
                            </InputGroup>
                            <InputGroup>
                                <InputGroup.Text className='justify-content-center ' >이메일</InputGroup.Text>
                                <Form.Control name="user_email" value={user_email} onChange={onChangeForm} />
                            </InputGroup>
                            <Button className='w-100 mt-2 btn-dark' onClick={() => onFindPass(form)}>비밀번호찾기</Button>
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>
    )
}

export default SearchPassPage