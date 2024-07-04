import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row, Card, Col, Button, InputGroup, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const SearchIdPage = () => {
    const [findid, setUid] = useState("");
    const [form, setform] = useState({
        uname: '김인섭',
        phone: '01041110342',
        email: 'dlstjq977@gmail.com'
    })
    const { uname, phone, email } = form;

    const onChangeForm = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const onFindId = async (uname, phone, email) => {
        const res = await axios.post('/member/find/id', { uname, phone, email });
        console.log(res.data);
        if (res.data === "") {
            alert("등록된 아이디가 없습니다")
            if (window.confirm("회원가입하시겠습니까?")) {
                window.location.href = "/user/join"
            }
        } else {
            setUid(res.data.user_uid);
        }
    }
    useEffect(() => { console.log(findid) }, [findid])
    return (
        <div>
            {findid ?
                <div>
                    <h1> 아이디는 {findid} 입니다</h1>
                    <Link to="/user/login">로그인</Link>
                    <Link to={`/user/searchPass?findid=${findid}`}>비밀번호 찾기</Link>
                </div>
                :
                <div className='d-flex justify-content-center'>
                    <Card style={{ width: "50rem" }} className='text-center mt-5 o-hidden border-0 shadow-lg'>
                        <Row className='mt-5'>
                            <div>
                                <span>
                                    <img src='/images/green.png' style={{ width: "5rem" }} />
                                </span>
                                <span><h5>등록된 정보로 아이디 찾기</h5></span>
                            </div>
                        </Row>
                        <Row className='justify-content-center mb-5' >
                            <Col xs={12} md={10} lg={6}>
                                <InputGroup className='h-25'>
                                    <InputGroup.Text className=' justify-content-center '>이름</InputGroup.Text>
                                    <Form.Control name="uname" value={uname} onChange={onChangeForm} />
                                </InputGroup >
                                <InputGroup>
                                    <InputGroup.Text className='justify-content-center ' >전화번호</InputGroup.Text>
                                    <Form.Control name="phone" value={phone} onChange={onChangeForm} />
                                </InputGroup>
                                <InputGroup>
                                    <InputGroup.Text className='justify-content-center ' >이메일</InputGroup.Text>
                                    <Form.Control name="email" value={email} onChange={onChangeForm} />
                                </InputGroup>
                                <Button className='w-100 mt-2 btn-dark' onClick={() => onFindId(uname, phone, email)} >아이디 찾기</Button>
                            </Col>
                        </Row>
                    </Card>
                </div>
            }
        </div>
    )
}

export default SearchIdPage