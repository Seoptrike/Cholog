import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row, Card, Col, Button, InputGroup, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom';


const NewPass = () => {
    const {user_uid}=useParams();
    const [form, setform] = useState({
        user_npass: '',
        user_upass: '',
        user_uid:user_uid
    })
    const { user_npass, user_upass} = form;
    const onChangeForm = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const onUpdatePass = async (form) => {
        //새비밀번호하고 비밀번호확인하고 같은지 체크
        if (form.user_upass !== form.user_npass) {
            alert("새비밀번호가 일치하지 않습니다!")
            return;
        } else {
            if (!window.confirm("비밀번호를 변경하시겠습니까?")) return;
            await axios.post("/user/updatePass", form)
            alert("비밀번호 변경완료!")
            //window.location.href="/user/login"
        }

    }
    return (
        <div>
            <div className='d-flex justify-content-center'>
                <Card style={{ width: "50rem" }} className='text-center mt-5 o-hidden border-0 shadow-lg'>
                    <Row className='justify-content-center mb-5' >
                        <Col xs={12} md={10} lg={6}>
                            <InputGroup className='h-25'>
                                <InputGroup.Text className=' justify-content-center '>새비밀번호</InputGroup.Text>
                                <Form.Control name="user_upass" value={user_upass} onChange={onChangeForm} />
                            </InputGroup >
                            <InputGroup>
                                <InputGroup.Text className='justify-content-center ' >비밀번호확인</InputGroup.Text>
                                <Form.Control name="user_npass" value={user_npass} onChange={onChangeForm} />
                            </InputGroup>
                            <Button className='w-100 mt-2 btn-dark' onClick={() => onUpdatePass(form)}>비밀번호변경</Button>
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>
    )
}

export default NewPass