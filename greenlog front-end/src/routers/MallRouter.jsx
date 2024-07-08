import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ListPage from '../components/mall/page/ListPage'
import ReadPage from '../components/mall/page/ReadPage'
import InsertPage from '../components/mall/page/InsertPage'
import UpdatePage from '../components/mall/page/UpdatePage'

const MallRouter = () => {
    return (
        <Routes>
            <Route path='list.json' element={<ListPage/>}/>
            <Route path='read/:mall_key' element={<ReadPage/>}/>
            <Route path='insert' element={<InsertPage/>}/>
            <Route path='update/:mall_key' element={<UpdatePage/>}/>
        </Routes>
    )
}

export default MallRouter