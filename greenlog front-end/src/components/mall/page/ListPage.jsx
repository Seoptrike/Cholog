import React, { useState } from 'react'
import { Card, Table,Row,Col, InputGroup, Button, Form } from 'react-bootstrap'
import SlidePage from '../../../common/useful/SlidePage'
import Items from '../list/Items'
import { Widgets } from '@mui/icons-material'

const ListPage = () => {
  const mallStyle ={
    width:"400px",
    hight:"70px"
  }
  return (
    <div className='justify-content-center text-center'>
        <h1 className='my-5'>피망마켓</h1>
        <div className='my-2'>♻환경을지킵시다 권장배너깔기이벤트이미지도좋음♻</div>
        <SlidePage />
        <Items />
    </div>
  )
}

export default ListPage