import React from 'react'
import { Card, CardContent, Typography,  Grid  } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Col, Row ,Carousel} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../mall.css";

const SellerInfo = ({form}) => { 
    console.log(form);
    const {mall_seller,mall_title,mall_info,mall_price,mall_regDate, mall_photo,mall_tstate,mall_pstate,mall_endDate} = form;

    return (
    <>
        <div className='mt-5'>
        <Card variant="outlined">
        <CardContent className='report_parent'>
            <Row >
            <Col className="d-flex justify-content-center align-items-center"  xs={4} md={4} lg={4} >
                <Avatar alt="User Profile" src="/path/to/profile-image.jpg" sx={{ width: 100, height: 100, marginBottom: 2 }} />
            </Col>
            <Col>
                <Typography variant="h5" component="div" gutterBottom>
                    {mall_seller}
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
        <div className='mb-5'>빈공간만들어야댐</div>
        <Carousel fade interval={null}>
        <Carousel.Item>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <Card variant="outlined" className='bg-primary'>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                    바디뱅
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    <Link href="/mall/list.json" underline="none">
                        발을 씻자
                    </Link>
                    </Typography>
                </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} sm={4}>
                <Card variant="outlined" className='bg-secondary'>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                    바디뱅
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    <Link href="/mall/list.json" underline="none">
                        발을 씻자
                    </Link>
                    </Typography>
                </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} sm={4}>
                <Card variant="outlined" className='bg-secondary'>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                    바디뱅
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    <Link href="/mall/list.json" underline="none">
                        발을 씻자
                    </Link>
                    </Typography>
                </CardContent>
                </Card>
            </Grid>
            </Grid>
        </Carousel.Item>

        <Carousel.Item>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <Card variant="outlined" className='bg-secondary'>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                    2222222
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    <Link href="/mall/list.json" underline="none">
                        22222
                    </Link>
                    </Typography>
                </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} sm={4}>
                <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                    22222
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    <Link href="/mall/list.json" underline="none">
                        222222222
                    </Link>
                    </Typography>
                </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} sm={4}>
                <Card variant="outlined" className='bg-secondary'>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                    2222
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    <Link href="/mall/list.json" underline="none">
                        222222
                    </Link>
                    </Typography>
                </CardContent>
                </Card>
            </Grid>
            </Grid>
        </Carousel.Item>

        {/* 필요한 만큼 Carousel.Item 추가 */}
        </Carousel>
        </div>
    </>
    )
}

export default SellerInfo