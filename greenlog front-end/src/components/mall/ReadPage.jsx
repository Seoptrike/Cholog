import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Items from './Items'

const ReadPage = () => {
  return (
    <div>
        <h1 className='text-center'>누구님의 피망마켓</h1>
        <Nav variant="tabs" defaultActiveKey="#">
      <Nav.Item>
        <Nav.Link href="#">흠냐링?</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="link-1">상품후기(0)</Nav.Link>

      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/">1:1</Nav.Link>

      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/">흠냐링?</Nav.Link>
      </Nav.Item>
      
    </Nav>

    </div>
  )
}

export default ReadPage