import axios from 'axios'
import React, { useState } from 'react'
import { Row, Col, InputGroup, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ModalAddress from '../../common/useful/ModalAddress'

const JoinPage = () => {
    const navi = useNavigate();
    const [form, setform] = useState({
        uid: '',
        uname: '',
        upass: '',
        checkPass: '',
        phone: '',
        gender: '',
        birth: '',
        address1: '',
        address2: '',
        email: ''
    })
    const { uid, uname, upass, phone, gender, birth, checkPass, email, address1, address2 } = form;
    const [isCheck, setIsCheck] = useState(false); // 중복체크 상태
    const onChangeForm = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    }

    //중복체크버튼
    const onCheckId = async (uid) => {
        console.log(uid);
        const res = await axios.get(`/user/read?uid=${uid}`)
        if (uid === "") {
            alert("아이디를 입력해주세요")
        } else {
            if (res.data.user_uid === uid) {
                alert("이미 가입되어있는 아이디입니다.")
                setform({
                    uid: '',
                    uname: '',
                    upass: '',
                    checkPass: '',
                    phone: '',
                    gender: '',
                    birth: '',
                    address1: '',
                    address2: '',
                    email: ''
                });
                setIsCheck(false); // 중복체크 실패
            } else {
                alert("사용가능한 아이디입니다");
                setIsCheck(true); // 중복체크 성공
            }
        }
    }

    /*회원가입버튼 */
    const onClickInsert = async () => {
        if (!isCheck) {
            alert("아이디 중복체크를 해주세요");
            return;
        }

        if (upass !== checkPass) {
            alert("비밀번호가 일치하지 않습니다");
            return;
        }

        await axios.post(`/user/insert`, form);
        alert("회원 가입 완료!");
        navi("/user/login");
    };


    return (
        <div className='text-center'>
            <h1>회원가입페이지</h1>
            <Row className='justify-content-center'>
                <Col xs={6}>
                    <InputGroup className='joinbox'>
                        <InputGroup.Text className='justify-content-center'>아이디</InputGroup.Text>
                        <Form.Control name="uid" value={uid} onChange={onChangeForm} />
                        <Button onClick={() => onCheckId(uid)}>중복체크</Button>
                    </InputGroup >
                    <InputGroup className='joinbox'>
                        <InputGroup.Text className='justify-content-center'>비밀번호</InputGroup.Text>
                        <Form.Control name="upass" value={upass} onChange={onChangeForm} />
                    </InputGroup >
                    <InputGroup className='joinbox'>
                        <InputGroup.Text className='justify-content-center'>비밀번호확인</InputGroup.Text>
                        <Form.Control name="checkPass" value={checkPass} onChange={onChangeForm} />
                    </InputGroup >
                    <InputGroup className='joinbox'>
                        <InputGroup.Text className='justify-content-center'>이메일</InputGroup.Text>
                        <Form.Control name="uname" value={uname} onChange={onChangeForm} />
                    </InputGroup >
                    <InputGroup className='joinbox'>
                        <InputGroup.Text className='justify-content-center'>이름</InputGroup.Text>
                        <Form.Control name="uname" value={uname} onChange={onChangeForm} />
                    </InputGroup >
                    <InputGroup className='joinbox'>
                        <InputGroup.Text className='justify-content-center'>전화번호</InputGroup.Text>
                        <Form.Control name="phone" value={phone} onChange={onChangeForm} />
                    </InputGroup >
                    <InputGroup className='joinbox'>
                        <InputGroup.Text className='justify-content-center'>성별</InputGroup.Text>
                        <Form.Check
                            type="radio"
                            name="gender"
                            id="1"
                            label="남자"
                            value={1}
                            onChange={onChangeForm}
                        />
                        <Form.Check
                            type="radio"
                            name="gender"
                            id="2"
                            label="여자"
                            value={2}
                            onChange={onChangeForm}
                        />
                    </InputGroup >
                    <InputGroup className='joinbox'>
                        <InputGroup.Text className='justify-content-center'>생년월일</InputGroup.Text>
                        <Form.Control type="date" name="birth" value={birth} onChange={onChangeForm} />
                    </InputGroup >
                    <InputGroup className='joinbox'>
                        <InputGroup.Text >주소</InputGroup.Text>
                        <Form.Control name="address1" value={address1} onChange={onChangeForm} />
                        <ModalAddress form={form} setform={setform} />
                    </InputGroup>
                    <Form.Control className="joinbox" name="address2" value={address2} placeholder='상세주소' onChange={onChangeForm} />
                    <div>
                        <Button onClick={() => onClickInsert()}>회원가입하기</Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default JoinPage