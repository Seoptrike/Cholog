import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row, Card, Col, Button, InputGroup, Form } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';

const SearchPassPage = () => {
    const location = useLocation();
    const search = new URLSearchParams(location.search)
    const findid = search.get("findid")
    const [findPass, setFindPass] = useState("");
    console.log(findid);
    const [form, setform] = useState({
        uid: '',
        uname: '',
        phone: '',
        email:''
    })
    const { uname, phone, uid,email } = form;

    const onChangeForm = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    //온클릭이벤트
    const onFindPass = async (uname, phone, uid,email) => {
        const res = await axios.post('/member/find/pass', { uid, uname, phone,email })
        if (res.data === "") {
            alert("회원정보가 일치하지 않습니다")
            return;
        } else {
            setFindPass(res.data.user_upass);
        }
    }
    useEffect(() => { console.log(findPass) }, [findPass])
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
                                    <Form.Control name="uid" value={findid} readOnly />
                                </InputGroup>
                                :
                                <InputGroup>
                                    <InputGroup.Text className='justify-content-center ' >아이디</InputGroup.Text>
                                    <Form.Control name="uid" value={uid} onChange={onChangeForm} />
                                </InputGroup>
                            }

                            <InputGroup className='h-25'>
                                <InputGroup.Text className=' justify-content-center '>이름</InputGroup.Text>
                                <Form.Control name="uuname" value={uname} onChange={onChangeForm} />
                            </InputGroup >
                            <InputGroup>
                                <InputGroup.Text className='justify-content-center ' >전화번호</InputGroup.Text>
                                <Form.Control name="phone" value={phone} onChange={onChangeForm} />
                            </InputGroup>
                            <InputGroup>
                                <InputGroup.Text className='justify-content-center ' >이메일</InputGroup.Text>
                                <Form.Control name="email" value={email} onChange={onChangeForm} />
                            </InputGroup>
                            <Button className='w-100 mt-2 btn-dark' onClick={() => onFindPass(uid, uname, phone,email)}>비밀번호찾기</Button>
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>
    )
}

export default SearchPassPage