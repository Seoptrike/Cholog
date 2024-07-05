import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../components/user/LoginPage'
import JoinPage from '../components/user/JoinPage'
import MyPage from '../components/user/MyPage'
import Dashboard from '../components/admin/Dashboard'
import UserListPage from '../components/admin/UserListPage'
import Question from '../components/admin/Question'
import SeedWallet from '../components/user/SeedWallet'
import SearchIdPage from '../components/user/SearchIdPage'
import SearchPassPage from '../components/user/SearchPassPage'
import UserUpdatePage from '../components/user/UserUpdatePage'
import Following from '../components/follow/Following'
import Follow from '../components/follow/Follow'



const UserRouter = () => {
  return (
    <Routes>
        <Route path='login' element={<LoginPage/>}/>
        <Route path='join' element={<JoinPage/>}/>
        <Route path='read/:user_uid' element={<MyPage/>}/>
        <Route path='admin' element={<Dashboard/>}/>
        <Route path='admin/list.json' element={<UserListPage/>}/>
        <Route path='admin/question' element={<Question/>}/>
        <Route path='wallet/:user_uid' element={<SeedWallet/>}/>
        <Route path='searchId' element={<SearchIdPage/>}/>
        <Route path='searchPass' element={<SearchPassPage/>}/>
        <Route path='update/:user_uid' element={<UserUpdatePage/>}/>
        <Route path='following' element={<Following/>}/>
        <Route path='follower' element={<Follow/>}/>
    </Routes>
  )
}

export default UserRouter