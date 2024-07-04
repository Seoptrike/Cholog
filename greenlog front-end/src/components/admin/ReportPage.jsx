import React from 'react'
import {Row, Col, Table} from 'react-bootstrap'
import Sidebar from './Sidebar'

//신고접수데이터 필요, ellipsis를 이용하여 클릭시 처리하게끔 제작
const ReportPage = () => {
  return (
    <Row>
        <Col lg={2}>   
            <Sidebar/>
        </Col>
        <Col>
          <h5 className='mb-5'> 000 관리자님 환영합니다.</h5>
          <Table>
            <thead>
              <tr>
                <td>신고접수번호</td>
                <td>신고자</td>
                <td>신고내용</td>
                <td>처리상태</td>
              </tr>
            </thead>
          </Table>
        </Col>  
    </Row>    
  )
}

export default ReportPage