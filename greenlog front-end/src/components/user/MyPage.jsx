import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap'
import SlidePage from './SlidePage'
import { FaSeedling } from "react-icons/fa";
import { Padding } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';


//이미지를 누르면 정보수정페이지로 이동
//link to를 이용
//아이콘은 css로 움직일 예정
//슬릭슬라이더는 css추가로 입체적으로 제작 예정
//슬릭슬라이더를 누를 시, 일기읽기페이지로 이동
//일기쓰기, 게시판쓰기 버튼을 누를시 각 쓰기 페이지로 이동 

const MyPage = () => {
  const { user_uid } = useParams();
  const [diary, setDiary] = useState("");
  const [trade, setTrade] = useState("");
  const [follow, setFollow] =useState("");


  //포인트조회 및 거래내역, 유저(닉네임, 이미지정보)
  const callAPI = async () => {
    const res = await axios.get("/user/mypage1");
    console.log(res.data);
    setTrade(res.data);
  }

  //일기내용 조회(슬라이더로 목록 만들기)
  const callAPI2 = async () => {
    const res = await axios.get(`/user/mypage2/${user_uid}`);
    console.log(res.data);
    setDiary(res.data);
  }

  //팔로우, 팔로잉 수
  const callAPI3 = async ()=>{
    const res = await axios.get(`/user/mypage3/${user_uid}`);
    console.log(res.data);
    setFollow(res.data);
  }


  useEffect(() => {
    callAPI();
    callAPI2();
    callAPI3();
  }, [])

  return (
    <div>
      <h1 className='text-center my-5'>{trade.user_nickname}님 환영합니다</h1>
      <Row className='my-5'>
        <Col lg={5}>
          <Link to={`/user/update/${user_uid}`}><img src={"http://via.placeholder.com/200x200"} width="100%" /></Link>
        </Col>
        <Col lg={7}>
          <Card>
            <Card.Body>
              <span>오늘도 탄소지킴이 역할을 톡톡히 하셨나요?</span>
              <div className='mt-2'>
                <Row>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Link to={`/user/wallet/${user_uid}`}>씨드: {trade.seed_point}점</Link>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Link to={`/auction/list.json/${user_uid}`}>피망이용: {trade.auction}건</Link>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Link to={"/user/follower"}>팔로워: {follow.ftotal}</Link>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Link to={"/user/following"}>팔로잉: {follow.ttotal}</Link>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>
              <div>
                <FaSeedling style={{ fontSize: "100px", position: "bottom" }} />
                <FaSeedling style={{ fontSize: "100px", position: "bottom", Padding: "20px" }} />
                <FaSeedling style={{ fontSize: "100px", position: "bottom", Padding: "20px" }} />
                <FaSeedling style={{ fontSize: "100px", position: "bottom", Padding: "20px" }} />
              </div>
            </Card.Body>
          </Card>
        </Col>

      </Row>
      <div className='my-5'>
        <h4 className='text-center mb-3'>{trade.user_nickname}님의 럭키클로버 일기</h4>
        <h5 className='text-center'>{trade.user_ment}</h5>
      </div>
      <div className='mt-3 mb-5'>
        <SlidePage diary={diary} setDiary={setDiary}/>
      </div>
      <div className='text-center'>
        <Link to="/diary/insert"><Button className='me-2'>일기쓰기</Button></Link>
        <Button>게시판쓰기</Button>
      </div>
    </div>
  )
}

export default MyPage