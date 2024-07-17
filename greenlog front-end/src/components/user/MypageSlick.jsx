import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { Col, Row, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import '../user/MypageSlider.css';

const MypageSlick = ({ diary, setDiary }) => {
    console.log(diary);

    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "0px",
      slidesToShow: 3,
      slidesToScroll: 1,
      speed: 500,
      adaptiveHeight: true
    };
  
    return (
      <div className="slider-container">
        <Slider {...settings}>
          {diary.map(d =>
            <Row>
              <Col key={d.diary_key}>
                <Card style={{height:"100%", width:"100%"}}>
                  <Card.Header>
                    <Badge className='me-3'>{d.diary_state}</Badge>
                    <div className="ellipsis">
                      <span>{d.diary_title}</span>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Link to={`/diary/read/${d.diary_key}`}>
                      <img src={d.diary_thumbnail || "http://via.placeholder.com/100x100"} width="100%" height="310"/>
                    </Link>
                    <hr />
                    <Col>
                      <div className="ellipsis">{d.diary_contents}</div>
                    </Col>
                    <Col>
                      <div className='text-end'>
                        {d.ucnt == 0 ? <FaRegThumbsUp style={{ fontSize: "20px" }} /> :
                          <FaThumbsUp style={{ fontSize: "20px" }} />}
                        {d.fcnt}
                      </div>
                    </Col>
                    <hr />
                    {d.fmtUdate===d.fmtDdate ?  `등록일: ${d.fmtDdate}`: `수정일: ${d.fmtUdate}`}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </Slider>
      </div>
    )
  
  }

export default MypageSlick