
import React, { useState } from "react";
import { TextField, Grid, Typography, Paper, MenuItem} from "@mui/material";
import { Form, Row, Col,Button, Badge } from "react-bootstrap";
import axios from "axios";



const InsertPage = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const uid = sessionStorage.getItem("uid");
  const [form, setForm] = useState({
    mall_seller :uid , 
    mall_buyer :uid  , 
    mall_title :"" , 
    mall_info :"" , 
    mall_price :100 , 
    mall_photo :"" , 
    mall_tstate :0 , 
    mall_pstate :0 ,
    endDate: tomorrow 
  });

  

  const onChangeForm = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const uploadedFiles = Array.from(files); 
      // 파일 업로드 경우
      setForm((prevData) => ({
        ...prevData,
        [name]: uploadedFiles 
      }));
    } else {
      // 일반 입력 필드 경우
      setForm((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };
  const dummyData = [
   { aid: 1, filename: '/images/sorry.png' },
    { aid: 2, filename: '/images/sorry.png' },
    { aid: 3, filename: '/images/sorry.png' }
  ];

  // 상태 변수와 이벤트 핸들러 등을 정의
  const [photo, setPhoto] = useState(dummyData);

  const imgStyle = {
    width: '90%',
    height: 'auto',
    borderRadius: '1px'
  };
  const onSubmit =async(e)=>{
    e.preventDefault();
    if(!window.confirm("피망마켓에 등록하실래요?")) return;
    //게시글등록
    await axios.post('/mall/insert',form );
    alert("게시글등록완료!");
    window.location.href='/mall/list.json';
  }
  

  return (
    <div className="my-5">
      <Paper elevation={3} style={{ padding: 20 }}>
      <Typography variant="h3" gutterBottom className="text-center">
        피망마켓에 글쓰기
      </Typography>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <TextField
              name="mall_title"
              label="제목"
              value={form.mall_title}
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
              value={form.mall_tstate}
              onChange ={onChangeForm}
              name="mall_tstate"
              required
              fullWidth
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
              value={form.mall_pstate}
              onChange ={onChangeForm}
              name="mall_pstate"
              required
              fullWidth
            >
              <MenuItem value={0}>중고</MenuItem>
              <MenuItem value={1}>미개봉,미사용</MenuItem>
            </TextField>
          </Grid>
          {form.mall_tstate===0 ?
              <>
              <Grid item xs={3}>
              <TextField
                label="Seed"
                type="number"
                name="mall_price"
                fullWidth
                value={form.mall_price}
                onChange={onChangeForm}
                
                required
              />
              </Grid>
              <Grid item xs={3}>
              <TextField
                label="경매낙찰날짜"
                type="date"
                name="endDate"
                fullWidth
                value={form.endDate.toISOString().split('T')[0]} // endDate를 ISO 문자열로 변환하여 사용
                onChange={onChangeForm}
                required
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
                value={0}
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
              required
              multiline
              value={form.mall_info}
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
                    value={form.mall_photo}
                    onChange={onChangeForm}
                  />
                </Col>
              </Form.Group>
            </Grid>
            <Row eventkey="photo" title="첨부한 파일">
               {photo.map(img => 
                <Col   key={img.aid} xs={3} md={3} lg={3} >
                 
                      <div key={img.aid}className='mb-3'>
                          <div style={{ position: 'relative' }} className="text-center">
                              <Badge 
                                  bg='danger' style={{ position: 'absolute', top: '5px', right: '20px', cursor: 'pointer' }}>X</Badge>
                              <img src={img.filename} alt={`첨부 파일 ${img.aid}`} style={imgStyle} />
                          </div>
                      </div>
                 
                </Col>
               )}
            </Row>
          <Grid item xs={12} className="text-end">
            <Button  type="submit" variant="outline-secondary" >게시글 작성</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
      
    </div>
    
  )
}

export default InsertPage