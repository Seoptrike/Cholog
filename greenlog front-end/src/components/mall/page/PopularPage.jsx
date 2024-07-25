
import React, { useEffect, useState } from 'react'
import { Container, Row, Col,  Table } from 'react-bootstrap';
import {Card } from 'antd'; 
import axios from 'axios';
import { position } from '@chakra-ui/react';


const PopularPage = () => {
    const { Meta } = Card;
    const [list, setList] = useState([]);

    const callAPI = async () => {
        const res = await axios.get("/mall/reviewCount");
        setList(res.data);
        console.log(res.data);
    }

    useEffect(() => {
        callAPI();
    }, [])

    const photoST = { /*리스트 썸네일 */ 
        position:"absolute",
        width: "8rem",
        height: "7.8rem",
        top:"0",
        right:""
    }
    const topST = { /*카드 썸네일 */ 
        width: "14rem", /*width는 베이스와같아야함 */
        height: "10rem",
        top:"-1rem"
    }
    const topCard ={ /*카드 베이스 */ 
        width: '14rem',
        height: '12rem',/*썸네일보다 조금 더 아래로 내려야 바디가들어옴 */
        margin: '0.5rem',
        display: 'flex',
        flexDirection: 'column'
    }
    const topCover={/*카드 썸네일 영역*/ 
        display: 'block', 
        height: '90%',/*커버이미지가 보이는 비율 */ 
        overflow: 'hidden' 
    }
    const topMeta={ /*메타영역*/ 
        fontSize: '0.75rem', 
        margin: 0,
        textAlign:"center",
        display: "flex", 
        alignItems: "center",
    }
    const metaDiv={
        height:"0",
        margin:"0",
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'flex-end', 
        textAlign: 'center' ,
    }

    return (
        <Container>
            <div className='bg-secondary mb-5'>
                <img src='../images/paprika.png' style={{width:"100%",height:"20rem"}}/>
            </div>
            <Row className="mall-table-stand mx-5 " style={{marginTop:"5rem"}} >
                <Col md={4} className="mall-stand-leg">
                    {list && list.slice(1, 2).map(top2 =>
                        <Card hoverable className='mall_pop_card2' key={top2.mall_key}
                            style={topCard}
                            cover={
                                <a href={`/mall/read/${top2.mall_key}`} style={topCover}>
                                    <img alt="mall" style={topST}
                                        src={top2.mall_photo ? top2.mall_photo : "http://via.placeholder.com/100x100"}/>
                                </a>
                            }
                        >
                            <div style={metaDiv}>
                                <Meta
                                    title={`[${top2.mall_key}] ${top2.mall_title}`}
                                    style={topMeta}/>
                            </div>
                        </Card>
                    )}
                </Col>
                <Col md={4} className="mall-stand-top">
                    {list && list.slice(0, 1).map(top1 =>
                         <Card hoverable className='mall_pop_card1' key={top1.mall_key}
                         style={topCard}
                         cover={
                             <a href={`/mall/read/${top1.mall_key}`} style={topCover}>
                                 <img alt="mall" style={topST}
                                     src={top1.mall_photo ? top1.mall_photo : "http://via.placeholder.com/100x100"}/>
                             </a>
                         }
                        >
                        <div style={metaDiv}>
                            <Meta
                            title={`[${top1.mall_key}] ${top1.mall_title}`}
                            style={topMeta}/>
                        </div>
                     </Card>
                    )}
                </Col>
                <Col md={4} className="mall-stand-row-leg">
                    {list && list.slice(2,3 ).map(top3 =>
                       
                        <Card hoverable className='mall_pop_card3' key={top3.mall_key}
                            style={topCard}
                            cover={
                            <a href={`/mall/read/${top3.mall_key}`} style={topCover}>
                                <img alt="mall" style={topST}
                                    src={top3.mall_photo ? top3.mall_photo : "http://via.placeholder.com/100x100"}/>
                            </a>}
                        >
                        <div style={metaDiv}>
                            <Meta
                                title={`[${top3.mall_key}] ${top3.mall_title}`}
                                style={topMeta}/>
                        </div>
                     </Card>
                    )}
                </Col>
            </Row>
            <hr className='mx-5'/>
            <h3 className='text-center my-5'>♻ 인기상품리스트 ♻</h3>
            <div className='' style={{position:"relative"}}>
                {list.slice(0, 10).map((list, index) => (
                    <Card key={index} className='m-0 p-0  mx-5 mb-3' style={{height:"8rem"}}>
                            <a href={`/mall/read/${list.mall_key}`} >
                            <Row>
                                <Col xs={2} md={2} lg={2}>
                                    <img src={list.mall_photo ? list.mall_photo : "http://via.placeholder.com/100x100"} style={photoST}/>
                                </Col>
                                <Col className='me-5 py-0'>
                                    <p>[{index+1}]</p>
                                    <p>제목:{list.mall_title}  ID:{list.mall_seller} 유형:{list.mall_pstate}{list.mall_tstate}</p>
                                    <p>마감:{list.mall_endDate}</p>
                                </Col>
                            </Row>
                        </a>
                    </Card>
                ))}
            </div>
        </Container>
    )
}

export default PopularPage