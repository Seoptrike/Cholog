import React, { useEffect, useState } from 'react';
import { Nav, TabContent ,Row,Col,Table,Button} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
 import SeoulMap from '../../../common/useful/SeoulMap';
import AllImage from '../read/AllImage';
import SellerInfo from '../read/SellerInfo';

import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import InsertPage from '../../review/InsertPage';
import ReviewPage from '../../review/ReviewPage';

const ReadPage = () => {
  const navi = useNavigate();
  const {mall_key}=useParams();
  const uid = sessionStorage.getItem("uid");
  //console.log(mall_key);
  const [form, setForm] = useState({});

  console.log("read!!!!!!!!!!!!!!"+form);
  const {mall_uDate,mall_seller,mall_title,mall_info,mall_price,mall_regDate, mall_photo,mall_tstate,mall_pstate,mall_endDate} = form;
  const [activeTab, setActiveTab] = useState('1');
  
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  //경매시스템 위해서 넣어놓음 -인섭
  const [seedNumber, setSeedNumber] = useState({})
  const {seed_number}= seedNumber
  const callAPI=async()=>{
    const res = await axios.get(`/mall/read/${mall_key}`);
    console.log("****************************",res.data);
    setForm(res.data);
    //경매시스템 위해서 넣어놓음 -인섭
    const res2 = await axios.get(`/seed/read/${res.data.mall_seller}`)
    setSeedNumber(res2.data)
  }
  useEffect(()=>{
    callAPI();
  },[])
  
  const onClickUpdate=()=>{
    navi(`/mall/update/${mall_key}`);
  }
    
  const onClickDelete=async()=>{
    //console.log("0000000000000000000000000>>>>>>>>>>>"+mall_key);
    try {
      await axios.post(`/mall/delete/${mall_key}`);
      callAPI();
      navi("/mall/list.json")
    } catch (error) {
      alert("삭제실패! 댓글이 존재합니다!")
    }
    
  }
  const mapST={
    width: '100%', 
    height: '7rem',
    Padding:"0px 0px" 
  };
  
    

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
                            <td className='ellipsis'  style={{borderRight:"0px"}}>{mall_title}</td>
                            {mall_seller===uid ?
                              <td  className='text-end' style={{width:"12%",borderLeft:"0px"}}>
                                  <DropdownButton id="dropdown-basic-button" title="수정" size='sm'>
                                    <Dropdown.Item onClick={onClickUpdate}>수정하기</Dropdown.Item>
                                    <Dropdown.Item onClick={(e)=>onClickDelete(e)}>삭제하기</Dropdown.Item>
                                  </DropdownButton>
                              </td>
                              :
                              <td  className='text-end' style={{width:"12%",borderLeft:"0px"}}>신고</td>
                            }
                        </tr>
                        <tr>
                            <td >{mall_tstate === 0 ? "나눔" : (mall_tstate === 1 ? "무료나눔" : (mall_tstate === 2 ? "구매" : ""))}</td> 
                            <td className='w-50' >{mall_pstate === 0 ? "중고상품" : "(미개봉,미사용)"}</td>
                        </tr>
                        <tr>
                            <td colSpan={2} style={{width:"100%",height:"80px"}}>
                             { mall_info}
                            </td>
                        </tr> 
                        {mall_tstate===0 &&
                         <tr>
                            <td className='w-50'>마감일:{mall_endDate}</td> 
                            <td >{mall_price}씨드</td>
                        </tr>
                        }
                         <tr>
                            <td className='w-50'>마감일:{mall_endDate}</td> 
                            <td >{mall_price}씨드</td>
                        </tr>
                        <tr>
                          <td className='w-50'>(유저아이콘){mall_seller}</td> 
                          <td style={{fontSize:"12px"}}>{mall_uDate ? mall_uDate`(수정됨)` : mall_regDate}</td>
                        </tr>
                    </tbody> 
                </Table>
                   
            </Row>
            <Row className='text-center justify-content-center'>
                <div style={mapST}>
                  <SeoulMap />
                </div>
            </Row>
            </Col>
        </Row>
    </div>
      </div>
      
      {/* 탭 부분 */}
      <Nav  fill variant="tabs">
        <Nav.Item>
          <Nav.Link eventKey="1" onClick={() => handleTabClick('1')} active={activeTab === '1'}>
            상세이미지
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="2" onClick={() => handleTabClick('2')} active={activeTab === '2'}>
            {mall_tstate===0 ? "입찰하기" : "문의하기 "}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="3" onClick={() => handleTabClick('3')} active={activeTab === '3'}>
          {mall_tstate===0 ? "현재 입찰 내역" : "현재 문의 내역 "}
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
            <InsertPage mall_key={mall_key} mall_seller={mall_seller}/>
          </div>
        )}
        {activeTab === '3' && (
          <div>
            <ReviewPage mall_key={mall_key} mall_seller={mall_seller} seller_number={seed_number}/>
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