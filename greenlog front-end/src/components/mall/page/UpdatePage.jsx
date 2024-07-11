import React, { useEffect, useState } from "react";
import { TextField, Grid, Typography, Paper, MenuItem} from "@mui/material";
import { Form, Row, Col,Button, Badge } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

export const UpdatePage = () => {
  const {mall_key}=useParams();
  const [loading, setLoading] = useState(false);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const today = new Date();
  const uid = sessionStorage.getItem("uid");
  
  const [form, setForm] = useState({
    mall_key:mall_key,
    mall_seller :uid , 
    mall_buyer :"ghost"  , 
    mall_title :"" , 
    mall_info :"" , 
    mall_price :0, 
    mall_photo :"" , 
    mall_tstate :0 , 
    mall_pstate :0 ,
    mall_endDate:tomorrow,
    mall_uDate:today
  });
  const {mall_uDate,mall_title,mall_info,mall_price, mall_photo,mall_tstate,mall_pstate,mall_endDate} = form;
  const [list,setList] = useState({
    mall_key:mall_key,
    mall_seller :uid , 
    mall_buyer :"ghost"  , 
    mall_title :"" , 
    mall_info :"" , 
    mall_price :0, 
    mall_photo :"" , 
    mall_tstate :0 , 
    mall_pstate :0 ,
    mall_endDate:tomorrow,
    mall_uDate:today
  });

  // 일반 입력 필드 경우
  const onChangeForm = (e) => {
    const { name, value} = e.target;
      setForm((prevData) => ({
        ...prevData,
        [name]: value
      }));
  };
  
  // 파일 업로드 경우
  const onChangePhoto =(e)=>{
    const { name,  files } = e.target;
    const uploadedFiles = Array.from(files); 
    setForm((prevData) => ({
      ...prevData,
      [name]: uploadedFiles 
    }));
  }


  // const dummyData = [
  //  { aid: 1, filename: '/images/sorry.png' },
  //   { aid: 2, filename: '/images/sorry.png' },
  //   { aid: 3, filename: '/images/sorry.png' }
  // ];

  // 상태 변수와 이벤트 핸들러 등을 정의
  const [photo, setPhoto] = useState("");

  const imgStyle = {
    width: '90%',
    height: 'auto',
    borderRadius: '1px'
  };
  const callAPI=async()=>{ 
    setLoading(true);
    try {
      const res = await axios.get(`/mall/read/${mall_key}`);
      console.log(res.data);
  
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
  const onSubmit =async(e)=>{
    e.preventDefault();
     //console.log(form)
     // 기존 데이터와 폼 데이터 비교
    if(JSON.stringify(list) === JSON.stringify(form)) {
      alert("변경된 내용이 없습니다!")  
      return
    }
    if(!window.confirm("내용을 수정하실래요?")) return;
    try {
      // 게시글 수정
      await axios.post('/mall/update', list);
      alert("게시글 수정 완료!");
      window.location.href = '/mall/list.json';
      
    } catch (error) {
      // 오류 발생 시 오류 메시지 출력
      console.error("게시글 수정 오류:", error.toString());
      alert("게시글 수정 중 오류가 발생했습니다.");
    }
  }
 
   
  useEffect(()=>{
    callAPI();
  },[])

  if(loading) return <h1 className='text-center'>로딩중...</h1>
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
              onChange ={onChangeForm}
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
              onChange ={onChangeForm}
              name="mall_pstate"
              required
              fullWidth
              disabled
            >
              <MenuItem value={0}>중고</MenuItem>
              <MenuItem value={1}>미개봉,미사용</MenuItem>
            </TextField>
          </Grid>
          {mall_tstate===0 ?
              <>
              <Grid item xs={3}>
              <TextField
                label="Seed"
                type="number"
                name="mall_price"
                fullWidth
                value={mall_price}
                onChange={onChangeForm}
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
                onChange={onChangeForm}
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
                onChange={onChangeForm}
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
           
        {/* //     <Row eventkey="photo" title="첨부한 파일">
        //     {photo.map(img => 
        //      <Col   key={img.aid} xs={3} md={3} lg={3} >
              
        //            <div key={img.aid}className='mb-3'>
        //                <div style={{ position: 'relative' }} className="text-center">
        //                    <Badge 
        //                        bg='danger' style={{ position: 'absolute', top: '5px', right: '20px', cursor: 'pointer' }}>X</Badge>
        //                        <Badge 
        //                        bg='primary' style={{ position: 'absolute', top: '-20px', right: '10px', cursor: 'pointer' }}>
        //                          대표이미지
        //                        </Badge>
        //                    <img src={img.filename} alt={`첨부 파일 ${img.aid}`} style={imgStyle} />
        //                </div>
        //            </div>
              
        //      </Col>
        //     )}
        //  </Row> */}
         
            
          <Grid item xs={12} className="text-end">
            <Button  type="submit" variant="outline-secondary" >게시글 수정</Button>
            <Button  onClick={callAPI} variant="outline-secondary" >취소</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
      
    </div>
  )
}
export default UpdatePage