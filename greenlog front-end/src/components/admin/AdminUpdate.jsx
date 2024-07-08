import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Badge, InputGroup, Form, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { GiCancel } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";
import axios from 'axios';
import ModalAddress from '../../common/useful/ModalAddress';


//수정아이콘 누를 시 수정하기
//엑스아이콘 누를 시 리셋
//데이터 삭제 없이 탈퇴회원 등으로 관리  

const AdminUpdate = () => {
  const { user_uid } = useParams();
  const [form, setForm] = useState("");
  const styleRed = "danger"
  const styleBlue = "primary"

  const callAPI = async () => {
    const res = await axios.get(`/user/read/${user_uid}`);
    setForm(res.data);
  }

  const onClickUpdate = () => {
    alert("수정하시겠습니까?")
  }

  const onClickReset = () => {
    alert("취소하시겠습니까?")
  }

  const onChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    callAPI();
  }, []);

  return (
    <div><h1 className='text-center my-5'>{form.user_uid}({form.user_uname})님 회원정보</h1>
      <Row className='justify-content-center'>
        <Col xs={12} sm={11} md={10} lg={9} className='mb-3'>
          <Card className='text-center' border={form.user_gender === 1 ? styleBlue : styleRed}>
            <Card.Body>
              <Row>
                <Col lg={4}>
                  <Card.Img variant="top" src="/images/woman.jpg" width="100%" />
                  <InputGroup>
                    <input type="file" />
                  </InputGroup>
                </Col>
                <Col lg={6}>
                  <Card.Text>
                    <div className='text-start'>
                      <br />
                      <InputGroup className='mb-2'>
                        <InputGroup.Text>회원번호</InputGroup.Text>
                        <Form.Control value={form.user_key} readOnly />
                      </InputGroup>
                      <InputGroup className='mb-2'>
                        <InputGroup.Text>아이디</InputGroup.Text>
                        <Form.Control value={form.user_uid} name="user_uid" onChange={onChangeForm} />
                      </InputGroup>
                      <InputGroup className='mb-2'>
                        <InputGroup.Text>비밀번호</InputGroup.Text>
                        <Form.Control value={form.user_upass} name="user_upass" onChange={onChangeForm} />
                        <Button>비밀번호수정</Button>
                      </InputGroup>
                      <InputGroup className='mb-2'>
                        <InputGroup.Text>이름</InputGroup.Text>
                        <Form.Control value={form.user_uname} name="user_uname" onChange={onChangeForm} />
                      </InputGroup>
                      <InputGroup className='mb-2'>
                        <InputGroup.Text>닉네임</InputGroup.Text>
                        <Form.Control value={form.user_nickname} name="user_nickname" onChange={onChangeForm} />
                        <Button>중복확인</Button>
                      </InputGroup>
                      <InputGroup className='mb-2'>
                        <InputGroup.Text>생년월일</InputGroup.Text>
                        <Form.Control value={form.user_birth} name="user_birth" onChange={onChangeForm} />
                      </InputGroup>
                      <InputGroup className='mb-2'>
                        <InputGroup.Text>성별</InputGroup.Text>
                        <Form.Control value={form.user_gender} name="user_gender" onChange={onChangeForm} />
                      </InputGroup>
                      <InputGroup className='mb-2'>
                        <InputGroup.Text>전화번호</InputGroup.Text>
                        <Form.Control value={form.user_phone} name="user_phone" onChange={onChangeForm} />
                      </InputGroup>
                      <InputGroup className='mb-2'>
                        <InputGroup.Text>이메일</InputGroup.Text>
                        <Form.Control value={form.user_email} name="user_email" onChange={onChangeForm} />
                      </InputGroup>
                      <InputGroup className='mb-2'>
                        <InputGroup.Text>주소</InputGroup.Text>
                        <Form.Control value={form.user_address1} name="user_address1" onChange={onChangeForm} />
                      </InputGroup>
                      <InputGroup className='mb-2'>
                        <Form.Control value={form.user_address2} name="user_address2" onChange={onChangeForm} />
                        <ModalAddress />
                      </InputGroup>
                      <InputGroup className='mb-2'>
                        <InputGroup.Text>권한</InputGroup.Text>
                        <Form.Select>
                          <option>일반회원</option>
                          <option>블랙리스트</option>
                          <option>탈퇴회원</option>
                          <option>관리자</option>
                        </Form.Select>
                      </InputGroup>
                    </div>
                  </Card.Text>
                </Col>
                <Col lg={2}>
                  <FaEdit style={{ fontSize: "40px", cursor: "pointer" }} className='me-4' onClick={onClickUpdate} />
                  <GiCancel style={{ fontSize: "40px", cursor: "pointer" }} onClick={onClickReset} />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row></div>
  )
}

export default AdminUpdate