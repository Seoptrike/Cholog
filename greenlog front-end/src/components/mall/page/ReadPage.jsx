import React, { useEffect, useState } from 'react';
import { Nav, TabContent ,Row,Col,Table,Button} from 'react-bootstrap';

import AllImage from '../read/AllImage';
import SellerInfo from '../read/SellerInfo';

import { useParams } from 'react-router-dom';
import axios from 'axios';

const ReadPage = () => {
  const {mall_key}=useParams();
  console.log(mall_key);
  const [form, setForm] = useState({});
  console.log(form);
  const {mall_seller,mall_title,mall_info,mall_price,mall_regDate, mall_photo,mall_tstate,mall_pstate,mall_endDate} = form;


  const [activeTab, setActiveTab] = useState('1');
  
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  const callAPI=async()=>{
    const res = await axios.get(`/mall/read/${mall_key}`);
    console.log(res.data);
    setForm(res.data);
  }
  useEffect(()=>{
    callAPI();
  },[])
 
    
    
      
  return (
    
    <div className="read-page mb-5" >
      <h1>리드페이지</h1>
      <div className='my-5'>
      <div>
        <Row  className='text-center align-items-center'>
            <Col className=''>
                <img src={mall_photo ? mall_photo :' http://via.placeholder.com/300x300'} alt='상품대표이미지'/>
            </Col>
            <Col >
            <Row>
                <Table bordered>
                    <tbody>
                        <tr>
                            <td className='ellipsis'  style={{borderRight:"0px"}}>mall_title</td>
                            <td  className='text-end' style={{width:"12%",borderLeft:"0px"}}>신고</td>
                        </tr>
                        <tr>
                            <td >mall_tstate</td> 
                            <td className='w-50' >mall_pstate</td>
                        </tr>
                        <tr>
                            <td colSpan={2} style={{width:"100%",height:"80px"}}>
                              mall_info
                            </td>
                        </tr> 
                        <tr>
                            <td className='w-50'>mall_endDate</td> 
                            <td >mall_price</td>
                        </tr>
                        <tr>
                          <td className='w-50'>mall_seller</td> 
                          <td >mall_regDate</td>
                        </tr>
                    </tbody> 
                </Table>
                   
            </Row>
            <Row className='text-center justify-content-center'>
                <div style={{width:"100%", height:"150px",border:"2px solid green",background:"gray"}}>여기는 지도자리</div>
            </Row>
            </Col>
        </Row>
    </div>
      </div>
      
      {/* 탭 부분 */}
      <Nav  fill variant="tabs" defaultActiveKey="1">
        <Nav.Item>
          <Nav.Link eventKey="1" onClick={() => handleTabClick('1')} active={activeTab === '1'}>
            상세이미지
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="2" onClick={() => handleTabClick('2')} active={activeTab === '2'}>
            상품후기(0)
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="3" onClick={() => handleTabClick('3')} active={activeTab === '3'}>
            1:1
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
          <AllImage />
        )}
        {activeTab === '2' && (
          <div>
            <h3>상품후기(0) 페이지 내용</h3>
          </div>
        )}
        {activeTab === '3' && (
          <div>
            <h3>1:1 문의 페이지 내용</h3>
          </div>
        )}
        {activeTab === '4' && (
          <SellerInfo />
        )}
      </TabContent>
    </div>
  );
};

export default ReadPage;