import React, { useEffect, useState } from "react";
import { TextField, Grid, Typography, Paper, MenuItem} from "@mui/material";
import { Form, Row, Col,Button, Badge, Tooltip, OverlayTrigger } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

export const UpdatePage = () => {
 
  const {mall_key}=useParams();
  const [loading, setLoading] = useState(false);
  const uid = sessionStorage.getItem("uid");
  const [form, setForm] = useState(''); // 바꾸는데이터
  const {mall_title,mall_info,mall_price, mall_photo,mall_tstate,mall_pstate,mall_endDate} = form;
  const [list,setList] = useState(''); //기존데이터
  const today = new Date();
  const tomorrowDate = new Date(today);
  tomorrowDate.setDate(today.getDate() + 1);
  const tomorrow = tomorrowDate.toISOString().split('T')[0];
  const [edate,setEdate]=useState(tomorrow);

  const callAPI=async()=>{ 
    setLoading(true);
    const res=await axios.get(`/mall/read/${mall_key}`);
    //console.log(res.data+"ecddate>>>>>>>>>>"+res.data.mall_endDate);
    setForm(res.data);
    setList(res.data);
    setLoading(false);
  }
  
   
    
  useEffect(()=>{
    callAPI();
  },[])

  const onChangeForm=(e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  }
  const onChangeEndDate =(e)=>{
    setEdate(e.target.value);
  }

 // 파일 업로드 경우
 const onChangePhoto =(e)=>{
  const { name,  files } = e.target;
  const uploadedFiles = Array.from(files); 
  setForm((prevData) => ({
    ...prevData,
    [name]: uploadedFiles 
  }));
}
  const onClickCancel = () => {
    if(!window.confirm('변경된 내용을 지우실래요?')) return;
    window.location.href=`/mall/read/${mall_key}`;
  }
  const onClickUpdate =async()=>{
    if(form.mall_title===""){
      alert("제목은 비워둘 수 없습니다!");
      return;
    }
    if(JSON.stringify(list)=== JSON.stringify(form) && form.mall_endDate===list.mall_endDate){
      alert("변경된 내용이 없습니다!마감일은 단독으로 수정이 불가합니다, 내용을 함께 수정해주세요!");
      return;
    }
    if(!window.confirm('변경된 내용으로 수정하실래요?')) return;
    await axios.post("/mall/update", {
      mall_key,
      mall_info,
      mall_title,
      mall_tstate,
      mall_pstate,  
      mall_price: mall_tstate === 1 ? 0 : mall_price,
      mall_endDate:edate})
    alert("수정완료!");
    window.location.href=`/mall/read/${mall_key}`;
  }
  



  if(loading) return <h1 className='text-center'>로딩중...</h1>
  return (
    <div className="my-5">
      <Paper elevation={3} style={{ padding: 20 }}>
      <Typography variant="h3" gutterBottom className="text-center">
        피망마켓에 글쓰기
      </Typography>
      <form >
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
              value={mall_tstate}
              onChange ={onChangeForm}
              name="mall_tstate"
              required
              fullWidth
            >
              <MenuItem value={0}>일반나눔 올리기</MenuItem>
              <MenuItem value={1}>무료나눔 올리기</MenuItem>
              <MenuItem value={2}>구매글 올리기</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField
              select
              label="물품상태"
              value={mall_pstate}
              onChange ={onChangeForm}
              name="mall_pstate"
              required
              fullWidth
            >
              <MenuItem value={0}>중고</MenuItem>
              <MenuItem value={1}>미개봉,미사용</MenuItem>
            </TextField>
          </Grid>
          {mall_tstate===1 ?
                <Grid item xs={3}>
                <TextField
                  label="Seed"
                  type="number"
                  name="mall_price"
                  fullWidth
                  value={0}
                  onChange={onChangeForm}
                  disabled
                  required
                />
                </Grid>
              :
                <Grid item xs={3}>
                <TextField
                  label="Seed"
                  type="number"
                  name="mall_price"
                  fullWidth
                  required
                  value={mall_price}
                  onChange={onChangeForm}
                />
                </Grid>
                
            }
                <Grid item xs={3}>
                <TextField
                  label="마감일"
                  type="date"
                  name="endDate"
                  fullWidth
                  value={edate}
                  onChange={onChangeEndDate}
                  inputProps={{
                    min: tomorrow // 현재 날짜 이전의 날짜 선택 불가능
                  }}
                  required
                />
                </Grid>
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
              <Form.Group as={Row} className="mb-3">
                <Col sm={12}>
                  <Form.Control
                    type="file"
                    name="mall_photo"
                    width="100%"
                    value={mall_photo}
                    onChange={onChangePhoto}
                  />
                </Col>
              </Form.Group>
            </Grid>
          <Grid item xs={12} className="text-end">
              <Button   onClick={onClickUpdate} variant="outline-secondary" >게시글 수정</Button>
            <Button  onClick={onClickCancel} variant="outline-secondary" >취소</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
      
    </div>
  )
}
export default UpdatePage