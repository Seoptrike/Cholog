import React, { useState } from 'react'
import { Card, Row, Col, InputGroup, Form, Button } from 'react-bootstrap'

//파일을 눌렀을 시, textarea에 이미지가 들어가야함 *아마도 text형식이어서 조금 어려울 것으로 파악
//등록버튼 눌렀을 시, 경고창에 포인트는 적립되나, 차감될 수도 있다는 경고창 주기
//등록 후, 일기읽기페이지로 돌아가기
//파일에 사진넣기 공간으로 사진여러개 넣는거 출력
const DiaryInsertPage = () => {
  return (
    <div>
      <div className='text-center my-5'>
        <h4>오늘은 어떤 활동을 하셨나요?</h4><br /><h5>행운일기를 통해 알려주세요</h5>
      </div>
      <Row className='justify-content-center mb-3'>
        <Col lg={8}>
          <Card>
            <h5 className='text-center my-3'>활동 카테고리를 선택해주세요</h5>
            <Row className='justify-content-center'>
              <Col lg={10}>
                <InputGroup className='text-center mb-3'>
                  <Form.Select>
                    <option>개인컵 활용(카페/사무실/식당)</option>
                    <option>용기 활용(리필스테이션/배달음식)</option>
                    <option>리사이클링 제작(리사이클링/업사이클링)</option>
                    <option>전자영수증(쇼핑)</option>
                    <option>친환경 제품구매(제로웨이스트/업사이클링/리사이클링)</option>
                    <option>재활용품 배출(폐휴대폰반납)</option>
                    <option>전기차 대여(대여만 가능, 반납일 캡쳐)</option>
                    <option>봉사활동(쓰레기줍기, 봉사활동참여)</option>
                  </Form.Select>
                </InputGroup>
                <Form.Control as="template" className='mb-5'>
                  <div className='text-muted'>
                    관리자가 하나하나 체크하고 있습니다. <br />
                    관련 일기가 아닐 시, 권한이 제한될 수 있으며 <br />
                    적립된 포인트가 차감될 수 있으니 이점 유의해주시기 바랍니다.<br />
                    사진은 필수첨부입니다.
                  </div>
                </Form.Control>
                <InputGroup className='mb-3'>
                  <InputGroup.Text>제목</InputGroup.Text>
                  <Form.Control />
                </InputGroup>
                <InputGroup className='mb-3'>
                  <input type="file" />
                </InputGroup>
                <div>사진미리보기공간</div>
                <InputGroup className='mb-5'>
                  <Form.Control as="textarea" rows={20} />
                </InputGroup>
              </Col>
            </Row>
            <div className='text-center mb-5'>
              <Button className='me-2 px-4'>등록</Button>
              <Button className='px-4'>취소</Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default DiaryInsertPage