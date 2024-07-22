import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RereplyPage from '../components/rereply/RereplyPage'
import RereplyInsertPage from '../components/rereply/RereplyInsertPage'
import RereplyReadPage from '../components/rereply/RereplyReadPage'


const RereplyRouter = () => {
    return (
        <Routes>
            <Route path='list.json' element={<RereplyPage/>}></Route>
            <Route path='read/:reply_key' element={<RereplyReadPage/>}></Route>
            <Route path='insert' element={<RereplyInsertPage/>}></Route>
        </Routes>   
    )
}

export default RereplyRouter