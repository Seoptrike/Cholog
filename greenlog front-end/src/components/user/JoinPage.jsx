import axios from 'axios'
import React, { useState } from 'react'
import { Row, Col, InputGroup, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ModalAddress from '../../common/useful/ModalAddress'

const JoinPage = () => {
    const navi = useNavigate();
    const [form, setform] = useState({
        user_uid: '',
        user_uname: '',
        user_upass: '',
        checkPass: '',
        user_phone: '',
        user_gender: '',
        user_birth: '',
        user_address1: '',
        user_address2: '',
        user_email: '',
        user_nickname: ''
    })
    const { user_uid, user_uname, user_upass, user_phone, user_gender, user_birth, checkPass, user_email, user_address1, user_address2, user_nickname } = form;
    const [isCheck, setIsCheck] = useState(false); // 중복체크 상태
    const onChangeForm = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    }

    //중복체크버튼
    const onCheckId = async (user_uid) => {
        console.log(user_uid);
        if (user_uid === "") {
            alert("아이디를 입력해주세요")
            return;
        } 
        const res = await axios.get(`/user/read/${user_uid}`)
        if (res.data.user_uid === user_uid) {
            alert("이미 가입되어있는 아이디입니다.")
            setform({
                user_uid: '',
                user_uname: '',
                user_upass: '',
                checkPass: '',
                user_phone: '',
                user_gender: '',
                user_birth: '',
                user_address1: '',
                user_address2: '',
                user_email: '',
                user_nickname: ''
            });
            setIsCheck(false); // 중복체크 실패
        } else {
            alert("사용가능한 아이디입니다");
            setIsCheck(true); // 중복체크 성공
        }
    }

    /*회원가입버튼 */
    const onClickInsert = async () => {
        if (!isCheck) {
            alert("아이디 중복체크를 해주세요");
            return;
        }

        if (user_upass !== checkPass) {
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
                        <Form.Control name="user_uid" value={user_uid} onChange={onChangeForm} />
                        <Button onClick={() => onCheckId(user_uid)}>중복체크</Button>
                    </InputGroup >
                    <InputGroup className='joinbox'>
                        <InputGroup.Text className='justify-content-center'>비밀번호</InputGroup.Text>
                        <Form.Control name="user_upass" value={user_upass} onChange={onChangeForm} />
                    </InputGroup >
                    <InputGroup className='joinbox'>
                        <InputGroup.Text className='justify-content-center'>비밀번호확인</InputGroup.Text>
                        <Form.Control name="checkPass" value={checkPass} onChange={onChangeForm} />
                    </InputGroup >
                    <InputGroup className='joinbox'>
                        <InputGroup.Text className='justify-content-center'>이름</InputGroup.Text>
                        <Form.Control name="user_uname" value={user_uname} onChange={onChangeForm} />
                    </InputGroup >
                    <InputGroup className='joinbox'>
                        <InputGroup.Text className='justify-content-center'>닉네임</InputGroup.Text>
                        <Form.Control name="user_nickname" value={user_nickname} onChange={onChangeForm} />
                    </InputGroup >
                    <InputGroup className='joinbox'>
                        <InputGroup.Text className='justify-content-center'>이메일</InputGroup.Text>
                        <Form.Control type="email" name="user_email" value={user_email} onChange={onChangeForm} />
                    </InputGroup >
                    <InputGroup className='joinbox'>
                        <InputGroup.Text className='justify-content-center'>전화번호</InputGroup.Text>
                        <Form.Control name="user_phone" value={user_phone} onChange={onChangeForm} />
                    </InputGroup >
                    <InputGroup className='joinbox'>
                        <InputGroup.Text className='justify-content-center'>성별</InputGroup.Text>
                        <Form.Check
                            type="radio"
                            name="user_gender"
                            id="1"
                            label="남자"
                            value={1}
                            onChange={onChangeForm}
                        />
                        <Form.Check
                            type="radio"
                            name="user_gender"
                            id="2"
                            label="여자"
                            value={2}
                            onChange={onChangeForm}
                        />
                    </InputGroup >
                    <InputGroup className='joinbox'>
                        <InputGroup.Text className='justify-content-center'>생년월일</InputGroup.Text>
                        <Form.Control type="date" name="user_birth" value={user_birth} onChange={onChangeForm} />
                    </InputGroup >
                    <InputGroup className='joinbox'>
                        <InputGroup.Text >주소</InputGroup.Text>
                        <Form.Control name="user_address1" value={user_address1} onChange={onChangeForm} />
                        <ModalAddress form={form} setform={setform} />
                    </InputGroup>
                    <Form.Control className="joinbox" name="user_address2" value={user_address2} placeholder='상세주소' onChange={onChangeForm} />
                    <div>
                        <Button onClick={() => onClickInsert()}>회원가입하기</Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default JoinPage