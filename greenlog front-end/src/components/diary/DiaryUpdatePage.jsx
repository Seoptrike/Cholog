import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Card, Row, Col, InputGroup, Form, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom';


const DiaryUpdatePage = () => {
  const uid = sessionStorage.getItem("uid");
  const [file, setFile] = useState({
    name: "",
    byte: null
  });
  const [photo, setPhoto]=useState([]);
  
  const callAttach = async()=>{
    const res2 =await axios.get(`/diary/attach/${diary_key}`);
    console.log(res2.data);
    setPhoto(res2.data);
  }
  
  const refFile = useRef(null);
  const [diary, setDiary] = useState({
    diary_title: "",
    diary_contents: "",
    diary_state: "",
    diary_thumbnail: ""
  });
  const { diary_key } = useParams();

  const callAPI = async () => {
    const res = await axios.get(`/diary/read/${diary_key}?user_uid=${uid}`)
    console.log(res.data);
    setDiary(res.data);
    setFile({
      name: res.data.diary_thumbnail,
      byte: null
    });
  }

  const { diary_contents, diary_title, diary_state, diary_thumbnail } = diary;
  const style = {
    border: '1px solid gray',
    width: '100%',
  }

  const style2 = {
    border: '1px solid gray',
    width: '100%',
    cursor: 'pointer'
  }

  useEffect(() => {
    callAPI();
    callAttach();
  }, []);

  const onChangeForm = (e) => {
    setDiary({ ...diary, [e.target.name]: e.target.value });
  }

  const onChangeFile = (e) => {
    setFile({
      name: URL.createObjectURL(e.target.files[0]),
      byte: e.target.files[0]
    });
  }


  

  

  //파일 업로드 전 이미지 출력
  const [files, setFiles] = useState([]);
  const onChangeFiles = (e) => {
    let selFiles = [];
    for (let i = 0; i < e.target.files.length; i++) {
      const file = {
        name: URL.createObjectURL(e.target.files[i]),
        byte: e.target.files[i]
      }
      selFiles.push(file);
    }
    setFiles(selFiles);
  }

  //일기 썸네일 수정
  const ThumbnailUpload = async (diary_key) => {
    if (!window.confirm("변경된 이미지를 대표이미지로 수정하시겠습니까?")) return;
    const thumbnail = new FormData();
    thumbnail.append("byte", file);
    const config = {
      Headers: { 'content-type': 'multipart/form-data' }
    }
    await axios.post(`/diary/thumbnail/${diary_key}`, thumbnail, config);
    alert("썸네일이 수정되었습니다.");
    callAttach();
    callAPI();
  }

  //사진삭제
  const onClickDelete =async(photo)=>{
    console.log(photo);
    if (!window.confirm("변경된 내용을 삭제하시겠습니까?")) return;
    const res=  await axios.post('/diary/attach/delete', photo);
    console.log(res.data);
    if(res.data===0){
      alert("대표사진은 삭제할 수 없습니다.")
    }else{
      alert("삭제완료");
      callAttach();
    }
    
  }



  const onClickUpdate = async () => {
    if (!window.confirm("변경된 내용을 수정하시겠습니까?")) return;
    await axios.post('/diary/update', { diary_title, diary_contents, diary_state, diary_writer: uid, diary_key });
    alert("수정했습니다!");
    window.location.href = `/diary/read/${diary_key}`;
  }



  return (
    <div>
      <div className='text-center my-5'>
        <h5>수정시에는 포인트 적립이 되지 않습니다.</h5>
      </div>
      <Row className='justify-content-center mb-3'>
        <Col lg={8}>
          <Card>
            <h5 className='text-center my-3'>활동 카테고리를 선택해주세요</h5>
            <Row className='justify-content-center'>
              <Col lg={10}>
                <InputGroup className='text-center mb-3'>
                  <Form.Select value={diary_state} onChange={onChangeForm} name="diary_state">
                    <option value="개인컵/텀블러">개인컵 활용(카페/사무실/식당)</option>
                    <option value="리필스테이션/개인용기">용기 활용(리필스테이션/배달음식)</option>
                    <option value="리사이클링 제작">리사이클링 제작(리사이클링/업사이클링)</option>
                    <option value="전자영수증">전자영수증(쇼핑)</option>
                    <option value="친환경 제품구매">친환경 제품구매(제로웨이스트/업사이클링/리사이클링)</option>
                    <option value="재활용품 배출">재활용품 배출(폐휴대폰 반납/페트병,유리병 반납)</option>
                    <option value="전기차 대여">전기차 대여(대여만 가능, 반납일 캡쳐)</option>
                    <option value="봉사활동/개인 환경활동">봉사활동/개인 환경활동 (쓰레기줍기, 봉사활동참여)</option>
                  </Form.Select>
                </InputGroup>
                <Form.Control as="template" className='mb-5'>
                  <div className='text-muted'>
                    관리자가 하나하나 체크하고 있습니다. <br />
                    포인트가 이미 차감된 경우, <br />
                    수정을 하더라도 다시 포인트를 적립할 수는 없습니다.<br />
                    사진은 필수첨부입니다.
                  </div>
                </Form.Control>
                <InputGroup className='mb-3'>
                  <InputGroup.Text>제목</InputGroup.Text>
                  <Form.Control value={diary_title} onChange={onChangeForm} name="diary_title" />
                </InputGroup>
                <Row className='justify-content-center mb-3'>
                 {photo.map(p=>
                   <Col key={p.diaryPhoto_filename} lg={4} className='mb-2'>
                   <Button size="sm" onClick={()=>ThumbnailUpload(p.diaryPhoto_diary_key)}>대표사진설정</Button>
                   <img src={p.diaryPhoto_filename} style={style}/>
                   <Button onClick={()=>onClickDelete(p)}>삭제</Button>
                 </Col>
                 )}
                </Row>
                <hr/>
                <Row>
                    {files.map(f =>
                      <Col key={f.name} lg={4} className='mb-2'>
                        <Button size="sm">대표사진설정</Button>
                        <img src={f.name} style={style} />
                      </Col>
                    )}

                  </Row>
                <InputGroup className='mb-3'>
                  <Form.Control type="file" onChange={onChangeFiles} multiple />
                </InputGroup>
                <div>슬라이더 사진 모달하나 만들어서 사진 파일들 삭제 및 수정 만들기</div>
                <InputGroup className='mb-5'>
                  <Form.Control as="textarea" rows={20} value={diary_contents} onChange={onChangeForm} name="diary_contents" />
                </InputGroup>
              </Col>
            </Row>
            <div className='text-center mb-5'>
              <Button className='me-2 px-4' onClick={onClickUpdate}>수정</Button>
              <Button className='px-4'>취소</Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default DiaryUpdatePage