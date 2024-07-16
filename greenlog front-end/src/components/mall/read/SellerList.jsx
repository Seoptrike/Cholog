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
    const [key, setKey] = useState('mall_seller');
    const [word, setWord] = useState(mall_seller);
    const [form, setForm] = useState({});
    const [orderBy, setOrderBy] = useState('desc');

    const callAPI = async () => {
        setLoading(true);
        const res = await axios.get(`/mall/list?key=${key}&word=${word}&page=${page}&size=${size}&orderBy=${orderBy}`)
        //console.log("ListPage : "+ JSON.stringify(res.data));
        setList(res.data.documents);//슬라이드할 유저가 올린 테이블리스트
        setLoading(false);
    }

    useEffect(() => {
        callAPI();
    }, [page])

    const sellerList = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1
    };

    const slideST = {
        width: "40rem",
        height: "40rem"
    }

    if (loading) return <h1 className='text-center'>로딩중...</h1>
    return (
        <Row>
            <div>
                <Slider {...sellerList}>
                    {list &&
                        list.map(list => (
                            <div className='mx-5'>
                                <Card className="mx-3">
                                    <Card.Body>
                                        <Link to={`/mall/read/${list.mall_key}`}>
                                            <Card.Title>
                                                <img style={slideST} src={list.mall_photo ? list.mall_photo : "http://via.placeholder.com/100x100"} />
                                            </Card.Title>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                </Slider>
            </div>
        </Row>
    )
}

export default SellerList