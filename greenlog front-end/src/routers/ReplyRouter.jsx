import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ReplyPage from '../components/reply/ReplyPage'
import ReplyInsertPage from '../components/reply/ReplyInsertPage'

const ReplyRouter = () => {
    return (
        <Routes>
            <Route path='list.json' element={<ReplyPage/>}></Route>
            <Route path='insert' element={<ReplyInsertPage/>}></Route>
        </Routes>
    )
}

export default ReplyRouter