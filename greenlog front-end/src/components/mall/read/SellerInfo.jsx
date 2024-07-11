import React, { useEffect, useState } from 'react'
import { CardContent, Typography  } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Col, Row ,Carousel,Card} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import "../mall.css";
import axios from 'axios';
import Slider from "react-slick";


const SellerInfo = ({mall_seller}) => {
    const {mall_key}=useParams();
    const [loading,setLoading]=useState(false);
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(3);
    const [key, setKey] = useState('mall_seller');
    const [word, setWord] = useState(mall_seller);
    const [form, setForm] = useState({});


    const callAPI=async()=>{ 
    setLoading(true);
    const res = await axios.get(`/mall/read/${mall_key}`);
    console.log("****************************",res.data);
    setForm(res.data);
    
    const res2= await axios.get(`/mall/list?key=${key}&word=${word}&page=${page}&size=${size}`)
    //console.log("ListPage : "+ JSON.stringify(res.data));
    setList(res2.data.documents);
    setLoading(false);
    }
    useEffect(()=>{
        callAPI();
    },[])
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1, // 한 번에 보여질 슬라이드 수
        slidesToScroll: 1 // 슬라이드를 넘길 때 이동할 슬라이드 수
      };
    
    if(loading) return <h1 className='text-center'>로딩중...</h1>
    return (
    <>
        <Slider {...settings}>
        <div className='mt-5'>
            <Row>
               {list && 
                list.map(card => (
                    <Col key={card.mall_key} xs={4} md={4} lg={4}>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title><img src={card.mall_photo ? card.mall_photo : "http://via.placeholder.com/100x100"} /></Card.Title>
                                <Card.Text>
                                    <Link to={`/mall/read/${card.mall_key}`}>[{card.mall_key}]{card.mall_title}</Link>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))
            } 
            </Row>
        </div>
        </Slider>
        <Card variant="outlined">
        <CardContent className='report_parent'>
            <Row >
            <Col className="d-flex justify-content-center align-items-center"  xs={4} md={4} lg={4} >
                <Avatar alt="User Profile" src="/path/to/profile-image.jpg" sx={{ width: 100, height: 100, marginBottom: 2 }} />
            </Col>
            <Col>
                <Typography variant="h5" component="div" gutterBottom>
                    {form.mall_seller} ({form.user_nickname})
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    내린온도?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    위치보기 누르면 지도를 얼럿이든뭐든 따로어버레이
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    뭐넣지,,
                </Typography>
            </Col>
            </Row>
        </CardContent>
        </Card>
        <div className='report_child '>신고신고고고</div>
    </>
    )
}

export default SellerInfo