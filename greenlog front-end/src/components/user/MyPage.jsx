import React from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap'
import SlidePage from '../../common/useful/SlidePage'
import { FaSeedling } from "react-icons/fa";
import { Padding } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';


//이미지를 누르면 정보수정페이지로 이동
//link to를 이용
//아이콘은 css로 움직일 예정
//슬릭슬라이더는 css추가로 입체적으로 제작 예정
//슬릭슬라이더를 누를 시, 일기읽기페이지로 이동
//일기쓰기, 게시판쓰기 버튼을 누를시 각 쓰기 페이지로 이동 

const MyPage = () => {
  const {user_uid} = useParams();

  return (
    <div>
      <h1 className='text-center my-5'>000님 환영합니다</h1>
      <Row className='my-5'>
        <Col lg={5}>
          <Link to={`/user/update/${user_uid}`}><img src="http://via.placeholder.com/200x200" width="100%" /></Link>
        </Col>
        <Col lg={7}>
          <Card>
            <Card.Body>
              <span>오늘도 탄소지킴이 역할을 톡톡히 하셨나요?</span>
              <div>
                <Row>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Link to={"#"}>포인트: 000점</Link>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Link to={"#"}>피망이용건: 00건</Link>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Link to={"#"}>팔로우:00</Link>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Link to={"#"}>팔로잉:00</Link>
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
        <h4 className='text-center mb-3'>000님의 럭키클로버 일기</h4>
        <h5 className='text-center'>한줄소개</h5>
      </div>
      <div className='mt-3 mb-5'>
        <SlidePage />
      </div>
      <div className='text-center'>
        <Button>일기쓰기</Button>
        <Button>게시판쓰기</Button>
      </div>  
    </div>
  )
}

export default MyPage