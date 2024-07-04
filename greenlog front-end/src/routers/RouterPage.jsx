import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainPage from '../common/home/MainPage'
import UserRouter from './UserRouter'
import ReportRouter from './ReportRouter'

const RouterPage = () => {
  return (
    <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/user/*' element={<UserRouter/>}/>
        <Route path='/report/*' element={<ReportRouter/>}/>
    </Routes>
  )
}

export default RouterPage