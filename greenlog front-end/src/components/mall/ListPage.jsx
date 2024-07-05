import React, { useState } from 'react'
import { Card, Table,Row,Col, InputGroup, Button, Form } from 'react-bootstrap'
import SlidePage from '../../common/useful/SlidePage'
import Items from './Items'

const ListPage = () => {
  
  return (
    <div className='justify-content-center text-center'>
        <h1 className='my-5'>피망마켓</h1>
        <div className='my-2'>♻새로 올라온 게시글♻</div>
        <SlidePage/>
        <Items />
    </div>
  )
}

export default ListPage