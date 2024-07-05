import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ListPage from '../components/mall/ListPage'

const MallRouter = () => {
    return (
        <Routes>
            <Route path='list.json' element={<ListPage/>}/>
        </Routes>
    )
}

export default MallRouter