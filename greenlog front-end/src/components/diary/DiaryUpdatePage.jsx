import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Card, Row, Col, InputGroup, Form, Button, Badge } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { MdOutlineCancel } from "react-icons/md";
import { DragDropContext, Draggable, Droppable, } from 'react-beautiful-dnd';


const DiaryUpdatePage = () => {
  const uid = sessionStorage.getItem("uid");

  //파일추가시 미리보기
  const refFile = useRef(null);
  const [file, setFile] = useState({
    name: "",
    byte: null
  });

  const onChangeFile = (e) => {
    setFile({
      name: URL.createObjectURL(e.target.files[0]),
      byte: e.target.files[0]
    });
  }

  const { diary_key } = useParams();
  //현재저장된 사진 가져오기
  const [photo, setPhoto] = useState([]);

  const callAttach = async () => {
    const res2 = await axios.get(`/diary/attach/${diary_key}`);
    console.log(res2.data);
    setPhoto(res2.data);
  }


  const [diary, setDiary] = useState({
    diary_title: "",
    diary_contents: "",
    diary_state: "",
    diary_thumbnail: ""
  });
 

  //다이어리 정보 가져오기
  const callAPI = async () => {
    const res = await axios.get(`/diary/read/${diary_key}?user_uid=${uid}`)
    console.log(res.data);
    setDiary(res.data);
  }

  const { diary_contents, diary_title, diary_state, diary_thumbnail } = diary;
  const style = {
    border: '1px solid gray',
    width: '100%',
  }

  useEffect(() => {
    callAPI();
    callAttach();
  }, []);

  const onChangeForm = (e) => {
    setDiary({ ...diary, [e.target.name]: e.target.value });
  }

  //일기 썸네일 수정
  const ThumbnailUpload = async (photo) => {
    console.log(photo);
    if (!window.confirm("선택하신 사진을 대표이미지로 수정하시겠습니까?")) return;
    await axios.post(`/diary/update/thumbnail`, photo);
    alert("썸네일이 수정되었습니다.");
    callAttach();
    callAPI();
  }

  //사진삭제
  const onClickDelete = async (photo) => {
    console.log(photo);
    if (!window.confirm("선택하신 사진을 삭제하시겠습니까?")) return;
    const res = await axios.post('/diary/attach/delete', photo);
    console.log(res.data);
    if (res.data === 0) {
      alert("대표사진은 삭제할 수 없습니다.")
    } else {
      alert("삭제완료");
      callAttach();
    }

  }

  
 
  //드래그시 필수셋팅
  const handleOnDragEnd = (result) => {    
    if (!result.destination) return;
    const items = [...photo];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    console.log("item", items);
    const updateSequence = items.map((item, index)=>({
      ...item,
      diaryPhoto_sequence:index
    }));
    setPhoto(updateSequence);
  };




  const onClickImageSave = async () => {
    if (file.byte === null) return;
    if (!window.confirm("이 사진을 새로 저장하시겠습니까?")) return;
    //이미지 업로드
    const formData = new FormData();
    formData.append("byte", file.byte);
    console.log(formData);
    await axios.post(`/diary/attachOne/${diary_key}`, formData);
    alert("이미지저장 성공!")
    setFile("");
    callAttach();
  }


  //일기수정
  const onClickUpdate = async (photo) => {
    if (!window.confirm("변경된 내용을 수정하시겠습니까?")) return;
    photo.forEach(async p => {
      await axios.post('/diary/update/attach', p);
      console.log(p);
    });
    await axios.post('/diary/update', { diary_title, diary_contents, diary_state, diary_writer: uid, diary_key });
    alert("수정완료");
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
                  <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId='p.diaryPhoto_filename' direction="vertical"> 
                      {(provided) => (
                        <div
                          className='p.diaryPhoto_filename'
                          {...provided.droppableProps} ref={provided.innerRef}
                        >
                          <Row>
                          {photo.map((p, index) => {
                            return(
                            <Draggable key={p.diaryPhoto_filename} draggableId={p.diaryPhoto_filename} index={index}>
                              {(provided) => (
                              
                                 <Col key={p.diaryPhoto_filename} lg={5} className='mb-2'
                                 ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                 <div style={{ position: "relative" }}>
                                   {p.diaryPhoto_filename === diary_thumbnail ?
                                     <Badge style={{ position: "absolute", top: '10px', right: "30px" }} bg='primary'>현재 대표이미지</Badge>
                                     :
                                     <Badge onClick={() => ThumbnailUpload(p)} style={{ cursor: "pointer", position: "absolute", top: '10px', right: "30px" }} bg='success'>썸네일 설정하기</Badge>
                                   }
                                   <img src={p.diaryPhoto_filename} style={style} />
                                   <MdOutlineCancel onClick={() => onClickDelete(p)} style={{ cursor: "pointer", position: "absolute", top: '10px', right: "5px" }} />
                                 </div>
                               </Col>
                              
                          )}
                            </Draggable>
                         )}
                         )}
                        </Row>
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                  <div>
                    <img src={file.name || "/images/plus.png"} onClick={() => refFile.current.click()}
                      style={{ width: "15rem", cursor: "pointer", position: "relative" }} />
                    {file.name && <Badge onClick={onClickImageSave} bg='danger' style={{ position: "absolute", bottom: '850px', left: "300px" }}>
                      이미지추가</Badge>
                    }
                  </div>
                  <Form.Control type="file" ref={refFile} onChange={onChangeFile} style={{ display: 'none' }} />

                 
                </Row>
                <hr />
                <InputGroup className='mb-5'>
                  <Form.Control as="textarea" rows={20} value={diary_contents} onChange={onChangeForm} name="diary_contents" />
                </InputGroup>
              </Col>
            </Row>
            <div className='text-center mb-5'>
              <Button className='me-2 px-4' onClick={()=>onClickUpdate(photo)}>수정</Button>
              <Button className='px-4'>취소</Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default DiaryUpdatePage