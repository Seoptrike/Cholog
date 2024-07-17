import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuctionPage from '../components/admin/AuctionPage'
import AuctionList from '../components/auction/AuctionList'
import AuctionRead from '../components/auction/AuctionRead'

const AuctionRouter = () => {
  return (
    <Routes>
    <Route path='admin/list.json' element={<AuctionPage/>}/>
    <Route path='list.json/:user_uid' element={<AuctionList/>}/>
    <Route path='read/:auction_key' element={<AuctionRead/>}/>
    </Routes>
  )
}

export default AuctionRouter