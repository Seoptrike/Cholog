import React, { useState } from "react";
import { TextField, Grid, Typography, Paper } from "@mui/material";
import { Form, Row, Col, Badge , Button} from "react-bootstrap";

export const UpdatePage = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    date: "",
    seed: 0,
    endDate: tomorrow,
    photo: null, // 이미지 파일을 담을 상태 변수 추가
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      // 파일 업로드 경우
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0], // 첫 번째 파일만 업로드
      }));
    } else {
      // 일반 입력 필드 경우
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // 첨부된 이미지 목록 (더미 데이터로 초기화)
  const dummyData = [
    { aid: 1, filename: '/images/sorry.png' },
    { aid: 2, filename: '/images/sorry.png' },
    { aid: 3, filename: '/images/sorry.png' }
  ];

  // 상태 변수와 이벤트 핸들러 등을 정의
  const [attaches, setAttaches] = useState(dummyData);

  const imgStyle = {
    width: '90%',
    height: 'auto',
    borderRadius: '1px'
  };

  // 이미지 삭제 처리
  const onClickDelete = (att) => {
    const updatedAttaches = attaches.filter(item => item.aid !== att.aid);
    setAttaches(updatedAttaches);
  };

  // 게시글 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 제출 로직
    console.log(formData);
  };
  return (
    <div>
      <h1>수정</h1>
      <div className="my-5">
      <Paper elevation={3} style={{ padding: 20 }}>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="title"
                label="제목"
                fullWidth
                required
                value={formData.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                label="Seed"
                type="number"
                name="seed"
                fullWidth
                value={formData.seed}
                onChange={handleChange}
                min="0"
                required
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="경매낙찰날짜"
                type="date"
                name="endDate"
                fullWidth
                value={formData.endDate.toISOString().split('T')[0]} // endDate를 ISO 문자열로 변환하여 사용
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="content"
                label="내용"
                fullWidth
                required
                multiline
                rows={4}
                value={formData.content}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Form.Group as={Row} className="mb-3">
                <Col sm={12}>
                  <Form.Control
                    type="file"
                    name="photo"
                    width="100%"
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>
            </Grid>
            <Row className="my-5" eventkey="attach" title="첨부한 파일">
              {attaches.map(att => (
                <Col key={att.aid} xs={3} md={3} lg={3} className="mb-3">
                  <div style={{ position: 'relative' }}>
                    <Badge
                      onClick={() => onClickDelete(att)}
                      bg='danger'
                      style={{ position: 'absolute', top: '1em', right: '4em', cursor: 'pointer' }}
                    >
                      X
                    </Badge>
                    <img src={att.filename} alt={`첨부 파일 ${att.aid}`} style={imgStyle} />
                  </div>
                </Col>
              ))}
            </Row>
            <Grid item xs={12} className="text-end">
               <Button type="reset" className="me-2 px-5">수정 취소</Button>
               <Button type="submit" className=" px-5">게시글 수정</Button>
             
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
    </div>
  )
}
export default UpdatePage


