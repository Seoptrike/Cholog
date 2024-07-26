import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import { Pagination as MuiPagination } from '@mui/material';
import { styled, Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, Chip } from '@mui/material';
import ReportInsert from '../report/ReportInsert';
import CircularProgress from '@mui/material/CircularProgress';

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%', 
  maxWidth: '25rem', 
  height: 'auto',  
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: theme.shadows[10],
  },
}));

const StyledCol = styled(Col)(({ theme }) => ({
  marginBottom: theme.spacing(3),  
}));

const DiaryListPage = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [origin, setOrigin] = useState([]);
  const [checked, setChecked] = useState(0);
  const [size, setSize] = useState(3);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const { diary_writer } = useParams();
  const uid = sessionStorage.getItem("uid");

  const callAPI = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/diary/list.json/${diary_writer}?user_uid=${uid}&page=${page}&size=${size}`);
      const data = res.data.documents.map(diary => diary && { ...diary, checked: false });
      setList(data);
      setOrigin(data);
      setCount(res.data.total);
      console.log(count);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('데이터를 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
    
  };
  

  useEffect(() => {
    callAPI();
  }, [page, size]);

  useEffect(() => {
    let cnt = list.filter(diary => diary.checked).length;
    setChecked(cnt);
  }, [list]);

  const onChangeAll = (e) => {
    const data = list.map(diary => diary && { ...diary, checked: e.target.checked });
    setList(data);
  };

  const onChangeSingle = (e, diary_key) => {
    const isChecked = e.target.checked;
    const data = list.map(diary => diary.diary_key === diary_key ? { ...diary, checked: isChecked } : diary);
    setList(data);
  };

  const onClickDelete = async () => {
    if (!window.confirm("선택하신 일기를 삭제하시겠습니까?")) return;
    try {
      const deletePromises = list.filter(diary => diary.checked).map(diary =>
        axios.post(`/diary/delete/${diary.diary_key}`)
      );
      await Promise.all(deletePromises);
      alert(`${deletePromises.length}개 일기가 삭제되었습니다`);
      callAPI();
      setPage(1);
    } catch (error) {
      console.error('Error deleting diaries:', error);
      alert('일기 삭제에 실패했습니다.');
    }
  };

  const LikePress = async (diary_key) => {
    try {
      await axios.post(`/diary/like`, { user_uid: sessionStorage.getItem("uid"), diary_key });
      alert("좋아요를 눌렀습니다!");
      callAPI();
    } catch (error) {
      console.error('Error liking diary:', error);
      alert("이미 좋아요를 누른 일기입니다.");
    }
  };

  const LikeCancel = async (diary_key) => {
    try {
      await axios.post(`/diary/cancel`, { user_uid: sessionStorage.getItem("uid"), diary_key });
      alert("좋아요가 취소되었습니다");
      callAPI();
    } catch (error) {
      console.error('Error canceling like:', error);
      alert("좋아요를 이미 취소한 상태입니다.");
    }
  };

  const chipColors = {
    "개인컵/텀블러": "#FF6F61", // Coral
    "리필스테이션/개인용기": "#6B5B95", // Slate Blue
    "리사이클링 제작": "#88B04B", // Olive Green
    "전자영수증": "#F7CAC9", // Light Pink
    "친환경 제품구매": "#92A8D1", // Light Blue
    "재활용품 배출": "#F0B27A", // Light Orange
    "전기차 대여": "#E5E8E8", // Light Gray
    "봉사활동/개인 환경활동": "#D5AAFF", // Light Purple
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '20px' }}><CircularProgress /></div>;

  return (
    <div>
      <h1 className='my-5 text-center'>행운일기목록</h1>
      <Row className="mb-4">
        {(count === 0 || sessionStorage.getItem("uid") === diary_writer) &&
          <>
            <div>
              <input type="checkbox" onChange={onChangeAll} checked={list.length === checked} className='me-2' /> 전체선택
            </div>
            <div className='text-end mb-2'>
              <Button onClick={onClickDelete}>선택삭제</Button>
            </div>
          </>
        }
      </Row>
      <Row className="justify-content-center">
        {list.map(d =>
          <StyledCol lg={3} key={d.diary_key}>
            <StyledCard>
              <CardHeader
                avatar={
                  <Avatar src={d.user_img} aria-label="recipe" sx={{ width: 40, height: 40 }} />
                }
                action={
                  <input 
                    type="checkbox" 
                    onChange={(e) => onChangeSingle(e, d.diary_key)} 
                    checked={d.checked} 
                    className='me-2' 
                  />
                }
                title={<Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                  <a href={`/user/read/${d.diary_writer}`} style={{ textDecoration: 'none', color: 'inherit' }}>{d.diary_writer}</a>
                </Typography>}
                subheader={d.fmtUdate ? `${d.fmtDdate}` : `${d.fmtUdate}[수정됨]`}
              />
              <CardMedia
                component="img"
                height="194"
                src={d.diary_thumbnail || "http://via.placeholder.com/100x100"}
                alt={d.diary_title}
              />
              <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Chip
                  label={d.diary_state}
                  style={{ backgroundColor: chipColors[d.diary_state] || "#6B5B95", color: "#fff" }}
                />
                <div>
                  <IconButton
                    aria-label={d.ucnt === 0 ? "like" : "unlike"}
                    onClick={() => d.ucnt === 0 ? LikePress(d.diary_key) : LikeCancel(d.diary_key)}
                    sx={{ fontSize: 18 }}
                  >
                    {d.ucnt === 0 ? <FaRegThumbsUp /> : <FaThumbsUp />}
                  </IconButton>
                  <IconButton aria-label="report" sx={{ fontSize: 18 }}>
                    <ReportInsert uid={uid} origin={d.diary_key} writer={d.diary_writer} root="diary" />
                  </IconButton>
                </div>
              </CardActions>
              <CardContent sx={{ paddingBottom: 1, paddingTop: 0 }}>
                <Typography variant="h6" sx={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: 1 }}>
                  {d.diary_title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ overflow: "hidden" }}>
                  <div className='ellipsis'>{d.diary_contents}</div>
                </Typography>
              </CardContent>
            </StyledCard>
          </StyledCol>
        )}
      </Row>
      {count > size && (
        <Row className="pagination-container">
          <Col xs={12} md={10}>
            <MuiPagination
              count={Math.ceil(count / size)}
              page={page}
              onChange={handlePageChange}
              color="standard"
              variant="outlined"
              shape="rounded"
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default DiaryListPage;
