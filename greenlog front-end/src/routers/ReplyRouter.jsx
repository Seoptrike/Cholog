import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ReplyPage from '../components/reply/ReplyPage'

const ReplyRouter = () => {
    return (
        <Routes>
            <Route path='reply' element={<ReplyPage/>}></Route>
        </Routes>
    )
}

export default ReplyRouter