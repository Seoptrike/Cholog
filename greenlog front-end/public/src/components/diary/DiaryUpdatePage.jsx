import React from 'react'
import { Card, Row, Col, InputGroup, Form, Button } from 'react-bootstrap'

//수정버튼 눌렀을 시 일기읽기페이지로 돌아가기
const DiaryUpdatePage = () => {
  return (
    <div>
      <div className='text-center my-5'>
        <h4>000님의 0번 일기입니다.</h4><br /><h5>수정시에는 포인트 적립이 되지 않습니다.</h5>
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
                    포인트가 이미 차감된 경우, <br />
                    수정을 하더라도 다시 포인트를 적립할 수는 없습니다.<br />
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
                <InputGroup className='mb-5'>
                  <Form.Control as="textarea" rows={20} />
                </InputGroup>
              </Col>
            </Row>
            <div className='text-center mb-5'>
              <Button className='me-2 px-4'>수정</Button>
              <Button className='px-4'>취소</Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default DiaryUpdatePage