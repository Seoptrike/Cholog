import React, { useEffect, useState } from 'react'
import {Row, Col, Tab, Tabs} from 'react-bootstrap'
import Sidebar from './Sidebar'
import AdminAskList from './AdminAskList'
import AdminQAList from './AdminQAList'
import ReportPage from './ReportPage'
import { useLocation } from 'react-router-dom'


const Question = () => {
  const location = useLocation();
  const [key, setKey]=useState('default');
  useEffect(() => {
    if (location.hash) {
        setKey(location.hash.substring(1)); // 해시에서 #를 제거한 후 설정
    }
}, [location.hash]);

  return (
    <Row>
        <Col lg={2}>   
            <Sidebar/>
        </Col>
        <Col>
          <h5 className='mb-5'> 000 관리자님 환영합니다.</h5>
              <Tabs
                  activeKey={key} onSelect={(k) => setKey(k)}
                  defaultActiveKey="notice"
                  id="fill-tab-example"
                  className="mb-3"
                  fill
                >
                  <Tab eventKey="1:1" title="1:1">
                    <AdminAskList/>
                  </Tab>
                  <Tab eventKey="notice" title="신고접수">
                    <ReportPage/>
                  </Tab>
                  <Tab eventKey="Q&A" title="Q&A">
                    <AdminQAList/> 
                  </Tab>
             </Tabs>
        </Col>
        
    </Row>    
  )
}

export default Question