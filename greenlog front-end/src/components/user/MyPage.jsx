import React, { useEffect, useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { FaSeedling } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import MypageSlick from './MypageSlick';
import { PiUserCirclePlus } from "react-icons/pi";
import { PiUserCircleMinusThin } from "react-icons/pi";
import ModalFollower from '../follow/ModalFollower';
import ModalFollowing from '../follow/ModalFollowing';
import { CardActions, CardContent, Avatar, Typography, Chip, Stack, Box, Badge, Card, Grid } from '@mui/material';

//이미지를 누르면 정보수정페이지로 이동
//아이콘은 css로 움직일 예정
//슬릭슬라이더는 css추가로 입체적으로 제작 예정
//일기쓰기, 게시판쓰기 버튼을 누를시 각 쓰기 페이지로 이동 

const MyPage = () => {
  const { user_uid } = useParams();
  const [diary, setDiary] = useState([]);
  const [data, setData] = useState({});


  //일기내용 조회(슬라이더로 목록 만들기)
  const callAPI2 = async () => {
    const res = await axios.get(`/user/mypage2/${user_uid}`);
    //console.log(res.data);
    setDiary(res.data);
  }

  const callAPI4 = async () => {
    const res = await axios.get(`/user/mypage/${user_uid}`);
    //console.log(res.data);
    setData(res.data);
  }
  console.log(data);
  useEffect(() => {
    callAPI2();
    callAPI4();
  }, [])

  const onAddFollow = async () => {
    const res = await axios.post("/follow/addFollow", { follow_to: user_uid, follow_from: sessionStorage.getItem("uid") })
    if (res.data === 1) {
      alert("팔로우완료!")
      window.location.reload();
    } else {
      alert("이미 팔로우한 친구입니다!")
    }
  }


  const onUnFollow = async () => {
    const res = await axios.post("/follow/unFollow", { follow_to: user_uid, follow_from: sessionStorage.getItem("uid") })
    if (res.data === 1) {
      alert("삭제완료!")
      window.location.reload();
    } else {
      alert("팔로우하지 않은 친구입니다!")
    }
  }

  // const users = [
  //   { name: `팔로잉 : ${data.following_count}`, avatar: 'https://randomuser.me/api/portraits/women/1.jpg', },
  //   { name: `일기목록 : ${diary.length}`, avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  //   { name: `팔로워 : ${data.follower_count}`, avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
  //   { name: `피망마켓이용: ${data.auction_count}` , avatar: 'https://randomuser.me/api/portraits/women/2.jpg'},
  //   { name: `내 씨드 : ${data.seed_point}씨드`, avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
  //   { name: '일기쓰기', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' }
  // ];

  // const UserCard = ({ name, avatar }) => (
  //   <Card variant="outlined" style={{ marginBottom: '16px' }}>
  //     <CardContent style={{ display: 'flex', alignItems: 'center' }}>
  //       <Avatar alt={name} src={avatar} style={{ marginRight: '16px' }} />
  //       <Typography variant="body">{name}</Typography>
  //     </CardContent>
  //   </Card>
  // );


  return (
    <div>
       {user_uid === sessionStorage.getItem("uid") ?
      <h1 className='text-center my-5'>{data.user_nickname}님 환영합니다</h1> : 
      <h1 className='text-center my-5'>어서오세요. {data.user_nickname}님의 마이페이지입니다.</h1>}

      <Row className='my-5'>
        <Col lg={5}>
          <Link to={`/user/update/${user_uid}`}><img src={data.user_img || "http://via.placeholder.com/200x200"} width="100%" height="100%" /></Link>
        </Col>
        <Col lg={7}>
          {/* <Box sx={{ minWidth: 275, padding: '16px', }}>
              <Grid container spacing={2} justifyContent="space-between">
                <Grid item>
                  <Typography variant="h6" gutterBottom>
                    오늘도 탄소 지킴이 활동 톡톡히 하셨나요?
                  </Typography>
                </Grid>
                <Grid item>
                  {!(sessionStorage.getItem("uid") === user_uid) && (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <PiUserCirclePlus style={{ cursor: "pointer", fontSize: "50px" }} onClick={onAddFollow} />
                      <PiUserCircleMinusThin style={{ cursor: "pointer", fontSize: "50px" }} onClick={onUnFollow} />
                    </div>
                  )}
                </Grid>
              {/* <Grid item xs={12} md={6}>
              
                {users.slice(0, 3).map((user) => (
                  <UserCard key={user.name} name={user.name} avatar={user.avatar} />
                ))}
              </Grid>
              {user_uid === sessionStorage.getItem("uid") &&
              
              <Grid item xs={12} md={6}>
                {users.slice(3).map((user) => (
                  <UserCard key={user.name} name={user.name} avatar={user.avatar} />
                ))}
              </Grid>
}
            </Grid> 
          </Box> */}
        </Col>

      </Row>
      <div className='my-5'>
        <h4 className='text-center mb-3'>{data.user_nickname}님의 럭키클로버 일기</h4>
        <h5 className='text-center'>{data.user_ment}</h5>
      </div>
      <div className='mt-3 mb-5'>
        <Row className='justify-content-center'>
          <Col>
            <MypageSlick diary={diary} setDiary={setDiary} callAPI={callAPI2}  />
          </Col>
        </Row>
      </div>
      <div className='text-center'>
        <Link to="/diary/insert"><Button className='me-2'>일기쓰기</Button></Link>
        <Button>게시판쓰기</Button>
      </div>
    </div>
  )
}

export default MyPage