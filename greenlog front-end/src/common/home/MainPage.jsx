import React from 'react'
import { InputGroup,Form,Button } from 'react-bootstrap'

const MainPage = () => {
    return (
        <div style={{
            backgroundImage: "url('/images/banner.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top",
            width: "100%",
            height: "40rem",  // 높이를 자동으로 설정하여 이미지 비율을 유지합니다.
            minHeight: "50vh",  // 최소 높이를 설정하여 너무 작아지지 않도록 합니다.
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 0,  // 외부 마진을 제거합니다.
            padding: 0,  // 내부 패딩을 제거합니다.
            position: 'relative'
        }}>
             <InputGroup  style={{
                    position: 'absolute',
                    top: '7rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '40rem',  // 인풋 상자의 너비를 200px로 설정
                    height: '5rem',  // 인풋 상자의 높이를 40px로 설정
                    padding: '10px',  // 인풋 상자의 내부 패딩을 10px로 설정
                    fontSize: '16px',  // 인풋 상자의 글꼴 크기를 16px로 설정
                    borderRadius: '20px',  // 모서리를 둥글게 설정
                    textAlign: 'center',  // 텍스트를 중앙 정렬
                    lineHeight: '100px'  // 텍스트가 중앙에 오도록 설정
                }}>
                    <Form.Control placeholder='오늘의 활동을 기록해주세요!'/>
                   <Button>등록</Button>
             </InputGroup>
        </div>
    )
}

export default MainPage