import React, { useEffect, useState } from 'react'
import { Row, Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import "../mall.css";
import axios from 'axios';
import Slider from "react-slick";


const SellerList = ({ mall_seller }) => {
    const { mall_key } = useParams();
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(6);


    const callAPI = async () => {
        setLoading(true);
        const res = await axios.get(`/mall/list/${mall_seller}?page=${page}&size=${size}`)
        //console.log("ListPage : "+ JSON.stringify(res.data));
        // 상태 업데이트
        setList(res.data); // 전체 목록 업데이트
        setLoading(false);
    }

    useEffect(() => {
        callAPI();
    }, [page])

    const sellerList = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1
    };

    const slideST = {
        width: "40px",
        height: "40px"
    }

    if (loading) return <h1 className='text-center'>로딩중...</h1>
    return (
        <Row>
            <div>
                <Slider {...sellerList}>
                    {list &&
                        list.map(list => (
                            <div className='mx-5'>
                                <Link to={`/mall/read/${list.mall_key}`}>
                                    <img style={slideST} src={list.mall_photo ? list.mall_photo : "http://via.placeholder.com/100x100"} />    
                                </Link>
                            </div>
                        ))}
                </Slider>
            </div>
        </Row>
    )
}

export default SellerList