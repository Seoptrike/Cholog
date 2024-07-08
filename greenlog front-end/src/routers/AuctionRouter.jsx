import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuctionPage from '../components/admin/AuctionPage'
import AuctionList from '../components/auction/AuctionList'
import AuctionRead from '../components/auction/AuctionRead'
import AuctionUpdate from '../components/admin/AuctionUpdate'
const AuctionRouter = () => {
  return (
    <Routes>
    <Route path='admin/list.json' element={<AuctionPage/>}/>
    <Route path='list.json/:user_uid' element={<AuctionList/>}/>
    <Route path='read/:auction_key' element={<AuctionRead/>}/>
    <Route path='update/:auction_key' element={<AuctionUpdate/>}/>
    </Routes>
  )
}

export default AuctionRouter