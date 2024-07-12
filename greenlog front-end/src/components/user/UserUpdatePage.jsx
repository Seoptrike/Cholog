import React, { useEffect, useRef, useState } from 'react'
import { Card, Row, Col, InputGroup, Form, Button } from 'react-bootstrap'
import ModalAddress from '../../common/useful/ModalAddress'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

//이미지저장(관리자용이랑 동일하게 사용)
//닉네임 중복확인 알고리즘 검토 필요

const UserUpdatePage = () => {
    const [form, setForm] = useState("");
    const [origin, setOrigin] = useState("");
    const [overlap, setOverlap] =useState([]);
    const [isCheck, setIsCheck] = useState(false);
    const [phoneCheck, setPhoneCheck] = useState(false);
    const { user_uid } = useParams();
    const [img, setImg] = useState({
        fileName: '',
        file: null
      })
      const { fileName, file } = img;
      const photoStyle = {
        borderRadius: '10px',
        cursor: "pointer",
      }
    
      const refFile = useRef();


    const callAPI = async () => {
        const res = await axios.get(`/user/read/${user_uid}`);
        setForm(res.data);
        setOrigin(res.data);
    }

    const userCallAPI = async ()=>{
        const res2 = await axios.get("/user/admin/list");
        setOverlap(res2.data);
        console.log(res2.data);
    }

    const { user_key, user_nickname, user_uname, user_phone, user_address1, user_address2,
        user_birth, user_email, user_gender, user_ment} = form;

    useEffect(() => {
        callAPI();
        userCallAPI();
    }, [])


    //폼변경
    const onChangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
      }

      //전화번호 유효성 및 자동하이픈 입력
  const handlePress = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    const regex = /^[0-9\b -]{0,13}$/; // 숫자, 백스페이스, 하이픈 포함한 정규식

    if (regex.test(e.target.value)) {
      setPhoneCheck(e.target.value);
      const formattedPhoneNumber = e.target.value
        .replace(/-/g, '') // 기존 하이픈 제거
        .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'); // 새로운 하이픈 삽입
      setForm({ ...form, [e.target.name]: formattedPhoneNumber }); // 상태 업데이트
    } else {
      alert("잘못된 입력값입니다.");
    }
  };

    //닉네임 중복확인
    const onCheckNickname = (user_nickname) => {
        const findNickname= overlap.findIndex(user=> user.user_nickname === user_nickname);
        if (user_nickname) {
            alert("현재 사용중인 닉네임입니다");
            setIsCheck(false);
            return;
        } else if(findNickname){
            alert("다른유저가 사용하고 있는 닉네임입니다.");
            setIsCheck(false);
            return;
        }
        else {
            alert("사용가능한 닉네임입니다");
            setIsCheck(true);
            return;
        }
    }

    //이미지업로드
  const onChangeFile = (e) => {
    setImg({
      fileName: URL.createObjectURL(e.target.files[0]),
      file: e.target.files[0]
    })
  }

  const onUploadImage = async () => {
    if (file) {
      if (!window.confirm("이미지를 수정하시겠습니까?")) return;

      const formData = new FormData();
      formData.append("file", file);
      const config = {
        Headers: { 'content-type': 'multipart/form-data' }
      }
      await axios.post(`/upload/img/${user_uid}`, formData, config);
      alert("이미지가 변경되었습니다");
      setImg({ file: null, fileName: '' });
      callAPI();
    }
  }


    //수정취소
    const onClickReset = () => {
        alert("취소하시겠습니까?");
        callAPI();
      }

    //수정하기
    
    const onClickUpdate = async()=>{
        if (!window.confirm("변경된 내용을 수정하시겠습니까?")) return;
        await axios.post("/user/update", form);
        window.location.href = `/user/read/${user_uid}`;
    }
    
    return (
        <div>
            <Row className='justify-content-center my-5'>
                <Col lg={10}>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col lg={4}>
                                    <img src={fileName ||"http://via.placeholder.com/100x150"} width="100%" onClick={() => refFile.current.click()}/>
                                    <input ref={refFile} type="file" style={{ display: 'none' }} onChange={onChangeFile} />
                                    <Button>이미지저장</Button>
                                </Col>
                                <Col lg={8}>
                                    <Card className='mb-2'>
                                        <Card.Body>
                                            <InputGroup className='mb-2'>
                                                <InputGroup.Text>회원번호</InputGroup.Text>
                                                <Form.Control disabled="true" value={user_key} />
                                            </InputGroup>
                                            <InputGroup className='mb-2'>
                                                <InputGroup.Text>성함</InputGroup.Text>
                                                <Form.Control value={user_uname} name="user_uname" onChange={onChangeForm}/>
                                            </InputGroup>
                                            <InputGroup className='mb-2'>
                                                <InputGroup.Text>전화번호</InputGroup.Text>
                                                <Form.Control value={user_phone} name="user_phone" onChange={handlePress} maxLength={13} />
                                            </InputGroup>
                                            <InputGroup className='mb-2'>
                                                <InputGroup.Text>주소</InputGroup.Text>
                                                <Form.Control value={user_address1} name="user_address1" onChange={onChangeForm}/>
                                            </InputGroup>
                                            <InputGroup className='mb-2'>
                                                <Form.Control value={user_address2} name="user_address2" onChange={onChangeForm}/>
                                                <ModalAddress form={form} setform={setForm} />
                                            </InputGroup>
                                            <InputGroup className='mb-2'>
                                                <InputGroup.Text>생년월일/성별</InputGroup.Text>
                                                <Form.Control value={user_birth} name="user_birth" onChange={onChangeForm} type="date"/>
                                                <Form.Control value={user_gender === 0 ? "남자" : "여자"} name="user_gender" disabled="true" />
                                            </InputGroup>
                                        </Card.Body>
                                    </Card>
                                    <Card className='mb-2'>
                                        <Card.Body>
                                            <InputGroup className='mb-2'>
                                                <InputGroup.Text>아이디</InputGroup.Text>
                                                <Form.Control disabled="true" value={user_uid} />
                                            </InputGroup>
                                            <InputGroup className='mb-2'>
                                                <InputGroup.Text>이메일</InputGroup.Text>
                                                <Form.Control value={user_email} name="user_email" onChange={onChangeForm} type="email"/>
                                            </InputGroup>
                                            <InputGroup className='mb-2'>
                                                <InputGroup.Text>비밀번호 변경</InputGroup.Text>
                                                <Button className='px-5'>비밀번호 변경</Button>
                                            </InputGroup>
                                            <InputGroup className='mb-2'>
                                                <InputGroup.Text>닉네임</InputGroup.Text>
                                                <Form.Control value={user_nickname} name="user_nickname" onChange={onChangeForm}/>
                                                <Button onClick={onCheckNickname}>중복확인</Button>
                                            </InputGroup>
                                            <InputGroup className='mb-2'>
                                                <InputGroup.Text>한줄소개</InputGroup.Text>
                                                <Form.Control placeholder="한줄소개" onChange={onChangeForm} 
                                                value={user_ment} name="user_ment"/>
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
                <Button className='me-4 px-5' onClick={onClickUpdate}>수정하기</Button>
                <Button className='me-4 px-5' onClick={onClickReset}>취소하기</Button>
                <Link to ={`/user/read/${user_uid}`}><Button className='px-5'>마이페이지로 돌아가기</Button></Link>
            </div>
        </div>
    )
}

export default UserUpdatePage