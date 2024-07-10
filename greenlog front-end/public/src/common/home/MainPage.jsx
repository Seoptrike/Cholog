import axios from 'axios';
import React, { useEffect } from 'react'
import { InputGroup, Form, Button, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import SeoulMap from '../useful/SeoulMap';
import SeoulMapChart from './SeoulMapChart';
import O3Chart from './O3Chart';
import MainSlider from './MainSlider';
import MallSlider from './MallSlider';

const MainPage = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/diary/insert');  // 원하는 경로로 변경하세요.
    }
    
    return (
        <div>
            <div style={{
                position: 'relative',
                width: '100%',
                height: '1rem',  // 배경 이미지의 높이를 설정합니다.
                minHeight: '40vh',  // 최소 높이를 설정하여 너무 작아지지 않도록 합니다.
                backgroundImage: "url('/images/banner.png')",
                backgroundSize: 'cover',  // 배경 이미지를 화면에 꽉 채우도록 설정합니다.
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',  // 배경 이미지를 가운데 정렬합니다.
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 0,
                padding: 0,
            }}>
                <div style={{
                    position: 'absolute',
                    top: '7rem',  // 원하는 위치로 조정
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '40rem',  // 인풋 상자의 너비를 조정
                    padding: '10px',
                    borderRadius: '20px',
                    textAlign: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',  // 배경색을 투명하게 설정합니다.
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Form.Control
                        placeholder='오늘의 활동을 기록해주세요!'
                        onClick={handleClick}
                        style={{ width: '100%', fontSize: '16px', border: 'none', background: 'none', outline: 'none' }}  // 인풋 상자의 스타일을 조정합니다.
                    />
                </div>
            </div>
            <Row>
                <Col xs={8}>
                    <MallSlider/>
                </Col>
                <Col xs={4}>
                    <MainSlider />
                </Col>
            </Row>
            <Row>
                <h5 className='text-center'>새로 올라온 피망</h5>
            </Row>
        </div>
    )
}

export default MainPage