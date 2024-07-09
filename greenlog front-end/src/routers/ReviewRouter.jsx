import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ReviewPage from '../components/review/ReviewPage'
import InsertPage from '../components/review/InsertPage'
import UpdatePage from '../components/review/UpdatePage'

const ReviewRouter = () => {
    return (
        <Routes>
            <Route path='list.json' element={<ReviewPage/>}></Route>
            <Route path='insert' element={<InsertPage/>}></Route>
            <Route path='update/:review_key' element={<UpdatePage/>}></Route>
        </Routes>
    )
}

export default ReviewRouter