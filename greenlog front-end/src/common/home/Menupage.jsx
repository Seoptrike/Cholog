import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'
import RouterPage from '../../routers/RouterPage';
import TotalPage from '../../components/TotalPage';
import BottomPage from './BottomPage';
import { UserContext } from '../../components/user/UserContext';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { RiUserSettingsFill } from "react-icons/ri";


const Menupage = () => {
    const uid = sessionStorage.getItem("uid");
    const onClickLogout = () => {
        sessionStorage.clear();
        window.location.href = '/'
    }

    const onClickLogin = () => {
        window.location.href = '/user/login'
    }

    const onClickIcon = () => {
        window.location.href = `/user/read/${uid}`
    }

    const onClickAdmin = () => {
        window.location.href = '/admin/dash'
    }

    const { userData } = useContext(UserContext);
    console.log(userData);

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
                            <NavDropdown.Item href="/mall/pop">베스트 물품</NavDropdown.Item>
                            <NavDropdown.Item href="/mall/list.json">피망 몰</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="클로버 숲" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/bbs/list.json">자유게시판</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/community/event/list.json">캠페인</NavDropdown.Item>
                            <NavDropdown.Item href="/about/carspot">나눔카</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="고객센터" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/community/faq/list.json">FAQ,Q&A,공지사항</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/community/ask/list.json">1대1 문의하기</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>

                        {userData.auth === '관리자' &&
                            <>
                                <span className='me-3' style={{ float: "right", fontSize:"18px", color: "white", cursor: "pointer" }}
                                    onClick={onClickAdmin}><RiUserSettingsFill /></span>
                            </>
                        }

                        {sessionStorage.getItem("uid") ?
                            <>
                                <span className='me-3' style={{ float: "right", color: "white", cursor: "pointer" }} onClick={onClickIcon}><AccountCircleIcon /></span>
                                <span onClick={onClickLogout} className='me-3' style={{ float: "right", color: "white", cursor: "pointer" }}><LogoutIcon /></span>

                            </>
                            :
                            <span className='me-3' style={{ float: "right", color: "white", cursor: "pointer" }} onClick={onClickLogin}>로그인</span>
                        }
                    </Nav>
                </Container>
            </Navbar>
            <RouterPage />
            <BottomPage />
            <TotalPage />
        </div>
    )
}

export default Menupage