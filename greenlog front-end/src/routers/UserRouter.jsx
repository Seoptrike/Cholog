import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../components/user/LoginPage'
import JoinPage from '../components/user/JoinPage'
import MyPage from '../components/user/MyPage'
import Dashboard from '../components/admin/Dashboard'
import UserListPage from '../components/admin/UserListPage'
import Question from '../components/admin/Question'
import SeedPage from '../components/admin/SeedPage'
import SeedWallet from '../components/user/SeedWallet'
import SearchIdPage from '../components/user/SearchIdPage'
import SearchPassPage from '../components/user/SearchPassPage'
import UserUpdatePage from '../components/user/UserUpdatePage'
import Following from '../components/follow/Following'
import Follow from '../components/follow/Follow'
import AdminUpdate from '../components/admin/AdminUpdate'
import AdminReadPage from '../components/admin/AdminReadPage'


const UserRouter = () => {
  return (
    <Routes>
        <Route path='login' element={<LoginPage/>}/>
        <Route path='join' element={<JoinPage/>}/>
        <Route path='read/:user_uid' element={<MyPage/>}/>
        <Route path='admin' element={<Dashboard/>}/>
        <Route path='admin/list.json' element={<UserListPage/>}/>
        <Route path='admin/question' element={<Question/>}/>
        <Route path='admin/update/:user_uid' element={<AdminUpdate/>}/>
        <Route path='admin/read/:user_uid' element={<AdminReadPage/>}/>
        <Route path='admin/seed/list.json' element={<SeedPage/>}/>
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