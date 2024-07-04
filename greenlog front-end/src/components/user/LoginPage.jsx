import React, { useState } from 'react'
import { Row, Col, InputGroup, Form, Button, Card } from 'react-bootstrap'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
    const navi = useNavigate();
    const [form, setform] = useState({
        uid: 'seop',
        password: 'pass'
    })

    const { uid, password } = form;

    const onChangeForm = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('/member/login', { uid, password })
        console.log(res.data.result);
        if (res.data.result === 0) {
            alert("아이디가 없습니다")
        } else if (res.data.result === 1) {
            alert("비밀번호가 일치하지 않습니다")
        } else if (res.data.result === 2) {
            sessionStorage.setItem("uid", uid);
            alert("로그인 성공")
            if (sessionStorage.getItem('target')) {
                window.location.href = sessionStorage.getItem('target')
            } else {
                window.location.href = "/"
            }
        }

    }
    return (
        <div className='d-flex justify-content-center'>
            <Card style={{ width: "50rem" }} className='text-center mt-5 o-hidden border-0 shadow-lg'>
                <Row className='mt-5'>
                    <div>
                        <img src='/images/green.png' style={{ width: "15rem" }} />
                    </div>
                </Row>
                <Row className='justify-content-center mb-5' >
                    <Col xs={12} md={10} lg={12} className='d-flex justify-content-center align-items-center'>
                        <div className='loginbox px-0'>
                            <form onSubmit={onSubmit}>
                                <InputGroup className='h-25'>
                                    <InputGroup.Text className=' justify-content-center bg-success text-white w-25'><b>ID</b></InputGroup.Text>
                                    <Form.Control name="uid" value={uid} onChange={onChangeForm} />
                                </InputGroup >
                                <InputGroup>
                                    <InputGroup.Text className='justify-content-center bg-success text-white w-25'><b>PW</b></InputGroup.Text>
                                    <Form.Control name="password" value={password} onChange={onChangeForm} />
                                </InputGroup>
                                <Button className='w-100 mt-2 btn-dark' type='submit' ><b>LOGIN</b></Button>
                                <div className='text-center mt-2'>
                                    <img src='/images/fakelogin.png'/>
                                </div>
                                <div className='text-center'>
                                    <span>
                                        <a href='/user/join'>회원가입</a>
                                    </span>
                                    <span className='mx-3'>
                                        <a href='/user/searchId'>아이디 찾기</a>
                                    </span>
                                    <span>
                                        <a href='/user/searchPass'>비밀번호 찾기</a>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default LoginPage