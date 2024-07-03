import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainPage from '../common/home/MainPage'
import UserRouter from './UserRouter'

const RouterPage = () => {
  return (
    <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/user/*' element={<UserRouter/>}/>
    </Routes>
  )
}

export default RouterPage