import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { Card, Row, Col, InputGroup, Form, Button, Badge, Dropdown } from 'react-bootstrap'
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import Slider from "react-slick";
import ReportInsert from '../report/ReportInsert';
import { BsChevronDown, BsHandThumbsUp, BsHandThumbsDown, BsThreeDotsVertical, BsArrowReturnRight } from "react-icons/bs";

const FollowingDiaryList = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [size, setSize] = useState(10);
    const [page, setPage] = useState(1);
    const [slideIndex, setSlideIndex] = useState(0);
    const [updateCount, setUpdateCount] = useState(0);
    let root = "diary"
    let sliderRef = useRef(null);
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 5000,
        cssEase: "linear"
    }
    let user_uid = sessionStorage.getItem("uid")
    const callAPI = async () => {
        if (!user_uid) {
            user_uid = "ghost"
            const res2 = await axios.get(`/user/AdminDiaryList/${user_uid}?page=${page}&size=${size}`)
            setList(res2.data)
        } else {
            const res = await axios.get(`/user/followingDiaryList/${user_uid}?page=${page}&size=${size}`)
            if (res.data.length === 0 || res.data === null) {
                const res1 = await axios.get(`/user/AdminDiaryList/${user_uid}?page=${page}&size=${size}`)
                setList(res1.data)
            } else {
                setList(res.data)
            }
        }
        //console.log(res.data)
    }
    useEffect(() => { callAPI() }, [])


    const LikePress = async (diary_key) => {
        await axios.post(`/diary/like`, { user_uid: sessionStorage.getItem("uid"), diary_key });
        if (list.ucnt === 1) {
            alert("이미 좋아요를 누른 일기입니다.")
        } else {
            alert("좋아요를 눌렀습니다!");
            callAPI();
            setLoading(false);
        }

    }

    const LikeCancel = async (diary_key) => {
        if (diary_key === "") {
            setLoading(true);
        } else {
            await axios.post(`/diary/cancel`, { user_uid: sessionStorage.getItem("uid"), diary_key });
            if (list.ucnt === 0) {
                alert("좋아요를 이미 취소한 상태입니다.")
            } else {
                alert("좋아요가 취소되었습니다");
                callAPI();
                setLoading(false);
            }
        }
    }
    return (
        <div className="slider-container">
            {user_uid ?
                <div className='text-center mb-4'>내 친구의 초록</div>
                :
                <div className='text-center mb-4'>오늘의 추천 초록</div>
            }
            <Slider
                ref={sliderRef}
                {...settings}
            >
                {list.map(d => (
                    <div key={d.diary_key}>
                        <Col lg={12}>
                            <Card className='mb-3 mx-3' style={{ height: "25rem", width: "25rem" }}>
                                <Card.Header style={{ padding: "0.5rem 1rem" }}>
                                    <Row>
                                        <Col xs={2}>
                                            <img style={{ width: "3rem", height: "3rem", borderRadius: "50%" }} src={d.user_img} />
                                        </Col>
                                        <Col xs={8}>
                                            <span><a href={`/user/read/${d.diary_writer}`}> {d.diary_writer}</a></span>
                                            <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                <span>{d.diary_title}</span>
                                            </div>
                                        </Col>
                                        <Col xs={2}>
                                            {user_uid &&
                                                <Dropdown >
                                                    <Dropdown.Toggle variant="" id="dropdown-basic">
                                                        <BsThreeDotsVertical />
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item><ReportInsert uid={user_uid} origin={d.diary_key} writer={d.diary_writer} root={root} /></Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            }
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body style={{ padding: "1rem", height: "18rem", overflowY: "auto" }}>
                                    <Link to={`/diary/read/${d.diary_key}`}>
                                        <img src={d.diary_thumbnail || "http://via.placeholder.com/100x100"} style={{ width: "100%", height: "10rem", objectFit: "contain" }} alt={d.diary_title} />
                                    </Link>
                                    <hr />
                                    <div style={{ maxHeight: "6rem", overflow: "hidden", textOverflow: "ellipsis" }}>
                                        {d.diary_contents}
                                    </div>
                                    <Badge className='me-3'>{d.diary_state}</Badge>
                                    <hr />
                                    <span className='text-end' style={{ cursor: "pointer" }}>
                                        {d.ucnt === 0 ? (
                                            <FaRegThumbsUp style={{ fontSize: "20px" }} onClick={() => LikePress(d.diary_key)} />
                                        ) : (
                                            <FaThumbsUp style={{ fontSize: "20px" }} onClick={() => LikeCancel(d.diary_key)} />
                                        )}
                                        {d.fcnt}
                                    </span>
                                    <span style={{ float: "right" }}>
                                        {d.fmtUdate ? `${d.fmtDdate}` : `${d.fmtUdate}[수정됨]`}
                                    </span>
                                </Card.Body>
                            </Card>
                        </Col>
                    </div>
                ))}
            </Slider>
        </div>

    )
}

export default FollowingDiaryList