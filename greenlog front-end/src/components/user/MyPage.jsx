import React, { useEffect, useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { FaSeedling } from "react-icons/fa";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import MypageSlick from './MypageSlick';
import { PiUserCirclePlus } from "react-icons/pi";
import { PiUserCircleMinusThin } from "react-icons/pi";
import { TbBrandSnapseed } from "react-icons/tb";
import mypage from './mypage.png'
import { CardActions, CardContent, Avatar, Typography, Chip, Stack, Box, Badge, Card, Grid } from '@mui/material';

//이미지를 누르면 정보수정페이지로 이동
//아이콘은 css로 움직일 예정
//슬릭슬라이더는 css추가로 입체적으로 제작 예정
//일기쓰기, 게시판쓰기 버튼을 누를시 각 쓰기 페이지로 이동 

const MyPage = () => {
  const { user_uid } = useParams();
  const [diary, setDiary] = useState([]);
  const [follow, setFollow] = useState("");
  const [data, setData] = useState({});
  const navi = useNavigate();


  //일기내용 조회(슬라이더로 목록 만들기)
  const callAPI2 = async () => {
    const res = await axios.get(`/user/mypage2/${user_uid}`);
    //console.log(res.data);
    setDiary(res.data);
  }

  const callAPI3 = async () => {
    const res = await axios.post('/follow/chkfollow', { follow_to: user_uid, follow_from: sessionStorage.getItem("uid") })
    console.log(res.data);
    setFollow(res.data);
  }

  const callAPI4 = async () => {
    const res = await axios.get(`/user/mypage/${user_uid}`);
    //console.log(res.data);
    setData(res.data);
  }
  console.log(data);
  useEffect(() => {
    callAPI2();
    callAPI3();
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





  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <img src={mypage} alt="car" style={{ width: '100%', maxWidth: '1000px' }} />
      </div>
      {user_uid === sessionStorage.getItem("uid") ?
        <h3 className='text-center my-5'>{data.user_nickname}님 환영합니다</h3> :
        <h3 className='text-center my-5'>어서오세요. {data.user_nickname}님의 마이페이지입니다.</h3>}
      <Row className='my-5'>
        <Col xs={8} md={6} lg={4}>
          <Grid item>
            <img src={data.user_img || "http://via.placeholder.com/200x200"} width="400rem" />
          </Grid>
        </Col>
        <Col xs={7} md={6} lg={8}>
          <Card>
            <Box sx={{ minWidth: 275, padding: '16px', }}>
              <Grid container spacing={2} justifyContent="space-between">
                <Grid item >
                  <Row className='justify-content-center'>
                    <Col xs={6} md={5} lg={4}>
                      <Card style={{ cursor: "pointer" }} onClick={() => navi(`/user/follower/${user_uid}`)}>
                        <div className='text-center'>
                          <img src="/images/green.png" style={{ cursor: "pointer", width: "20%" }} />
                          <span>
                            팔로워 : {data.follower_count}
                          </span>
                        </div>
                      </Card>
                    </Col>
                    <Col xs={6} md={5} lg={4}>
                      <Card style={{ cursor: "pointer" }} onClick={() => navi(`/user/following/${user_uid}`)}>
                        <div className='text-center'>
                          <img src="/images/green.png" style={{ cursor: "pointer", width: "20%" }} />
                          <span>
                            팔로잉 : {data.following_count}
                          </span>
                        </div>
                      </Card>
                    </Col>
                    {!(sessionStorage.getItem("uid") === user_uid) && (
                      <Col xs={1} md={3} lg={2}>
                        <Grid item>
                          <div style={{ display: 'flex' }}>
                            {follow ? <PiUserCircleMinusThin style={{ cursor: "pointer", fontSize: "50px" }} onClick={onUnFollow} />
                              : <PiUserCirclePlus style={{ cursor: "pointer", fontSize: "50px" }} onClick={onAddFollow} />
                            }
                          </div>

                        </Grid>
                      </Col>
                    )}
                  </Row>
                </Grid>
                {(sessionStorage.getItem("uid") === user_uid) &&
                  <>
                    <Grid item xs={12}>
                      <Row className='justify-content-center'>
                        <Col xs={6} md={5} lg={4}>
                          <Card style={{ cursor: "pointer", padding: "20px" }} onClick={() => navi(`/auction/list.json/${user_uid}`)}>
                            <div className='text-center'>
                              <span>
                                피망마켓이용건 : {data.auction_count}
                              </span>
                            </div>
                          </Card>
                        </Col>
                        <Col xs={6} md={5} lg={4}>
                          <Card style={{ cursor: "pointer", padding: "20px" }} onClick={() => navi(`/user/wallet/${user_uid}`)}>
                            <div className='text-center'>
                              <span>
                                내 씨드 : {data.seed_point}
                                <TbBrandSnapseed style={{ fontSize: '15px', color: 'brown', verticalAlign: 'middle' }} />
                              </span>
                            </div>
                          </Card>
                        </Col>
                      </Row>
                    </Grid>
                    <Grid item xs={12}>
                      <Row className='justify-content-center'>
                        <Col xs={6} md={5} lg={4}>
                          <Card style={{ cursor: "pointer", padding: "20px" }} onClick={() => navi(`/diary/insert`)}>
                            <div className='text-center'>
                              <span>일기쓰기 </span>
                            </div>
                          </Card>
                        </Col>
                        <Col xs={6} md={5} lg={4}>
                          <Card style={{ cursor: "pointer", padding: "20px" }} onClick={() => navi(`/user/update/${user_uid}`)}>
                            <div className='text-center'>
                              <span>내 정보수정 </span>
                            </div>
                          </Card>
                        </Col>
                      </Row>
                    </Grid>
                  </>
                }
              </Grid>

            </Box>
          </Card>
          {!(sessionStorage.getItem("uid") === user_uid) && (
            <Box sx={{ padding: '16px' }}>
              <Row className='justify-content-center'>
                <Col>
                  <MypageSlick diary={diary} setDiary={setDiary} />
                </Col>
              </Row>
            </Box>
          )}
        </Col>
      </Row>
      <div className='my-5'>
        <h4 className='text-center mb-3'>{data.user_nickname}님의 럭키클로버 일기</h4>
        <h5 className='text-center'>{data.user_ment}</h5>
      </div>
      <div className='mt-3 mb-5'>
        <Row className='justify-content-center'>
          <Col>
            <MypageSlick diary={diary} setDiary={setDiary} />
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