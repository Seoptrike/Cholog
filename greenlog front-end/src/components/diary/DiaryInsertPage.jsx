import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Row, Col, InputGroup, Form, Button } from 'react-bootstrap'


const DiaryInsertPage = () => {
  const uid = sessionStorage.getItem("uid");
  const [diary, setDiary] = useState({
    diary_writer: uid,
    diary_contents: "",
    diary_title: "",
    diary_state: "개인컵/텀블러"
  });

  const { diary_contents, diary_title, diary_state, diary_writer } = diary;

  const [data, setData] = useState({
    seed_key: '',
    seed_number: '',
    seed_point: ''
  })
  
  //포인트적립
  const callAPI = async () => {
    const res = await axios.get(`/seed/read/${uid}`)
    setData(res.data);
  }
  useEffect(() => { callAPI() }, [])

  //폼변경
  const onChangeForm = (e) => {
    setDiary({ ...diary, [e.target.name]: e.target.value });
  }

  //파일 여러개첨부

  const [files, setFiles] = useState([]);
  
  const style = {
    border: '1px solid gray',
    width: '100%',
  }

  //파일 업로드 전 이미지 출력
  const onChangeFile = (e) => {
    let selFiles = [];
    for (let i = 0; i < e.target.files.length; i++) {
      const file = {
        name: URL.createObjectURL(e.target.files[i]),
        byte: e.target.files[i],
        sequence: i
      }
      selFiles.push(file);
    }
    setFiles(selFiles);
  }


  //일기사진저장

  const onClickUpload = async (diaryPhoto_diary_key) => {
    if (files.length === 0) return;
    if (!window.confirm(`${files.length}개 사진파일을 업로드 하시겠습니까?`)) return;

    try{
    const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('bytes', files[i].byte);
      }
    console.log(formData);

    await axios.post(`/diary/attach/${diaryPhoto_diary_key}`, formData);
    alert("이미지저장완료!");
    setFiles([]);
  }catch(error){
    console.err("첨부파일업로드오류:" , error);
    alert("첨부파일 업로드 중 오류가 발생했습니다.");
  }
  }


  //일기등록
  const onClickInsert = async () => {
    if (!uid) {
      alert("로그인이 필요한 작업입니다.");
      sessionStorage.setItem('target', '/diary/insert');
      window.location.href = "/user/login";
      return;
    }

    if (!window.confirm("일기를 등록하시겠습니까?")) return;
    
    try {
      const response = await axios.post('/diary/insert', diary);
      const lastkey = response.data;
      if (lastkey) {
        await onClickUpload(lastkey);
        await axios.post('/trade/insert', {
          trade_to: data.seed_number,
          trade_from: 'seed00000000',
          amount: 1,
          seed_number: data.seed_number,
          trade_state: 1,
          trade_info: "다이어리 작성"
        })
        alert("일기등록완료!");
        alert("관련없는 일기가 있을 시, 포인트를 관리자가 차감합니다. 유의해주십시오.")
        window.location.href = `/diary/list.json/${diary_writer}`;
      }

    } catch (error) {
      console.error("일기 등록 오류:", error);
      alert("일기 등록 중 오류가 발생했습니다.");
    }
  }


    return (
      <div>
        <div className='text-center my-5'>
          <h4>오늘은 어떤 활동을 하셨나요?</h4><br /><h5>행운일기를 통해 알려주세요</h5>
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
                      관련 일기가 아닐 시, 권한이 제한될 수 있으며 <br />
                      적립된 포인트가 차감될 수 있으니 이점 유의해주시기 바랍니다.<br />
                      사진은 필수첨부입니다.
                    </div>
                  </Form.Control>
                  <InputGroup className='mb-3'>
                    <InputGroup.Text>제목</InputGroup.Text>
                    <Form.Control value={diary_title} onChange={onChangeForm} name="diary_title" />
                  </InputGroup>
                  <InputGroup className='mb-3'>
                    <Form.Control type="file" onChange={onChangeFile} multiple />
                  </InputGroup>
                  <Row>
                    {files.map(f =>
                      <Col key={f.name} lg={4} className='mb-2'>
                        <img src={f.name} style={style} />
                      </Col>
                    )}

                  </Row>
                  <InputGroup className='mb-5'>
                    <Form.Control as="textarea" rows={20} value={diary_contents} onChange={onChangeForm} name="diary_contents" />
                  </InputGroup>
                  <InputGroup className='mb-5'>
                    <Form.Control value={diary_writer} readOnly />
                  </InputGroup>
                </Col>
              </Row>
              <div className='text-center mb-5'>
                <Button className='me-2 px-4' onClick={onClickInsert}>등록</Button>
                <Button className='px-4'>취소</Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    )
  
}
  export default DiaryInsertPage