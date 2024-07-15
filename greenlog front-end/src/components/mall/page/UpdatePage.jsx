import React, { useEffect, useRef, useState } from "react";
import { TextField, Grid, Typography, Paper, MenuItem } from "@mui/material";
import { Form, Row, Col, Button, Badge } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

export const UpdatePage = () => {
  const { mall_key } = useParams();
  const [loading, setLoading] = useState(false);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const uid = sessionStorage.getItem("uid");
  const [file, setfile] = useState({
    name: '',
    byte: null
  })
  const [isModified, setIsModified] = useState(false);
  const [photos, setPhotos] = useState([]);
  const refFile = useRef();
  const [form, setForm] = useState({
    mall_key: mall_key,
    mall_seller: uid,
    mall_buyer: "ghost",
    mall_title: "",
    mall_info: "",
    mall_price: 0,
    mall_photo: "",
    mall_tstate: 0,
    mall_pstate: 0,
    mall_endDate: tomorrow
  });
  const { mall_title, mall_info, mall_price, mall_photo, mall_tstate, mall_pstate, mall_endDate } = form;
  const [list, setList] = useState({
    mall_key: mall_key,
    mall_seller: uid,
    mall_buyer: "ghost",
    mall_title: "",
    mall_info: "",
    mall_price: 0,
    mall_photo: "",
    mall_tstate: 0,
    mall_pstate: 0,
    mall_endDate: tomorrow
  });

  // 일반 입력 필드 경우
  const onChangeForm = (e) => {
    const { name, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const onChangeFile = (e) => {
    setfile({
      name: URL.createObjectURL(e.target.files[0]),
      byte: e.target.files[0]
    })
  }

  const imgStyle = {
    width: '90%',
    height: 'auto',
    borderRadius: '1px'
  };
  const callAPI = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/mall/read/${mall_key}`);

      // 데이터 처리
      const data = {
        ...res.data,
        mall_info: res.data.mall_info || ''
      };
      setForm(data);
      setList(data);
      setLoading(false);
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
      setLoading(false);
    }
  }

  const callAttach = async () => {
    //사진미리보기
    const res1 = await axios.get(`/mall/attach/list/${mall_key}`)
    setPhotos(res1.data)
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    //console.log(form)
    if (isModified === true) {
      alert("게시글 수정 완료!");
      window.location.href = '/mall/list.json';
    }
    else {
      // 기존 데이터와 폼 데이터 비교
      if (JSON.stringify(list) === JSON.stringify(form)) {
        alert("변경된 내용이 없습니다!");
        return;
      }
      if (!window.confirm("내용을 수정하실래요?")) return;
      console.log("form: " + form + "list: " + list);
      try {
        // 게시글 수정
        await axios.post('/mall/update', form);
        alert("게시글 수정 완료!");
        window.location.href = '/mall/list.json';

      } catch (error) {
        // 오류 발생 시 오류 메시지 출력
        console.error("게시글 수정 오류:", error.toString());
        alert("게시글 수정 중 오류가 발생했습니다.");
      }
    }
  }

  const onClickDelete = async (photo) => {
    if (!window.confirm(`${photo.mallPhoto_key}번 이미지를 삭제하시겠습니까?`)) return;
    //첨부파일삭제
    const res = await axios.post("/mall/attach/delete", photo);
    if (res.data === 0) {
      alert("삭제 완료!");
      setIsModified(true);
      callAttach(); // 삭제 성공 시 필요한 추가 작업 (예: 목록 새로고침 등)
    } else {
      alert("대표이미지는 삭제 할 수 없습니다!");
    }
  }
  const onClickImageSave = async () => {
    if (file.byte === null) return;
    if (!window.confirm("변경된 이미지를 저장하시겠습니까?")) return;
    //이미지 업로드
    const formData = new FormData();
    formData.append("byte", file.byte);
    console.log(formData);
    await axios.post(`/mall/attachOne/${mall_key}`, formData);
    alert("이미지 변경완료!")
    setfile("");
    setIsModified(true);
    callAttach();
  }

  const onUpdateMainPhoto = async (photo) => {
    await axios.post("/mall/update/mainPhoto", photo)
    setIsModified(true);
    callAPI();
    alert("대표이미지 변경 완료!")
  }

  useEffect(() => {
    callAPI();
    callAttach();
  }, [])

  if (loading) return <h1 className='text-center'>로딩중...</h1>
  return (
    <div className="my-5">
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography variant="h3" gutterBottom className="text-center">
          피망마켓
        </Typography>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="mall_title"
                label="제목"
                value={mall_title}
                onChange={onChangeForm}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                select
                label="유형"
                defaultValue={0}
                value={mall_tstate}
                name="mall_tstate"
                required
                fullWidth
                disabled
              >
                <MenuItem value={0}>경매물품으로 올리기</MenuItem>
                <MenuItem value={1}>나눔물품으로 올리기</MenuItem>
                <MenuItem value={2}>내가 찾는 물품 올리기</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <TextField
                select
                label="물품상태"
                defaultValue={0}
                value={mall_pstate}
                name="mall_pstate"
                required
                fullWidth
                disabled
              >
                <MenuItem value={0}>중고</MenuItem>
                <MenuItem value={1}>미개봉,미사용</MenuItem>
              </TextField>
            </Grid>
            {mall_tstate === 0 ?
              <>
                <Grid item xs={3}>
                  <TextField
                    label="Seed"
                    type="number"
                    name="mall_price"
                    fullWidth
                    value={mall_price}
                    required
                    disabled
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="경매낙찰날짜"
                    type="date"
                    name="endDate"
                    fullWidth
                    value={mall_endDate instanceof Date ? mall_endDate.toISOString().split('T')[0] : ''}
                    required
                    disabled
                  />
                </Grid>
              </>
              :
              <Grid item xs={6}>
                <TextField
                  label="Seed"
                  type="number"
                  name="mall_price"
                  fullWidth
                  value={mall_price}
                  disabled
                />
              </Grid>
            }

            <Grid item xs={12}>
              <TextField
                name="mall_info"
                label="내용"
                fullWidth
                multiline
                value={mall_info}
                rows={4}
                onChange={onChangeForm}
              />
            </Grid>

            <Grid item xs={12}>
              <Row>
                {photos.map(photo =>
                  <Col key={photo.mallPhoto_key} xs={2} className='mt-2'>
                    <div style={{ position: "relative" }}>
                      <span>
                        {mall_photo === photo.mallPhoto_photo ?
                          <Badge style={{ position: "absolute", top: '10px', right: "30px" }} bg='primary'>현재 대표이미지</Badge>
                          :
                          <Badge onClick={() => onUpdateMainPhoto(photo)} style={{ cursor: "pointer", position: "absolute", top: '10px', right: "30px" }} bg='success'>썸네일 설정하기</Badge>
                        }
                        <Badge onClick={() => onClickDelete(photo)} style={{ cursor: "pointer", position: "absolute", top: '10px', right: "5px" }} bg='danger'>X</Badge>
                      </span>
                    </div>

                    <img src={photo.mallPhoto_photo} style={{ borderRadius: "50%", width: "10rem", height: "10rem" }} />
                  </Col>
                )}
                <Col xs={2}>
                  <img src={file.name || "/images/sorry.png"} style={{ borderRadius: "50%", width: "10rem", height: "10rem" }} onClick={() => refFile.current.click()} />
                  <input ref={refFile} type="file" onChange={onChangeFile} style={{ display: "none" }} />
                  {file.name &&
                    <div className="text-center mt-2"><Button onClick={onClickImageSave} size="sm">이미지 추가</Button></div>
                  }
                </Col>
              </Row>
            </Grid>

            <Grid item xs={12} className="text-end">
              <Button type="submit" variant="outline-secondary" >게시글 수정</Button>
              <Button onClick={callAPI} variant="outline-secondary" >취소</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

    </div>
  )
}
export default UpdatePage