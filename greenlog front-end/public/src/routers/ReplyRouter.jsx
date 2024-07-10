import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ReplyPage from '../components/reply/ReplyPage'
import InsertPage from '../components/reply/InsertPage'

const ReplyRouter = () => {
    return (
        <Routes>
            <Route path='list.json' element={<ReplyPage/>}></Route>
            <Route path='insert' element={<InsertPage/>}></Route>
        </Routes>
    )
}

export default ReplyRouter