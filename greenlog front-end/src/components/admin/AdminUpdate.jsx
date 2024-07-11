import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Row, Col, Button, Badge, InputGroup, Form, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { GiCancel } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";
import axios from 'axios';
import ModalAddress from '../../common/useful/ModalAddress';
import { ElevatorSharp } from '@mui/icons-material';

//엑스버튼 누를 시 취소하기, 수정아이콘누를 시 수정하기
//비밀번호체크
//이미지변경
//셀렉트박스에서 이벤트를 넣어야하다보니, 선택하지 않으면 디폴트 값이 들어감 

const AdminUpdate = () => {
  const { user_uid } = useParams();
  const [form, setForm] = useState("");
  const [origin, setOrigin] = useState("");
  const [isCheck, setIsCheck] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [phoneCheck, setPhoneCheck] = useState(false);

  const { user_key, user_nickname, user_uname, user_phone, user_address1, user_address2,
    user_birth, user_email, user_gender, user_auth } = form;

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
  const styleRed = "danger"
  const styleBlue = "primary"



  const callAPI = async () => {
    const res = await axios.get(`/user/read/${user_uid}`);
    setForm(res.data);
    setOrigin(res.data);
  }

  useEffect(() => {
    callAPI();
  }, []);

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

  //회원영구삭제
  const onClickDelete = async (user_key) => {
    alert(`${user_key} 회원 정보는 다시 복구할 수 없습니다. 그래도 삭제하시겠습니까?`);
    await axios.post(`/user/delete/${user_key}`);
    alert("회원영구 삭제완료!");
    window.location.href = "/user/admin/list.json";
  }

  //닉네임 중복확인
  const onCheckNickname = (user_nickname) => {
    if (origin.user_nickname === user_nickname) {
      alert("다른유저가 사용하고 있는 닉네임입니다.");
      setIsCheck(false);
    } else {
      alert("사용가능한 닉네임입니다");
      setIsCheck(true);
    }
  }

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

  //이메일주소 체크 맞을경우, true로 틀릴경우 false로 리턴 정보수정을 누른 후에 확인이 가능
  const emailPress = (e) => {
    if (e.target.value === origin.user_email) {
      return setIsEmail(true);
    }

    const regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/; // 이메일주소 체크 정규식

    if (regex.test(e.target.value)) {
      return setIsEmail(true);
    } else {
      return setIsEmail(false);
    }
  };


  //정보수정
  const onClickUpdate = async () => {
    if (!window.confirm("변경된 내용을 수정하시겠습니까?")) return; 
    await axios.post("/user/admin/update", form);
    window.location.href = `/user/admin/read/${user_uid}`;
  }



  return (
    <div><h1 className='text-center my-5'>{user_uid}({user_uname})님 회원정보</h1>
      <Row className='justify-content-center'>
        <Col xs={12} sm={11} md={10} lg={9} className='mb-3'>
          <Card className='text-center' border={user_gender === "남자" ? styleBlue : styleRed}>
            <Card.Body>
              <Row>
                <Col lg={4}>
                  <Card.Img src={fileName || "/images/woman.jpg"} variant="top" width="100%"
                    style={photoStyle} onClick={() => refFile.current.click()} />
                  <InputGroup>
                    <input ref={refFile} type="file" style={{ display: 'none' }} onChange={onChangeFile} />
                    <div className='text-end'>
                      <Button className='w-100' size="sm" onClick={onUploadImage}>이미지저장</Button>
                    </div>
                  </InputGroup>
                </Col>
                <Col lg={6}>
                  <Card.Text>
                    <div className='text-start'>
                      <br />
                      <InputGroup className='mb-2'>
                        <InputGroup.Text>회원번호</InputGroup.Text>
                        <Form.Control value={user_key} disabled="true" />
                      </InputGroup>
                      <InputGroup className='mb-2'>
                        <InputGroup.Text>아이디</InputGroup.Text>
                        <Form.Control value={user_uid} name="user_uid" disabled="true" />
                      </InputGroup>
                      <InputGroup className='mb-2'>
                        <InputGroup.Text>비밀번호</InputGroup.Text>
                        <Button>비밀번호수정</Button>
                      </InputGroup>
                      <InputGroup className='mb-2'>
                        <InputGroup.Text>이름</InputGroup.Text>
                        <Form.Control value={user_uname} name="user_uname" onChange={onChangeForm} />
                      </InputGroup>
                      <InputGroup className='mb-2'>
                        <InputGroup.Text>닉네임</InputGroup.Text>
                        <Form.Control value={user_nickname} name="user_nickname" onChange={onChangeForm} />
                        <Button onClick={() => onCheckNickname(user_nickname)} >중복확인</Button>
                      </InputGroup>
                      <InputGroup className='mb-2'>
                        <InputGroup.Text>생년월일</InputGroup.Text>
                        <Form.Control value={user_birth} name="user_birth" onChange={onChangeForm} type="date" />
                      </InputGroup>
                      <InputGroup className='mb-2'>
                        <InputGroup.Text>성별</InputGroup.Text>
                        <Form.Select onChange={onChangeForm} value={user_gender} name="user_gender" >
                          <option value="남자">남자</option>
                          <option value="여자">여자</option>
                        </Form.Select>
                      </InputGroup>
                      <InputGroup className='mb-2'>
                        <InputGroup.Text>전화번호</InputGroup.Text>
                        <Form.Control value={user_phone} name="user_phone" onChange={handlePress} maxLength={13} />
                      </InputGroup>
                      <InputGroup className='mb-2'>
                        <InputGroup.Text>이메일</InputGroup.Text>
                        <Form.Control value={user_email} name="user_email" onChange={onChangeForm} onBlur={emailPress} type="email" />
                      </InputGroup>
                      <InputGroup className='mb-2'>
                        <InputGroup.Text>주소</InputGroup.Text>
                        <Form.Control value={user_address1} name="user_address1" onChange={onChangeForm} />
                      </InputGroup>
                      <InputGroup className='mb-2'>
                        <Form.Control value={user_address2} name="user_address2" onChange={onChangeForm} />
                        <ModalAddress form={form} setform={setForm} />
                      </InputGroup>
                      <InputGroup className='mb-2'>
                        <InputGroup.Text>권한</InputGroup.Text>
                        <Form.Select onChange={onChangeForm} value={user_auth} name="user_auth">
                          <option value="일반회원">일반회원</option>
                          <option value="우수회원">우수회원</option>
                          <option value="휴면회원">휴면회원</option>
                          <option value="블랙리스트">블랙리스트</option>
                          <option value="탈퇴회원">탈퇴회원</option>
                          <option value="관리자">관리자</option>
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
              <div className='text-end mt-3'>
                <Button className='px-5' onClick={() => onClickDelete(user_key)}>회원영구삭제</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
export default AdminUpdate