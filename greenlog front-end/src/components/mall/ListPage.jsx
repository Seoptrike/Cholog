import React from 'react'
import { Card, Table,Row,Col } from 'react-bootstrap'
import SlidePage from '../../common/useful/SlidePage'

const ListPage = () => {
  return (
    <div className='justify-content-center text-center'>
        <h1 className='my-5'>피망마켓</h1>
        
            <div>슬라이드자리만들기 </div>
        
        <Row>
            <Col lg={12} md={12} xs={12}>
                <div className='mt-3'>
                    <Table className='justify-content-center'>
                    <tbody className='border border-white'>
                    <tr>
                        <td>
                        <Card>
                            <Card.Body>바디뱅</Card.Body>
                            <Card.Footer> 발을씻자</Card.Footer>
                            </Card>
                        </td>
                        <td><Card><Card.Body>바디뱅</Card.Body><Card.Footer> 발을씻자</Card.Footer></Card></td>
                        <td><Card><Card.Body>바디뱅</Card.Body><Card.Footer> 발을씻자</Card.Footer></Card></td>
                        <td><Card><Card.Body>바디뱅</Card.Body><Card.Footer> 발을씻자</Card.Footer></Card></td>
                    </tr>
                    <tr >
                        <td><Card><Card.Body>바디뱅</Card.Body><Card.Footer> 발을씻자</Card.Footer></Card></td>
                        <td><Card><Card.Body>바디뱅</Card.Body><Card.Footer> 발을씻자</Card.Footer></Card></td>
                        <td><Card><Card.Body>바디뱅</Card.Body><Card.Footer> 발을씻자</Card.Footer></Card></td>
                        <td><Card><Card.Body>바디뱅</Card.Body><Card.Footer> 발을씻자</Card.Footer></Card></td>
                    </tr>
                    <tr >
                        <td><Card><Card.Body>바디뱅</Card.Body><Card.Footer> 발을씻자</Card.Footer></Card></td>
                        <td><Card><Card.Body>바디뱅</Card.Body><Card.Footer> 발을씻자</Card.Footer></Card></td>
                        <td><Card><Card.Body>바디뱅</Card.Body><Card.Footer> 발을씻자</Card.Footer></Card></td>
                        <td><Card><Card.Body>바디뱅</Card.Body><Card.Footer> 발을씻자</Card.Footer></Card></td>
                    </tr>
                    </tbody>
                    </Table> 
                </div>
            </Col>
         </Row>
    </div>
  )
}

export default ListPage