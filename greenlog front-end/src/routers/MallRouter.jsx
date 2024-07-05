import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ListPage from '../components/mall/ListPage'
import ReadPage from '../components/mall/ReadPage'
import InsertPage from '../components/mall/InsertPage'

const MallRouter = () => {
    return (
        <Routes>
            <Route path='list.json' element={<ListPage/>}/>
            <Route path='read' element={<ReadPage/>}/>
            <Route path='insert' element={<InsertPage/>}/>
        </Routes>
    )
}

export default MallRouter