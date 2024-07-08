import React from 'react'
import { Card, CardContent, Typography,  Grid  } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SellerInfo = () => { 
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
              User Name
            </Typography>
            <Typography variant="body2" color="text.secondary">
              내린온도?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              위치보기 누르면 지도를 얼럿이든뭐든 따로어버레이
            </Typography>
            <Typography variant="body2" color="text.secondary">
              (이사람의 게시글(mall말고검색해서 링크))
            </Typography>
          </Col>
        </Row>
      </CardContent>
    </Card>
    <div className='report_child '>신고신고고고</div>
    {/* 두 번째 카드 */}
    <div style={{ marginTop: '1rem' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card variant="outlined">
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
          <Card variant="outlined">
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
          <Card variant="outlined">
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
    </div>
    </div>
    </>
  )
}

export default SellerInfo