import React from 'react'
import {Row, Col, Tab, Tabs} from 'react-bootstrap'
import Sidebar from './Sidebar'
import AdminAskList from './AdminAskList'
import AdminQAList from './AdminQAList'
import ReportPage from './ReportPage'

//탭을 누를때 마다 페이지 변경, 
const Question = () => {
  return (
    <Row>
        <Col lg={2}>   
            <Sidebar/>
        </Col>
        <Col>
          <h5 className='mb-5'> 000 관리자님 환영합니다.</h5>
              <Tabs
                  defaultActiveKey="profile"
                  id="fill-tab-example"
                  className="mb-3"
                  fill
                >
                  <Tab eventKey="home" title="1:1">
                    <AdminAskList/>
                  </Tab>
                  <Tab eventKey="profile" title="신고접수">
                    <ReportPage/>
                  </Tab>
                  <Tab eventKey="longer-tab" title="Q&A">
                    <AdminQAList/> 
                  </Tab>
             </Tabs>
        </Col>
        
    </Row>    
  )
}

export default Question