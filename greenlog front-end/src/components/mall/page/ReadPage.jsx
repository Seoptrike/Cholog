import React, { useState } from 'react';
import { Nav, TabContent } from 'react-bootstrap';
import AllImage from '../read/AllImage';
import SellerInfo from '../read/SellerInfo';
import ItemInfo from '../read/ItemInfo';

import { useParams } from 'react-router-dom';

const ReadPage = () => {
  const mall_key=useParams();

  const [activeTab, setActiveTab] = useState('1');
  
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="read-page mb-5" >
      <h1>리드페이지</h1>
      <div className='my-5'>
        <ItemInfo mall_key={mall_key}/>
      </div>
      
      {/* 탭 부분 */}
      <Nav variant="tabs" defaultActiveKey="1">
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
