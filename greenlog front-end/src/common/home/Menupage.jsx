import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'
import RouterPage from '../../routers/RouterPage';
import TotalPage from '../../components/TotalPage';

const Menupage = () => {
    const uid= sessionStorage.getItem("uid");
    const onClickLogout = () => {
        sessionStorage.clear();
        window.location.href = '/'
    }
    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark" style={{ height: "3rem", margin: 0, padding: 0 }}>
                <Container>
                    <Navbar.Brand href="/">
                        <img src="/images/green.png" alt="Icon" style={{ width: "2.5rem", marginRight: "0.5rem" }} />
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <NavDropdown title="초록" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/about/greenlog">초록소개</NavDropdown.Item>
                            <NavDropdown.Item href="/about/clover">함께하는 사람들</NavDropdown.Item>
                            <NavDropdown.Item href="/about/seed">씨앗이란?</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="피망 마켓" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">베스트 물품</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">피망 몰</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="클로버 숲" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">공지사항</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">이벤트 안내</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.3">꿀팁 게시판</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.4">자유게시판</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.3">1대1 문의하기</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">자주 묻는 질문</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        {sessionStorage.getItem("uid") ?
                            <>
                                <span className='me-3' style={{ float: "right" }}><a href={`/user/read/${uid}`}>{sessionStorage.getItem("uid")}님 </a></span>
                                <span onClick={onClickLogout} className='me-3' style={{ float: "right" }}><a href='#'>로그아웃</a></span>
                            </>
                            :
                            <span className='me-3' style={{ float: "right" }}><Link className="mx-3" to='/user/login'>로그인</Link></span>
                        }
                    </Nav>
                </Container>
            </Navbar>
            <RouterPage />
            <TotalPage/>
        </div>
    )
}

export default Menupage