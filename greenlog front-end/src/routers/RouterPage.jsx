import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainPage from '../common/home/MainPage'
import UserRouter from './UserRouter'
import ReviewRouter from './ReviewRouter'
import MallRouter from './MallRouter'
import ReportRouter from './ReportRouter'
import ReplyRouter from './ReplyRouter'
import AboutRouter from './AboutRouter'
import CommunityRouter from './CommunityRouter'

const RouterPage = () => {
    return (
        <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/user/*' element={<UserRouter />} />
            <Route path='/mall/*' element={<MallRouter />} />
            <Route path='/report/*' element={<ReportRouter />} />
            <Route path='/review/*' element={<ReviewRouter />} />
            <Route path='/reply/*' element={<ReplyRouter />} />
            <Route path='/about/*' element={<AboutRouter />} />
            <Route path='/community/*' element={<CommunityRouter />} />
        </Routes>
    )
}

export default RouterPage