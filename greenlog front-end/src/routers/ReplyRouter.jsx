import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ReplyPage from '../components/reply/ReplyPage'
import ReplyReadPage from '../components/reply/ReplyReadPage'

const ReplyRouter = () => {
    return (
        <Routes>
            <Route path='list.json' element={<ReplyPage/>}></Route>
            <Route path='read/:bbs_key' element={<ReplyReadPage/>}></Route>
        </Routes>
    )
}

export default ReplyRouter