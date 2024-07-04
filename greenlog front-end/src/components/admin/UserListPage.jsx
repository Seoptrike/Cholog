import React from 'react'
import {Row, Col, Button, Badge, InputGroup, Form, Card} from 'react-bootstrap'
import Sidebar from './Sidebar'

//유저자료가 필요

const UserListPage = () => {
  return (
    <Row>
        <Col lg={2}>   
            <Sidebar/>
        </Col>
        <Col>
          <h5 className='mb-5'> 000 관리자님 환영합니다.</h5>
          
          <Row className='justify-content-center mb-5'>  
            <Col lg={5}>
            <form>
              <InputGroup>
                <Form.Control placeholder='검색어'/>
                <Button type='submit'>검색</Button>
              </InputGroup>
            </form>
            </Col>
          </Row>
        <div className='mb-5'>
          <Row className='justify-content-center'>
            <Col lg={8}>
              <Card> 
              </Card> 
            </Col>
          </Row>
        </div>   
        </Col>
    </Row>
  )
}

export default UserListPage