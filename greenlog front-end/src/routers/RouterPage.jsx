import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainPage from '../common/home/MainPage'
import UserRouter from './UserRouter'
import ReviewRouter from './ReviewRouter'
import ReplyPage from '../components/reply/ReplyPage'

const RouterPage = () => {
    return (
        <Routes>
            <Route path='/' element={<MainPage/>}/>
            <Route path='/user/*' element={<UserRouter/>}/>
            <Route path='/review/*' element={<ReviewRouter/>}/>
            <Route path='/reply/*' element={<ReplyPage/>}/>
        </Routes>
    )
}

export default RouterPage