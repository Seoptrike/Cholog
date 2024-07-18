import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap'
import { FaSeedling } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import MypageSlick from './MypageSlick';
import { PiUserCirclePlus } from "react-icons/pi";
import { PiUserCircleMinusThin } from "react-icons/pi";
import ModalFollower from '../follow/ModalFollower';
import ModalFollowing from '../follow/ModalFollowing';

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

  return (
    <div>
      <h1 className='text-center my-5'>{data.user_nickname}님 환영합니다</h1>
      <div className='text-end'>
        {sessionStorage.getItem("uid") === user_uid &&
          <div>
            <PiUserCirclePlus style={{ cursor: "pointer", fontSize: "60px" }} onClick={onAddFollow} />
            <PiUserCircleMinusThin style={{ cursor: "pointer", fontSize: "60px" }} onClick={onUnFollow} />
          </div>
        }
      </div>
      <Row className='my-5'>
        <Col lg={5}>
          <Link to={`/user/update/${user_uid}`}><img src={data.user_img || "http://via.placeholder.com/200x200"} width="100%" height="100%" /></Link>
        </Col>
        <Col lg={7}>
          <Card>
            <Card.Body>
              <h3 className='text-center'>오늘도 탄소지킴이 역할을 톡톡히 하셨나요?</h3>
              <div className='mt-2'>
                <Row>
                  {user_uid === sessionStorage.getItem("uid") &&
                    <Row>
                      <Col>
                        <Card>
                          <Card.Body>
                            <Link to={`/user/wallet/${user_uid}`}>씨드: {data.seed_point}점</Link>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col>
                        <Card>
                          <Card.Body>
                            <Link to={`/auction/list.json/${user_uid}`}>피망이용: {data.auction_count}건</Link>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  }
                  <Col>
                    <Card>
                      <Card.Body>
                        <span><ModalFollower uid={user_uid} cnt={data.follower_count} /></span>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <span><ModalFollowing uid={user_uid} cnt={data.follower_count} /></span>
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