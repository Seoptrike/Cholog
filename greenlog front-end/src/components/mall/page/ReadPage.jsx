import React, { useEffect, useState } from 'react';
import { Nav, TabContent, Row, Col, Table,Badge } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import AllImage from '../read/AllImage';
import SellerInfo from '../read/SellerInfo';
import Slider from "react-slick";
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import InsertPage from '../../review/InsertPage';
import ReviewListPage from '../../review/ReviewListPage';
import ReportInsert from '../../report/ReportInsert';
import { Watermark } from 'antd';
import moment from 'moment/moment';

const ReadPage = () => {
    const today = new Date().toISOString().split('T')[0];
    const navi = useNavigate();
    const { mall_key } = useParams();
    const uid = sessionStorage.getItem("uid");
    const [form, setForm] = useState({});
    const [list, setList] = useState([]);//슬라이드
    const [total,setTotal] = useState([]);
    const root = "mall";
    const [activeTab, setActiveTab] = useState('1');
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };
    //경매시스템 위해서 넣어놓음 -인섭
    const [seedNumber, setSeedNumber] = useState({})
    const { seed_number } = seedNumber
    const callAPI = async () => {
        const res = await axios.get(`/mall/read/${mall_key}`);
        //console.log("****************************", res.data);
        setForm(res.data);
        //경매시스템 위해서 넣어놓음 -인섭
        const res2 = await axios.get(`/seed/read/${res.data.mall_seller}`)
        setSeedNumber(res2.data)
        //슬라이드
        const res3 = await axios.get(`/mall/list/${res.data.mall_seller}?page=0&size=8`)
        //console.log("ListPage : "+ JSON.stringify(res.data));
        setList(res3.data);//슬라이드할 유저가 올린 테이블리스트
        //댓글수
        const res4= await axios.get(`/mall/reviewCount/${mall_key}`);
        setTotal(res4.data); 
        console.log("total : "+ JSON.stringify(res4.data));//카운트에 들어있음..
    }
    const { mall_uDate, mall_seller, mall_title, mall_info, mall_price, mall_regDate, mall_photo, mall_tstate, mall_pstate, mall_endDate, user_uname, user_address1 } = form;
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

    const Badge = ({ text }) => (
        <span style={{
            backgroundColor: '',
            color: 'red',
            fontSize: "2rem",
            padding: "0 0.5rem 0.5rem 0.5rem",
            borderRadius: '5px'
        }}>
            {text}
        </span>
    );

    
   

    const endDate = moment(mall_endDate).format('YYYY-MM-DD'); // "2024-07-25"
    const fmtUdate = moment(mall_uDate).format('yyyy년 MM월 DD일 HH시mm분');
    const fmtRdate = moment(mall_regDate).format('yyyy년 MM월 DD일 HH시mm분');
    //console.log("1: "+mall_regDate+"1.1: "+fmtRdate+"//// today: "+today);

    const mapST = {
        width: '100%',
        height: '100%',
        Padding: "0px 0px"
    };
    const photoST = {
        width: '30rem',
        height: '30rem',
        padding: "0.5rem",
        position: " relative",
    };
    const sellerList = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1
    };
    const slideImg = {
        width: "7rem",
        height: "7rem",
        border: "1px solid green",
        borderRadius: "20%"
    }
    const buttonST = {
        position: 'absolute',
        width: " 1rem",
        height: "2rem",
        top: '0.7rem',
        right: '5rem',
    }
    const reportbuttonST = {
        position: 'absolute',
        width: " 4rem",
        height: "2.5rem",
        top: '0.7rem',
        right: '2rem',
    }
    const watermarkProps = {
        content: "이미 마감된 글입니다!",
        zIndex: 100,
        rotate: -20,
        gap: [50, 0],
        offset: { top: '10px', left: '10px' },
        font: { color: 'rgba(0, 0, 0, 0.5)', fontSize: 20 }
    };
    const table={
        borderRadius:"1rem",
        border:"1px ",
    }

    return (
        <div className="read-page mb-5" >
            <div className='my-5'>
                <div>
                    <Row className=' align-items-center mall_read_flexbox'>
                        <Col className=' text-center  text-middle  mall_read_item' xs={5} md={5} lg={5} style={{ whiteSpace: "nowrap" }}>
                            {endDate <= today ?
                                <Watermark  {...watermarkProps}>
                                    <img style={photoST} src={mall_photo ? mall_photo : ' http://via.placeholder.com/300x300'} alt='상품대표이미지' />
                                </Watermark>
                                :
                                <img style={photoST} src={mall_photo ? mall_photo : ' http://via.placeholder.com/300x300'} alt='상품대표이미지' />
                            }
                        </Col>
                        <Col className=' mall_read_item' xs={7} md={7} lg={7} style={{ whiteSpace: "nowrap", height: "100%", padding: "0px 2rem 0px 0px" }} >
                            <Row className='' style={{ height: "22rem" }} >
                                <Table  style={{table}}>
                                    <tbody>
                                        <tr style={{ position: "relative" }}>
                                            {mall_seller === uid ?
                                                <>
                                                    <td className='' colSpan={2} style={{ width: "100%" }}>
                                                        {endDate <= today ? <Badge text="[마감]" /> : null}
                                                        {mall_title}
                                                        <DropdownButton title="수정" style={buttonST}>
                                                            <Dropdown.Item onClick={onClickUpdate}>수정하기</Dropdown.Item>
                                                            <Dropdown.Item onClick={(e) => onClickDelete(e)}>삭제하기</Dropdown.Item>
                                                        </DropdownButton>
                                                    </td>
                                                </>
                                                :
                                                <>
                                                    <td className='' colSpan={2} style={{ width: "100%" }}>
                                                        {endDate <= today ? <Badge text="[마감]" /> : null}
                                                        {mall_title}
                                                    </td>
                                                    {uid && (
                                                        <div className='text-end' style={reportbuttonST}>
                                                            <ReportInsert uid={uid} writer={mall_seller} root={root} origin={mall_key} />
                                                        </div>
                                                    )}
                                                </>
                                            }
                                        </tr>
                                        <tr>
                                            <td style={{ width: "50%" }} >{mall_tstate === 0 ? "나눔" : (mall_tstate === 1 ? "무료나눔" : "구매")}</td>
                                            <td style={{ width: "50%" }} >{mall_pstate === 0 ? "중고상품" : "(미개봉,미사용)"}</td>
                                        </tr>
                                        <tr>
                                            {mall_info !== "" ?
                                            <td colSpan={2} style={{ width: "100%", height: "80px" }}>
                                                 {mall_info} 
                                            </td>
                                            :
                                            <td colSpan={2} style={{ width: "100%", height: "80px", color:"#E6E6E6" , fontSize:"30px"}} >
                                                내용이 없습니다
                                            </td>
                                            }
                                        </tr>
                                        <tr>
                                            <td style={{ width: "50%" }}>마감일:{endDate}</td>
                                            <td style={{ width: "50%" }}>{mall_price}씨드</td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: "50%" }}><Link to={`/user/read/${mall_seller}`}>{mall_seller}</Link></td>
                                            <td style={{ fontSize: "12px", width: "50%" }}>{fmtUdate ? `${fmtUdate}(수정됨)` : fmtRdate}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Row>
                            <Row style={{ height: "7rem" }} >
                                <div style={mapST}>
                                    <Slider className='sellerList'{...sellerList}>
                                        {list &&
                                            list.map(list => (
                                                <div className='' key={list.mall_key}>
                                                    <Link to={`/mall/read/${list.mall_key}`}>
                                                        <img style={slideImg} src={list.mall_photo ? list.mall_photo : "http://via.placeholder.com/100x100"} />
                                                    </Link>
                                                </div>
                                            ))}
                                    </Slider>
                                </div>
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
                        <Row>
                            <Col>
                              {mall_tstate === 0 ? "현재 입찰 내역" : "현재 문의 내역 "}  💬 {total.count}개
                            </Col>
                        </Row>
                          
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
                        <InsertPage mall_key={mall_key} mall_seller={mall_seller} mall_photo={mall_photo} />
                    </div>
                )}
                {activeTab === '3' && (
                    <div>
                        <ReviewListPage mall_key={mall_key} mall_seller={mall_seller} seller_number={seed_number} />
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