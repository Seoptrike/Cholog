import React, { useEffect, useState } from 'react';
import { Nav, TabContent, Row, Col, Table, Card } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import AllImage from '../read/AllImage';
import SellerList from '../read/SellerList';
import SellerInfo from '../read/SellerInfo';
import Slider from "react-slick";

import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import InsertPage from '../../review/InsertPage';
import ReviewPage from '../../review/ReviewPage';

const ReadPage = () => {
    const navi = useNavigate();
    const { mall_key } = useParams();
    const uid = sessionStorage.getItem("uid");
    //console.log(mall_key);
    const [form, setForm] = useState({});
    const [list, setList] = useState([]);//슬라이드


    console.log("read!!!!!!!!!!!!!!" + form);

    const [activeTab, setActiveTab] = useState('1');

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };
    //경매시스템 위해서 넣어놓음 -인섭
    const [seedNumber, setSeedNumber] = useState({})
    const { seed_number } = seedNumber
    const callAPI = async () => {
        const res = await axios.get(`/mall/read/${mall_key}`);
        console.log("****************************", res.data);
        setForm(res.data);
        //경매시스템 위해서 넣어놓음 -인섭
        const res2 = await axios.get(`/seed/read/${res.data.mall_seller}`)
        setSeedNumber(res2.data)
        //슬라이드
        const res3 = await axios.get(`/mall/list/${res.data.mall_seller}?page=1&size=6`)
        //console.log("ListPage : "+ JSON.stringify(res.data));
        setList(res3.data);//슬라이드할 유저가 올린 테이블리스트

    }
    const { fmtudate, mall_uDate, mall_seller, mall_title, mall_info, mall_price, mall_regDate, mall_photo, mall_tstate, mall_pstate, mall_endDate, user_uname, user_address1 } = form;
    useEffect(() => {
        callAPI();
    }, [mall_key]) // 판매자정보에서 누르면 url만 바뀌고 안가서 넣어줘야함!

    const onClickUpdate = () => {
        navi(`/mall/update/${mall_key}`);
    }

    const onClickDelete = async () => {
        //console.log("0000000000000000000000000>>>>>>>>>>>"+mall_key);
        if (!window.confirm(`${mall_key}번 글을 정말 삭제하시겠습니까?`)) return;
        try {
            await axios.post(`/mall/delete/${mall_key}`);
            callAPI();
            navi("/mall/list.json")
        } catch (error) {
            alert("삭제실패! 댓글이 존재합니다!")
        }

    }
    const mapST = {
        width: '100%',
        height: '100%',
        Padding: "0px 0px"
    };
    const photoST = {
        width: '100%',
        height: '100%'
    }
    const sellerList = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    const slideImg = {
        width: "7rem",
        height: "7rem",
        border:"1px solid green",
        borderRadius:"20%"
    }


    return (
        <div className="read-page mb-5" >
            <h1>리드페이지</h1>
            <div className='my-5'>
                <div>
                    <Row className=' align-items-center'>
                        <Col className=' text-center  text-middle' xs={6} sm={6} md={6} lg={6} xl={6} style={{ whiteSpace: "nowrap" }}>
                            <img style={photoST} src={mall_photo ? mall_photo : ' http://via.placeholder.com/300x300'} alt='상품대표이미지' />
                        </Col>
                        <Col className='' xs={6} sm={6} md={6} lg={6} xl={6} style={{ whiteSpace: "nowrap" }} >
                            <Row className=''style={{height:"20rem"}} >
                                <Table bordered>
                                    <tbody>
                                        <tr>
                                            {mall_seller === uid ?
                                                <>
                                                    <td className='ellipsis' style={{ width: "78%",borderRight: "0px",height:"4rem" }}>{mall_title}</td>
                                                    <td className='text-end' style={{ width: "12%", borderLeft: "0px",height:"4rem" }}>
                                                        <DropdownButton id="dropdown-basic-button" title="수정" size='sm'>
                                                            <Dropdown.Item onClick={onClickUpdate}>수정하기</Dropdown.Item>
                                                            <Dropdown.Item onClick={(e) => onClickDelete(e)}>삭제하기</Dropdown.Item>
                                                        </DropdownButton>
                                                    </td>
                                                </>
                                            :
                                                <>
                                                    <td className='ellipsis' style={{ borderRight: "0px",height:"100%" }}>{mall_title}</td>
                                                    <td className='text-end' style={{ width: "12%", borderLeft: "0px" }}>신고</td>
                                                </>
                                            }
                                        </tr>
                                        <tr>
                                            <td  style={{ width: "50%"}} >{mall_tstate === 0 ? "나눔" : (mall_tstate === 1 ? "무료나눔" : "구매")}</td>
                                            <td style={{ width: "50%"}} >{mall_pstate === 0 ? "중고상품" : "(미개봉,미사용)"}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2} style={{ width: "100%", height: "80px" }}>
                                                {mall_info !== "" ? mall_info : "입력된내용이 없습니다!"}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: "50%"}}>마감일:{mall_endDate}</td>
                                            <td style={{ width: "50%"}}>{mall_price}씨드</td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: "50%"}}>(유저아이콘){mall_seller}</td>

                                            <td style={{ fontSize: "12px",width:"50%" }}>{fmtudate ? `${fmtudate}(수정됨)` : mall_regDate}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Row>
                            <Row className='' style={{height:"7rem"}} >
                                <div style={mapST}>
                                    <Slider {...sellerList}>
                                        {list &&
                                            list.map(list => (
                                                <div className='mx-5'>
                                                    <Link to={`/mall/read/${list.mall_key}`}>
                                                        <img style={slideImg} src={list.mall_photo ? list.mall_photo : "http://via.placeholder.com/100x100"} />
                                                    </Link>
                                                </div>
                                            ))}
                                    </Slider>
                                </div>
                                <div>(--------------------------누르면이동-------------------------)</div>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>

            {/* 탭 부분 */}
            <Nav fill variant="tabs">
                <Nav.Item>
                    <Nav.Link eventKey="1" onClick={() => handleTabClick('1')} active={activeTab === '1'}>
                        상세이미지
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="2" onClick={() => handleTabClick('2')} active={activeTab === '2'}>
                        {mall_tstate === 0 ? "입찰하기" : "문의하기 "}
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="3" onClick={() => handleTabClick('3')} active={activeTab === '3'}>
                        {mall_tstate === 0 ? "현재 입찰 내역" : "현재 문의 내역 "}
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="4" onClick={() => handleTabClick('4')} active={activeTab === '4'}>
                        판매자정보
                    </Nav.Link>
                </Nav.Item>
            </Nav>

            {/* TabContent 컴포넌트 */}
            <TabContent>
                {activeTab === '1' && (
                    <AllImage mall_key={mall_key} />
                )}
                {activeTab === '2' && (
                    <div>
                        <InsertPage mall_key={mall_key} mall_seller={mall_seller} />
                    </div>
                )}
                {activeTab === '3' && (
                    <div>
                        <ReviewPage mall_key={mall_key} mall_seller={mall_seller} seller_number={seed_number} />
                    </div>
                )}
                {activeTab === '4' && (
                    <SellerInfo mall_seller={mall_seller} />
                )}
            </TabContent>
        </div>
    );
};

export default ReadPage;